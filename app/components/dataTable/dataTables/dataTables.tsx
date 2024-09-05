import {
    ExportProps,
    NoDataCardProps,
    // TableDataItemOld,
    UploadDataButtonModalProps,
    UploadDataModalProps,
} from "@/types/tables";
// import differenceBy from "lodash/differenceBy";
import dynamic from "next/dynamic";
import { MouseEvent, useMemo } from "react";
import { Button, Form } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { TfiClose, TfiExport } from "react-icons/tfi";
import { VscAdd } from "react-icons/vsc";
// import Swal from "sweetalert2";

const DataTableExtensions: any = dynamic(
    () => import("react-data-table-component-extensions"),
    { ssr: false },
);

createTheme("solarized", "dark");

const customStyles = {
    headCells: {
        style: {
            color: "#8bb8e7",
        },
    },
};

function convertArrayOfObjectsToCSV(array: object[]): string {
    let result: string;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item: any) => {
        let ctr = 0;
        keys.forEach((key: string) => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(array: any[], tableTitle: string) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = `${tableTitle}.csv`;

    // Codificar el contenido del CSV
    const encodedCSV = encodeURIComponent(csv);

    // Crear el enlace de descarga con la cadena codificada
    const dataURI = `data:text/csv;charset=utf-8,${encodedCSV}`;

    link.setAttribute("href", dataURI);
    link.setAttribute("download", filename);
    link.click();
}

const Export = ({ onExport }: ExportProps) => (
    <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) =>
            onExport(e.currentTarget.value)
        }
    >
        <TfiExport size={18} className="" />
    </Button>
);

const UploadDataCsvModal = ({
    onUploadDataModalCsv,
}: UploadDataButtonModalProps) => (
    <Button onClick={onUploadDataModalCsv}>Subir Csv</Button>
);

const MainFormModal = ({
    onMainFormModal,
    campusIsEmpty,
}: UploadDataButtonModalProps) => (
    <Button disabled={campusIsEmpty} onClick={onMainFormModal}>
        <VscAdd size={18} className="" />
    </Button>
);

const UploadDataPdfModal = ({
    onUploadDataModalPdf,
}: UploadDataButtonModalProps) => (
    <Button onClick={onUploadDataModalPdf}>Subir multiples Pdf</Button>
);

const NoDataCard = ({ emptyRef, reference }: NoDataCardProps) => (
    <div className="tw-flex-1 tw-p-10 tw-text-center tw-text-2xl bg-white">
        <div className="">
            <p className="main-content-title tw-text-2xl">
                {emptyRef && reference === "areas"
                    ? "Agregue una Sede para Continuar"
                    : "No hay Datos Para Mostrar"}
            </p>
            <i className="ti ti-folder-off main-content-title tw-text-2xl"></i>
        </div>
    </div>
);

const refToShowButtonCsv = [
    "professionals",
    "patients",
    "functionary",
    "diagnostician",
];

