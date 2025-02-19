"use client";
import {
    dataEmployees
} from "@/data/mainFormData";
import {
    getDocumentReference,
    saveEmployeeQuery,
    validateAreaQuery,
    validateHeadquarterQuery,
    validateRoutesQuery
} from "@/queries/documentsQueries";
import { DataObject, ErrorData } from "@/types/documents";
import { ModalParamsCsv } from "@/types/modals";
import { useEffect, useState } from "react";
import { useCSVReader } from "react-papaparse";
import Swal from "sweetalert2";

import { DEFAULT_REMOVE_HOVER_COLOR } from "../styles/stylesUploadCsv";
import useAuth from "@/firebase/auth";
import moment from "moment";
import { addUser } from "@/firebase/user";

const confirmAlert = (title: string) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `Se guardó correctamente en la tabla de ${title}`,
        showConfirmButton: false,
        timer: 2000,
    });
};

const UploadDocumentHook = ({
    handleShowCsv,
    setHandleShowCsv,
    reference,
    title,
    isShowAlertCSV,
    setIsShowAlertCSV,
    dataAlertCSV,
    setDataShowAlertCSV
}: ModalParamsCsv) => {
    const { accessTokenUser, userData } = useAuth();
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [errorDataUpload, setErrorDataUpload] = useState<ErrorData[]>();
    const [show, setShow] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR,
    );

    const documentRef: any = getDocumentReference(reference);

    const handleClose = () => {
        setShow(false);
        setHandleShowCsv(false);
    };

    const handleUploadAccepted = async (results: { data: any }) => {
        try {
            setIsShowAlertCSV(false);
            setDataShowAlertCSV([]);
            const invalidUsersDetails: { line: number; errors: string[] }[] = [];
            const usersToUpload: any[] = [];

            for (const [index, val] of results.data.entries()) {
                if (reference === "employees" && !(Array.isArray(val) && val.length === 1 && val[0] === '')) {
                    if (index === 0) { continue; }

                    const errors: string[] = [];
                    const currentDataObject = { ...dataEmployees };
                    const documentRefUser: any = getDocumentReference("users");
                    const currentDate = moment().format();

                    //console.log('val --> ', val);
                    currentDataObject.uid = documentRefUser.id;
                    currentDataObject.idCompany = userData?.companyId;
                    currentDataObject.ImageProfile = "";
                    currentDataObject.createdDate = currentDate //val[0];
                    currentDataObject.firstName = [val[0], val[1] === "true"];
                    currentDataObject.lastName = [val[2], val[3] === "true"];
                    currentDataObject.documentType = [val[4], true];
                    currentDataObject.documentNumber = [val[5], true];
                    currentDataObject.dateOfBirth = [val[6], true];
                    currentDataObject.position = [val[7], val[8] === "true"];
                    currentDataObject.isActive = val[9] === "true";
                    currentDataObject.phones = [
                        {
                            text: val[10],
                            ext: val[11],
                            indicative: val[12],
                            checked: val[13] === "true",
                        },
                    ];
                    currentDataObject.emails = [
                        {
                            text: val[14],
                            checked: val[15] === "true",
                        },
                    ];
                    currentDataObject.additional = [
                        {
                            autodato: "",
                            dato: "",
                            createdDate: "",
                            checked: false,
                        },
                    ];
                    currentDataObject.selectedArea = val[16];
                    currentDataObject.selectedHeadquarter = val[17];
                    currentDataObject.routeApplicable = val[18] === "true";
                    currentDataObject.mondayRoute = val[19];
                    currentDataObject.tuesdayRoute = val[20];
                    currentDataObject.wednesdayRoute = val[21];
                    currentDataObject.thursdayRoute = val[22];
                    currentDataObject.fridayRoute = val[23];
                    currentDataObject.saturdayRoute = val[24];
                    currentDataObject.sundayRoute = val[25];
                    currentDataObject.isGPSActive = val[26] === "true";
                    currentDataObject.switch_activateCard = val[27] === "true";
                    currentDataObject.phone = val[10];
                    currentDataObject.email = val[14];
                    currentDataObject.preview = `https://one-tap-corp-dev.vercel.app/components/views/cardView/?uid=${documentRefUser.id}`;
                    currentDataObject.rolId = "uysG1ULyEDklfbGDFate";
                    currentDataObject.views = 0;
                    currentDataObject.templateData = [
                        {
                            id: "VGMUWYOP3RK374gi30I8",
                            checked: true,
                        },
                    ];

                    // Rutas
                    const routesToValidate = [
                        currentDataObject.mondayRoute,
                        currentDataObject.tuesdayRoute,
                        currentDataObject.wednesdayRoute,
                        currentDataObject.thursdayRoute,
                        currentDataObject.fridayRoute,
                        currentDataObject.saturdayRoute,
                        currentDataObject.sundayRoute,
                    ];

                    //Campos booleanos
                    const booleanFields = [
                        { fieldName: 'Nombre', value: val[1] },
                        { fieldName: 'Apellido', value: val[3] },
                        { fieldName: 'Cargo', value: val[8] },
                        { fieldName: 'Estado', value: val[9] },
                        { fieldName: 'Telefono', value: val[13] },
                        { fieldName: 'Correo', value: val[15] },
                        { fieldName: 'Aplica ruta', value: val[18] },
                        { fieldName: 'GPS empleado', value: val[26] },
                        { fieldName: 'Tarjeta empleado', value: val[27] },
                    ];

                    // Validación de booleanos
                    booleanFields.forEach(({ fieldName, value }) => {
                        if (value !== "true" && value !== "false") {
                            errors.push(`${fieldName} debe ser un valor booleano (true/false), pero se encontró: ${value}`);
                        }
                    });

                    const isAreaValid = await validateAreaQuery(val[16]);
                    if (!isAreaValid) errors.push(`Área seleccionada no válida: ${val[16]}`);

                    const isHeadquarterValid = await validateHeadquarterQuery(val[17]);
                    if (!isHeadquarterValid) errors.push(`Sede no válida: ${val[17]}`);

                    await Promise.all(
                        routesToValidate.map(async (routeId, index) => {
                            const isValid = await validateRoutesQuery(routeId);
                            if (!isValid) {
                                errors.push(`Ruta no válida para el día ${['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'][index]}: ${routeId}`);
                            }
                        })
                    );

                    // Guardar en el arreglo de errores
                    if (errors.length > 0) {
                        invalidUsersDetails.push({ line: index + 1, errors });
                    } else {
                        usersToUpload.push(currentDataObject);
                    }
                }
            }

            // Verificar si hay errores
            if (invalidUsersDetails.length > 0) {
                setIsShowAlertCSV(true);
                setDataShowAlertCSV(invalidUsersDetails);
                return;
            } else {
                // Subir usuarios si todos son válidos
                for (const user of usersToUpload) {
                    const result = await addUser({
                        email: user?.email,
                        password: user?.documentNumber[0],
                        accessTokenUser,
                        uid: user?.uid,
                    });

                    // Si hay un error, detener el proceso y guardar en `errors`
                    if (result.success === false) {
                        invalidUsersDetails.push({
                            line: usersToUpload.indexOf(user) + 1,
                            errors: [`Error con ${user?.email}: ${result?.message?.includes("The email address is already in use")
                                ? "La dirección de correo electrónico ya está en uso por otra cuenta."
                                : result.message}`]
                        });
                        setIsShowAlertCSV(true);
                        setDataShowAlertCSV(invalidUsersDetails);
                        return;
                    }

                    await saveEmployeeQuery(user);
                }
            }

            confirmAlert("All users were uploaded successfully!");
            setZoneHover(false);
        } catch (error) {
            console.error("Error during upload process:", error);
        }
    };

    useEffect(() => {
        handleShowCsv && setShow(true);
    }, [handleShowCsv]);

    return {
        CSVReader,
        zoneHover,
        removeHoverColor,
        setRemoveHoverColor,
        setZoneHover,
        handleUploadAccepted,
        errorDataUpload,
        show,
        handleClose,
    };
};

export default UploadDocumentHook;