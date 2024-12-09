"use client";
import useAuth from "@/firebase/auth";
import { saveNotificationQuery, getEmployeesByCompanyIdQuery, sendNotificationsToUsersQuery } from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import moment from "moment";
import { useEffect, useState } from "react";

const NotificationsFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    setHandleShowMainFormEdit,
    editData,
}: ModalParamsMainForm) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [issue, setIssue] = useState("");
    const [content, setContent] = useState("");
    const { userData, companyData } = useAuth();

    // Errores
    const [issueError, setIssueError] = useState("");
    const [contentError, setContentError] = useState("");

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const validateFields = () => {
        let valid = true;

        // Validación del campo 'issue'
        if (!issue) {
            setIssueError("El asunto es requerido");
            valid = false;
        } else {
            setIssueError("");
        }

        // Validación del campo 'content'
        if (!content) {
            setContentError("El contenido es requerido");
            valid = false;
        } else if (content.length > 120) {
            setContentError("El contenido debe tener máximo 120 caracteres");
            valid = false;
        } else {
            setContentError("");
        }

        return valid;
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);
        try {
            // const now = new Date();
            // const date = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            // const hour = now.toTimeString().split(' ')[0]; // Formato HH:MM:SS

            const currentDate = moment().format();

            if (userData?.companyId) {
                const formData = {
                    idCompany: userData.companyId,
                    issue,
                    content,
                    timestamp: currentDate,
                };
                const notificationResult = await saveNotificationQuery(formData);
                if (notificationResult.success) {
                    const employees = await getEmployeesByCompanyIdQuery(userData?.companyId)
                    const tokens = employees.map(employee => employee?.tokens).filter(token => token !== undefined);
                    await sendNotificationsToUsersQuery(tokens, issue, content, companyData?.icon[0])
                } else {
                    console.error(
                        "Failed to save notification:",
                        notificationResult.message,
                    );
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                );
                return;
            }

            handleClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShow(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        setIsEdit(false);
        handleReset();
    };

    const handleReset = () => {
        setIssue("");
        setContent("");
        setIssueError("");
        setContentError("");
    };

    useEffect(() => {
        if (handleShowMainForm) {
            setShow(true);
            setIsEdit(editData !== null);
            if (editData) {
                setIssue(editData.issue || "");
                setContent(editData.content || "");
            }
        }
    }, [handleShowMainForm, editData]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        issue,
        setIssue,
        content,
        setContent,
        issueError,
        contentError,
        handleSendForm,
        handleClose,
        handleReset,
    };
};

export default NotificationsFormHook;
