"use client";
import useAuth from "@/firebase/auth";
import {
    SaveSocialNetwork,
    UpdateSocialNetwork,
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import moment from "moment";
import { useEffect, useState } from "react";

const LogosFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
}: ModalParamsMainForm) => {
    const { userData } = useAuth();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idRow, setIdRow] = useState("");
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    //Datos
    const [logoName, setLogoName] = useState("");
    const [logoNameOld, setLogoNameOld] = useState("");
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

        if (!logoName) {
            setLogoNameError("El nombre del logo es obligatorio");
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
        setLogoName(e.target.value);

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
        setLogoName("");
        setSelectedImage(null);
        setLogoNameError("");
        setImageError("");
        setLogoNameOld("");
        setIdRow("");
        setIsUpdateImage(false);
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            // const now = new Date();
            // const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            // const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS

            if (userData?.companyId && selectedImage) {
                const formData = {
                    logoName,
                    imageName: logoName,
                    // createdDate: date,
                    // createdTime: hour,
                    timestamp: currentDate,
                    idCompany: userData?.companyId,
                };

                const result = await SaveSocialNetwork(formData, selectedImage);

                if (result.success) {
                    console.log("Logo saved successfully");
                } else {
                    console.error("Failed to save logo:", result.message);
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                );
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
            // const now = new Date();
            // const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            // const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS

            if (userData?.companyId && selectedImage) {
                const formData = {
                    logoName,
                    // createdDate: date,
                    // createdTime: hour,
                    timestamp: currentDate,
                    idCompany: userData?.companyId,
                };

                const result = await UpdateSocialNetwork(
                    idRow,
                    logoNameOld,
                    formData?.logoName,
                    isUpdateImage ? selectedImage : null,
                );

                if (result.success) {
                    console.log("Logo updated successfully");
                } else {
                    console.error("Failed to update logo:", result.message);
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                );
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
            setLogoName(editData?.logoName || ""),
            setLogoNameOld(editData?.imageName || ""),
            setSelectedImage(editData?.imageUrl || ""));
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        logoName,
        selectedImage,
        setLogoName,
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

export default LogosFormHook;
