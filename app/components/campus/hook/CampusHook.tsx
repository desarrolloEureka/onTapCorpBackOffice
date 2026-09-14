"use client";
import {
    daysInSpanish,
    hoursArray,
    initialData,
    initialPhones,
} from "@/data/campus";
import useAuth from "@/firebase/auth";
import {
    getDocumentReference,
    saveCampusQuery,
    updateCampusQuery,
} from "@/queries/documentsQueries";
import {
    CampusDataPhone,
    CampusFormValues,
    CampusFormValuesData,
} from "@/types/campus";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const CampusHook = ({
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

    // Datos
    const [data, setData] = useState<CampusFormValuesData>(initialData);
    const [phones, setPhones] = useState<CampusFormValues>(initialPhones);

    // Errores
    const [campusNameError, setCampusNameError] = useState("");
    const [campusNumError, setCampusNumError] = useState("");
    const [campusAddressError, setCampusAddressError] = useState("");
    const [campusUrlError, setCampusUrlError] = useState("");
    const [latitudeError, setLatitudeError] = useState("");
    const [longitudeError, setLongitudeError] = useState("");


    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const orderedDays = Object.keys(daysInSpanish);

    // Ordena los días de la semana en la estructura que traes desde Firebase
    const sortedSchedule = Object.entries(data.schedule).sort(
        (a, b) => orderedDays.indexOf(a[0]) - orderedDays.indexOf(b[0]),
    );

    const handleChange = (value: string, name: string, isChecked?: boolean) => {
        if (isChecked !== undefined) {
            setData((prevData) => ({
                ...prevData,
                [name]: [(value || "") ?? "", !isChecked],
            }));
            return;
        }

        setData((prevData) => ({
            ...prevData,
            [name]: (value || "-") ?? "-",
        }));
    };

    const handleChangeItem = (
        field: keyof CampusFormValuesData,
        index: number,
        key: string,
        value: string | boolean,
        checked?: boolean,
    ) => {
        setData((prevData) => {
            const fieldArray = prevData[field] as any[];
            if (fieldArray && fieldArray[index]) {
                const updatedFieldArray = [...fieldArray];
                const newProp =
                    key === "text"
                        ? { [key]: value, checked: !checked }
                        : { [key]: value };
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

    const handleAddData = (type: "phone" | "email" | "additional") => {
        setData((prevData) => {
            const maxItems = 3;
            let newData = { ...prevData };

            if (type === "phone") {
                // Solo agregar un nuevo teléfono si no hemos llegado al límite de 3
                if ((prevData.phones || []).length < maxItems) {
                    const updatedPhones: CampusDataPhone[] = [
                        ...(prevData.phones || []),
                        { text: "", indicative: "57", checked: false, ext: "" },
                    ];
                    newData = { ...newData, phones: updatedPhones };
                }
            }

            return newData;

        });
    };

    const handleDeleteItem = (indexItem: number) => {
        setData((prevData) => ({
            ...prevData,
            ["phones"]: prevData["phones"]?.filter(
                (_, index) => index !== indexItem,
            ),
        }));
    };

    const handleScheduleDay = (
        e: ChangeEvent<{ value: string }>,
        dayOfWeek: string,
        timeType: "openTime" | "closeTime",
    ) => {
        const value = e.target.value;

        setData((prevData) => ({
            ...prevData,
            schedule: {
                ...prevData.schedule,
                [dayOfWeek]: {
                    ...prevData.schedule[dayOfWeek],
                    [timeType]: value,
                },
            },
        }));
    };

    const validateFields = () => {
        let valid = true;

        // Validación del campo 'name'
        if (!data.name[0].trim()) {
            setCampusNameError("El nombre de la sede es requerido");
            valid = false;
        } else if (data.name[0].length < 3) {
            setCampusNameError("El nombre de la sede debe tener al menos 3 caracteres");
            valid = false;
        } else {
            setCampusNameError("");
        }

        if (!data?.latitude?.trim()) {
            setLatitudeError("La latitud es requerida");
            valid = false;
        } else if (isNaN(Number(data.latitude)) || Number(data.latitude) < -90 || Number(data.latitude) > 90) {
            setLatitudeError("La latitud debe ser un número entre -90 y 90");
            valid = false;
        } else {
            setLatitudeError("");
        }

        if (!data?.longitude?.trim()) {
            setLongitudeError("La longitud es requerida");
            valid = false;
        } else if (isNaN(Number(data.longitude)) || Number(data.longitude) < -180 || Number(data.longitude) > 180) {
            setLongitudeError("La longitud debe ser un número entre -180 y 180");
            valid = false;
        } else {
            setLongitudeError("");
        }

        // Validación del campo 'address'
        if (!data.address[0].trim()) {
            setCampusAddressError("La dirección de la sede es requerida");
            valid = false;
        } else if (data.address[0].length < 3) {
            setCampusAddressError("La dirección debe tener al menos 3 caracteres");
            valid = false;
        } else {
            setCampusAddressError("");
        }

        // Validación del campo 'phones' (número de teléfono)
        if (!data.phones || data.phones.length === 0 || data.phones[0].text.trim().replace(/\D/g, '').length !== 10) {
            setCampusNumError("El número de teléfono debe tener exactamente 10 caracteres");
            valid = false;
        } else {
            setCampusNumError(""); // Limpiar error si es válido
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

                const { latitude, longitude, ...rest } = data;

                const formData = {
                    ...rest,
                    idCompany: userData.companyId,
                    uid: documentRef.id,
                    geolocation: {
                        lat: Number(data.latitude),
                        lng: Number(data.longitude)
                    }
                };

                const campusQueryResult = await saveCampusQuery(
                    formData,
                    documentRef,
                );

                if (campusQueryResult.success) {
                    confirmAlert();
                } else {
                    console.error("Failed to save:", campusQueryResult.message);
                }
            } else {
                // console.log("No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.");
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
        setData(initialData);
        setPhones(initialPhones);
        setCampusNameError("");
        setCampusAddressError("");
        setCampusUrlError("");
        setCampusNumError("");
        setLatitudeError("");
        setLongitudeError("");
    };

    //Para actualizar los datos
    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;
        setIsLoading(true);
        try {
            if (userData?.companyId) {
                const { latitude, longitude, ...rest } = data;

                const editedData = {
                    ...rest,
                    geolocation: {
                        lat: Number(latitude),
                        lng: Number(longitude),
                    },
                    idCompany: userData.companyId,
                };

                const campusQueryResult = await updateCampusQuery(editedData);

                if (campusQueryResult.success) {
                    confirmAlert();
                } else {
                    console.error("Failed to save:", campusQueryResult.message);
                }
            } else {
                // console.log("No se pudo encontrar la compañía o el ID de la fila. Por favor, inténtalo de nuevo.");
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
        dataForm: data,
        sortedSchedule,
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        phones,
        campusNameError,
        campusAddressError,
        campusUrlError,
        campusNumError,
        latitudeError,
        longitudeError,
        daysInSpanish,
        hoursArray,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
        handleChange,
        handleAddData,
        handleChangeItem,
        handleDeleteItem,
        handleScheduleDay,
    };
};

export default CampusHook;
