import moment from "moment";

export default function convertArrayOfObjectsToCSV(
  array: object[],
  reference: string
): string {
  //console.log("...", reference, array);
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
      position: "Posicion",
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
      name: "Estado Reunion",
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
      createdDate: "Fecha creacion",
      firstName: "Nombres",
      lastName: "Apellidos",
      documentType: "Tipo de Documento",
      documentNumber: "Numero de Documento",
      position: "Cargo",
      phone: "Telefono",
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
      "companyName",
    ];
    const headers: Record<string, string> = {
      createdDate: "Fecha creacion",
      firstName: "Nombres",
      lastName: "Apellidos",
      documentType: "Tipo de Documento",
      documentNumber: "Numero de Documento",
      position: "Cargo",
      phone: "Telefono",
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
      documentNumber: "Numero de Identificacion",
      email: "Correo",
      phone: "Telefono",
    };

    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "workAreas") {
    keys = ["timestamp", "areaName", "areaHead", "urlName", "urlLink"];
    const headers: Record<string, string> = {
      timestamp: "Fecha",
      areaName: "Nombre de area",
      areaHead: "Jefe de area",
      urlName: "Nombre de url",
      urlLink: "Enlace",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "campus") {
    keys = ["timestamp", "name", "address"];
    const headers: Record<string, string> = {
      timestamp: "Fecha",
      name: "Nombre Sede",
      address: "Direccion",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "zones") {
    const maxAddresses = Math.max(...array.map((doc:any) => (doc?.addresses || []).length));
    // Añadir las claves solo del nombre de la zona y el jefe
    keys = [
      "zoneName",
      "zoneManager"
    ];
    // Añadir encabezados solo del nombre de la zona y el jefe
    const headers: Record<string, string> = {
      zoneName: "Nombre",
      zoneManager: "Nombre Sede",
    };

    // Añadir las claves con las direcciones dinámicamente
    for (let i = 1; i <= maxAddresses; i++) {
      keys.push(`Address${i}`);
    }
    // Añadir encabezados de direcciones dinámicamente
    for (let i = 1; i <= maxAddresses; i++) {
      headers[`Address${i}`] = `Direccion ${i}`;
    }
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "routes") {
    keys = [
      "timestamp",
      "routeName",
      "routeManager",
      "zoneName",
      "estimatedTime",
    ];
    const headers: Record<string, string> = {
      timestamp: "Fecha Registro",
      routeName: "Nombre de la ruta",
      routeManager: "Jefe de ruta",
      zoneName: "Zona correspondiente",
      estimatedTime: "Tiempo estimado",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "fixedPoints") {
    keys = ["timestamp", "name", "namePoint", "address", "color"];
    const headers: Record<string, string> = {
      timestamp: "Fecha Registro",
      name: "Nombre de categoria",
      namePoint: "Nombre Punto",
      address: "Direccion",
      color: "Color",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "notifications") {
    keys = ["timestamp", "issue", "content"];
    const headers: Record<string, string> = {
      timestamp: "Fecha Registro",
      issue: "Asunto",
      content: "Contenido",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (
    reference === "circular" ||
    reference === "events" ||
    reference === "policy" ||
    reference === "forms" ||
    reference === "news"
  ) {
    keys = ["timestamp", "subject", "url"];
    const headers: Record<string, string> = {
      timestamp: "Fecha Registro",
      subject: "Asunto",
      url: "Enlace",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "meetingStatus") {
    keys = ["timestamp", "name"];
    const headers: Record<string, string> = {
      timestamp: "Fecha Registro",
      name: "Nombre del estado de reunion",
    };
    result += keys.map((key: string) => headers[key]).join(columnDelimiter);
  } else if (reference == "logos") {
    keys = ["timestamp", "logoName"];
    const headers: Record<string, string> = {
      timestamp: "Fecha Registro",
      logoName: "Nombre",
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
      } else if (Array.isArray(item[key])) {
        result += item[key][0] !== "" ? item[key][0] : "";
      } else {
        result += item[key] !== undefined ? item[key] : "";
      }
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}
