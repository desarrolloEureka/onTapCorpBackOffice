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
import { TfiClose, TfiExport, TfiImport } from "react-icons/tfi";
import { VscAdd } from "react-icons/vsc";
import { FiFilter } from "react-icons/fi";
import employeesMostVisits from "@/components/employeesMostVisits/employeesMostVisits";
// import Swal from "sweetalert2";
import moment from "moment";
import { unstable_createMuiStrictModeTheme } from "@mui/material";
import convertArrayOfObjectsToCSV from "./exportFunction";
import { IoClose } from "react-icons/io5";

const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

createTheme("solarized", "dark");

const customStyles = {
  headCells: {
    style: {
      color: "#8bb8e7",
    },
  },
};

function downloadCSV(array: any[], tableTitle: string, reference: string) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array, reference);
  if (csv === "") return;

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

//componente para el filtro de empleados por Area por Sede por Zona por Ruta
const BranchFilter = ({
  names,
  titulo,
  branches = [],
  setSelectedBranch,
}: {
  names: string;
  titulo: string;
  branches: any[];
  setSelectedBranch: (branch: string) => void;
}) => {
  //console.log("branches", branches);
  return (
    <Form.Group controlId="branchFilter">
      <Form.Label style={{ fontSize: "15px" }} className="filter-label">
        Filtrar por {titulo}
      </Form.Label>
      <Form.Control
        style={{
          width: "170px",
        }}
        as="select"
        onChange={(e) => setSelectedBranch(e.target.value)}
        defaultValue=""
      >
        <option value="">
          {branches.length > 0
            ? `Selecciona una ${titulo}`
            : `No hay ${titulo?.toLocaleLowerCase()}s disponibles`}
        </option>
        {branches.map((branch) => {
          const displayValue =
            names === "name" ? branch?.[names]?.[0] : branch?.[names];

          return (
            <option key={branch?.uid || branch} value={branch?.uid}>
              {displayValue}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

const UploadDataCsvModal = ({
  onUploadDataModalCsv,
}: UploadDataButtonModalProps) => (
  <Button onClick={onUploadDataModalCsv}>
    <TfiImport size={18} className="" />
  </Button>
);

const MainFormModal = ({ onMainFormModal }: UploadDataButtonModalProps) => (
  <Button onClick={onMainFormModal}>
    <VscAdd size={18} className="" />
  </Button>
);

// Componente para la fecha de inicio
const StartDayInput = ({
  startDate,
  setStartDate,
}: {
  startDate: string;
  setStartDate: (value: string) => void;
}) => (
  <Form.Group controlId="startDate">
    <Form.Label style={{ fontSize: "15px" }}>Fecha Inicio</Form.Label>
    <Form.Control
      type="date"
      value={startDate || ""}
      onChange={(e) => {
        setStartDate(e.target.value);
      }}
      max={new Date().toISOString().split("T")[0]} // Establece la fecha máxima como hoy
    />
  </Form.Group>
);

// Componente para la fecha de fin
const EndDayInput = ({
  endDate,
  startDate,
  setEndDate,
}: {
  endDate: string;
  startDate: string;
  setEndDate: (value: string) => void;
}) => (
  <Form.Group controlId="endDate">
    <Form.Label style={{ fontSize: "15px" }}>Fecha Fin</Form.Label>
    <Form.Control
      type="date"
      value={endDate || ""}
      onChange={(e) => {
        setEndDate(e.target.value); // Actualiza el estado
      }}
      max={new Date().toISOString().split("T")[0]} // Establece la fecha máxima como hoy
      min={startDate}
      disabled={!startDate}
    />
  </Form.Group>
);

const Filter = ({
  handleSearchAndFilter,
}: {
  handleSearchAndFilter: (e: any) => void;
}) => (
  <Button onClick={handleSearchAndFilter}>
    <FiFilter size={18} className="" />
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

const refToShowButtonCsv = ["employees"];

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
  handleSearchAndFilter,
  searchTerm,
  clearSearch,
  startDate,
  setStartDate,
  endDate,
  setSelectedArea,
  selectedArea,
  selectedSede,
  setSelectedSede,
  setEndDate,
  selectedZona,
  setSelectedZona,
  selectedRuta,
  setSelectedRuta,
  AreaData,
  SedeData,
  RutaData,
  ZonaData,
  isShowAlertCSV,
  setIsShowAlertCSV,
  dataAlertCSV,
  setDataShowAlertCSV
}: UploadDataModalProps) => {
  const actionsMemo = useMemo(() => {
    return (
      <div className="tw-flex tw-justify-between tw-w-full tw-space-x-4 tw-items-center">
        <div className="tw-flex tw-w-1/2 tw-h-1/2 tw-relative">
          <Form.Control
            value={searchTerm}
            name="search"
            type="text"
            minLength={2}
            maxLength={250}
            placeholder="Búsqueda"
            className="form-control tw-w-full"
            aria-label="search"
            onChange={handleSearchAndFilter}
          />

          {(searchTerm ||
            endDate ||
            selectedArea ||
            selectedSede ||
            selectedZona ||
            selectedRuta) && (
              <Button
                className="tw-absolute tw-right-0 tw-bottom-0 text-gray-500 hover:text-gray-700"
                onClick={clearSearch}
              >
                <TfiClose size={16} className="" />
              </Button>
            )}
        </div>
        <div className="tw-flex tw-items-center tw-space-x-4">
          {[
            "workingday",
            "meetings",
            "employees",
            "superadminEmployees",
            "statisticalReports",
          ].includes(reference) && (
              <>
                <BranchFilter
                  names={"areaName"}
                  titulo={"Area"}
                  setSelectedBranch={setSelectedArea}
                  branches={AreaData}
                />
                <BranchFilter
                  names={"name"}
                  titulo={"Sede"}
                  setSelectedBranch={setSelectedSede}
                  branches={SedeData}
                />
                <BranchFilter
                  names={"zoneName"}
                  titulo={"Zona"}
                  setSelectedBranch={setSelectedZona}
                  branches={ZonaData}
                />
                <BranchFilter
                  names={"routeName"}
                  titulo={"Ruta"}
                  setSelectedBranch={setSelectedRuta}
                  branches={RutaData}
                />
                <StartDayInput
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
                <EndDayInput
                  endDate={endDate}
                  startDate={startDate}
                  setEndDate={setEndDate}
                />
                <Filter handleSearchAndFilter={handleSearchAndFilter} />
              </>
            )}
          {![
            "roles",
            "country",
            "departments",
            "cities",
            "documentTypes",
            "workingday",
            "meetings",
            "superadminEmployees",
            "statisticalReports",
          ].includes(reference) &&
            onMainFormModal && (
              <MainFormModal onMainFormModal={onMainFormModal} />
            )}
          {refToShowButtonCsv.includes(reference) && onUploadDataModalCsv && (
            <UploadDataCsvModal onUploadDataModalCsv={onUploadDataModalCsv} />
          )}
          {onUploadDataModalPdf && (
            <UploadDataPdfModal onUploadDataModalPdf={onUploadDataModalPdf} />
          )}
          {data.length > 0 && (
            <Export
              onExport={() =>
                downloadCSV(tableData?.data ?? [], tableTitle, reference)
              }
            />
          )}
        </div>
      </div>
    );
  }, [
    searchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleSearchAndFilter,
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
    <>
      {isShowAlertCSV && dataAlertCSV.length > 0 && reference === "employees" && (
        <div
          className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg tw-bg-yellow-100 dark:text-blue-400"
          role="alert"
        >

          <div className="tw-flex tw-justify-end tw-items-center tw-h-2 text-sm text-blue-800 rounded-lg">
            <button
              onClick={() => setIsShowAlertCSV(false)}
              className="tw-w-[5%] tw-h-full tw-flex tw-justify-center tw-items-center tw-p-0 tw-border-none tw-bg-transparent tw-outline-none">
              <IoClose size={24} />
            </button>
          </div>

          <svg
            className="flex-shrink-0 inline me-3 mt-[1px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            width="16"
            height="16"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Errores encontrados en CSV:</span>
            <ul className="mt-1.5 list-disc list-inside">
              {dataAlertCSV.map((item: any, index: any) => (
                <li key={index}>
                  Línea {item.line}:
                  <ul className="mt-1.5 list-disc list-inside ml-4">
                    {item.errors.map((error: any, errorIndex: any) => (
                      <li key={errorIndex}>{error}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}


      <DataTableExtensions
        export={false}
        print={false}
        filter={false}
        {...tableData}
        filterPlaceholder="Buscar"
      >
        <DataTable
          noDataComponent={
            <NoDataCard emptyRef={isEmptyDataRef} reference={reference} />
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
    </>

  );
};