export const ExportCSV = ({
    onUploadDataModalCsv,
    onUploadDataModalPdf,
    onMainFormModal,
    onMainFormModalEdit,
    data,
    tableData,
    columns,
    // noHeader = false,
    tableTitle,
    reference,
    isEmptyDataRef,
    handleSearch,
    searchTerm,
    clearSearch,
}: UploadDataModalProps) => {
    // const [selectedRows, setSelectedRows] = React.useState([]);
    // const [toggleCleared, setToggleCleared] = React.useState(false);
    // const [dataTable, setDataTable] = React.useState(data);

    const campusIsEmpty = isEmptyDataRef && reference === "areas";

    const actionsMemo = useMemo(() => {
        return (
            <div className="tw-flex tw-justify-between tw-w-full tw-space-x-4">
                <div className="tw-flex tw-flex-1 tw-relative">
                    <Form.Control
                        value={searchTerm}
                        name="search"
                        type="text"
                        minLength={2}
                        maxLength={250}
                        placeholder="Búsqueda"
                        className="form-control tw-w-full"
                        aria-label="search"
                        onChange={handleSearch}
                    />
                    {searchTerm && (
                        <Button
                            className="tw-absolute tw-right-0 tw-bottom-0 text-gray-500 hover:text-gray-700"
                            onClick={clearSearch}
                        >
                            <TfiClose size={16} className="" />
                        </Button>
                    )}
                </div>
                {![
                    "roles",
                    "country",
                    "departments",
                    "cities",
                    "documentTypes",
                ].includes(reference) &&
                    onMainFormModal && (
                        <MainFormModal
                            campusIsEmpty={campusIsEmpty}
                            onMainFormModal={onMainFormModal}
                        />
                    )}
                {refToShowButtonCsv.includes(reference) &&
                    onUploadDataModalCsv && (
                        <UploadDataCsvModal
                            onUploadDataModalCsv={onUploadDataModalCsv}
                        />
                    )}
                {onUploadDataModalPdf && (
                    <UploadDataPdfModal
                        onUploadDataModalPdf={onUploadDataModalPdf}
                    />
                )}
                {data.length > 0 && (
                    <Export onExport={() => downloadCSV(data, tableTitle)} />
                )}
            </div>
        );
    }, [searchTerm, handleSearch, clearSearch, reference, onMainFormModal, campusIsEmpty, onUploadDataModalCsv, onUploadDataModalPdf, data, tableTitle]);

    // const handleRowSelected = React.useCallback((state: any) => {
    //     setSelectedRows(state.selectedRows);
    // }, []);

    const handleRowEdit = (row: any, event: any) => {
        // console.log(row);
    };

    const conditionalRowStyles = [
        {
            when: (row: any) => row.isDeleted === true,
            style: {
                display: "none",
            },
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    // const contextActionsMemo = React.useMemo(() => {
    //     const handleDelete = () => {
    //         Swal.fire({
    //             title: `Are you sure you want to delete:\r ${selectedRows.map(
    //                 (r: TableDataItemOld) => r.SNO,
    //             )}?`,
    //             text: "You won't be able to revert this!",
    //             icon: "warning",
    //             showCancelButton: true,
    //             // confirmButtonColor: "#3085d6",
    //             // cancelButtonColor: "#d33",
    //             confirmButtonText: "Yes, delete it!",
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 Swal.fire(
    //                     "Deleted!",
    //                     "Your file has been deleted.",
    //                     "success",
    //                 );
    //                 setToggleCleared(!toggleCleared);
    //                 setDataTable(differenceBy(dataTable, selectedRows, "SNO"));
    //             } else {
    //                 setToggleCleared(!toggleCleared);
    //             }
    //         });
    //     };

    //     return (
    //         <Button key="delete" onClick={handleDelete}>
    //             Delete
    //         </Button>
    //     );
    // }, [dataTable, selectedRows, toggleCleared]);

    const tableDatas = campusIsEmpty
        ? {
            columns: [],
            data: [],
        }
        : tableData;

    return (
        <DataTableExtensions
            export={false}
            print={false}
            filter={false}
            {...tableDatas}
            filterPlaceholder="Buscar"
        >
            <DataTable
                // selectableRows
                // contextActions={contextActionsMemo}
                // clearSelectedRows={toggleCleared}
                // onRowClicked={handleRowEdit}
                // onSelectedRowsChange={handleRowSelected}
                // conditionalRowStyles={conditionalRowStyles}
                noDataComponent={
                    <NoDataCard
                        emptyRef={isEmptyDataRef}
                        reference={reference}
                    />
                }
               /*  onRowClicked={(row: any, event) => {
                    if (reference === "zones" || (!["roles", "country", "departments", "cities", "documentTypes"].includes(reference) && !row.isDeleted)) {
                        onMainFormModalEdit(row);
                    }
                }} */
                //pointerOnHover={reference !== "roles"}
                defaultSortFieldId={2}
                columns={columns}
                data={data}
                // data={dataTable}
                actions={actionsMemo}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                highlightOnHover
                // title={tableTitle}
                // progressPending={dataTable ? false : true}
                theme="solarized"
                customStyles={customStyles}
            />
        </DataTableExtensions>
    );
};
