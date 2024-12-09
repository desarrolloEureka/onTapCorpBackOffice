import { useEffect, useState } from "react";
import { listenToEmployeesByCompanyIdQuery } from "@/queries/documentsQueries";
import useAuth from "@/firebase/auth";
import moment from "moment";

interface EmployeeData {
  nombre: string;
  cedula: string;
  totalVistas: number;
  porcentaje: number;
  createdDate: string; // Asegúrate de que este campo está en el mapeo
}

const useEmployeesMostVisitsHook = () => {
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([]);
  const [filteredData, setFilteredData] = useState<EmployeeData[]>([]);
  const [sortedData, setSortedData] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [startDate, setStartDate] = useState<string>(""); // Fecha de inicio
  const [endDate, setEndDate] = useState<string>(""); // Fecha de fin
  const { userData } = useAuth();

  

  useEffect(() => {
    if (!userData?.companyId) return;

    // Escucha activa
    const fetchData = listenToEmployeesByCompanyIdQuery(
      "users",
      (employees: any[]) => {
        const maxVisits = employees.reduce(
          (max, employee) => (employee?.views > max ? employee?.views : max),
          0
        );

        // Mapear datos
        const mappedEmployees = employees.map((employee: any) => ({
          nombre: `${employee?.firstName?.[0] || "Nombre no disponible"} 
                   ${employee?.lastName?.[0] || "Apellido no disponible"}`.trim(),
          cedula: employee?.documentNumber?.[0] || "N/A",
          totalVistas: employee?.views || 0,
          porcentaje: maxVisits ? (employee?.views * 90) / maxVisits : 0,
          createdDate: employee?.createdDate || "", // Fecha de creación
        }));

        setEmployeesData(mappedEmployees);
        setLoading(false);
      },
      userData.companyId
    );

    return () => fetchData();
  }, [userData?.companyId]);

  // Filtrar datos por rango de fechas
  useEffect(() => {
    const filtered = employeesData.filter((employee) => {
      const employeeDate = moment(employee.createdDate);
      const isAfterStartDate = startDate ? employeeDate.isSameOrAfter(moment(startDate)) : true;
      const isBeforeEndDate = endDate ? employeeDate.isSameOrBefore(moment(endDate)) : true;

      return isAfterStartDate && isBeforeEndDate;
    });

    setFilteredData(filtered);
  }, [employeesData, startDate, endDate]);

  // Ordenar los datos según el orden especificado
  useEffect(() => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.totalVistas - b.totalVistas;
      } else {
        return b.totalVistas - a.totalVistas;
      }
    });
    setSortedData(sorted);
  }, [filteredData, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return {
    employeesData: sortedData,
    loading,
    sortOrder,
    toggleSortOrder,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};

export default useEmployeesMostVisitsHook;
