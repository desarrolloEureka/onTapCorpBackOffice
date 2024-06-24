"use client";
import { allRef } from "@/firebase/campus";
import { getAllCampusQuery } from "@/queries/campusQueries";
import { getAllDocumentsQuery } from "@/queries/documentsQueries";
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

    const getAllDocuments = useCallback(async () => {
        const documents = await getAllDocumentsQuery(reference);

        const labelToDisplay = ["professionals", "patients", "functionary"];

        if (documents.length > 0) {
            const cols: any[] = [];
            const entries = Object.keys(documents[0]);

            const columnNamesToDisplay: ColumnNamesToDisplay = {
                // uid:"uid",
                timestamp: "Fecha Registro",
                idType: "Tipo",
                id: "Documento",
                name: labelToDisplay.includes(reference) ? "Nombres" : "Nombre",
                lastName: labelToDisplay.includes(reference)
                    ? "Apellidos"
                    : "Apellido",
                code: "Código",
                email: "Correo",
                phone: "Teléfono",
                phone2: "Teléfono fijo",
                address: "Dirección",
                description: "Descripción",
                age: "Edad",
                discount: "Descuento(%)",
                // "birthDate",
                // "country",
                // "state",
                city: "Ciudad",
                // "password",
                // "confirmPassword",
                specialty: "Especialidad",
                contract: "Convenio",
                // rol: "Rol",
                campus: "Sede",
                availableCampus: "Sedes",
                // "area",
                // urlPhoto: "urlPhoto",
                isActive: "Estado",
                // "isDeleted",
            };

            const omittedColumns = Object.keys(columnNamesToDisplay);

            entries.filter((item) => omittedColumns.includes(item));

            entries.sort((a, b): number => {
                return omittedColumns.indexOf(a) - omittedColumns.indexOf(b);
            });

            const campusResult = await getAllCampusQuery();

            // entries.forEach((val, key) => {
            entries.forEach((val) => {
                const columnsData = {
                    name: columnNamesToDisplay[val],
                    selector: (row: any) =>
                        val === "isActive" ? (
                            <CustomTitle row={row} />
                        ) : val === "timestamp" ? (
                            formatearFecha(row[val])
                        ) : val === "campus" ? (
                            [
                                campusResult.find(
                                    (item) => item.value === row[val],
                                )?.label,
                            ]
                        ) : val === "availableCampus" ? (
                            [
                                campusResult
                                    .filter((item) =>
                                        row[val].includes(item.value),
                                    )
                                    .map((campus) => campus.label)
                                    .join(", "),
                            ]
                        ) : (
                            [row[val]]
                        ),
                    sortable: true,
                    width:
                        val === "email" ||
                        val === "address" ||
                        val === "timestamp" ||
                        val === "name" ||
                        val === "lastName"
                            ? "200px"
                            : val === "id" ||
                              val === "phone" ||
                              val === "phone2"
                            ? "150px"
                            : undefined,
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
            // console.log("dddddd");
            const currentData = {
                columns: [],
                data: [],
            };
            setColumns([]);
            setDataTable(currentData); //obtain dataTable
            setGetDocuments(currentData.data); //obtain data
        }
    }, [reference]);

    const handleSearch = async (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const campusResult = await getAllCampusQuery();

        const filtered = getDocuments?.filter((item) => {
            return _.some(item, (prop) => {
                if (Array.isArray(prop)) {
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
