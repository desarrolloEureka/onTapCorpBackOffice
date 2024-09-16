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

const MainFormModal = ({ onMainFormModal }: UploadDataButtonModalProps) => (
    <Button onClick={onMainFormModal}>
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
                        <MainFormModal onMainFormModal={onMainFormModal} />
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
    }, [
        searchTerm,
        handleSearch,
        clearSearch,
        reference,
        onMainFormModal,
        onUploadDataModalCsv,
        onUploadDataModalPdf,
        data,
        tableTitle,
    ]);

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

    return (
        <DataTableExtensions
            export={false}
            print={false}
            filter={false}
            {...tableData}
            filterPlaceholder="Buscar"
        >
            <DataTable
                noDataComponent={
                    <NoDataCard
                        emptyRef={isEmptyDataRef}
                        reference={reference}
                    />
                }
                defaultSortFieldId={2}
                columns={columns}
                data={data}
                actions={actionsMemo}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                highlightOnHover
                theme="solarized"
                customStyles={customStyles}
            />
        </DataTableExtensions>
    );
};
