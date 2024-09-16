"use client";
import useAuth from "@/firebase/auth";
import {
    getDocumentReference,
    saveMeetingQuery,
    updateMeetingQuery,
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MeetingStatusesHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
}: ModalParamsMainForm) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { userData } = useAuth();

    // Datos
    const [meetingName, setMeetingName] = useState("");
    const [idRow, setIdRow] = useState("");

    // Errores
    const [meetingNameError, setMeetingNameError] = useState("");

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const validateFields = () => {
        let valid = true;

        // Validación del campo 'meetingName'
        if (!meetingName) {
            setMeetingNameError("Estado de la reunión es requerido");
            valid = false;
        } else {
            setMeetingNameError("");
        }

        return valid;
    };

    // Para guardar los datos nuevos
    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        //Creando la referencia del documento
        const documentRef: any = getDocumentReference(reference);

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);
        try {
            if (userData?.companyId) {
                const formData = {
                    idCompany: userData.companyId,
                    name: meetingName,
                    isDeleted: false,
                    uid: documentRef.id,
                };
                const meetingQueryResult = await saveMeetingQuery(
                    formData,
                    documentRef,
                );

                if (meetingQueryResult.success) {
                    console.log("Saved successfully");
                    confirmAlert();
                } else {
                    console.error(
                        "Failed to save:",
                        meetingQueryResult.message,
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
            console.error("Error al enviar el formulario:", error);
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
        setMeetingName("");
        setMeetingNameError("");
    };

    //Para actualizar los datos
    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;

        setIsLoading(true);
        try {
            if (userData?.companyId && idRow) {
                const updatedData = {
                    uid: idRow,
                    idCompany: userData.companyId,
                    name: meetingName,
                    isDeleted: false,
                };

                const meetingQueryResult = await updateMeetingQuery(
                    updatedData,
                    idRow,
                );

                if (meetingQueryResult.success) {
                    console.log("Saved successfully");
                    confirmAlert();
                } else {
                    console.error(
                        "Failed to save:",
                        meetingQueryResult.message,
                    );
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía o el ID de la fila. Por favor, inténtalo de nuevo.",
                );
                return;
            }

            handleClose();
        } catch (error) {
            console.error("Error al editar el formulario:", error);
        } finally {
            setIsLoading(false);
        }
    };

    //Se muestra alerta de guardado
    const confirmAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Se guardó correctamente en la tabla de ${title}`,
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit &&
            (setShow(true),
            setMeetingName(editData?.name),
            setIdRow(editData?.uid));
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        meetingName,
        setMeetingName,
        meetingNameError,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
    };
};

export default MeetingStatusesHook;
