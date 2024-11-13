"use client";
import { initialDataCom } from "@/data/communicationsData";
import useAuth from "@/firebase/auth";
import {
    getDocumentReference,
    saveDataDocumentsQuery,
    saveEditDataDocumentsQuery,
} from "@/queries/documentsQueries";
import { CommunicationsValues } from "@/types/communications";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const NewsHook = ({
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
    const [data, setData] = useState<CommunicationsValues>(initialDataCom);

    // Errores
    const [subjectError, setSubjectError] = useState("");
    const [urlError, setUrlError] = useState("");

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    // Valida campos
    const validateFields = () => {
        let valid = true;

        // Validación del campo 'subject'
        if (!data.subject) {
            setSubjectError("El Asunto es requerido");
            valid = false;
        } else {
            setSubjectError("");
        }

        // Validación del campo 'url'
        if (!data.url) {
            setUrlError("La Url es requerida");
            valid = false;
        } else {
            setUrlError("");
        }

        return valid;
    };

    //Para guardar los datos.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name.startsWith('url')) {
            // Verificación de la URL solo si hay un valor completo
            if (!(e.target.value.toString().startsWith('https://') || e.target.value.toString().startsWith('http://') || e.target.value.toString().startsWith('h')) && e.target.value !='') {
                // Si no comienza con http o https, agregar https://
                setData((prevData: any) => ({
                    ...prevData,
                    [e.target.name]: "https://" + e.target.value,
                }));
                return;
            } else {
                // Si es válido, simplemente actualizar
                setData((prevData: any) => ({
                    ...prevData,
                    [e.target.name]: e.target.value,
                }));
            }
        } else {
            setData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        }        
    };

    //Para guardar el estado de la comunicación.
    const handleChecked = (value: boolean) => {
        setData((prevData) => ({
            ...prevData,
            ["isActive"]: value,
        }));
    };

    // Para enviar a guardar los datos nuevos.
    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        //Creando la referencia del documento
        const documentRef: any = getDocumentReference(reference);

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            if (userData?.companyId) {
                // Se complementa la info faltante
                const formData = {
                    ...data,
                    idCompany: userData.companyId,
                    uid: documentRef.id,
                };
                const queryResult = await saveDataDocumentsQuery({
                    documentRef,
                    data: formData,
                });

                if (queryResult.success) {
                    console.log("Saved successfully");
                    confirmAlert();
                } else {
                    console.error("Failed to save:", queryResult.message);
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
        setData(initialDataCom);
        setSubjectError("");
        setUrlError("");
    };

    //Para actualizar los datos
    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;

        setIsLoading(true);
        try {
            if (userData?.companyId) {
                const meetingQueryResult = await saveEditDataDocumentsQuery({
                    id: data.uid,
                    data,
                    reference,
                });
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
        handleShowMainFormEdit && (setShow(true), setData(editData));
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        data,
        subjectError,
        urlError,
        handleChange,
        handleChecked,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
    };
};

export default NewsHook;
