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
  getLocationsByCompanyIdAndWorkingdayQuery,
  getMeetingsByCompanyIdQuery,
  listenToWorkAreaByCompanyIdQuery,
  listenToEmployeesByCompanyIdQuery,
  getAllEmployeesQuery,
  getAllCompaniesQuery,
  getLogosBySuperAdminQuery,
} from "@/queries/documentsQueries";
import { DataMainFormObject } from "@/types/mainForm";
import { setDataTable } from "@/types/tables";
import { IconButton } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { LocalVariable } from "@/types/global";
import { ref } from "firebase/storage";
import { deleteBackgroundImage } from "@/firebase/Documents";
require("dotenv").config();

const CustomTitle = ({ row }: any) => (
  <div data-tag="allowRowEvents">
    <span
      className={`status ${row.isActive ? "bg-success" : "bg-danger"} `}
    ></span>
    {row.isActive ? "Activo" : "Inactivo"}
  </div>
);

const CustomTitleTwo = ({ row }: any) => (
  <div data-tag="allowRowEvents">
    <span
      className={`status ${row.isGPSActive ? "bg-success" : "bg-danger"} `}
    ></span>
    {row.isGPSActive ? "Activo" : "Inactivo"}
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
  const { userData, companyData } = useAuth();
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
  const [handleShowQr, setHandleShowQr] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSede, setSelectedSede] = useState<string>("");
  const [selectedZona, setSelectedZona] = useState<string>("");
  const [selectedRuta, setSelectedRuta] = useState<string>("");

  const [AreaData, setAreaData] = useState<any>();
  const [SedeData, setSedeData] = useState<any>();
  const [ZonaData, setZonaData] = useState<any>();
  const [RutaData, setRutaData] = useState<any>();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metadata, setMetadata] = useState<any>();
  const [selectReport, setSelectReport] = useState("");

  const [workAreas, setWorkAreas] = useState<any>([]);
  const [employeesData, setEmployeesData] = useState<any>([]);

  const [createdValid, setCreatedValid] = useState(false);
  const [createdGPSValid, setCreatedGPSValid] = useState(false);
  const [statisticsDetail, setStatisticsDetail] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [isShowQR, setIsShowQR] = useState(false);
  const [isShowAlertCSV, setIsShowAlertCSV] = useState(false);
  const [dataAlertCSV, setDataShowAlertCSV] = useState([]);

  const theme = localStorage.getItem("@theme");
  const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

  let maxAddresses = 0;

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

  const formatearHora = (horaDuracionISO: any): string => {
    if (horaDuracionISO !== "-") {
      const hours = Math.floor(
        (horaDuracionISO % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.ceil(
        (horaDuracionISO % (1000 * 60 * 60)) / (1000 * 60)
      );

      return `${hours} hora${hours !== 1 ? "s" : ""} y ${minutes} minuto${minutes !== 1 ? "s" : ""
        }`;
    } else {
      return "-";
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
    maxAddresses = Math.max(...documents.map(doc => (doc?.addresses || []).length));
    const formatedAddress = documents.map((doc) => {
      // Extraer direcciones del array 'addresses'
      const addresses = doc.addresses || [];
      const filledAddresses = [...addresses, ...Array(maxAddresses - addresses.length).fill("")];
      const addressFields: { [key: string]: string } = {};
      for (let i = 0; i < maxAddresses; i++) {
        addressFields[`Address${i + 1}`] = filledAddresses[i];
      }

      return {
        zoneName: doc.zoneName || "-",
        zoneManager: doc.zoneManager || "-",
        ...addressFields,
        addresses: filledAddresses,
        uid: doc.uid,
      };
    });
    return formatedAddress;
  };

  const formatDataByDate = (documents: any[] | { [key: string]: any }) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    return documents.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const formatEmployeesData = (documents: any[] | { [key: string]: any }) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    const documentsDate = documents.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const result: any[] = [];
    documentsDate.forEach((document) => {
      result.push({
        ...document,
        phone: document?.phones[0]?.text,
        email: document?.emails[0]?.text,
        actions: { uid: document?.uid, preview: document?.preview }
      });
    });
    return result;
  };

  const formatFixedPointsData = (documents: any[] | { [key: string]: any }) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    const documentsDate = documents.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const result: any[] = [];
    documentsDate.forEach((document) => {
      result.push({
        ...document,
        namePoint: document?.directions[0]?.pointName,
        address: document?.directions[0]?.address,
      });
    });
    return result;
  };

  const formatReportDataRoutes = (
    documents: any[] | { [key: string]: any }
  ) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    const documentsDate = documents.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const result: any[] = [];
    documentsDate.forEach((document) => {
      let estimatedTimeFormat =
        (document?.estimatedHours || 0) +
        (document?.estimatedHours === 1 ? " hora " : " horas ") +
        (document?.estimatedMinutes || 0) +
        (document?.estimatedMinutes === 1 ? " minuto" : " minutos");

      result.push({
        ...document,
        estimatedTime: estimatedTimeFormat,
      });
    });
    return result.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const formatReportData = async (documents: any[], employees: any[]) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    const documentsDate = documents.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const tempStartDays: { [key: string]: string | null } = {};
    const tempEndCoordinates: { [key: string]: { latitude: number; longitude: number; address: string } } = {};
    const result: any[] = [];

    for (const document of documentsDate) {
      const employeeData = employees.find(
        (employee) => employee.uid === document.employeeId
      );
      if (employeeData) {
        let startDay = tempStartDays[document.employeeId] || null;

        if (document.subject === "startDay") {
          if (!startDay) {
            // Si no hay un startDay previo pendiente, almacenamos el actual
            tempStartDays[document?.employeeId] = document.timestamp;
            tempEndCoordinates[document?.employeeId] = {
              address: document?.address,
              latitude: document?.latitude,
              longitude: document?.longitude,
            };
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
              endDay: "-", // No hay endDay correspondiente
              totalTime: "-", // No hay calculo de jornada
              addressStartDay: document?.address || "-",
              latitudeStartDay: document?.latitude || "-",
              longitudeStartDay: document?.longitude || "-",
              addressEndDay: "-",
              latitudeEndDay: "-",
              longitudeEndDay: "-",
            });
            // Actualizamos el nuevo startDay en tempStartDays
            tempStartDays[document.employeeId] = document.timestamp;
          }
        } else if (document.subject === "endDay") {
          startDay = tempStartDays[document.employeeId]; // Recuperar el startDay pendiente
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
              totalTime:
                new Date(document.timestamp).getTime() -
                new Date(startDay).getTime(),
              addressStartDay: tempEndCoordinates[document.employeeId]?.address,
              latitudeStartDay: tempEndCoordinates[document.employeeId]?.latitude,
              longitudeStartDay: tempEndCoordinates[document.employeeId]?.longitude,
              addressEndDay: document?.address,
              latitudeEndDay: document?.latitude,
              longitudeEndDay: document?.longitude,
            });
            // Limpiamos el startDay almacenado
            tempStartDays[document.employeeId] = null;
            tempEndCoordinates[document.employeeId] = { latitude: 0, longitude: 0, address: "" };
          }
        }
      }
    };

    // Procesar los startDay sin un endDay correspondiente al final
    for (const employeeId in tempStartDays) {
      if (tempStartDays[employeeId]) {
        const lastDocument = documentsDate.find(
          (doc) => doc.employeeId === employeeId && doc.subject === "startDay"
        );
        if (lastDocument) {
          const employeeData = employees.find(
            (employee) => employee.uid === employeeId
          );
          result.push({
            ...lastDocument,
            firstName: employeeData?.firstName[0],
            lastName: employeeData?.lastName[0],
            documentType: employeeData?.documentType[0],
            documentNumber: employeeData?.documentNumber[0],
            position: employeeData?.position[0],
            startDay: tempStartDays[employeeId],
            endDay: "-", // No hay endDay
            totalTime: "-", // No hay calculo de jornada
            timestamp: tempStartDays[employeeId],
            addressStartDay: lastDocument?.address,
            latitudeStartDay: lastDocument?.latitude,
            longitudeStartDay: lastDocument?.longitude,
            addressEndDay: "-",
            latitudeEndDay: "-",
            longitudeEndDay: "-",
          });
        }
      }
    }
    return result.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const formatReportDataMeetings = async (
    documents: any[],
    employees: any[],
    meetingStatus: any[]
  ) => {
    if (!Array.isArray(documents)) {
      return [];
    }
    const documentsDate = documents.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const result: any[] = [];
    for (const document of documentsDate) {
      const employeeData = employees.find(
        (employee) => employee.uid === document.employeeId
      );
      const meetingStatusData = meetingStatus.find(
        (meeting) => meeting.uid === document.meetingStatusId
      );

      if (employeeData && meetingStatusData) {
        result.push({
          ...document,
          firstName: employeeData.firstName[0],
          lastName: employeeData.lastName[0],
          name: meetingStatusData.name,
          date: document?.timestamp,
          meetingStart: document?.meetingStart?.timestamp,
          addressStart: document?.meetingStart?.address || "",
          latitudeStart: document?.meetingStart?.latitude || "",
          longitudeStart: document?.meetingStart?.longitude || "",
          meetingEnd: document?.meetingEnd?.timestamp,
          addressEnd: document?.meetingEnd?.address || "",
          latitudeEnd: document?.meetingEnd?.latitude || "",
          longitudeEnd: document?.meetingEnd?.longitude || "",
        });
      }
    };

    return result.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const prepareEmployeesData = async () => {
    try {
      // Obtener los empleados y las empresas
      const employees = await getAllEmployeesQuery();
      const companies = await getAllCompaniesQuery();

      const companiesMap: { [key: string]: { uid: string; businessName?: string[] } } = companies.reduce((map, company) => {

        if (company.uid) {
          map[company.uid] = company;
        } else {
          console.warn(`Empresa sin 'uid' encontrada:`, company);
        }
        return map;
      }, {} as { [key: string]: { uid: string; businessName?: string[] } });

      const enrichedEmployees = employees.map((employee) => {

        const company = companiesMap[employee.idCompany];

        // Log de los datos combinados por cada empleado
        //console.log(`Empleado: ${employee.firstName} ${employee.lastName}, Empresa: ${company?.businessName?.[0] || "Sin empresa"}`);

        return {
          ...employee,
          companyName: company?.businessName?.[0] || "Sin empresa",
          companyDetails: company || null,
        };
      });

      //console.log("Combinacion de empleados y empresas:", enrichedEmployees);

      return enrichedEmployees;

    } catch (error) {
      console.error("Error combinando los datos de empleados y empresas", error);
      return [];
    }
  };

  const prepareEmployeesWithCampus = async () => {
    try {
      // Obtener datos
      const employees = await getAllEmployeesQuery();
      const headquarters = await getHeadquartersByCompanyIdQuery(userData?.companyId);

      if (!employees || !headquarters) {
        console.error("Error: Empleados o sedes no disponibles.");
        return [];
      }

      // Crear mapa de sedes por idCompany
      const headquartersMap = headquarters.reduce((map, hq) => {
        if (hq.idCompany) {
          if (!map.has(hq.idCompany)) {
            map.set(hq.idCompany, []);
          }
          map.get(hq.idCompany)?.push(hq);
        } else {
          console.warn("Sede sin 'idCompany' encontrada:", hq);
        }
        return map;
      }, new Map());

      // Combinar empleados con las sedes correspondientes
      const enrichedEmployees = employees.map((employee) => ({
        ...employee,
        headquarters: headquartersMap.get(employee.idCompany) || [],
      }));

      //console.log("Combinación de empleados y sedes:", enrichedEmployees);

      return enrichedEmployees;
    } catch (error) {
      console.error("Error combinando los datos de empleados y sedes", error);
      return [];
    }
  };




  const getAllDocuments = useCallback(async () => {
    let documents: any = [];
    if (selectReport === "metadatos") {
      setStatisticsDetail(documents);
      documents = metadata?.DataMetrics;
      //console.log("datos", documents);
    } else {
      documents =
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
                      : []
                  )
                  : reference === "notifications"
                    ? formatDataByDate(
                      userData && userData?.companyId
                        ? await getNotificationsByCompanyIdQuery(userData?.companyId)
                        : []
                    )
                    : reference === "workAreas"

                      ? formatDataByDate(workAreas)
                      : reference === "employees"
                        ? formatEmployeesData(employeesData)
                        : reference === "superadminEmployees"
                          ? formatEmployeesData(await prepareEmployeesData())
                          : reference === "statisticalReports"
                            ? formatEmployeesData(
                              userData && userData?.companyId
                                ? await getEmployeesByCompanyIdQuery(userData?.companyId)
                                : []
                            )
                            : reference === "meetingStatus"
                              ? formatDataByDate(
                                userData && userData?.companyId
                                  ? await getMeetingStatusByCompanyIdQuery(userData?.companyId)
                                  : []
                              )
                              : reference === "fixedPoints"
                                ? formatFixedPointsData(
                                  userData && userData?.companyId
                                    ? await getDocsByCompanyIdQuery(userData?.companyId, reference)
                                    : []
                                )
                                : reference === "routes"
                                  ? formatReportDataRoutes(
                                    userData && userData?.companyId
                                      ? await getRoutesByCompanyIdQuery(userData?.companyId)
                                      : []
                                  )
                                  : reference === "campus"
                                    ? formatDataByDate(
                                      userData && userData?.companyId
                                        ? await getHeadquartersByCompanyIdQuery(userData?.companyId)
                                        : []
                                    )
                                    : reference === "circular" ||
                                      reference === "events" ||
                                      reference === "policy" ||
                                      reference === "forms" ||
                                      reference === "news" ||
                                      reference === "logos" ||
                                      reference === "backgroundImages"
                                      ? formatDataByDate(
                                        userData && userData?.companyId
                                          ? await getDocsByCompanyIdQuery(userData?.companyId, reference)
                                          : []
                                      )
                                      : reference === "logosSuperAdmin" ?
                                        formatDataByDate(
                                          userData
                                            ? await getLogosBySuperAdminQuery(userData?.uid, "logos")
                                            : []
                                        )
                                        : reference === "workingday"
                                          ? await formatReportData(
                                            userData && userData?.companyId
                                              ? await getLocationsByCompanyIdAndWorkingdayQuery(
                                                userData?.companyId
                                              )
                                              : [],
                                            userData && userData?.companyId
                                              ? await getEmployeesByCompanyIdQuery(userData?.companyId)
                                              : []
                                          )
                                          : reference === "meetings"
                                            ? await formatReportDataMeetings(
                                              userData && userData?.companyId
                                                ? await getMeetingsByCompanyIdQuery(userData?.companyId)
                                                : [],
                                              userData && userData?.companyId
                                                ? await getEmployeesByCompanyIdQuery(userData?.companyId)
                                                : [],
                                              userData && userData?.companyId
                                                ? await getMeetingStatusByCompanyIdQuery(userData?.companyId)
                                                : []
                                            )
                                            : await getAllDocumentsQuery(reference);
    }
    //console.log("datos = ", documents);
    const labelToDisplay = ["professionals", "patients", "functionary"];
    //reference === "employees" && console.log('documents ', documents);

    if (documents?.length > 0) {
      const cols: any[] = [];
      const docs = documents[0];
      const entries = Object.keys(docs);

      // Define column names based on reference
      let columnNamesToDisplay: ColumnNamesToDisplay = {};
      if (selectReport === "metadatos") {
        columnNamesToDisplay = {
          viewsDate: "Fecha visualización",
          viewsTime: "Hora visualización",
          ipAddress: "IP",
          typeDevice: "Tipo dispositivo",
          so: "Sistema Opetativo",
          countryView: "Pais",
          cityView: "Ciudad",
        };
      } else if (reference === "documentTypes" || reference === "country") {
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
        }
        // Añadir dinámicamente las columnas de direcciones
        for (let i = 1; i <= maxAddresses; i++) {
          columnNamesToDisplay[`Address${i}`] = `Dirección ${i}`;
        }
      } else if (reference === "employees") {
        columnNamesToDisplay = {
          actions: "Acciones",
          createdDate: "Fecha creación",
          firstName: "Nombre",
          lastName: "Apellido",
          documentType: "Tipo de Documento",
          documentNumber: "Número de Documento",
          position: "Cargo",
          phone: "Teléfono",
          email: "Correo Empleado",
          isActive: "Estado",
          isGPSActive: "GPS",
        };
      } else if (reference === "superadminEmployees") {
        columnNamesToDisplay = {
          preview: "Acciones",
          createdDate: "Fecha creación",
          firstName: "Nombre",
          lastName: "Apellido",
          documentType: "Tipo de Documento",
          documentNumber: "Número de Documento",
          position: "Cargo",
          phone: "Teléfono",
          email: "Correo Empleado",
          companyName: "Nombre de la Empresa"
        };
      } else if (reference === "statisticalReports") {
        columnNamesToDisplay = {
          uid: "Acciones",
          createdDate: "Fecha Registro",
          firstName: "Nombre",
          lastName: "Apellido",
          documentNumber: "Número de Identificación",
          phone: "Teléfono",
          email: "Correo",
        };
      } else if (reference === "routes") {
        columnNamesToDisplay = {
          uid: "Acciones",
          // createdDate: "Fecha de creación",
          // createdTime: "Hora de creación",
          timestamp: "Fecha Registro",
          routeName: "Nombre de la ruta",
          routeManager: "Jefe de la ruta",
          zoneName: "Zona correspondiente",
          estimatedTime: "Tiempo estimado",
        };
      } else if (reference === "logos" || reference === "logosSuperAdmin") {
        columnNamesToDisplay = {
          uid: "Acciones",
          // createdDate: "Fecha de creación",
          // createdTime: "Hora de creación",
          timestamp: "Fecha Registro",
          logoName: "Nombre",
          imageUrl: "Imagen",
        };
      } else if (reference === "backgroundImages") {
        columnNamesToDisplay = {
          uid: "Acciones",
          timestamp: "Fecha Registro",
          name: "Nombre",
          imageUrl: "Imagen",
        };
      } else if (reference === "meetingStatus") {
        columnNamesToDisplay = {
          uid: "Acciones",
          timestamp: "Fecha Registro",
          name: "Nombre Estado Reunión",
          isActive: "Estado",
        };
      } else if (reference === "campus") {
        columnNamesToDisplay = {
          uid: "Acciones",
          timestamp: "Fecha Registro",
          name: "Nombre Sede",
          address: "Dirección",
          // url: "Url Locación",
          isActive: "Estado",
        };
      } else if (reference === "fixedPoints") {
        columnNamesToDisplay = {
          uid: "Acciones",
          timestamp: "Fecha Registro",
          name: "Nombre Categoría",
          namePoint: "Nombre Punto",
          address: "Dirección",
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
          startDay: "Fecha Inicio",
          endDay: "Fecha Final",
          firstName: "Nombres",
          lastName: "Apellidos",
          documentNumber: "Documento",
          totalTime: "Jornada Laboral",
          addressStartDay: "Dirección Inicio",
          addressEndDay: "Dirección Final",
        };
      } else if (reference === "meetings") {
        columnNamesToDisplay = {
          date: "Fecha",
          meetingStart: "Hora Inicio",
          meetingEnd: "Hora Final",
          firstName: "Nombres",
          lastName: "Apellidos",
          companyNameToVisit: "Cliente",
          addressStart: "Dirección Inicio",
          addressEnd: "Dirección Final",
          contactName: "Contacto",
          email: "Correo Contacto",
          subject: "Asunto",
          name: "Estado Reunion",
          observations: "Observaciones",
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
          name: labelToDisplay.includes(reference) ? "Nombres" : "Nombre",
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

      //console.log("omittedColumns", omittedColumns);

      const entriesFiltered = entries.filter((item) =>
        omittedColumns.includes(item)
      );

      const entriesSorted = entriesFiltered.sort((a, b): number => {
        return omittedColumns.indexOf(a) - omittedColumns.indexOf(b);
      });

      entriesSorted.forEach((val) => {
        const columnsData = {
          name: (
            <span className="title-header-table" style={{ fontSize: "15px" }}>
              {columnNamesToDisplay[val]}
            </span>
          ),
          selector: (row: any) =>
            val === "isActive" ? (
              <CustomTitle row={row} />
            ) : val === "isGPSActive" ? (
              <CustomTitleTwo row={row} />
            ) : val === "color" ? (
              <CustomColor row={row} />
            ) : val === "preview" ? (
              <div>
                {reference === "superadminEmployees" && (
                  <>
                    <IconButton onClick={() => onMainFormModalQR(row)}>
                      <QrCodeIcon
                        font-size={20}
                        className="icon-actions-table"
                      />
                    </IconButton>
                    <IconButton onClick={() => handleCopy(row[val])}>
                      <InsertLinkIcon
                        font-size={20}
                        className="icon-actions-table"
                      />
                    </IconButton>
                  </>
                )}
              </div>
            ) : val === "actions" ? (
              <div>
                {reference === "employees" ? (
                  <>
                    <IconButton onClick={() => onMainFormModalEdit(row)}>
                      <MdModeEdit size={20} className="icon-actions-table" />
                    </IconButton>
                    <IconButton onClick={() => onMainFormModalQR(row)}>
                      <QrCodeIcon
                        font-size={20}
                        className="icon-actions-table"
                      />
                    </IconButton>
                    <IconButton onClick={() => handleCopy(row.preview)}>
                      <InsertLinkIcon
                        font-size={20}
                        className="icon-actions-table"
                      />
                    </IconButton>
                  </>
                ) : null}
              </div>
            ) : val === "uid" ? (
              <div>
                {reference === "statisticalReports" ? (
                  <>
                    <IconButton
                      onClick={() => {
                        filterDataMetrics(row);
                      }}
                    >
                      <VisibilityIcon
                        font-size={20}
                        className="icon-actions-table"
                      />
                    </IconButton>
                  </>
                ) : reference === "employees" ? (
                  <>
                    <IconButton onClick={() => onMainFormModalEdit(row)}>
                      <MdModeEdit size={20} className="icon-actions-table" />
                    </IconButton>
                  </>
                ) : reference !== "routes" &&
                  reference !== "logos" &&
                  reference !== "backgroundImages" &&
                  reference !== "meetingStatus" &&
                  reference !== "circular" &&
                  reference !== "events" &&
                  reference !== "policy" &&
                  reference !== "forms" &&
                  reference !== "news" ? (
                  <>
                    <IconButton onClick={() => onMainFormModalEdit(row)}>
                      <MdModeEdit size={20} className="icon-actions-table" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => onMainFormModalEdit(row)}>
                      <MdModeEdit size={20} className="icon-actions-table" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(row, reference)}
                    >
                      <FaTrashCan size={20} className="icon-actions-table" />
                    </IconButton>
                  </>
                )}
              </div>
            ) : val === "timestamp" ||
              val === "startDay" ||
              val === "endDay" ||
              val === "createdDate" ? (
              formatearFecha(row[val])
            ) : val === "totalTime" ? (
              formatearHora(row[val])
            ) : val === "date" ? (
              formatearFechaDias(row[val])
            ) : val === "meetingStart" || val === "meetingEnd" ? (
              formatearFechaHoras(row[val])
            ) : val == "urlLink" || val === "url" ? (
              row[val] && row[val]?.length > 23 ? (
                row[val].slice(0, 23) + "..."
              ) : (
                row[val]
              )
            ) : val === "imageUrl" && reference === "backgroundImages" ? (
              <div>
                <Image src={row[val]} alt="Facebook" width={25} height={45} />
              </div>
            ) : val === "imageUrl" ? (
              <div>
                <Image src={row[val]} alt="Facebook" width={40} height={40} />
              </div>
            ) : (val === "id" && reference === "documentTypes") ||
              reference === "country" ||
              reference === "departments" ||
              reference === "cities" ? (
              row[val]
            ) : reference === "companies" || reference === "workAreas" ? (
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
              : val === "isActive" || val === "isGPSActive"
                ? "120px"
                : val === "content"
                  ? "50%"
                  : val === "issue"
                    ? "20%"
                    : val === "hour" || val === "issue"
                      ? "15%"
                      : reference === "companies" || reference === "employees" || reference === "superadminEmployees"
                        ? val === "uid"
                          ? "auto"
                          : "250px"
                        : reference === "workAreas"
                          ? val === "timestamp"
                            ? "15%"
                            : "auto"
                          : reference === "meetingStatus"
                            ? val === "uid"
                              ? "10%"
                              : "auto"
                            : reference === "meetings"
                              ? val === "date" || val === "meetingStart" || val === "meetingEnd"
                                ? "8%"
                                : "200px"
                              : reference === "zones"
                                ? val === "uid"
                                  ? "8%"
                                  : "200px"
                                : reference === "campus"
                                  ? val === "uid"
                                    ? "8%"
                                    : val === "address" ?
                                      "500px"
                                      : "220px"
                                  : reference === "fixedPoints"
                                    ? val === "timestamp"
                                      ? "200px" :
                                      val === "uid" || val === "color"
                                        ? "auto"
                                        : "280px"
                                    : reference === "workingday"
                                      ? val === "startDay" || val === "endDay" || val === "documentNumber"
                                        ? "160px"
                                        : "200px"
                                      :
                                      "auto",
          omit: !omittedColumns.includes(val),
          style:
            val === "uid" && reference === "meetingStatus"
              ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }
              : val === "uid"
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
  }, [reference, userData, employeesData, selectReport, metadata, workAreas]);

  const clearSearch = () => {
    setSearchTerm("");
    setStartDate("");
    setSelectedArea("");
    setSelectedRuta("");
    setSelectedZona("");

    setSelectedSede("");
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
      let itemTimestamp = new Date().getTime();
      if (item?.timestamp) {
        itemTimestamp = new Date(item.timestamp).getTime();
      } else if (item?.createdDate) {
        itemTimestamp = new Date(item.createdDate).getTime();
      }

      return itemTimestamp >= start && itemTimestamp <= end;
    });
  };

  // Función para filtrar por búsqueda
  const filterBySearch = (data: any[], value: string, reference: string) => {
    if (!value) {
      return data;
    }
    return data.filter((item: any) => {
      return _.some(item, (prop, key) => {
        if (reference === "departments") {
          return (
            key === "departamento" &&
            prop?.toString().toLowerCase().includes(value)
          );
        } else if (Array.isArray(prop)) {
          return prop.some((subProp) =>
            subProp?.toString().toLowerCase().includes(value)
          );
        }
        if (prop == null) {
          return false; // Si prop es null o undefined, no coincide
        }
        return prop.toString().toLowerCase().includes(value);
      });
    });
  };

  // Función para filtrar por área
  const filteredByArea = (data: any[], selectedArea: string) => {

    if (!selectedArea) {
      return data; // Si no se selecciona un área, devuelve los datos originales
    }
    return data.filter((item: any) => item?.selectedArea === selectedArea);
  };

  // Función para filtrar por sede
  const filteredBySede = (data: any[], selectedSede: string) => {
    if (!selectedSede) {
      return data; // Si no se selecciona un área, devuelve los datos originales
    }
    return data.filter((item: any) => item?.selectedHeadquarter === selectedSede);
  };

  // Función para filtrar por ruta
  const filteredByRuta = (data: any[], selectedRuta: string) => {
    if (!selectedRuta) {
      return data; // Si no se selecciona un área, devuelve los datos originales
    }
    return data.filter((item: any) => Object.values(item).includes(selectedRuta));
  };

  // Función para filtrar por zona
  const filteredByZona = (data: any[], selectedZona: string) => {
    if (!selectedZona) {
      return data; // Si no se selecciona un área, devuelve los datos originales
    }

    const rutasPorZona = RutaData && RutaData.filter((item: any) => item?.zone === selectedZona);
    const uidsRutas = rutasPorZona.map((ruta: any) => ruta?.uid);
    return data.filter((item: any) => Object.values(item).some(value => uidsRutas.includes(value)));
  };

  // Función combinada
  const handleSearchAndFilter = async (e: any) => {
    const value = e?.target?.value?.toLowerCase();
    setSearchTerm(value);

    // Filtrar por búsqueda
    const filteredBySearch = filterBySearch(
      getDocuments || [],
      value,
      reference
    );
    //console.log("getDocuments", getDocuments)
    // Filtrar por fecha
    const filteredByDate = filterByDate(filteredBySearch, startDate, endDate);

    //filtrar por area
    const filterByArea = filteredByArea(filteredByDate, selectedArea);

    //filtrar por sede
    const filterBySede = filteredBySede(filterByArea, selectedSede);

    //filtrar por ruta
    const filterByRuta = filteredByRuta(filterBySede, selectedRuta);

    //filtrar por zona
    const filterByZona = filteredByZona(filterByRuta, selectedZona);



    const currentData = {
      columns,
      data: filterByZona,
    };

    setDataTable(currentData);
  };

  const onUploadDataModalCsv = () => setHandleShowCsv(true);

  const onUploadDataModalPdf = () => setHandleShowPdf(true);

  const onMainFormModal = () => setHandleShowMainForm(true);

  const onShowQr = () => setHandleShowQr(true);

  const onMainFormModalEdit = (row: any) => {
    setHandleShowMainFormEdit(true);
    setEditData(row);
    setIsShowQR(false);
  };

  const onMainFormModalQR = (row: any) => {
    setHandleShowMainForm(true);
    setEditData(row);
    setIsShowQR(true);
  };

  const handleCopy = (row: any) => {
    navigator.clipboard
      .writeText(row)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      })
  };

  const filterDataMetrics = (row: any) => {
    setMetadata(row);
    setSelectReport("metadatos");
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
        } else if (reference === "backgroundImages") {
          await deleteBackgroundImage(row?.uid);
        } else {
          await deleteDocumentByIdQuery(reference, row?.uid).then(confirmAlert);
        }

        getAllDocuments();
      }
    });
  };

  useEffect(() => {
    getAllDocuments();
    if (!endDate && startDate) {
      const today = new Date().toISOString().split("T")[0];
      setEndDate(today); // Establece la fecha de hoy al estado endDate si está vacío
    }
  }, [getAllDocuments, endDate, startDate]);

  useEffect(() => {
    if (
      !handleShowMainForm ||
      !handleShowMainFormEdit ||
      !isEmptyDataRef ||
      handleShowQr
    ) {
      getAllDocuments();
    }
  }, [
    getAllDocuments,
    handleShowMainForm,
    handleShowMainFormEdit,
    isEmptyDataRef,
    handleShowQr,
  ]);

  useEffect(() => {
    const fetchData = listenToWorkAreaByCompanyIdQuery(
      "workAreas",
      setWorkAreas,
      userData?.companyId

    );
    //console.log("data", userData?.companyId)
    return () => fetchData();
  }, [userData?.companyId]);

  useEffect(() => {
    const fetchData = listenToEmployeesByCompanyIdQuery(
      "users",
      setEmployeesData,
      userData?.companyId
    );
    return () => fetchData();
  }, [userData?.companyId]);

  useEffect(() => {
    // Validar si se puede abrir el modal de creación
    const canOpenMainForm = () => {
      const activeEmployeesCount = employeesData.filter(
        (emp: any) => emp.isActive
      ).length;
      const validate = activeEmployeesCount < (companyData?.cards || 0); // Verificar límite
      setCreatedValid(validate);
    };
    canOpenMainForm();
  }, [employeesData, companyData]);

  useEffect(() => {
    // Validar si se puede abrir el modal de creación
    const canOpenMainForm = () => {
      const activeEmployeesCount = employeesData.filter(
        (emp: any) => emp.isGPSActive
      ).length;
      const validate = activeEmployeesCount < (companyData?.cardGPS || 0); // Verificar límite
      setCreatedGPSValid(validate);
    };
    canOpenMainForm();
  }, [employeesData, companyData]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.companyId) {
        const fetchDataAreas = await getWorkAreasByCompanyIdQuery(
          userData?.companyId
        );
        const fetchDataSedes = await getHeadquartersByCompanyIdQuery(
          userData?.companyId
        );
        const fetchDataRutas = await getRoutesByCompanyIdQuery(
          userData?.companyId
        );
        const fetchDataZonas = await getZonesByCompanyIdQuery(
          userData?.companyId
        );
        setRutaData(fetchDataRutas.sort((a: any, b: any) => a?.routeName.localeCompare(b?.routeName)))
        setAreaData(fetchDataAreas.sort((a: any, b: any) => a?.areaName.localeCompare(b?.areaName)))
        setSedeData(fetchDataSedes.sort((a: any, b: any) => a?.name[0].localeCompare(b?.name[0])))
        setZonaData(fetchDataZonas.sort((a: any, b: any) => a?.zoneName.localeCompare(b?.zoneName)))
      }
    }
    fetchData()
  }, [userData?.companyId]);
  // console.log(!isEmptyDataRef);

  return {
    modeTheme: themeParsed?.dataThemeMode,
    columns,
    data: getDocuments,
    handleShowCsv,
    handleShowPdf,
    handleShowMainForm,
    handleShowQr,
    setHandleShowCsv,
    setHandleShowPdf,
    setHandleShowMainForm,
    setHandleShowQr,
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
    setSelectedArea,
    selectedSede,
    setSelectedSede,
    selectedArea,
    selectedZona,
    setSelectedZona,
    selectedRuta,
    setSelectedRuta,
    AreaData,
    SedeData,
    RutaData,
    ZonaData,
    endDate,
    setEndDate,
    createdValid,
    createdGPSValid,
    metadata,
    setMetadata,
    selectReport,
    setSelectReport,
    onShowQr,
    userData,
    statisticsDetail,
    setStatisticsDetail,
    showAlert,
    isShowQR,
    isShowAlertCSV,
    setIsShowAlertCSV,
    dataAlertCSV,
    setDataShowAlertCSV
  };
};

export default DataTablesHook;
