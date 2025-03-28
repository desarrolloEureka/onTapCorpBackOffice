"use client";
import useAuth from "@/firebase/auth";
import {
    editEmployeeQuery,
    getAreasByCompanyIdQuery,
    getDocumentReference,
    getHeadquartersByCompanyIdQuery,
    getRoutesByCompanyIdQuery,
    saveEmployeeQuery,
    getWorkAreaByUidQuery,
    editAreaQuery,
    getCompaniesByUidQuery,
    editCompanyQuery,
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import {
    DataAdditional,
    DataEmail,
    DataPhone,
    FormValuesData,
} from "@/types/user";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import _ from "lodash";
import { addUser } from "@/firebase/user";
import moment from "moment";
import Swal from "sweetalert2";
import { handleSendWelcomeEmail } from "lib/brevo/handlers/actions";

const EmployeesFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
}: ModalParamsMainForm) => {
    const initialData: FormValuesData = {
        uid: "",
        firstName: ["", false],
        lastName: ["", false],
        documentType: ["", true],
        documentNumber: ["", true],
        dateOfBirth: ["", true],
        position: ["", false],
        phones: [{ text: "", checked: false, indicative: "+57", ext: "" }],
        emails: [{ text: "", checked: false }],
        additional: [{ autodato: "", dato: "", checked: false }],
        isActive: true,
        isGPSActive: true,
    };

    const initialErrors = {
        selectedArea: "",
        selectedHeadquarter: "",
        routeApplicable: "",
        mondayRoute: "",
        tuesdayRoute: "",
        wednesdayRoute: "",
        thursdayRoute: "",
        fridayRoute: "",
        saturdayRoute: "",
        sundayRoute: "",
        employeeCardStatus: "",
        employeeStatusGPS: ""
    };

    const { accessTokenUser, userData } = useAuth();
    const [show, setShow] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idRow, setIdRow] = useState("");
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    // Datos Paso 1
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [data, setData] = useState<FormValuesData>(initialData);
    const [allChecked, setAllChecked] = useState<string>("none");
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    //Datos Paso 2
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedAreaError, setSelectedAreaError] = useState("");

    const [selectedHeadquarter, setSelectedHeadquarter] = useState("");
    const [selectedHeadquarterError, setSelectedHeadquarterError] =
        useState("");

    const [routeApplicable, setRouteApplicable] = useState<boolean>(true);
    const [routeApplicableError, setRouteApplicableError] = useState("");

    const [mondayRoute, setMondayRoute] = useState("default");
    const [mondayRouteError, setMondayRouteError] = useState("");

    const [tuesdayRoute, setTuesdayRoute] = useState("default");
    const [tuesdayRouteError, setTuesdayRouteError] = useState("");

    const [wednesdayRoute, setWednesdayRoute] = useState("default");
    const [wednesdayRouteError, setWednesdayRouteError] = useState("");

    const [thursdayRoute, setThursdayRoute] = useState("default");
    const [thursdayRouteError, setThursdayRouteError] = useState("");

    const [fridayRoute, setFridayRoute] = useState("default");
    const [fridayRouteError, setFridayRouteError] = useState("");

    const [saturdayRoute, setSaturdayRoute] = useState("default");
    const [saturdayRouteError, setSaturdayRouteError] = useState("");

    const [sundayRoute, setSundayRoute] = useState("default");
    const [sundayRouteError, setSundayRouteError] = useState("");

    const [employeeCardStatus, setEmployeeCardStatus] = useState(false);
    const [employeeCardStatusError, setEmployeeCardStatusError] = useState("");

    const [employeeStatusGPS, setEmployeeStatusGPS] = useState(false);

    //Data Selects
    const [headquartersData, setHeadquartersData] = useState<any[] | null>(
        null,
    );
    const [areaData, setAreaData] = useState<any[] | null>(null);
    const [routeData, setRouteData] = useState<any[] | null>(null);

    const handleAddData = (type: "phone" | "email" | "additional") => {
        setData((prevData) => {
            const maxItems = 3;
            let newData = { ...prevData };

            if (type === "phone") {
                if ((prevData.phones || []).length < maxItems) {
                    const updatedPhones: DataPhone[] = [
                        ...(prevData.phones || []),
                        { text: "", checked: false, indicative: "+57", ext: "" },
                    ];
                    newData = { ...newData, phones: updatedPhones };
                }
            } else if (type === "email") {
                if ((prevData.emails || []).length < maxItems) {
                    const updatedEmails: DataEmail[] = [
                        ...(prevData.emails || []),
                        { text: "", checked: false },
                    ];
                    newData = { ...newData, emails: updatedEmails };
                }
            } else if (type === "additional") {
                //if ((prevData.additional || []).length < maxItems) {
                const updatedAdditional: DataAdditional[] = [
                    ...(prevData.additional || []),
                    { autodato: "", dato: "", checked: false },
                ];
                newData = { ...newData, additional: updatedAdditional };
                //}
            }
            return newData;
        });
    };

    const handleChangeItemAditional = (
        field: keyof FormValuesData,
        index: number,
        key: string,
        value: string | boolean,
        checked?: boolean,
    ) => {
        setData((prevData) => {
            const fieldArray = prevData[field] as any[];
            if (fieldArray && fieldArray[index]) {
                const updatedFieldArray = [...fieldArray];
                const newProp = { [key]: value, checked: !checked };
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

    const handleChangeItem = (
        field: keyof FormValuesData,
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

    const isFormComplete = (): boolean => {
        // Verifica si todos los campos en 'emails' están completos
        if (data.emails) {
            // Itera sobre cada email y verifica si tanto 'text' como 'checked' tienen valores válidos
            return data.emails.every((email) => {
                return email.text.trim() !== "" && email.checked !== false;
            });
        }
        return false;
    };

    const handleChange = (value: any, name: string, isChecked?: boolean) => {
        // Actualiza el campo "isActive" convirtiendo el valor a booleano.
        if (name === "isActive") {
            setData((prevData: any) => ({
                ...prevData,
                [name]: value as boolean,
            }));
            return;
        }

        if (isChecked === undefined) {
            setData({ ...data, [name]: (value || "-") ?? "-" });
        } else {
            setData({ ...data, [name]: [(value || "") ?? "", !isChecked] });
        }
    };

    const handleChangeMiuTel = (value: string, name: string) => {
        setData({ ...data, [name]: value });
    };

    const handleDeleteItem = (indexItem: number, type: any) => {
        if (type === "phones") {
            setData((prevData) => ({
                ...prevData,
                ["phones"]: prevData["phones"]?.filter(
                    (_, index) => index !== indexItem,
                ),
            }));
        }
        if (type === "emails") {
            setData((prevData) => ({
                ...prevData,
                ["emails"]: prevData["emails"]?.filter(
                    (_, index) => index !== indexItem,
                ),
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                ["additional"]: prevData["additional"]?.filter(
                    (_, index) => index !== indexItem,
                ),
            }));
        }
    };

    function resizeImage(
        file: File,
        maxWidth: number,
        maxHeight: number,
    ): Promise<File> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                let width = image.width;
                let height = image.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx && ctx.drawImage(image, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const resizedFile = new File([blob], file.name, {
                                type: blob.type || "image/jpeg",
                                lastModified: Date.now(),
                            });
                            resolve(resizedFile);
                        } else {
                            reject(new Error("Failed to create Blob"));
                        }
                    },
                    file.type || "image/jpeg",
                    0.35,
                );
            };
            image.onerror = () => {
                reject(new Error("Could not load image"));
            };
        });
    }

    const convertFileToBase64 = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(
                        new Error("Failed to convert file to base64 string."),
                    );
                }
            };
            reader.onerror = () => reject(new Error("Error reading file."));
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file instanceof File) {
            try {
                const resizedImage = await resizeImage(file, 750, 750);
                const base64String = await convertFileToBase64(resizedImage);
                setSelectedImage(base64String);
            } catch (error) {
                console.error("Error handling the image:", error);
            }
        }
    };

    const handleChangeSwitch = () => {
        setEmployeeCardStatus(!employeeCardStatus);
    };

    const handleChangeSwitch2 = () => {
        setEmployeeStatusGPS(!employeeStatusGPS);
    };

    const handleChangeStep = () => {
        if (!validateFields()) return;
        setStep(2);
    };

    function isAdult(dateOfBirth: string) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        // Calcular la edad
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        // Ajustar edad si aún no se ha cumplido el año
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age >= 18;
    }

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!data.firstName[0]?.trim()) {
            newErrors.firstName = "El nombre es obligatorio";
        }

        if (!data.lastName[0]?.trim()) {
            newErrors.lastName = "El apellido es obligatorio";
        }

        if (!data.documentType[0]?.trim()) {
            newErrors.documentType = "El tipo de documento es obligatorio";
        }

        if (!data.documentNumber[0]?.trim()) {
            newErrors.documentNumber = "El número de documento es obligatorio";
        } else if (data.documentNumber[0].length < 6) {
            newErrors.documentNumber = "El número de documento debe ser mayor de 5 caracteres";
        } else if (data.documentNumber[0].length > 12) {
            newErrors.documentNumber = "El número de documento debe ser menor de 12 caracteres";
        }

        if (!data.dateOfBirth[0]?.trim()) {
            newErrors.dateOfBirth = "La fecha de nacimiento es obligatoria";
        }

        if (!isAdult(data.dateOfBirth[0])) {
            newErrors.dateOfBirth = "El usuario debe ser mayor de edad";
        }

        if (!data.position[0]?.trim()) {
            newErrors.position = "El cargo es obligatoria";
        }

        // Validación de emails
        if (data.emails) {
            data.emails.forEach((email, index) => {
                if (!email.text.trim()) {
                    newErrors[`email-${index}`] = `El correo ${index + 1
                        } es obligatorio`;
                } else if (!isValidEmail(email.text)) {
                    newErrors[`email-${index}`] = `El correo ${index + 1
                        } no es válido`;
                }
            });
        }

        //validacion de numero telefono solo sea de 10 digitos
        if (!data.phones || data.phones.length === 0 || data.phones[0].text.trim().replace(/\D/g, '').length !== 10) {
            newErrors.phones = "El numero de telefono no puede ser inferior a 10 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Función de validación de correo electrónico
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateSaveData = () => {
        let valid = true;

        if (!selectedArea) {
            setSelectedAreaError("El área seleccionada es requerida.");
            valid = false;
        } else {
            setSelectedAreaError("");
        }

        if (!selectedHeadquarter) {
            setSelectedHeadquarterError("La sede seleccionada es requerida.");
            valid = false;
        } else {
            setSelectedHeadquarterError("");
        }

        // Validación de booleanos y rutas (puedes ajustar la validación según tus reglas)
        if (routeApplicable === null) {
            setRouteApplicableError("El campo de ruta aplicable es requerido.");
            valid = false;
        } else {
            setRouteApplicableError("");
        }

        if (routeApplicable) {
            if (!mondayRoute) {
                setMondayRouteError("La ruta del lunes es requerida.");
                valid = false;
            } else {
                setMondayRouteError("");
            }

            // Validación para la ruta del martes
            if (!tuesdayRoute) {
                setTuesdayRouteError("La ruta del martes es requerida.");
                valid = false;
            } else {
                setTuesdayRouteError("");
            }

            // Validación para la ruta del miércoles
            if (!wednesdayRoute) {
                setWednesdayRouteError("La ruta del miércoles es requerida.");
                valid = false;
            } else {
                setWednesdayRouteError("");
            }

            // Validación para la ruta del jueves
            if (!thursdayRoute) {
                setThursdayRouteError("La ruta del jueves es requerida.");
                valid = false;
            } else {
                setThursdayRouteError("");
            }

            // Validación para la ruta del viernes
            if (!fridayRoute) {
                setFridayRouteError("La ruta del viernes es requerida.");
                valid = false;
            } else {
                setFridayRouteError("");
            }

            // Validación para la ruta del sábado
            if (!saturdayRoute) {
                setSaturdayRouteError("La ruta del sábado es requerida.");
                valid = false;
            } else {
                setSaturdayRouteError("");
            }

            // Validación para la ruta del domingo
            if (!sundayRoute) {
                setSundayRouteError("La ruta del domingo es requerida.");
                valid = false;
            } else {
                setSundayRouteError("");
            }
        }

        return valid;
    };

    //Enviar la data para guardar en BD
    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        // Validar los campos antes de continuar
        if (!validateSaveData()) return;

        // setIsLoading(true);

        const currentDate = moment().format();

        // Estructura Data
        const updatedData = {
            ...data,
            ImageProfile: selectedImage,
            createdDate: currentDate,
            routeApplicable: routeApplicable,
            selectedArea: selectedArea,
            selectedHeadquarter: selectedHeadquarter,
            switch_activateCard: employeeCardStatus,
            isGPSActive: employeeStatusGPS,
            mondayRoute: mondayRoute,
            tuesdayRoute: tuesdayRoute,
            wednesdayRoute: wednesdayRoute,
            thursdayRoute: thursdayRoute,
            fridayRoute: fridayRoute,
            saturdayRoute: saturdayRoute,
            sundayRoute: sundayRoute,
        };

        const dataToSendOnEmail = {
            name: updatedData?.firstName[0],
            lastName: updatedData?.lastName[0],
            email: updatedData?.emails?.[0]?.text.trim().toLowerCase(),
            id: updatedData?.documentNumber[0].trim(),
        };

        Swal.fire({
            position: "center",
            title: `Guardando...`,
            text: "Por favor espera",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const email = updatedData?.emails?.[0]?.text.trim().toLowerCase();
            const password = updatedData?.documentNumber[0].trim();
            const documentRefUser: any = getDocumentReference("users");

            if (userData?.companyId) {
                //console.log("data", email, password, documentRefUser, accessTokenUser)
                const res = await addUser({
                    email: email || "",
                    password: password,
                    accessTokenUser,
                    uid: documentRefUser.id,
                });

                if (res?.success === false) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al registrar usuario",
                        text: `La dirección de correo electrónico ya está siendo utilizada por otra cuenta`,
                        timer: 6000,
                    });
                    return;
                }

                const combinedData = {
                    ...updatedData,
                    uid: documentRefUser.id,
                    idCompany: userData?.companyId,
                };

                const employeeQueryResult = await saveEmployeeQuery(
                    combinedData,
                );

                if (employeeQueryResult.success) {
                    await addUserUrls(selectedArea, documentRefUser.id)
                    await addUrlsCompany(userData?.companyId, documentRefUser.id)
                    Swal.fire({
                        icon: "success",
                        title: "Usuario creado",
                        text: "El usuario ha sido registrado exitosamente.",
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    //console.log("Usuario guardado con éxito");
                    // Enviar correo de bienvenida
                    await handleSendWelcomeEmail(dataToSendOnEmail);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al registrar usuario",
                        text: `No se pudo registrar el usuario: ${employeeQueryResult.message}`,
                        timer: 2500,
                    });
                    console.error(
                        "Error al guardar usuario:",
                        employeeQueryResult.message,
                    );
                }
            } else {
                // console.log(
                //     "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                // );
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            // setIsLoading(false);
            Swal.hideLoading();
            handleClose();
        }
    };

    const handleEditForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();

        // Validar los campos antes de continuar
        if (!validateSaveData()) return;
        // setIsLoading(true);

        // Actualiza el objeto data
        const updatedData = {
            ...data,
            ImageProfile: selectedImage,
            mondayRoute: mondayRoute,
            tuesdayRoute: tuesdayRoute,
            wednesdayRoute: wednesdayRoute,
            thursdayRoute: thursdayRoute,
            fridayRoute: fridayRoute,
            saturdayRoute: saturdayRoute,
            sundayRoute: sundayRoute,
            routeApplicable: routeApplicable,
            selectedArea: selectedArea,
            selectedHeadquarter: selectedHeadquarter,
            switch_activateCard: employeeCardStatus,
            isGPSActive: employeeStatusGPS,
            //employeeCardStatus: employeeCardStatus,
        };

        Swal.fire({
            position: "center",
            title: `Guardando...`,
            text: "Por favor espera",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            if (userData?.companyId) {
                const formData = {
                    ...updatedData,
                    idCompany: userData?.companyId,
                };
                const employeeQueryResult = await editEmployeeQuery(
                    formData,
                    idRow,
                );

                if (employeeQueryResult.success) {
                    await addUserUrls(selectedArea, idRow)
                    Swal.fire({
                        icon: "success",
                        title: "Empleado actualizado",
                        text: "El empleado ha sido actualizado exitosamente.",
                        showConfirmButton: false,
                        timer: 2500,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al actualizar",
                        text: `No se pudo actualizar el empleado: ${employeeQueryResult.message}`,
                        timer: 2500,
                    });
                    console.error(
                        "Error al actualizar el empleado:",
                        employeeQueryResult.message,
                    );
                }
            } else {
                // console.log(
                //     "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                // );
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            // setIsLoading(false);
            Swal.hideLoading();
            handleClose();
        }
    };

    const handleClose = () => {
        handleReset();
        setShow(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        setStep(1);
        setIsEdit(false);
    };

    const handleReset = () => {
        setData(initialData);
        setSelectedImage(null);
        setMondayRoute("");
        setTuesdayRoute("");
        setWednesdayRoute("");
        setThursdayRoute("");
        setFridayRoute("");
        setSaturdayRoute("");
        setSundayRoute("");
        setRouteApplicable(false);
        setSelectedArea("");
        setSelectedHeadquarter("");
        // Restablece los errores de validación de cada campo
        setErrors(initialErrors);
        setSelectedAreaError("");
        setSelectedHeadquarterError("");
        setRouteApplicableError("");
        setMondayRouteError("");
        setTuesdayRouteError("");
        setWednesdayRouteError("");
        setThursdayRouteError("");
        setFridayRouteError("");
        setSaturdayRouteError("");
        setSundayRouteError("");
        setEmployeeCardStatusError("");
    };

    const getDataEmployee = async (editData: any) => {
        setData(editData);
    };

    // Función para manejar el cambio de selección
    const handleChangeSelect = (
        day: string,
        event: SelectChangeEvent<unknown>,
    ) => {
        const newValue = event.target.value;
        switch (day) {
            case "monday":
                setMondayRoute(newValue as string);
                break;
            case "tuesday":
                setTuesdayRoute(newValue as string);
                break;
            case "wednesday":
                setWednesdayRoute(newValue as string);
                break;
            case "thursday":
                setThursdayRoute(newValue as string);
                break;
            case "friday":
                setFridayRoute(newValue as string);
                break;
            case "saturday":
                setSaturdayRoute(newValue as string);
                break;
            case "sunday":
                setSundayRoute(newValue as string);
                break;
            default:
                break;
        }
    };

    // Función para manejar el cambio en el RadioGroup
    const handleRouteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isApplicable = value === "true";
        setRouteApplicable(isApplicable);
    };

    // Función para manejar el cambio en el CustomSelect
    const handleAreaChange = (event: any) => {
        setSelectedArea(event.target.value);
    };

    // Función para manejar el cambio en el CustomSelect
    const handleHeadquartersChange = (event: any) => {
        setSelectedHeadquarter(event.target.value);
    };

    const getRouteData = async () => {
        if (userData?.companyId) {
            const defaultOption = {
                routeName: "N/A",
                uid: "default"
            }
            const dataRoutes = await getRoutesByCompanyIdQuery(
                userData.companyId,
            );
            const dataAreas = await getAreasByCompanyIdQuery(
                userData.companyId,
            );
            const dataHeadquarters = await getHeadquartersByCompanyIdQuery(
                userData.companyId,
            );
            dataRoutes.sort((a: any, b: any) => a.routeName.localeCompare(b.routeName));
            dataAreas.sort((a: any, b: any) => a.areaName.localeCompare(b.areaName));
            dataHeadquarters.sort((a: any, b: any) => a.name[0].localeCompare(b.name[0]));
            dataRoutes.unshift(defaultOption)
            setHeadquartersData(dataHeadquarters);
            setRouteData(dataRoutes);
            setAreaData(dataAreas);
        }
    };

    const addUserUrls = async (selectAreaUid: string, userUid: string) => {
        const dataArea = await getWorkAreaByUidQuery(selectAreaUid)

        // Filtrar solo las propiedades que comienzan con "urlName"
        const urlsDataArea = Object.fromEntries(
            Object.entries(dataArea[0]).filter(([key, value]) => key.startsWith("urlName"))
        );

        // Recorrer cada urlName, urlName2, ..., urlNameN
        for (const [key, value] of Object.entries(urlsDataArea)) {
            if (Array.isArray(value) && typeof value[2] === 'object') {
                const userObjects = value[2];

                // Verificar si el usuario ya existe en la propiedad
                if (!userObjects[userUid]) {
                    // Si no existe, agregar el usuario con las propiedades deseadas
                    userObjects[userUid] = {
                        isActive: true,
                        uid: userUid,
                        views: []
                    };
                }
            }
        }
        await editAreaQuery(urlsDataArea, selectAreaUid);
    }

    const addUrlsCompany = async (selectCompanieUid: string, userUid: string) => {
        const dataCompany = await getCompaniesByUidQuery(selectCompanieUid)

        // Filtrar solo las propiedades que comienzan con "urlName"
        //console.log("DATA", userUid, selectCompanieUid);
        //console.log("compañia", dataCompany)
        const urlsCompanyData = Object.fromEntries(
            Object.entries(dataCompany[0]).filter(([key, value]) => key.startsWith("urlName"))
        );
        //console.log("url",urlsCompanyData)

        // Recorrer cada urlName, urlName2, ..., urlNameN
        for (const [key, value] of Object.entries(urlsCompanyData)) {
            if (Array.isArray(value) && typeof value[2] === 'object') {
                const userObjects = value[2];

                // Verificar si el usuario ya existe en la propiedad
                if (!userObjects[userUid]) {
                    // Si no existe, agregar el usuario con las propiedades deseadas
                    userObjects[userUid] = {
                        isActive: true,
                        uid: userUid,
                        views: []
                    };
                }
            }
        }
        await editCompanyQuery(urlsCompanyData, selectCompanieUid);
    }

    useEffect(() => {
        getRouteData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
        getRouteData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit && (
            setShow(true),
            setIdRow(editData?.uid),
            //Paso 1
            getDataEmployee(editData),
            setSelectedImage(editData?.ImageProfile),
            //Paso 2
            setSelectedArea(editData?.selectedArea || ""),
            setSelectedHeadquarter(editData?.selectedHeadquarter || ""),
            setRouteApplicable(editData?.routeApplicable || false),
            setMondayRoute(editData?.mondayRoute || "default"),
            setTuesdayRoute(editData?.tuesdayRoute || "default"),
            setWednesdayRoute(editData?.wednesdayRoute || "default"),
            setThursdayRoute(editData?.thursdayRoute || "default"),
            setFridayRoute(editData?.fridayRoute || "default"),
            setSaturdayRoute(editData?.saturdayRoute || "default"),
            setSundayRoute(editData?.sundayRoute || "default"),
            setEmployeeStatusGPS(editData?.isGPSActive || false),
            setEmployeeCardStatus(editData?.switch_activateCard || false)
        );
        getRouteData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        dataForm: data,
        // isLoading,
        isEdit,
        handleSendForm,
        handleClose,
        allChecked,
        handleChange,
        handleAddData,
        handleReset,
        handleChangeItem,
        step,
        employeeCardStatus,
        employeeStatusGPS,
        handleChangeSwitch,
        handleChangeSwitch2,
        routeData,
        areaData,
        mondayRoute,
        tuesdayRoute,
        wednesdayRoute,
        thursdayRoute,
        fridayRoute,
        saturdayRoute,
        sundayRoute,
        handleChangeSelect,
        handleRouteChange,
        routeApplicable,
        selectedArea,
        handleAreaChange,
        headquartersData,
        selectedHeadquarter,
        handleHeadquartersChange,
        handleEditForm,
        handleFileChange,
        selectedImage,
        setStep,
        handleChangeMiuTel,
        handleDeleteItem,
        errors,
        handleChangeStep,
        selectedAreaError,
        selectedHeadquarterError,
        routeApplicableError,
        mondayRouteError,
        tuesdayRouteError,
        wednesdayRouteError,
        thursdayRouteError,
        fridayRouteError,
        saturdayRouteError,
        sundayRouteError,
        employeeCardStatusError,
        handleChangeItemAditional,
    };
};

export default EmployeesFormHook;
