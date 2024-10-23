"use client";
import { getStateName } from "@/data/formConstant";
import {
    dataAdminCompanyObject,
    dataAgreementsObject,
    dataCompanyObject,
    dataDiagnosesObject,
    dataDiagnosticianObject,
    dataFunctionaryObject,
    dataMainFormObject,
    dataPatientObject,
    dataProfessionalObject,
    dataSpecialtyObject,
    dataWorkAreasObject,
} from "@/data/mainFormData";
import useAuth from "@/firebase/auth";
import { addUser } from "@/firebase/user";
import {
    getAllDocumentsQuery,
    getDocumentReference,
    saveDataDocumentsQuery,
    saveEditDataDocumentsQuery,
    saveFilesDocuments,
    saveIconFile,
} from "@/queries/documentsQueries";
import { getCoordinates } from "@/queries/GeoMapsQueries";
import { getAllRolesQuery } from "@/queries/RolesQueries";
import { getAllSpecialtiesQuery } from "@/queries/SpecialtiesQueries";
import { ErrorDataForm } from "@/types/documents";
import { LocalVariable } from "@/types/global";
import { Coords } from "@/types/googleMaps";
import { ModalParamsMainForm } from "@/types/modals";
import { RolesSelector } from "@/types/roles";
import { SpecialtySelector } from "@/types/specialty";
import { handleSendWelcomeEmail } from "lib/brevo/handlers/actions";
import _ from "lodash";
import {
    ChangeEvent,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import Swal from "sweetalert2";

const MainFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
}: ModalParamsMainForm) => {
    const { accessTokenUser, userData } = useAuth();

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState(dataMainFormObject);
    const [errorValid, setErrorValid] = useState("");
    const [errorForm, setErrorForm] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [itemExist, setItemExist] = useState(false);
    const [nextStep, setNextStep] = useState(true);
    const [files, setFiles] = useState<File[]>([]);
    const [fileNameIcon, setFileNameIcon] = useState<any>();
    const [fileNamePhoto, setFileNamePhoto] = useState<any>();
    const [iconFile, setIconFile] = useState<any>();
    const [specialties, setSpecialties] = useState<SpecialtySelector[]>();
    const [roles, setRoles] = useState<RolesSelector[]>();
    const [diagnostician, setDiagnostician] = useState<any[]>();
    const [adminUsers, setAdminUsers] = useState<any[]>();

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const handleEditForm = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEdit(true);
    };

    const saveAlert = async (callbackFc: () => Promise<any>) => {
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
            await callbackFc();

            Swal.fire({
                position: "center",
                icon: "success",
                title: `Se guardó correctamente en la tabla de ${title}`,
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Ocurrió un error ${error}`,
                confirmButtonColor: "#1f2937",
                confirmButtonText: "Aceptar",
            });
        } finally {
            Swal.hideLoading();
        }
    };

    const findValue = (item: any, dataValue: any) => item.value === dataValue;

    const handleChange = (
        value: string | boolean,
        name: string,
        isChecked?: boolean,
    ) => {
        // Actualiza el campo "isActive" convirtiendo el valor a booleano.
        if (name === "isActive") {
            setData((prevData) => ({
                ...prevData,
                [name]: value as boolean,
            }));
            return;
        }

        // Si `isChecked` está definido, actualiza como un array con el valor y su opuesto.
        if (typeof isChecked !== "undefined") {
            setData((prevData) => ({
                ...prevData,
                [name]: [value, !isChecked],
            }));
            return;
        }

        // Por defecto, actualiza el valor normalmente.
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMultipleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFiles([file]);
            setFileNamePhoto(event.target.files[0].name);
        } else {
            setFiles([]);
            setFileNamePhoto(null);
        }
    };
    const handleIconFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIconFile(e.target.files[0]);
            setFileNameIcon(e.target.files[0].name);
        } else {
            setIconFile(null);
            setFileNameIcon(null);
        }
    };

    const uploadHandle = async () => {
        let newData: any;
        const error: ErrorDataForm[] = [];
        const documentRef: any = getDocumentReference(reference);
        const documentRefUser: any = getDocumentReference("users");

        if (reference === "functionary") {
            const currentDataObject = { ...dataFunctionaryObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.idType = data.idType;
            currentDataObject.id = data.id;
            currentDataObject.name = data.name;
            currentDataObject.lastName = data.lastName;
            currentDataObject.phone = data.phone;
            currentDataObject.email = data.email;
            currentDataObject.phone2 = data.phone2;
            currentDataObject.address = data.address;
            currentDataObject.country = data.country;
            currentDataObject.state = data.state;
            currentDataObject.city = data.city;
            currentDataObject.rol = data.rol;
            // currentDataObject.password = data.password;
            // currentDataObject.confirmPassword = data.confirmPassword;
            currentDataObject.area = data.area;
            currentDataObject.isActive = data.isActive;

            for (const record of files) {
                const urlName = record.name.split(".")[0];
                await saveFilesDocuments({
                    urlName,
                    record,
                    uid: handleShowMainFormEdit ? data.uid : documentRef.id,
                    reference,
                })
                    .then((result) => {
                        currentDataObject.urlPhoto = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        error.push({ success: false, urlName });
                        // console.log(error);
                    });
            }

            newData = { ...currentDataObject };
        }

        if (reference === "patients") {
            const currentDataObject = { ...dataPatientObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.idType = data.idType;
            currentDataObject.id = data.id;
            currentDataObject.name = data.name;
            currentDataObject.lastName = data.lastName;
            currentDataObject.birthDate = data.birthDate;
            currentDataObject.age = data.age;
            currentDataObject.phone = data.phone;
            currentDataObject.phone2 = data.phone2;
            currentDataObject.address = data.address;
            currentDataObject.country = data.country;
            currentDataObject.state = data.state;
            currentDataObject.city = data.city;
            currentDataObject.email = data.email;
            // currentDataObject.password = data.password;
            // currentDataObject.confirmPassword = data.confirmPassword;
            currentDataObject.isActive = data.isActive;

            for (const record of files) {
                const urlName = record.name.split(".")[0];
                await saveFilesDocuments({
                    urlName,
                    record,
                    uid: handleShowMainFormEdit ? data.uid : documentRef.id,
                    reference,
                })
                    .then((result) => {
                        currentDataObject.urlPhoto = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        error.push({ success: false, urlName });
                        // console.log(error);
                    });
            }

            newData = { ...currentDataObject };
        }

        if (reference === "professionals") {
            const currentDataObject = { ...dataProfessionalObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.idType = data.idType;
            currentDataObject.id = data.id;
            currentDataObject.name = data.name;
            currentDataObject.lastName = data.lastName;
            currentDataObject.phone = data.phone;
            currentDataObject.phone2 = data.phone2;
            currentDataObject.address = data.address;
            currentDataObject.country = data.country;
            currentDataObject.state = data.state;
            currentDataObject.city = data.city;
            currentDataObject.email = data.email;
            // currentDataObject.password = data.password;
            // currentDataObject.confirmPassword = data.confirmPassword;
            currentDataObject.specialty = data.specialty;
            currentDataObject.contract = data.contract;
            currentDataObject.isActive = data.isActive;
            currentDataObject.urlPhoto = data.urlPhoto;

            for (const record of files) {
                const urlName = record.name.split(".")[0];
                await saveFilesDocuments({
                    urlName,
                    record,
                    uid: handleShowMainFormEdit ? data.uid : documentRef.id,
                    reference,
                })
                    .then((result) => {
                        currentDataObject.urlPhoto = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        error.push({ success: false, urlName });
                        // console.log(error);
                    });
            }

            newData = { ...currentDataObject };
        }

        if (reference === "specialties") {
            const currentDataObject = { ...dataSpecialtyObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.name = data.name;
            currentDataObject.description = data.description;
            currentDataObject.icon = data.icon;
            currentDataObject.isActive = data.isActive;

            newData = { ...currentDataObject };
        }

        if (reference === "diagnoses") {
            const currentDataObject = { ...dataDiagnosesObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.name = data.name;
            currentDataObject.code = data.code;
            currentDataObject.isActive = data.isActive;

            newData = { ...currentDataObject };
        }

        if (reference === "diagnostician") {
            const currentDataObject = { ...dataDiagnosticianObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.idType = data.idType;
            currentDataObject.id = data.id;
            currentDataObject.name = data.name;
            currentDataObject.rut = data.rut;
            currentDataObject.phone = data.phone;
            currentDataObject.phone2 = data.phone2;
            currentDataObject.email = data.email;
            currentDataObject.address = data.address;
            currentDataObject.country = data.country;
            currentDataObject.state = data.state;
            currentDataObject.city = data.city;
            currentDataObject.isActive = data.isActive;

            newData = { ...currentDataObject };
        }

        if (reference === "agreements") {
            const currentDataObject = { ...dataAgreementsObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.name = data.name;
            currentDataObject.personType = data.personType;
            currentDataObject.discount = data.discount;
            currentDataObject.isActive = data.isActive;

            newData = { ...currentDataObject };
        }

        if (reference === "workAreas") {
            const currentDataObject = { ...dataWorkAreasObject };

            handleShowMainFormEdit
                ? (currentDataObject.uid = data.uid)
                : (currentDataObject.uid = documentRef.id);
            currentDataObject.areaName = data.areaName;
            currentDataObject.areaHead = data.areaHead;
            currentDataObject.urlName = data.urlName;
            currentDataObject.urlLink = data.urlLink;
            currentDataObject.isActive = data.isActive;
            userData && (currentDataObject.companyId = userData.companyId);

            if (iconFile) {
                const urlName = iconFile.name.split(".")[0];
                await saveIconFile({
                    urlName,
                    record: iconFile,
                    uid: handleShowMainFormEdit ? data.uid : documentRef.id,
                    reference,
                })
                    .then((result) => {
                        currentDataObject.icon = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        error.push({ success: false, urlName });
                        // console.log(error);
                    });
            }

            newData = { ...currentDataObject };
        }

        if (reference === "companies") {
            const currentDataObjectCompany = { ...dataCompanyObject };
            const currentDataObjectAdmin = { ...dataAdminCompanyObject };

            const formattedAddress: string = `${data.city}, ${getStateName(
                data.state,
            )},${data.country}`;

            const coords = await getCoordinates(formattedAddress);

            handleShowMainFormEdit
                ? ((currentDataObjectCompany.uid = data.uid),
                  (currentDataObjectAdmin.uid = data.adminId),
                  (currentDataObjectCompany.adminId = data.adminId),
                  (currentDataObjectAdmin.companyId = data.companyId),
                  (currentDataObjectCompany.icon = data.icon),
                  (currentDataObjectAdmin.urlPhoto = data.urlPhoto))
                : ((currentDataObjectCompany.uid = documentRef.id),
                  (currentDataObjectCompany.adminId = documentRefUser.id),
                  (currentDataObjectAdmin.uid = documentRefUser.id),
                  (currentDataObjectAdmin.companyId = documentRef.id));

            currentDataObjectCompany.idType = data.idType;
            currentDataObjectCompany.id = data.id;
            currentDataObjectCompany.businessName = data.businessName;
            currentDataObjectCompany.tradename = data.tradename;
            currentDataObjectCompany.cards = data.cards;
            currentDataObjectCompany.cardGPS = data.cardGPS;
            currentDataObjectCompany.address = data.address;
            currentDataObjectCompany.indicative = data.indicative;
            currentDataObjectCompany.phone = data.phone;
            currentDataObjectCompany.ext = data.ext;
            currentDataObjectCompany.webSite = data.webSite;
            currentDataObjectCompany.sector = data.sector;
            currentDataObjectCompany.geolocation = coords as Coords;
            currentDataObjectCompany.country = data.country;
            currentDataObjectCompany.state = data.state;
            currentDataObjectCompany.city = data.city;

            currentDataObjectCompany.isActive = data.isActive;

            currentDataObjectAdmin.idTypeAdmin = data.idTypeAdmin;
            currentDataObjectAdmin.idAdmin = data.idAdmin;
            currentDataObjectAdmin.name = data.name;
            currentDataObjectAdmin.lastName = data.lastName;
            currentDataObjectAdmin.email = data.email;
            currentDataObjectAdmin.indicativeTwo = data.indicativeTwo;
            currentDataObjectAdmin.phoneAdmin = data.phoneAdmin;

            for (const record of files) {
                const urlName = record.name.split(".")[0];
                await saveFilesDocuments({
                    urlName,
                    record,
                    uid: handleShowMainFormEdit ? data.uid : documentRef.id,
                    reference: "users",
                })
                    .then((result) => {
                        currentDataObjectAdmin.urlPhoto = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        error.push({ success: false, urlName });
                        // console.log(error);
                    });
            }

            if (iconFile) {
                const urlName = iconFile.name.split(".")[0];
                await saveIconFile({
                    urlName,
                    record: iconFile,
                    uid: handleShowMainFormEdit ? data.uid : documentRef.id,
                    reference,
                })
                    .then((result) => {
                        currentDataObjectCompany.icon = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        error.push({ success: false, urlName });
                        // console.log(error);
                    });
            }

            const company = {
                ...currentDataObjectCompany,
                idType: [currentDataObjectCompany.idType, true],
                id: [currentDataObjectCompany.id, true],
                businessName: [currentDataObjectCompany.businessName, true],
                tradename: [currentDataObjectCompany.tradename, true],
                address: [currentDataObjectCompany.address, true],
                // indicativeOne: [currentDataObjectCompany.indicativeOne, ""],
                phone: [currentDataObjectCompany.phone, true],
                // ext: [currentDataObjectCompany.ext, true],
                webSite: [currentDataObjectCompany.webSite, true],
                sector: [currentDataObjectCompany.sector, true],
                country: [currentDataObjectCompany.country, true],
                state: [currentDataObjectCompany.state, true],
                city: [currentDataObjectCompany.city, true],
                icon: [currentDataObjectCompany.icon, true],
            };

            newData = {
                company,
                admin: { ...currentDataObjectAdmin },
            };
        }

        // console.log("newData", newData, "data");
        // console.log("reference", reference);

        // Función auxiliar para guardar datos del administrador y la compañía
        const saveCompanyData = async (
            data: any,
            newData: any,
            reference: string,
        ) => {
            // Guardar datos del administrador
            await saveEditDataDocumentsQuery({
                id: data.adminId,
                data: newData.admin,
                reference: "users",
            });

            // Guardar datos de la compañía
            await saveEditDataDocumentsQuery({
                id: data.uid,
                data: newData.company,
                reference,
            });
        };

        // Función auxiliar para agregar un usuario y guardar los datos correspondientes
        const addCompanyUserAndData = async (
            data: any,
            newData: any,
            documentRefUser: any,
            documentRef: any,
            accessTokenUser: string,
        ) => {
            // Agrega nuevo usuario
            await addUser({
                email: data.email,
                password: data.id,
                accessTokenUser,
                uid: documentRefUser.id,
            });

            // Guardar datos del usuario
            await saveDataDocumentsQuery({
                documentRef: documentRefUser,
                data: newData.admin,
            });

            // Guardar datos de la compañía
            await saveDataDocumentsQuery({
                documentRef,
                data: {
                    ...newData.company,
                    adminId: documentRefUser.id,
                },
            });

            // Enviar correo de bienvenida
            await handleSendWelcomeEmail(data);
        };

        // Lógica principal
        if (handleShowMainFormEdit) {
            if (reference === "companies") {
                await saveCompanyData(data, newData, reference);
            } else {
                await saveEditDataDocumentsQuery({
                    id: data.uid,
                    data: newData,
                    reference,
                });
            }
        } else {
            if (reference === "companies") {
                await addCompanyUserAndData(
                    data,
                    newData,
                    documentRefUser,
                    documentRef,
                    accessTokenUser,
                );
            } else {
                await saveDataDocumentsQuery({
                    documentRef,
                    data: newData,
                });
            }
        }

        return [...error];
    };

    const functionaryVal =
        reference === "functionary" &&
        data.idType &&
        data.id &&
        data.name &&
        data.lastName &&
        data.phone &&
        data.email &&
        data.rol &&
        // data.password &&
        // data.confirmPassword &&
        data.area;

    const diagnosticianVal =
        reference === "diagnostician" &&
        data.idType &&
        data.id &&
        data.name &&
        data.rut &&
        data.phone &&
        !itemExist &&
        data.email;

    const companyVal =
        reference === "companies" &&
        data.idType &&
        data.id &&
        data.businessName &&
        data.cards &&
        data.cardGPS &&
        parseInt(data.cards) >= parseInt(data.cardGPS) &&
        data.country &&
        data.state &&
        data.city;

    const companyAdminVal =
        reference === "companies" &&
        // data.idTypeAdmin &&
        // data.idAdmin &&
        data.name &&
        data.lastName &&
        data.email;

    const agreementsVal =
        reference === "agreements" && data.name && data.personType;

    const diagnosesVal = reference === "diagnoses" && data.name && data.code;

    const workAreasVal =
        reference === "workAreas" &&
        data.areaName &&
        data.urlName &&
        data.areaHead &&
        data.urlLink;

    const specialtyVal =
        !itemExist && reference === "specialties" && data.name.length > 1;

    const professionalsVal =
        reference === "professionals" &&
        data.idType &&
        data.id &&
        data.name &&
        data.lastName &&
        data.phone &&
        data.email;
    // data.password &&
    // data.confirmPassword;

    const patientVal =
        reference === "patients" &&
        data.idType &&
        data.id &&
        data.name &&
        data.lastName &&
        // data.birthDate &&
        // data.age &&
        data.phone &&
        data.email;
    // data.password &&
    // data.confirmPassword;

    const passValidation = handleShowMainFormEdit
        ? data.confirmPassword === data.password
        : data.confirmPassword === data.password &&
          data.password &&
          data.confirmPassword;

    // console.log("data", data);
    // console.log("editData", editData);

    const handleSendForm = async (e?: any) => {
        // console.log(data);
        if (
            workAreasVal ||
            companyVal ||
            companyAdminVal ||
            specialtyVal ||
            diagnosticianVal ||
            diagnosesVal ||
            agreementsVal ||
            ((functionaryVal || professionalsVal || patientVal) &&
                passValidation)
        ) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Entró");
            saveAlert(uploadHandle).then(handleClose);
        } else {
            e.preventDefault();
            e.stopPropagation();
            // setErrorForm(true);
            (reference === "functionary" ||
                reference === "professionals" ||
                reference === "patients") &&
                !passValidation &&
                setErrorPass(true);
            console.log("Falló");
            reference === "diagnostician" &&
                itemExist &&
                setErrorValid(
                    `¡Ya existe un usuario con ese documento: -> ${data.id}!`,
                );
            (reference === "areas" || reference === "specialties") &&
                itemExist &&
                setErrorValid(
                    `¡Ya existe un registro con ese nombre: -> ${data.name}!`,
                );
        }
    };

    const handleClose = () => {
        setData(dataMainFormObject);
        setShow(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        setErrorValid("");
        setIsLoading(false);
        setIsEdit(false);
        // setUrlPhoto("");
        clearSelectFields();
        setItemExist(false);
        setNextStep(true);
    };

    const clearSelectFields = () => {
        setData(dataMainFormObject);
    };

    const handleReset = (e: any) => {
        e.target.reset();
    };

    const handleGetBirthDate = (e: any) => {
        // setSelectedAge(e.target.value);
    };

    const getAdminAndCompanyData: any = useCallback(() => {
        const adminData = adminUsers?.find(
            (user) => user.uid === editData?.adminId,
            // adminUsers,
        );

        const newEditDataObj = {
            ...editData,
            address: editData?.address[0],
            state: _.isNumber(editData?.state[0])
                ? editData?.state[0]
                : parseInt(editData?.state[0]),
            country: editData?.country[0],
            idType: editData?.idType[0],
            id: editData?.id[0],
            businessName: editData?.businessName[0],
            tradename: editData?.tradename[0],
            // indicative: editData?.indicative,
            phone: editData?.phone[0],
            // ext: editData?.ext[0],
            webSite: editData?.webSite[0],
            sector: editData?.sector[0],
            city: editData?.city[0],
            icon: editData?.icon[0],
        };

        // console.log({ ...newEditDataObj, ..._.omit(adminData, "uid") });

        return { ...newEditDataObj, ..._.omit(adminData, "uid") };
    }, [adminUsers, editData]);

    const getAllSelectOptions = useCallback(async () => {
        if (handleShowMainForm || handleShowMainFormEdit) {
            const specialtyResult = await getAllSpecialtiesQuery();
            specialtyResult && setSpecialties(specialtyResult);

            const rolesResult = await getAllRolesQuery();
            rolesResult && setRoles(rolesResult);

            const diagnosticianResult = await getAllDocumentsQuery(
                "diagnostician",
            );
            diagnosticianResult && setDiagnostician(diagnosticianResult);

            const usersResult = await getAllDocumentsQuery("users");
            usersResult && setAdminUsers(usersResult);
        }
    }, [handleShowMainForm, handleShowMainFormEdit]);

    useEffect(() => {
        getAllSelectOptions();
    }, [getAllSelectOptions]);

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        if (handleShowMainFormEdit) {
            setShow(true);
            if (reference === "companies") {
                const allCompanyData = getAdminAndCompanyData();
                allCompanyData && setData(allCompanyData);
            } else {
                setData(editData);
            }
        }
    }, [editData, getAdminAndCompanyData, handleShowMainFormEdit, reference]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        errorForm,
        isLoading,
        data,
        isEdit,
        errorPass,
        errorValid,
        nextStep,
        companyVal,
        fileNameIcon,
        fileNamePhoto,
        setNextStep,
        setErrorPass,
        setErrorValid,
        handleSendForm,
        handleClose,
        handleReset,
        setErrorForm,
        handleChange,
        findValue,
        handleEditForm,
        handleMultipleChange,
        handleIconFileChange,
    };
};

export default MainFormHook;
