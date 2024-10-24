"use client";
import { colombianCitiesData } from "@/data/colombianCitiesData";
import { countriesTable, idTypesTable } from "@/data/formConstant";
import useAuth from "@/firebase/auth";
import {
    deleteDocumentByIdQuery,
    DeleteSocialNetwork,
    getAllDocumentsQuery,
    getDocsByCompanyIdQuery,
    getDocsByCompanyRolIdQuery,
    getEmployeesByCompanyIdQuery,
    getHeadquartersByCompanyIdQuery,
    getMeetingStatusByCompanyIdQuery,
    getNotificationsByCompanyIdQuery,
    getRoutesByCompanyIdQuery,
    getWorkAreasByCompanyIdQuery,
    getZonesByCompanyIdQuery,
    getLocationsByCompanyIdAndWorkingdayQuery
} from "@/queries/documentsQueries";
import { DataMainFormObject } from "@/types/mainForm";
import { setDataTable } from "@/types/tables";
import { IconButton } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
require("dotenv").config();

const CustomTitle = ({ row }: any) => (
    <div data-tag="allowRowEvents">
        <span
            className={`status ${row.isActive ? "bg-success" : "bg-danger"} `}
        ></span>
        {row.isActive ? "Activo" : "Inactivo"}
    </div>
);

const CustomColor = ({ row }: any) => (
    <div>
        <div
            className={`tw-w-5 tw-h-5 tw-rounded-full`}
            style={{
                backgroundColor: row.color,
            }}
        />
    </div>
);

interface ColumnNamesToDisplay {
    [key: string]: string;
}

