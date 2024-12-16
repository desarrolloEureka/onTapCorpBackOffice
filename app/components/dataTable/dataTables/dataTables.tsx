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
import { FiFilter } from "react-icons/fi";
import employeesMostVisits from "@/components/employeesMostVisits/employeesMostVisits";
// import Swal from "sweetalert2";
import moment from "moment";
import { unstable_createMuiStrictModeTheme } from "@mui/material";

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

function convertArrayOfObjectsToCSV(
  array: object[],
  reference: string
): string {
  if (array.length < 1) {
    return "";
  }
  let result: string;
  let keys: any;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  result = "";

  const convertToHoursAndMinutes = (horaDuracionISO: number): string => {
    const hours = Math.floor(
      (horaDuracionISO % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.ceil(
      (horaDuracionISO % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hours} hora${hours !== 1 ? "s" : ""} y ${minutes} minuto${
      minutes !== 1 ? "s" : ""
    }`;
  };

  const formatearFecha = (fechaISO: string): string => {
    if (fechaISO != "-") {
      return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    } else {
      return "-";
    }
  };

  const formatearFechaDias = (fechaISO: string): string => {
    if (fechaISO != "-") {
      return moment(fechaISO).format("DD/MM/YYYY");
    } else {
      return "-";
    }
  };

  const formatearFechaHoras = (fechaISO: string): string => {
    if (fechaISO != "-") {
      return moment(fechaISO).format("HH:mm:ss");
    } else {
      return "-";
    }
  };

  if (reference == "workingday") {
    keys = [
      "startDay",
      "endDay",
      "firstName",
      "lastName",
      "documentType",
      "documentNumber",
      "position",
      "longitude",
      "latitude",
      "totalTime",
    ];
    const headers: Record<string, string> = {
      startDay: "Fecha Inicio",
      endDay: "Fecha Final",
      firstName: "Nombres",
      lastName: "Apellidos",
      documentType: "Tipo de Documento",
      documentNumber: "Documento",
      position: "Posición",
      longitude: "Longitud",
      latitude: "Latitud",
      totalTime: "Jornada laboral",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "meetings") {
    keys = [
      "date",
      "meetingStart",
      "meetingEnd",
      "firstName",
      "lastName",
      "companyNameToVisit",
      "contactName",
      "email",
      "subject",
      "name",
      "observations",
    ];
    const headers: Record<string, string> = {
      date: "Fecha",
      meetingStart: "Hora Inicio",
      meetingEnd: "Hora Final",
      firstName: "Nombres",
      lastName: "Apellidos",
      companyNameToVisit: "Cliente",
      contactName: "Contacto",
      email: "Correo Contacto",
      subject: "Asunto",
      name: "Estado Reunión",
      observations: "Observaciones",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "employees") {
    keys = [
      "createdDate",
      "firstName",
      "lastName",
      "documentType",
      "documentNumber",
      "position",
      "phone",
      "email",
      "isGPSActive",
    ];
    const headers: Record<string, string> = {
      createdDate: "Fecha creación",
      firstName: "Nombres",
      lastName: "Apellidos",
      documentType: "Tipo de Documento",
      documentNumber: "Número de Documento",
      position: "Cargo",
      phone: "Teléfono",
      email: "Correo Empleado",
      isGPSActive: "GPS",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "superadminEmployees") {
    keys = [
      "createdDate",
      "firstName",
      "lastName",
      "documentType",
      "documentNumber",
      "position",
      "phone",
      "email",
      "companyName"
    ];
    const headers: Record<string, string> = {
      createdDate: "Fecha creación",
      firstName: "Nombres",
      lastName: "Apellidos",
      documentType: "Tipo de Documento",
      documentNumber: "Número de Documento",
      position: "Cargo",
      phone: "Teléfono",
      email: "Correo Empleado",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "statisticalReports") {
    keys = [
      "createdDate",
      "firstName",
      "lastName",
      "documentNumber",
      "email",
      "phone",
    ];

    const headers: Record<string, string> = {
      createdDate: "Fecha Registro",
      firstName: "Nombres",
      lastName: "Apellidos",
      documentNumber: "Número de Identificación",
      email: "Correo",
      phone: "Teléfono",
    };

    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else {
    keys = Object.keys(array[0]);
    result += keys.join(columnDelimiter);
  }
  result += lineDelimiter;

  array.forEach((item: any) => {
    let ctr = 0;
    keys.forEach((key: string) => {
      if (ctr > 0) result += columnDelimiter;
      if (
        reference === "workingday" &&
        key === "totalTime" &&
        typeof item[key] === "number"
      ) {
        result += convertToHoursAndMinutes(item[key]);
      } else if (
        (reference === "workingday" && key === "startDay") ||
        key === "endDay"
      ) {
        result += formatearFecha(item[key]);
      } else if (reference === "meetings" && key === "date") {
        result += formatearFechaDias(item[key]);
      } else if (
        (reference === "meetings" && key === "meetingStart") ||
        key === "meetingEnd"
      ) {
        result += formatearFechaHoras(item[key]);
      } else {
        result += item[key] !== undefined ? item[key] : "";
      }
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}

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

//componente para el filtro de empleados por campus
const BranchFilter = ({
  branches,
  setSelectedBranch,
}: {
  branches: string[];
  setSelectedBranch: (branch: string) => void;
}) => (
  <Form.Group controlId="branchFilter">
    <Form.Label style={{ fontSize: "15px" }}>Filtrar por Sede</Form.Label>
    <Form.Control
      as="select"
      onChange={(e) => setSelectedBranch(e.target.value)}
      defaultValue=""
    >
      <option value="">Selecciona una Sede</option>
      {branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </Form.Control>
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
  handleSearchAndFilter,
  searchTerm,
  clearSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
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
          {(searchTerm || endDate) && (
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
  );
};
