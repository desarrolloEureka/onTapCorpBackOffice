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
                    const currentDataObject = { ...dataEmployees };
                    const documentRefUser: any = getDocumentReference("users");

                    //console.log('val --> ', val);
                    currentDataObject.uid = documentRefUser.id;
                    currentDataObject.idCompany = userData?.companyId;
                    currentDataObject.ImageProfile = "";
                    currentDataObject.createdDate = val[0];
                    currentDataObject.firstName = [val[1], val[2] === "true"];
                    currentDataObject.lastName = [val[3], val[4] === "true"];
                    currentDataObject.documentType = [val[5], val[6] === "true"];
                    currentDataObject.documentNumber = [val[7], val[8] === "true"];
                    currentDataObject.dateOfBirth = [val[9], val[10] === "true"];
                    currentDataObject.position = [val[11], val[12] === "true"];
                    currentDataObject.isActive = val[13] === "true";
                    currentDataObject.phones = [
                        {
                            text: val[14],
                            ext: val[15],
                            indicative: val[16],
                            checked: true,
                        },
                    ];
                    currentDataObject.emails = [
                        {
                            text: val[17],
                            checked: val[18] === "true",
                        },
                    ];
                    currentDataObject.additional = [
                        {
                            autodato: val[19],
                            dato: val[20],
                            createdDate: val[21],
                            checked: val[22] === "true",
                        },
                    ];
                    currentDataObject.selectedArea = val[23];
                    currentDataObject.selectedHeadquarter = val[24];
                    currentDataObject.routeApplicable = val[25] === "true";
                    currentDataObject.mondayRoute = val[26];
                    currentDataObject.tuesdayRoute = val[27];
                    currentDataObject.wednesdayRoute = val[28];
                    currentDataObject.thursdayRoute = val[29];
                    currentDataObject.fridayRoute = val[30];
                    currentDataObject.saturdayRoute = val[31];
                    currentDataObject.sundayRoute = val[32];
                    currentDataObject.isGPSActive = val[33] === "true";
                    currentDataObject.switch_activateCard = val[34] === "true";
                    currentDataObject.phone = val[36];
                    currentDataObject.email = val[37];
                    currentDataObject.preview = `https://one-tap-corp-dev.vercel.app/components/views/cardView/?uid=${documentRefUser.id}`;
                    currentDataObject.rolId = "uysG1ULyEDklfbGDFate";
                    currentDataObject.views = 0;
                    currentDataObject.templateData = [
                        {
                            id: "VGMUWYOP3RK374gi30I8",
                            checked: true,
                        },
                    ];

                    const errors: string[] = [];

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
                        { fieldName: 'Nombre', value: val[2] },
                        { fieldName: 'Apellido', value: val[4] },
                        { fieldName: 'Tipo de Documento', value: val[6] },
                        { fieldName: 'Número de Documento', value: val[8] },
                        { fieldName: 'Fecha de Nacimiento', value: val[10] },
                        { fieldName: 'Cargo', value: val[12] },
                        { fieldName: 'Estado', value: val[13] },
                        { fieldName: 'Correo', value: val[18] },
                        { fieldName: 'Datos Adicionales', value: val[22] },
                        { fieldName: 'Aplica ruta', value: val[25] },
                        { fieldName: 'GPS empleado', value: val[33] },
                        { fieldName: 'Tarjeta empleado', value: val[34] },
                    ];

                    // Validación de booleanos
                    booleanFields.forEach(({ fieldName, value }) => {
                        if (value !== "true" && value !== "false") {
                            errors.push(`${fieldName} debe ser un valor booleano (true/false), pero se encontró: ${value}`);
                        }
                    });

                    const isAreaValid = await validateAreaQuery(val[23]);
                    if (!isAreaValid) errors.push(`Área seleccionada no válida: ${val[23]}`);

                    const isHeadquarterValid = await validateHeadquarterQuery(val[24]);
                    if (!isHeadquarterValid) errors.push(`Sede no válida: ${val[24]}`);

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
                    //console.log('user', user);
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