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
    listenToDocumentsQuery,
    saveDataDocumentsQueryById,
    getEmployeesByCompanyIdQuery
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
    const { accessTokenUser, userData, companyData } = useAuth();

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<any>(dataMainFormObject);
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
    const [emailError, setEmailError] = useState<string>('');
    const [objToArrayItems, setObjToArrayItems] = useState<any>({});

    const [employees, setEmployees] = useState<any>([]);

    //Modal Iconos
    const [isOpenModalIcons, setIsOpenModalIcons] = useState<boolean>(false);
    const [itemUrlKey, setItemUrlKey] = useState(0);
    const [dataLogos, setDataLogos] = useState<any>(null);
    const [itemUrlSelected, setItemUrlSelected] = useState([]);

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    useEffect(() => {
        const fetchDocuments = listenToDocumentsQuery("logos", setDataLogos, companyData?.uid);
        return () => fetchDocuments();
    }, [companyData?.uid]);

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
        // Validación del campo "email"
        if (!handleShowMainFormEdit && name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value as string)) {
                setEmailError('Correo no valido.');
            } else {
                setEmailError('');
            }
        }

        // Actualiza el campo "isActive" convirtiendo el valor a booleano.
        if (name === "isActive") {
            setData((prevData: any) => ({
                ...prevData,
                [name]: value as boolean,
            }));
            return;
        }

        // Si `isChecked` está definido, actualiza como un array con el valor y su opuesto.
        if (typeof isChecked !== "undefined") {
            setData((prevData: any) => ({
                ...prevData,
                [name]: [
                    value,                // Primer valor: nuevo `value`
                    !isChecked,           // Segundo valor: opuesto de `isChecked`
                    prevData[name][2],    // Tercer valor: mantiene el objeto original en la posición 2
                    ...prevData[name].slice(3), // Resto de elementos (si existen)
                ],
            }));
            return;
        }

        if (name.startsWith('urlLink')) {
            // Verificación de la URL solo si hay un valor completo
            if (!(value.toString().startsWith('https://') || value.toString().startsWith('http://') || value.toString().startsWith('h'))) {
                // Si no comienza con http o https, agregar https://
                setData((prevData: any) => ({
                    ...prevData,
                    [name]: "https://" + value,
                }));
                return;
            } else {
                // Si es válido, simplemente actualizar
                setData((prevData: any) => ({
                    ...prevData,
                    [name]: value,
                }));
                return;
            }
        }

        // Por defecto, actualiza el valor normalmente.
        setData((prevData: any) => ({
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
            currentDataObject.isActive = data.isActive;
            userData && (currentDataObject.companyId = userData.companyId);

            const newElements = ["urlName", "urlLink", "iconName"];
            newElements.forEach((newItem) => {
                let index = 1;
                let key = newItem;
                
                // Mientras la clave exista en `data`, vamos agregando los elementos al objeto
                while (Object.keys(data).includes(key)) {
                    (currentDataObject as any)[key] = data[key];
                  
                  // Intentamos buscar el siguiente, como urlName2, urlLink2, etc.
                  index += 1;
                  key = `${newItem}${index}`;
                }
              });

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

        // console.log("newData", newData);
        // console.log("data", data);
        //console.log("reference", reference);

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
                await saveDataDocumentsQueryById({
                    id: data.uid,
                    data: {...newData},
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
        data.city &&
        data.id.length > 6 &&   
        data.id.length < 12;

    const urlVal = () => {
        if (data?.webSite) {
            if (data.webSite.startsWith('https://') || data.webSite.startsWith('http://') || data.webSite.startsWith('h')) {
                return true
            } else {
                setData((prevData: any) => {
                    const updatedWebSite = "https://" + data.webSite;
                    return {
                        ...prevData,
                        ["webSite"]: updatedWebSite,
                    };
                });
                return true
            }
        }
        return true
    }
    
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
        if (
            workAreasVal ||
            companyVal && urlVal() ||
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
            //console.log("Entró");
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
            //console.log("Falló");
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

    const handleOpenModalIcons = (item: any, index: any) => {
        setItemUrlKey(index);
        setItemUrlSelected(item);
        setIsOpenModalIcons(true);
    };

    const handleCloseModalIcons = () => {
        setItemUrlKey(0);
        setItemUrlSelected([]);
        setIsOpenModalIcons(false);
    };

    const handleDataNetworks = (text: any, index: any) => {
        setData({
            ...data,
            ["iconName" + "" + (index === 0 ? "" : index + 1)]: text,
        });
        setItemUrlSelected({
            ...objToArrayItems.urlName[index],
            iconName: text,
        });
        setTimeout(() => {
            setIsOpenModalIcons(false);
        }, 1000);
    };

    const handleNewItem = (type: string) => {
        const listNewItem: string[] = ["urlName", "urlLink", "iconName"];
        const newItemUrl: { [key: string]: any[] | string } = {};
        const itemIndex = objToArrayItems[type ?? "urlName"].length
            ? objToArrayItems[type ?? "urlName"].length
            : 0;

        listNewItem.forEach((item) => {
            const currentIndex = `${item}${itemIndex + 1}`;

            newItemUrl[currentIndex] =
                item === "urlName"
                    ? [
                        "", 
                        false,
                        // Construimos el objeto con los uid de employees
                        employees?.reduce((acc: any, employee: any) => {
                        acc[employee.uid] = { isActive: true, uid: employee.uid, views: [] };
                        return acc;
                    }, {})
                        ]
                    : item === "urlLink"
                    ? " "
                    : item === "iconName"
                    ? " "
                    : " ";
        });
        setData({ ...data, ...newItemUrl });
    }

    const handleDeleteItem = (item: any) => {
        if (item[0].includes("url")) {
            const dataFiltered = _.omit(_.cloneDeep(data), [
                item[0],
                item[4],
                item[6],
            ]);
            setData(dataFiltered);
        }
    };

    const createNewArray = useCallback(() => {
        const newObject: any = {};

        const keysNameSelected = ["urlName"];
        keysNameSelected.forEach((element) => {
            //Verifica que en esa key coincida o este en la palabra
            const keysFiltered = Object.fromEntries(
                Object.entries(_.cloneDeep(data)).filter(([key, value]) =>
                    key.includes(element),
                ),
            );
            //Obtiene solo los valores de cada propiedad

            const arrayWithKey = _.sortBy(Object.entries(keysFiltered));
            //Agrega el elemento a ese array
            arrayWithKey.map(([key, value]: any, index: number) => {
                if (_.isArray(value)) {
                    value.unshift(key);

                    if (element === "urlName") {
                        const newElements = ["urlLink", "iconName"];
                        newElements.forEach((newItem) => {
                            if (
                                Object.keys(_.cloneDeep(data)).includes(newItem)
                            ) {
                                const itemsFiltered = Object.fromEntries(
                                    Object.entries(_.cloneDeep(data)).filter(
                                        ([subKey, value]) => {
                                            if (index === 0) {
                                                return subKey === newItem;
                                            } else {
                                                return (
                                                    subKey.includes(newItem) &&
                                                    subKey.at(-1) === key.at(-1)
                                                );
                                            }
                                        },
                                    ),
                                );
                                const newItems = Object.entries(itemsFiltered);
                                newItems.forEach((element) => {
                                    value.push(...element);
                                });
                            }
                        });
                    }
                }
            });

            newObject[element] = arrayWithKey.map((item) => {
                const flatArray = item.flat();
                // Si el primer y segundo elemento son iguales, eliminamos el primero
                return flatArray[0] === flatArray[1] ? flatArray.slice(1) : flatArray;

            });
        });
        return newObject;
    }, [data]);

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

    useEffect(() => {
        const fetchData = async () => {            
            if (companyData?.uid) {
                const employees: any = await getEmployeesByCompanyIdQuery(companyData.uid);
                setEmployees(employees);
                
                if (employees.length > 0) {
                    // Construir el objeto con los uid de employees y actualizar urlName en data
                    setData((prevData: any) => ({
                        ...prevData,
                        urlName: [
                            "",
                            false,
                            employees.reduce((acc: any, employee: any) => {
                                acc[employee.uid] = { isActive: true, uid: employee.uid, views: []  };
                                return acc;
                            }, {}),
                        ],
                    }));
                }
            }
        };
        fetchData();
    }, [companyData?.uid]);

    useEffect(() => {
        // Actualizar objToArrayItems una vez que data esté completamente actualizado
        if (data) {setObjToArrayItems(createNewArray())}
    }, [createNewArray, data]);

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
        urlVal,
        fileNameIcon,
        fileNamePhoto,
        emailError,
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
        handleOpenModalIcons,
        handleCloseModalIcons,
        isOpenModalIcons,
        setIsOpenModalIcons,
        itemUrlKey,
        setItemUrlKey,
        dataLogos,
        itemUrlSelected,
        setItemUrlSelected,
        handleDataNetworks,
        handleNewItem,
        objToArrayItems,
        handleDeleteItem
    };
};

export default MainFormHook;