const DataTablesHook = (reference: string) => {
    const { userData } = useAuth();
    const [handleShowCsv, setHandleShowCsv] = useState(false);
    const [handleShowPdf, setHandleShowPdf] = useState(false);
    const [isEmptyDataRef, setIsEmptyDataRef] = useState(true);
    const [handleShowMainForm, setHandleShowMainForm] = useState(false);
    const [handleShowMainFormEdit, setHandleShowMainFormEdit] = useState(false);
    const [getDocuments, setGetDocuments] = useState<any>();
    const [dataTable, setDataTable] = useState<any>();
    const [columns, setColumns] = useState<any[]>();
    const [editData, setEditData] = useState<any>();
    const [searchTerm, setSearchTerm] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const formatearFecha = (fechaISO: string): string => {
        if (fechaISO != "-") {
            return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
        } else {
            return "-"
        }
    };

    const formatearHora = (horaDuracionISO: any): string => {        
        if (horaDuracionISO !== "-") {
            const hours = Math.floor(
                (horaDuracionISO % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.ceil((horaDuracionISO % (1000 * 60 * 60)) / (1000 * 60));
        
              return `${hours} hora${hours !== 1 ? 's' : ''} y ${minutes} minuto${
                minutes !== 1 ? 's' : ''
              }`;
        } else {
            return "-"
        }
    };

    const transformCitiesData = (data: any) => {
        const transformedData: {
            id: any;
            ciudad: any;
            departamento: any;
            pais: string;
        }[] = [];
        let uniqueId = 1;

        data.forEach((item: any) => {
            item.ciudades.forEach((ciudad: any) => {
                transformedData.push({
                    id: uniqueId++,
                    ciudad: ciudad,
                    departamento: item.departamento,
                    pais: "Colombia",
                });
            });
        });
        return transformedData;
    };

    const formatZoneData = (documents: any[]) => {
        return documents.map((doc) => {
            // Extraer direcciones del array 'addresses'
            const addresses = doc.addresses || [];
            return {
                zoneName: doc.zoneName || "-",
                zoneManager: doc.zoneManager || "-",
                AddressOne: addresses[0] || "-",
                AddressTwo: addresses[1] || "-",
                AddressThree: addresses[2] || "-",
                AddressFour: addresses[3] || "-",
                addresses: addresses,
                uid: doc.uid,
            };
        });
    };
    
    const formatDataByDate = (documents: any[] | { [key: string]: any } ) => {
        if (!Array.isArray(documents)) { return [] }
        return documents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    };

    const formatReportData = (documents: any[], employees: any[]  ) => {
        if (!Array.isArray(documents)) { return [] }
        const documentsDate = documents.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        
        // Para almacenar los startDay pendientes por usuario
        const tempStartDays: { [key: string]: string | null } = {};  

        // Almacena los resultados procesados
        const result: any[] = [];  
        // Anexar los datos a los documentos
        documentsDate.forEach((document) => {
            const employeeData = employees.find((employee) => employee.uid === document.employeeId);
            if (employeeData) {
                let startDay = tempStartDays[document.employeeId] || null;
    
                if (document.subject === 'startDay') {
                    if (!startDay) {
                        // Si no hay un startDay previo pendiente, almacenamos el actual
                        tempStartDays[document.employeeId] = document.timestamp;
                    } else {
                        // Si ya hay un startDay, creamos un registro con endDay vacío
                        result.push({
                            ...document,
                            firstName: employeeData.firstName[0],
                            lastName: employeeData.lastName[0],
                            documentType: employeeData.documentType[0],
                            documentNumber: employeeData.documentNumber[0],
                            position: employeeData.position[0],
                            startDay: startDay,
                            endDay: "-",  // No hay endDay correspondiente
                            totalTime: "-",  // No hay calculo de jornada
                        });
                        // Actualizamos el nuevo startDay en tempStartDays
                        tempStartDays[document.employeeId] = document.timestamp;
                    }
                } else if (document.subject === 'endDay') {
                    startDay = tempStartDays[document.employeeId];  // Recuperar el startDay pendiente
                    if (startDay) {
                        // Si hay un startDay pendiente, creamos un registro con startDay y endDay
                        result.push({
                            ...document,
                            firstName: employeeData.firstName[0],
                            lastName: employeeData.lastName[0],
                            documentType: employeeData.documentType[0],
                            documentNumber: employeeData.documentNumber[0],
                            position: employeeData.position[0],
                            startDay: startDay,
                            endDay: document.timestamp,
                            totalTime: new Date(document.timestamp).getTime() - new Date(startDay).getTime()
                        });
                        // Limpiamos el startDay almacenado
                        tempStartDays[document.employeeId] = null;
                    }
                }
            }
        });

            // Procesar los startDay sin un endDay correspondiente al final
        for (const employeeId in tempStartDays) {
            if (tempStartDays[employeeId]) {
                const lastDocument = documentsDate.find(doc => doc.employeeId === employeeId && doc.subject === 'startDay');
                if (lastDocument) {
                    const employeeData = employees.find(employee => employee.uid === employeeId);
                    result.push({
                        ...lastDocument,
                        firstName: employeeData?.firstName[0],
                        lastName: employeeData?.lastName[0],
                        documentType: employeeData?.documentType[0],
                        documentNumber: employeeData?.documentNumber[0],
                        position: employeeData?.position[0],
                        startDay: tempStartDays[employeeId],
                        endDay: "-",  // No hay endDay
                        totalTime: "-",  // No hay calculo de jornada
                        timestamp: tempStartDays[employeeId],
                    });
                }
            }
        }
        return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    };

    const getAllDocuments = useCallback(async () => {
        const documents: any =
            reference === "country"
                ? countriesTable
                : reference === "departments"
                ? colombianCitiesData
                : reference === "cities"
                ? transformCitiesData(colombianCitiesData)
                : reference === "documentTypes"
                ? idTypesTable
                : reference === "zones"
                ? formatZoneData(
                      userData && userData?.companyId
                          ? await getZonesByCompanyIdQuery(userData?.companyId)
                          : [],
                  )
                : reference === "notifications"
                ? formatDataByDate(
                    userData && userData?.companyId
                        ? await getNotificationsByCompanyIdQuery(
                            userData?.companyId,
                        )
                        : []
                    )    
                : reference === "workAreas"
                ? formatDataByDate(userData && userData?.companyId
                    ? await getWorkAreasByCompanyIdQuery(userData?.companyId)
                    : [])
                : reference === "employees"
                ? userData && userData?.companyId
                    ? await getEmployeesByCompanyIdQuery(userData?.companyId)
                    : []
                : reference === "meetingStatus"
                ? formatDataByDate(userData && userData?.companyId
                    ? await getMeetingStatusByCompanyIdQuery(
                          userData?.companyId,
                      )
                    : [])
                : reference === "fixedPoints"
                ? formatDataByDate(userData && userData?.companyId
                    ? await getDocsByCompanyIdQuery(
                          userData?.companyId,
                          reference,
                      )
                    : [] )
                : reference === "routes"
                ? formatDataByDate(userData && userData?.companyId
                    ? await getRoutesByCompanyIdQuery(userData?.companyId)
                    : [])
                : reference === "campus"
                ? formatDataByDate(userData && userData?.companyId
                    ? await getHeadquartersByCompanyIdQuery(userData?.companyId)
                    : [])
                : reference === "circular" ||
                  reference === "events" ||
                  reference === "policy" ||
                  reference === "forms" ||
                  reference === "news"
                ? formatDataByDate(userData && userData?.companyId
                    ? await getDocsByCompanyIdQuery(
                          userData?.companyId,
                          reference,
                      )
                    : [])
                : reference === "workingday"
                ? formatReportData(
                    userData && userData?.companyId ? 
                    await getLocationsByCompanyIdAndWorkingdayQuery(userData?.companyId)
                    : []
                    ,      
                    userData && userData?.companyId ?   
                    await getEmployeesByCompanyIdQuery(userData?.companyId)
                    : []
                )
                : await getAllDocumentsQuery(reference);
        
        const labelToDisplay = ["professionals", "patients", "functionary"];
        //reference === "employees" && console.log('documents ', documents);

        if (documents.length > 0) {
            const cols: any[] = [];
            const docs = documents[0];
            const entries = Object.keys(docs);

            // Define column names based on reference
            let columnNamesToDisplay: ColumnNamesToDisplay = {};

            if (reference === "documentTypes" || reference === "country") {
                columnNamesToDisplay = {
                    // id: "Id",
                    label: "Nombre",
                };
            } else if (reference === "departments") {
                columnNamesToDisplay = {
                    // id: "Id",
                    departamento: "Nombre",
                };
            } else if (reference === "cities") {
                columnNamesToDisplay = {
                    // id: "Id",
                    ciudad: "Ciudad",
                    departamento: "Departamento",
                    pais: "País",
                };
            } else if (reference === "roles") {
                columnNamesToDisplay = {
                    // uid: "Id",
                    name: "Nombre",
                    description: "Descripción",
                };
            } else if (reference === "notifications") {
                columnNamesToDisplay = {
                    // date: "Fecha",
                    // hour: "Hora",
                    timestamp: "Fecha Registro",
                    issue: "Asunto",
                    content: "Contenido",
                };
            } else if (reference === "zones") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    zoneName: "Nombre",
                    zoneManager: "Jefe zona",
                    AddressOne: "Dirección 1",
                    AddressTwo: "Dirección 2",
                    AddressThree: "Dirección 3",
                    AddressFour: "Dirección 4",
                };
            } else if (reference === "employees") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    firstName: "Nombre",
                    lastName: "Apellido",
                    documentType: "Tipo de Documento",
                    documentNumber: "Número de Documento",
                    position: "Cargo",
                };
            } else if (reference === "routes") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    // createdDate: "Fecha de creación",
                    // createdTime: "Hora de creación",
                    timestamp: "Fecha Registro",
                    routeName: "Nombre de la ruta",
                    routeManager: "Jefe de la ruta",
                    zoneName: "Zona a la que corresponde",
                };
            } else if (reference === "logos") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    // createdDate: "Fecha de creación",
                    // createdTime: "Hora de creación",
                    timestamp: "Fecha Registro",
                    logoName: "Nombre",
                    imageUrl: "Imagen",
                };
            } else if (reference === "meetingStatus") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    timestamp: "Fecha Registro",
                    name: "Nombre Estado Reunión",
                };
            } else if (reference === "campus") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    timestamp: "Fecha Registro",
                    name: "Nombre Sede",
                    address: "Dirección",
                    url: "Url Locación",
                    isActive: "Estado",
                };
            } else if (reference === "fixedPoints") {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    timestamp: "Fecha Registro",
                    name: "Nombre Categoría",
                    color: "Color",
                };
            } else if (
                reference === "circular" ||
                reference === "events" ||
                reference === "policy" ||
                reference === "forms" ||
                reference === "news"
            ) {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    timestamp: "Fecha Registro",
                    subject: "Asunto",
                    url: "Enlace",
                    isActive: "Estado",
                };
            } else if (reference === "workingday") {
                columnNamesToDisplay = {
                    firstName: "Nombre",
                    lastName: "Apellido",
                    documentType: "Tipo de Documento",
                    documentNumber: "Número de Documento",
                    startDay: "Inicio de Jornada",
                    endDay: "Final de Jornada",
                    totalTime: "Jornada Laboral",
                };
            } else {
                columnNamesToDisplay = {
                    uid: "Acciones",
                    timestamp: "Fecha Registro",
                    idType: "Tipo",
                    idType2: "Tipo",
                    id: "Documento",
                    businessName: "Razón Social",
                    tradename: "Nombre Comercial",
                    name: labelToDisplay.includes(reference)
                        ? "Nombres"
                        : "Nombre",
                    lastName: labelToDisplay.includes(reference)
                        ? "Apellidos"
                        : "Apellido",
                    email: "Correo",
                    indicative: "Indicativo",
                    phone: "Teléfono",
                    ext: "Ext",
                    phone2: "Teléfono Fijo",
                    address: "Dirección",
                    sector: "Sector",
                    city: "Ciudad",
                    webSite: "Sitio Web",
                    areaName: "Nombre Área",
                    areaHead: "Jefe de Área",
                    urlName: "Nombre Url",
                    urlLink: "Enlace",
                    isActive: "Estado",
                };
            }

            const omittedColumns = Object.keys(columnNamesToDisplay);

            const entriesFiltered = entries.filter((item) =>
                omittedColumns.includes(item),
            );

            const entriesSorted = entriesFiltered.sort((a, b): number => {
                return omittedColumns.indexOf(a) - omittedColumns.indexOf(b);
            });

            entriesSorted.forEach((val) => {
                const columnsData = {
                    name: (
                        <span
                            className="title-header-table"
                            style={{ fontSize: "15px" }}
                        >
                            {columnNamesToDisplay[val]}
                        </span>
                    ),
                    selector: (row: any) =>
                        val === "isActive" ? (
                            <CustomTitle row={row} />
                        ) : val === "color" ? (
                            <CustomColor row={row} />
                        ) : val === "uid" ? (
                            <div>
                                {reference !== "routes" &&
                                reference !== "logos" &&
                                reference !== "meetingStatus" &&
                                reference !== "circular" &&
                                reference !== "events" &&
                                reference !== "policy" &&
                                reference !== "forms" &&
                                reference !== "news" ? (
                                    <>
                                        <IconButton
                                            onClick={() =>
                                                onMainFormModalEdit(row)
                                            }
                                        >
                                            <MdModeEdit
                                                size={20}
                                                className="icon-actions-table"
                                            />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton
                                            onClick={() =>
                                                onMainFormModalEdit(row)
                                            }
                                        >
                                            <MdModeEdit
                                                size={20}
                                                className="icon-actions-table"
                                            />
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteItem(row, reference)
                                            }
                                        >
                                            <FaTrashCan
                                                size={20}
                                                className="icon-actions-table"
                                            />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                        ) : val === "timestamp" ||
                            val === "startDay" ||
                            val === "endDay" ? (
                            formatearFecha(row[val])
                        ) : val === "totalTime" ? (
                            formatearHora(row[val])
                        ) : val === "imageUrl" ? (
                            <div>
                                <Image
                                    src={row[val]}
                                    alt="Facebook"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        ) : (val === "id" && reference === "documentTypes") ||
                          reference === "country" ||
                          reference === "departments" ||
                          reference === "cities" ? (
                            row[val]
                        ) : reference === "companies" ||
                          reference === "workAreas" ? (
                            _.isArray(row[val]) ? (
                                [row[val][0]]
                            ) : (
                                [row[val]]
                            )
                        ) : (
                            [row[val]]
                        ),
                    sortable: true,
                    width:
                        val === "ext" || val === "idType"
                            ? "80px"
                            : val === "content"
                            ? "50%"
                            : val === "issue"
                            ? "20%"
                            : val === "hour" || val === "issue"
                            ? "15%"
                            : reference === "companies"
                            ? "200px"
                            : reference === "workAreas"
                            ? val === "timestamp" || val === "urlLink"
                                ? "15%"
                                : "auto"
                            : "auto",
                    omit: !omittedColumns.includes(val),
                    style:
                        val === "uid"
                            ? {
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                              }
                            : {},
                };

                cols.push(columnsData);
            });

            const currentData = {
                columns: cols,
                data: documents,
            };

            // console.log("cols", cols);
            // console.log("currentData", currentData);
            // console.log("documents", documents);

            setColumns(cols);
            setDataTable(currentData); //obtain dataTable
            documents && setGetDocuments(currentData.data); //obtain data
        } else {
            const currentData = {
                columns: [],
                data: [],
            };
            setColumns([]);
            setDataTable(currentData); //obtain dataTable
            setGetDocuments(currentData.data); //obtain data
        }
    }, [reference, userData]);

    // const handleSearch = async (e: any) => {
    //     const value = e.target.value.toLowerCase();
    //     setSearchTerm(value);

    //     const filtered = getDocuments?.filter((item: any) => {
    //         return _.some(item, (prop, key) => {
    //             if (reference === "departments") {
    //                 // Si reference es 'departments', filtra solo por el campo 'departamento'
    //                 return (
    //                     key === "departamento" &&
    //                     prop.toString().toLowerCase().includes(value)
    //                 );
    //             } else if (Array.isArray(prop)) {
    //                 const dataFiltered = prop;
    //                 return dataFiltered.some((subProp) =>
    //                     subProp.toString().toLowerCase().includes(value),
    //                 );
    //             }
    //             return prop.toString().toLowerCase().includes(value);
    //         });
    //     });

    //     const currentData = {
    //         columns,
    //         data: filtered,
    //     };
    //     setDataTable(currentData);
    // };

    const clearSearch = () => {
        setSearchTerm("");
        setStartDate("");
        setEndDate("");

        const currentData = {
            columns,
            data: getDocuments,
        };
        setDataTable(currentData);
    };

        // Función para filtrar por fecha
    const filterByDate = (data: any[], startDate: string, endDate: string) => {
        if (!startDate || !endDate) {
            return data; // Si no hay fechas, devuelve los datos originales
        }
        const start = new Date(`${startDate}T00:00:00Z`).getTime();
        const end = new Date(`${endDate}T23:59:59Z`).getTime();

        return data.filter((item: any) => {
            const itemTimestamp = new Date(item.timestamp).getTime();
            return itemTimestamp >= start && itemTimestamp <= end;
        });
    };

    // Función para filtrar por búsqueda
    const filterBySearch = (data: any[], value: string, reference: string) => {
        if (!value) {
            return data; // Si no hay valor de búsqueda, devuelve los datos originales
        }
        return data.filter((item: any) => {
            return _.some(item, (prop, key) => {
                if (reference === "departments") {
                    return (
                        key === "departamento" &&
                        prop.toString().toLowerCase().includes(value)
                    );
                } else if (Array.isArray(prop)) {
                    return prop.some((subProp) =>
                        subProp.toString().toLowerCase().includes(value),
                    );
                }
                return prop.toString().toLowerCase().includes(value);
            });
        });
    };

    // Función combinada
    const handleSearchAndFilter = async (e: any) => {
        const value = e?.target?.value.toLowerCase();
        setSearchTerm(value);
        
        // Filtrar por búsqueda
        const filteredBySearch = filterBySearch(getDocuments || [], value, reference);
        // Filtrar por fecha
        const filteredByDate = filterByDate(filteredBySearch, startDate, endDate);
        const currentData = {
            columns,
            data: filteredByDate,
        };
        setDataTable(currentData);
    };

    const onUploadDataModalCsv = () => setHandleShowCsv(true);

    const onUploadDataModalPdf = () => setHandleShowPdf(true);

    const onMainFormModal = () => setHandleShowMainForm(true);

    const onMainFormModalEdit = (row: any) => {
        setHandleShowMainFormEdit(true);
        setEditData(row);
        // console.log(row);
    };

    const confirmAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se elimino correctamente el elemento",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const handleDeleteItem = (row: any, reference: any) => {
        Swal.fire({
            title: "¿Está seguro de que desea eliminar este elemento?",
            text: "Esta acción no se puede deshacer. Verifique que realmente quiere eliminarlo.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "¡Sí, eliminar!",
            cancelButtonText: "¡No, cancelar!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (reference === "logos") {
                    await DeleteSocialNetwork(row?.logoName, row?.uid);
                } else {
                    await deleteDocumentByIdQuery(reference, row?.uid).then(
                        confirmAlert,
                    );
                }

                getAllDocuments();
            }
        });
    };

    useEffect(() => {
        getAllDocuments();
    }, [getAllDocuments]);

    useEffect(() => {
        if (!handleShowMainForm || !handleShowMainFormEdit || !isEmptyDataRef) {
            getAllDocuments();
        }
    }, [
        getAllDocuments,
        handleShowMainForm,
        handleShowMainFormEdit,
        isEmptyDataRef,
    ]);

    // console.log(!isEmptyDataRef);

    return {
        columns,
        data: getDocuments,
        handleShowCsv,
        handleShowPdf,
        handleShowMainForm,
        setHandleShowCsv,
        setHandleShowPdf,
        setHandleShowMainForm,
        setHandleShowMainFormEdit,
        onUploadDataModalCsv,
        onUploadDataModalPdf,
        onMainFormModal,
        onMainFormModalEdit,
        dataTable,
        handleShowMainFormEdit,
        editData,
        isEmptyDataRef,
        handleSearchAndFilter,
        searchTerm,
        clearSearch,
        handleDeleteItem,
        startDate, 
        setStartDate,
        endDate, 
        setEndDate,
    };
};

export default DataTablesHook;
