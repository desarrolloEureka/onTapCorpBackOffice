"use client";
import { colombianCitiesData } from "@/data/colombianCitiesData";
import { countriesTable, idTypesTable } from "@/data/formConstant";
import useAuth from "@/firebase/auth";
import { allRef } from "@/firebase/campus";
import { getAllCampusQuery } from "@/queries/campusQueries";
import { getAllDocumentsQuery, getNotificationsByCompanyIdQuery, getWorkArasByCompanyIdQuery, getZonesByCompanyIdQuery } from "@/queries/documentsQueries";
import { DataMainFormObject } from "@/types/mainForm";
import { setDataTable } from "@/types/tables";
import { onSnapshot } from "firebase/firestore";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

const CustomTitle = ({ row }: any) => (
    <div data-tag="allowRowEvents">
        <span
            className={`status ${row.isActive ? "bg-success" : "bg-danger"} `}
        ></span>
        {row.isActive ? "Activo" : "Inactivo"}
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
    const [getDocuments, setGetDocuments] = useState<
        DataMainFormObject[] | any[]
    >();
    const [dataTable, setDataTable] = useState<setDataTable>();
    const [columns, setColumns] = useState<any[]>();
    const [editData, setEditData] = useState<any>();
    const [searchTerm, setSearchTerm] = useState("");

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
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
                zoneName: doc.zoneName || '-',
                zoneManager: doc.zoneManager || '-',
                AddressOne: addresses[0] || '-',
                AddressTwo: addresses[1] || '-',
                AddressThree: addresses[2] || '-',
                AddressFour: addresses[3] || '-',
                addresses: addresses,
                uid: doc.uid
            };
        });
    };

    const getAllDocuments = useCallback(async () => {
        const documents =
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
                      userData
                          ? await getZonesByCompanyIdQuery(userData?.companyId)
                          : [],
                  )
                : reference === "notifications"
                ? userData
                    ? await getNotificationsByCompanyIdQuery(
                          userData?.companyId,
                      )
                    : []
                : reference === "workAreas"
                ? userData
                    ? await getWorkArasByCompanyIdQuery(userData?.companyId)
                    : []
                : await getAllDocumentsQuery(reference);


        const labelToDisplay = ["professionals", "patients", "functionary"];

        if (documents.length > 0) {
            const cols: any[] = [];
            const entries = Object.keys(documents[0]);

            // Define column names based on reference
            let columnNamesToDisplay: ColumnNamesToDisplay = {};

            if (reference === "documentTypes" || reference === "country") {
                columnNamesToDisplay = {
                    id: "Id",
                    label: "Nombre",
                };
            } else if (reference === "departments") {
                columnNamesToDisplay = {
                    id: "Id",
                    departamento: "Nombre",
                };
            } else if (reference === "cities") {
                columnNamesToDisplay = {
                    id: "Id",
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
                    date: "Fecha",
                    hour: "Hora",
                    issue: "Asunto",
                    content: "Contenido",
                };
            } else if (reference === "zones") {
                columnNamesToDisplay = {
                    zoneName: "Nombre",
                    zoneManager: "Jefe zona",
                    AddressOne: "Dirección 1",
                    AddressTwo: "Dirección 2",
                    AddressThree: "Dirección 3",
                    AddressFour: "Dirección 4",
                };
            } else {
                columnNamesToDisplay = {
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
                    isActive: "Estado",
                    areaName: "Nombre Área",
                    areaHead: "Jefe de Área",
                    urlName: "Nombre Url",
                    urlLink: "Enlace",
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
                    name: columnNamesToDisplay[val],
                    selector: (row: any) =>
                        val === "isActive" ? (
                            <CustomTitle row={row} />
                        ) : val === "timestamp" ? (
                            formatearFecha(row[val])
                        ) : (val === "id" && reference === "documentTypes") ||
                          reference === "country" ||
                          reference === "departments" ||
                          reference === "cities" ? (
                            row[val]
                        ) : reference === "companies" ? (
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
                            : val === "content" ? "50%" : val === "issue" ? '20%' : val === "hour" || val === "issue" ? '15%' : "200px",
                    omit: !omittedColumns.includes(val),
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

    const handleSearch = async (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const campusResult = await getAllCampusQuery();

        const filtered = getDocuments?.filter((item) => {
            return _.some(item, (prop, key) => {
                if (reference === "departments") {
                    // Si reference es 'departments', filtra solo por el campo 'departamento'
                    return (
                        key === "departamento" &&
                        prop.toString().toLowerCase().includes(value)
                    );
                } else if (Array.isArray(prop)) {
                    const dataFiltered =
                        reference === "areas"
                            ? campusResult
                                  .filter((item) => prop.includes(item.value))
                                  .map((campus) => campus.label)
                            : prop;
                    return dataFiltered.some((subProp) =>
                        subProp.toString().toLowerCase().includes(value),
                    );
                }
                return prop.toString().toLowerCase().includes(value);
            });
        });

        const currentData = {
            columns,
            data: filtered,
        };
        setDataTable(currentData);
    };

    const clearSearch = () => {
        setSearchTerm("");
        const currentData = {
            columns,
            data: getDocuments,
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

    useEffect(() => {
        getAllDocuments();
    }, [getAllDocuments]);

    useEffect(() => {
        const unSubCampus = onSnapshot(allRef({ ref: "campus" }), (doc) => {
            setIsEmptyDataRef(doc.empty);
        });
        return () => {
            unSubCampus();
        };
    }, []);

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
        handleSearch,
        searchTerm,
        clearSearch,
    };
};

export default DataTablesHook;
