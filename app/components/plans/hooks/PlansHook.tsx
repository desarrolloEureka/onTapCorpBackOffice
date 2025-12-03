"use client";
import { editPlanQuery } from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PlansHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title
}: any) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idRow, setIdRow] = useState("");
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const [planName, setPlanName] = useState("");
    const [planPrice, setPlanPrice] = useState("");
    const [planNameError, setPlanNameError] = useState("");
    const [planPriceError, setPlanPriceError] = useState("");

    const validateFields = () => {
        let valid = true;

        if (!planName.trim()) {
            setPlanNameError("El nombre del plan es obligatorio");
            valid = false;
        } else {
            setPlanNameError("");
        }

        if (!planPrice.trim()) {
            setPlanPriceError("El precio del plan es obligatorio");
            valid = false;
        } else if (isNaN(Number(planPrice)) || Number(planPrice) <= 0) {
            setPlanPriceError("El precio debe ser un número válido y mayor a 0");
            valid = false;
        } else {
            setPlanPriceError("");
        }

        return valid;
    };

    const handleClose = () => {
        setShow(false);
        setIsEdit(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        handleReset();
    };

    const handleReset = () => {
        setIdRow("");
        setPlanName("");
        setPlanPrice("");
        setPlanNameError("");
        setPlanPriceError("");
    };

    const handleEditForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;
        Swal.fire({
            position: "center",
            title: `Guardando...`,
            text: "Por favor espera",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        setIsLoading(true);

        try {
            const data = {
                name: planName.trim(),
                price: Number(planPrice)
            };

            await editPlanQuery(data, idRow);
            Swal.close();
            confirmAlert();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

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
                setIdRow(editData?.uid),
                setPlanName(editData.name || ""),
                setPlanPrice(editData.price?.toString() || "")
            )
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        setShow,
        isLoading,
        isEdit,
        setIsEdit,
        idRow,
        setIdRow,
        planName,
        setPlanName,
        planNameError,
        planPrice,
        setPlanPrice,
        planPriceError,
        themeParsed,
        handleClose,
        handleReset,
        handleEditForm,
    };
};

export default PlansHook;
