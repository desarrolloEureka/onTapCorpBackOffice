"use client";
import useAuth from "@/firebase/auth";
import {
    getAreasByCompanyIdQuery,
    getHeadquartersByCompanyIdQuery,
    getRoutesByCompanyIdQuery,
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import {
    DataAdditional,
    DataEmail,
    DataPhone,
    FormValues,
    FormValuesData,
} from "@/types/user";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

const EmployeesFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
}: ModalParamsMainForm) => {
    const initialPhones: FormValues = {
        phones: [{ text: "", checked: false }],
    };

    const initialEmails: FormValues = {
        emails: [{ text: "", checked: false }],
    };

    const initialAdditional: FormValues = {
        dataAdditional: [{ autodato: "", dato: "", checked: false }],
    };

    const initialData: FormValuesData = {
        firstName: "",
        lastName: "",
        documentNumber: "",
        dateOfBirth: "",
        position: "",
        phones: [{ text: "", checked: false }],
        emails: [{ text: "", checked: false }],
        additional: [{ autodato: "", dato: "", checked: false }],
        ImageProfile: null,
        mondayRoute: "",
        tuesdayRoute: "",
        wednesdayRoute: "",
        thursdayRoute: "",
        fridayRoute: "",
        saturdayRoute: "",
        sundayRoute: "",
        routeApplicable: false,
        selectedArea: "",
        selectedHeadquarter: "",
        employeeCardStatus: false,
    };
    const { userData } = useAuth();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // Datos
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [data, setData] = useState<FormValuesData>(initialData);
    const [phones, setPhones] = useState<FormValues>(initialPhones);
    const [emails, setEmails] = useState<FormValues>(initialEmails);
    const [additional, setAdditional] = useState<FormValues>(initialAdditional);
    const [allChecked, setAllChecked] = useState<string>("none");
    const [step, setStep] = useState(1);

    //Datos Paso 2
    const [selectedArea, setSelectedArea] = useState("");

    const [selectedHeadquarter, setSelectedHeadquarter] = useState("");

    //const [routeApplicable, setRouteApplicable] = useState('');
    const [routeApplicable, setRouteApplicable] = useState<boolean>(false); // Estado booleano

    const [mondayRoute, setMondayRoute] = useState("");
    const [tuesdayRoute, setTuesdayRoute] = useState("");
    const [wednesdayRoute, setWednesdayRoute] = useState("");
    const [thursdayRoute, setThursdayRoute] = useState("");
    const [fridayRoute, setFridayRoute] = useState("");
    const [saturdayRoute, setSaturdayRoute] = useState("");
    const [sundayRoute, setSundayRoute] = useState("");

    const [employeeCardStatus, setEmployeeCardStatus] = useState(false);

    //
    const [headquartersData, setHeadquartersData] = useState<any[] | null>(
        null,
    );
    const [areaData, setAreaData] = useState<any[] | null>(null);
    const [routeData, setRouteData] = useState<any[] | null>(null);

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const handleAddData = (type: "phone" | "email" | "additional") => {
        setData((prevData) => {
            const maxItems = 3;
            let newData = { ...prevData };

            if (type === "phone") {
                if ((prevData.phones || []).length < maxItems) {
                    const updatedPhones: DataPhone[] = [
                        ...(prevData.phones || []),
                        { text: "", checked: false },
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
                if ((prevData.additional || []).length < maxItems) {
                    const updatedAdditional: DataAdditional[] = [
                        ...(prevData.additional || []),
                        { autodato: "", dato: "", checked: false },
                    ];
                    newData = { ...newData, additional: updatedAdditional };
                }
            }

            return newData;
        });
    };

    const handleChangeItem = (
        field: keyof FormValuesData,
        index: number,
        key: string,
        value: string | boolean,
    ) => {
        setData((prevData) => {
            const fieldArray = prevData[field] as any[];
            if (fieldArray && fieldArray[index]) {
                const updatedFieldArray = [...fieldArray];
                updatedFieldArray[index] = {
                    ...updatedFieldArray[index],
                    [key]: value,
                };

                return {
                    ...prevData,
                    [field]: updatedFieldArray,
                };
            }
            return prevData;
        });
    };

    const handleChange = (value: string, name: string, isChecked?: boolean) => {
        if (isChecked === undefined) {
            setData({ ...data, [name]: (value || "-") ?? "-" });
        } else {
            setData({ ...data, [name]: [(value || "") ?? "", !isChecked] });
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
                            resolve(resizedFile); // Aquí aseguramos que estamos devolviendo un File
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
        console.log();
        if (file && file instanceof File) {
            try {
                const resizedImage = await resizeImage(file, 750, 750);
                const base64String = await convertFileToBase64(resizedImage);

                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
            } catch (error) {
                console.error("Error handling the image:", error);
            }
        }
    };

    const handleChangeSwitch = () => {};

    const handleSendForm = async (e?: any) => {};

    const handleEditForm = async (e?: any) => {
        setStep(2);
        e.preventDefault();
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
        setPhones(initialPhones);
        setEmails(initialEmails);
        setAdditional(initialAdditional);
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
    };

    const getDataEmployee = async (editData: any) => {
        setData(editData);
    };

    const handleChangeSelect = () => {};

    const handleRouteChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {};

    const handleAreaChange = (event: any) => {};

    const handleHeadquartersChange = (event: any) => {};

    const getRouteData = async () => {
        if (userData?.companyId) {
            const dataRoutes = await getRoutesByCompanyIdQuery(
                userData.companyId,
            );
            const dataAreas = await getAreasByCompanyIdQuery(
                userData.companyId,
            );
            const dataHeadquarters = await getHeadquartersByCompanyIdQuery(
                userData.companyId,
            );
            setHeadquartersData(dataHeadquarters);
            setRouteData(dataRoutes);
            setAreaData(dataAreas);
        }
    };

    useEffect(() => {
        getRouteData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit && (setShow(true), getDataEmployee(editData));
    }, [editData, handleShowMainFormEdit]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        dataForm: data,
        isLoading,
        isEdit,
        handleSendForm,
        handleClose,
        allChecked,
        handleChange,
        phones,
        handleAddData,
        emails,
        additional,
        handleReset,
        handleChangeItem,
        step,
        employeeCardStatus,
        theme: themeParsed?.dataThemeMode,
        handleChangeSwitch,
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
    };
};

export default EmployeesFormHook;
