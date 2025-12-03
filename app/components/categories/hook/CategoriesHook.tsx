"use client";
import { initialDataCategories } from "@/data/categoriesData";
import useAuth from "@/firebase/auth";
import {
    getDocumentReference,
    saveDataDocumentsQuery,
    saveEditDataDocumentsQuery,
} from "@/queries/documentsQueries";
import { AddressValues, CategoriesValues } from "@/types/categories";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const CategoriesHook = ({
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
    const { userData, companyData } = useAuth();
    const [showPickerColor, setShowPickerColor] = useState<boolean>(false);

    // Datos
    const [data, setData] = useState<CategoriesValues>(initialDataCategories);

    // Errores
    const [nameError, setNameError] = useState("");
    const [pointNameError, setPointNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [latitudeError, setLatitudeError] = useState("");
    const [longitudeError, setLongitudeError] = useState("");

    //Busca el tema en almacenamiento local
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    // Valida campos
    const validateFields = () => {
        let valid = true;

        // Validación del campo 'name'
        if (!data.name) {
            setNameError("El Nombre es requerido");
            valid = false;
        } else {
            setNameError("");
        }

        // Validación del campo 'Nombre del punto'
        if (!data.directions[0].pointName) {
            setPointNameError("El nombre del punto es requerido");
            valid = false;
        } else {
            setPointNameError("");
        }

        // Validación del campo 'Dirección'
        if (!data.directions[0].address) {
            setAddressError("La dirección es requerida");
            valid = false;
        } else {
            setAddressError("");
        }

        if (!data.directions[0]?.lat?.trim()) {
            setLatitudeError("La latitud es requerida");
            valid = false;
        } else if (isNaN(Number(data.directions[0].lat)) || Number(data.directions[0].lat) < -90 || Number(data.directions[0].lat) > 90) {
            setLatitudeError("La latitud debe ser un número entre -90 y 90");
            valid = false;
        } else {
            setLatitudeError("");
        }

        if (!data.directions[0]?.lng?.trim()) {
            setLongitudeError("La longitud es requerida");
            valid = false;
        } else if (isNaN(Number(data.directions[0].lng)) || Number(data.directions[0].lng) < -180 || Number(data.directions[0].lng) > 180) {
            setLongitudeError("La longitud debe ser un número entre -180 y 180");
            valid = false;
        } else {
            setLongitudeError("");
        }
        return valid;
    };

    const handleAddData = (
        type: "phone" | "email" | "additional" | "address",
    ) => {
        setData((prevData) => {
            const maxItems = 3;
            let newData = { ...prevData };

            if (type === "address") {
                if ((prevData.directions || []).length < maxItems) {
                    const updatedAddress: AddressValues[] = [
                        ...(prevData.directions || []),
                        { pointName: "", address: "", lat: null, lng: null },
                    ];
                    newData = { ...newData, directions: updatedAddress };
                }
            }

            return newData;
        });
    };

    const handleDeleteItem = (indexItem: number) => {
        setData((prevData) => ({
            ...prevData,
            directions: prevData.directions?.filter(
                (_, index) => index !== indexItem,
            ),
        }));
    };

    //Guarda las nuevas direcciones
    const handleChangeItem = (
        field: keyof CategoriesValues,
        index: number,
        key: string,
        value: string | boolean,
    ) => {
        setData((prevData) => {
            const fieldArray = prevData[field] as any[];
            if (fieldArray && fieldArray[index]) {
                const updatedFieldArray = [...fieldArray];
                const newProp = { [key]: value };
                updatedFieldArray[index] = {
                    ...updatedFieldArray[index],
                    ...newProp,
                };

                return {
                    ...prevData,
                    [field]: updatedFieldArray,
                };
            }
            return prevData;
        });
    };

    //Para guardar el color y cierra el color picker
    const handleChangeColor = (value: string) => {
        setData((prevData) => ({
            ...prevData,
            color: value,
        }));
        setShowPickerColor(false);
    };

    //Para guardar los datos del formulario.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const normalizeDirections = () => {
        return data.directions.map(d => ({
            ...d,
            lat: d.lat !== "" ? Number(d.lat) : null,
            lng: d.lng !== "" ? Number(d.lng) : null,
        }));
    };


    // Para enviar a guardar los datos nuevos.
    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        //Creando la referencia del documento
        const documentRef: any = getDocumentReference(reference);

        // Validar los campos antes de continuar
        if (!validateFields()) return;
        const directions = normalizeDirections();
        setIsLoading(true);

        try {
            if (userData?.companyId) {
                // Se complementa la info faltante
                const formData = {
                    ...data,
                    idCompany: userData.companyId,
                    uid: documentRef.id,
                    directions,
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
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
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
        setData(initialDataCategories);
        setNameError("");
        setPointNameError("");
        setAddressError("");
        setLatitudeError("");
        setLongitudeError("");
    };

    //Para actualizar los datos
    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;
        const directions = normalizeDirections();
        setIsLoading(true);
        try {
            if (userData?.companyId) {
                const meetingQueryResult = await saveEditDataDocumentsQuery({
                    id: data.uid,
                    data: {
                        ...data,
                        directions
                    },
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
        } catch (error) {
            console.error("Error al editar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
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
        nameError,
        pointNameError,
        addressError,
        showPickerColor,
        handleChangeColor,
        setShowPickerColor,
        handleChange,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
        handleDeleteItem,
        handleAddData,
        handleChangeItem,
        latitudeError,
        longitudeError,
    };
};

export default CategoriesHook;
