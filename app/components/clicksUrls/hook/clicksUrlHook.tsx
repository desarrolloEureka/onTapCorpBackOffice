import { useState, useEffect } from "react";
import { 
  getAllCompaniesQuery, 
  getWorkAreasByCompanyIdQuery, 
  getEmployeesByCompanyIdQuery 
} from "@/queries/documentsQueries";

interface UrlClickData {
  urlLink: string;
  urlName: string;
  clickCount: number;
  employeeId: string;
}

const useClicksUrl = (companyId: string) => {
  const [clicksDataWorkAreas, setClicksDataWorkAreas] = useState<UrlClickData[]>([]);
  const [clicksDataCompanies, setClicksDataCompanies] = useState<UrlClickData[]>([]);
  const [clicksDataWebsite, setClicksDataWebsite] = useState<UrlClickData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener las áreas de trabajo
        const workAreas = await getWorkAreasByCompanyIdQuery(companyId);
        if (!workAreas) throw new Error("No se encontraron áreas de trabajo.");

        // Obtener todas las compañías
        const companies = await getAllCompaniesQuery();
        if (!companies) throw new Error("No se encontraron compañías.");

        // Obtener los empleados
        const allEmployees = await getEmployeesByCompanyIdQuery(companyId);
        const employeesName: any[] = [];
        allEmployees.forEach((employee: any) => {
          employeesName.push({
            ...employee,
            fullName: `${employee.firstName[0]} ${employee.lastName[0]}`,
          });
        });
        setEmployees(
          employeesName.sort((a: any, b: any) => a.fullName.localeCompare(b.fullName))
        );

        // Procesar las áreas de trabajo
        const workAreaClicks: UrlClickData[] = [];
        workAreas.forEach((workArea: any) => {
          Object.keys(workArea).forEach((key) => {
            if (key.startsWith("urlLink")) {
              const urlLink = workArea[key];
              const urlNameKey = key.replace("urlLink", "urlName");
              const urlNameData = workArea[urlNameKey] || [];
              const urlName = urlNameData[0] || urlLink;
              const employeesData = urlNameData[2] || {};

              for (let employee in employeesData) {
                const { uid, views } = employeesData[employee];
                const clickCount = Array.isArray(views) ? views.length : 0;
                workAreaClicks.push({
                  urlLink,
                  urlName,
                  clickCount,
                  employeeId: uid,
                });
              }
            }
          });
        });
        setClicksDataWorkAreas(workAreaClicks);

        // Procesar las compañías
        const companyClicks: UrlClickData[] = [];
        companies.forEach((company: any) => {
          Object.keys(company).forEach((key) => {
            if (key.startsWith("urlLink")) {
              const urlLink = company[key];
              const urlNameKey = key.replace("urlLink", "urlName");
              const urlNameData = company[urlNameKey] || [];
              const urlName = urlNameData[0] || urlLink;
              const employeesData = urlNameData[2] || {};

              for (let employee in employeesData) {
                const { uid, views } = employeesData[employee];
                const clickCount = Array.isArray(views) ? views.length : 0;
                companyClicks.push({
                  urlLink,
                  urlName,
                  clickCount,
                  employeeId: uid,
                });
              }
            }
          });
        });
        setClicksDataCompanies(companyClicks);


        // Procesar webSite
        const webSiteClicks: UrlClickData[] = [];
        companies.forEach((website: any) => {
          const webSite = website.webSite || []; 
          const urlLink = webSite[0]; 
          const employeesData = webSite[2] || {}; 

          for (let userKey in employeesData) {
            const { views } = employeesData[userKey];
            const clickCount = Array.isArray(views) ? views.length : 0;

            webSiteClicks.push({
              urlLink,
              urlName: urlLink, 
              clickCount,
              employeeId: userKey, 
            });
          }
        });
        setClicksDataWebsite(webSiteClicks);

      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  return { 
    clicksData: [...clicksDataWorkAreas, ...clicksDataCompanies, ...clicksDataWebsite], 
    loading, 
    error, 
    employees 
  };
};

export default useClicksUrl;
