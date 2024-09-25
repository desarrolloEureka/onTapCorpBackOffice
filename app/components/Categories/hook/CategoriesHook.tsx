"use client";
import { initialDataCategories } from "@/data/categoriesData";
import { getGeolocation } from "@/data/formConstant";
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

    //Busca el tema en almacenamiento local
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    //Filtra los campos vacíos
    const directionsFiltered = data.directions.filter(
        (item) => item.pointName !== "" && item.address !== "",
    );

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
                        { pointName: "", address: "" },
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

    // Para enviar a guardar los datos nuevos.
    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        //Creando la referencia del documento
        const documentRef: any = getDocumentReference(reference);

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        //Coordenadas de la Dirección
        const coordsFromAddress: {
            lat: number;
            lng: number;
        } | null = await getGeolocation(
            directionsFiltered[0].address,
            companyData,
        );

        setIsLoading(true);

        try {
            if (userData?.companyId) {
                // Se complementa la info faltante
                const formData = {
                    ...data,
                    directions: [
                        ...directionsFiltered,
                        { ...directionsFiltered[0], ...coordsFromAddress },
                    ],
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
    };

    //Para actualizar los datos
    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;

        //Coordenadas de la Dirección
        const coordsFromAddress: {
            lat: number;
            lng: number;
        } | null = await getGeolocation(
            directionsFiltered[0].address,
            companyData,
        );

        setIsLoading(true);
        try {
            if (userData?.companyId) {
                const meetingQueryResult = await saveEditDataDocumentsQuery({
                    id: data.uid,
                    data: {
                        ...data,
                        directions: [
                            ...directionsFiltered,
                            { ...directionsFiltered[0], ...coordsFromAddress },
                        ],
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
    };
};

export default CategoriesHook;
