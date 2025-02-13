"use client";
import useAuth from "@/firebase/auth";
import {
    SaveBackgroundImage,
    SaveSocialNetwork,
    UpdateBackgroundImage,
    UpdateSocialNetwork,
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BackgroundFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    isSuperAdmin
}: ModalParamsMainForm) => {
    const { userData } = useAuth();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idRow, setIdRow] = useState("");
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    //Datos
    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isUpdateImage, setIsUpdateImage] = useState(false);

    //Errores
    const [logoNameError, setLogoNameError] = useState("");
    const [imageError, setImageError] = useState("");

    const currentDate = moment().format();

    // Lógica para manejar la selección de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setIsUpdateImage(true);
            setImageError("");
        }
    };

    const validateFields = () => {
        let valid = true;

        if (!name) {
            setLogoNameError("El nombre del fondo es obligatorio");
            valid = false;
        } else {
            setLogoNameError("");
        }

        if (!selectedImage) {
            setImageError("Debes seleccionar una imagen");
            valid = false;
        } else {
            setImageError("");
        }

        return valid;
    };

    const handleLogoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);

        // Limpiar el error si el usuario empieza a escribir
        if (e.target.value.trim() !== "") {
            setLogoNameError("");
        }
    };

    const handleClose = () => {
        setShow(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        handleReset();
        setIsEdit(false);
    };

    const handleReset = () => {
        setName("");
        setSelectedImage(null);
        setLogoNameError("");
        setImageError("");
        setIdRow("");
        setIsUpdateImage(false);
    };

    const convertToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    //Se muestra alerta de guardado
    const confirmAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Se guardó correctamente en la tabla de fondos`,
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);

        try {

            if (!isSuperAdmin && !userData?.companyId) {
                console.log("No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.");
                return;
            }

            if (selectedImage) {
                const base64Image = await convertToBase64(selectedImage);

                const formData = {
                    name,
                    timestamp: currentDate,
                    imageUrl: base64Image,
                    idCompany: userData?.companyId || ''
                };

                const result = await SaveBackgroundImage(formData);

                if (result.success) {
                    confirmAlert();
                } else {
                    console.error("Failed to save fondo:", result.message);
                }
            } else {
                console.log("Por favor, selecciona una imagen para el fondo.");
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    const handleEditForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);

        try {

            if (!isSuperAdmin && !userData?.companyId) {
                console.log("No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.");
                return;
            }

            if (selectedImage) {
                let base64Image

                if (isUpdateImage) {
                    base64Image = await convertToBase64(selectedImage);
                } else {
                    base64Image = selectedImage;
                }

                const formData = {
                    name,
                    timestamp: currentDate,
                    imageUrl: base64Image,
                    idCompany: userData?.companyId || ''
                };

                const result = await UpdateBackgroundImage(formData, idRow);

                if (result.success) {
                    confirmAlert()
                } else {
                    console.error("Failed to update fondo:", result.message);
                }
            } else {
                console.log("Por favor, selecciona una imagen para el fondo.");
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit &&
            (setShow(true),
                setIdRow(editData?.uid),
                setName(editData?.name || ""),
                setSelectedImage(editData?.imageUrl || ""));
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        name,
        selectedImage,
        setName,
        setSelectedImage,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
        handleImageChange,
        logoNameError,
        imageError,
        handleLogoNameChange,
        isUpdateImage,
    };
};

export default BackgroundFormHook;
