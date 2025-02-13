import { useState } from "react";
import { Tab } from "react-bootstrap";
import BannerMenu from "../bannerMenu/BannerMenu";
import CompanyPage from "../company/CompanyPage";
import HomeDash from "../dashBoard/homeDash/HomeDash";
import DataTableComponent from "../dataTable/DataTableComponent";
import GoogleMapsPage from "../maps/GoogleMapsPage";
import Profile from "../profile/page";
import TempladeContent from "../views/home/HomeContent";
import HeaderContent from "./components/headerContent/HeaderContent";
import EmployeesMostVisits from "@/components/employeesMostVisits/employeesMostVisits";
import UrlClicksByEmployee from "@/components/clicksUrls/clicksUrl";


const Header = ({ hamburger }: { hamburger?: boolean }) => {
  const [theme, setTheme] = useState<string>("light");
  return (
    <Tab.Container defaultActiveKey="first">
      <HeaderContent setTheme={setTheme} />

      <Tab.Content>
        {/* Vista del home */}
        <Tab.Pane
          className="tab-pane show  text-muted"
          id="home1"
          role="tabpanel"
          eventKey="first"
        >
          <HomeDash />
        </Tab.Pane>

        {/* Vista de Áreas de trabajo */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="workAreas"
          role="tabpanel"
          eventKey="workAreas"
        >
          <BannerMenu
            seoTitle="Áreas de Trabajo"
            title="Áreas de Trabajo"
            item="Dashboard"
            activeItem="Registro de Áreas de Trabajo"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Áreas de Trabajo."
            componentDescription="En esta tabla se encuentran listados todas áreas de Trabajo para su administración."
            tableTitle="Áreas de Trabajo"
            reference="workAreas"
          />
        </Tab.Pane>

        {/* Vista de Sedes */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="campus"
          role="tabpanel"
          eventKey="campus"
        >
          <BannerMenu
            seoTitle="Sedes"
            title="Sedes"
            item="Dashboard"
            activeItem="Registro de Sedes"
          />
          <DataTableComponent
            componentTitle="Tabla de Sedes"
            componentDescription="En esta tabla se encuentran las sedes para su administración."
            tableTitle="Sedes"
            reference="campus"
          />
        </Tab.Pane>

        {/* Vista de Estados de Reunión */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="meetingStatus"
          role="tabpanel"
          eventKey="meetingStatus"
        >
          <BannerMenu
            seoTitle="Estados de Reunión"
            title="Estados de Reunión"
            item="Dashboard"
            activeItem="Registro de Estados de Reunión"
          />
          <DataTableComponent
            componentTitle="Tabla de Estados de Reunión."
            componentDescription="En esta tabla se encuentran los Estados de Reunión para su administración."
            tableTitle="Estados de Reunión"
            reference="meetingStatus"
          />
        </Tab.Pane>

        {/* Vista de Categorías/Puntos Fijos */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="fixedPoints"
          role="tabpanel"
          eventKey="fixedPoints"
        >
          <BannerMenu
            seoTitle="Puntos Fijos"
            title="Puntos Fijos"
            item="Dashboard"
            activeItem="Registro de Puntos Fijos"
          />
          <DataTableComponent
            componentTitle="Tabla de Puntos Fijos."
            componentDescription="En esta tabla se encuentran los Puntos Fijos para su administración."
            tableTitle="Puntos Fijos"
            reference="fixedPoints"
          />
        </Tab.Pane>

        {/* >------ Comunicaciones -------< */}

        {/* Vista Circulares */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="circular"
          role="tabpanel"
          eventKey="circular"
        >
          <BannerMenu
            seoTitle="Circulares"
            title="Circulares"
            item="Dashboard"
            activeItem=""
          />
          <DataTableComponent
            componentTitle=""
            componentDescription=""
            tableTitle="Circulares"
            reference="circular"
          />
        </Tab.Pane>

        {/* Vista Eventos */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="events"
          role="tabpanel"
          eventKey="events"
        >
          <BannerMenu
            seoTitle="Eventos"
            title="Eventos"
            item="Dashboard"
            activeItem=""
          />
          <DataTableComponent
            componentTitle=""
            componentDescription=""
            tableTitle="Eventos"
            reference="events"
          />
        </Tab.Pane>

        {/* Vista Políticas */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="policy"
          role="tabpanel"
          eventKey="policy"
        >
          <BannerMenu
            seoTitle="Políticas"
            title="Políticas"
            item="Dashboard"
            activeItem=""
          />
          <DataTableComponent
            componentTitle=""
            componentDescription=""
            tableTitle="Políticas"
            reference="policy"
          />
        </Tab.Pane>

        {/* Vista Formularios y Solicitudes */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="forms"
          role="tabpanel"
          eventKey="forms"
        >
          <BannerMenu
            seoTitle="Formularios y Solicitudes"
            title="Formularios y Solicitudes"
            item="Dashboard"
            activeItem=""
          />
          <DataTableComponent
            componentTitle=""
            componentDescription=""
            tableTitle="Formularios y Solicitudes"
            reference="forms"
          />
        </Tab.Pane>

        {/* Vista Noticias */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="news"
          role="tabpanel"
          eventKey="news"
        >
          <BannerMenu
            seoTitle="Noticias"
            title="Noticias"
            item="Dashboard"
            activeItem=""
          />
          <DataTableComponent
            componentTitle=""
            componentDescription=""
            tableTitle="Noticias"
            reference="news"
          />
        </Tab.Pane>

        {/* Vista de Funcionarios */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="users"
          role="tabpanel"
          eventKey="second"
        >
          <BannerMenu
            seoTitle="Tabla limpia"
            title="Tabla limpia"
            item="Dashboard"
            activeItem=""
          />
          <DataTableComponent
            componentTitle=""
            componentDescription=""
            tableTitle="Tabla limpia"
            reference="emptyTable"
          />
        </Tab.Pane>

        {/* Vista de Notificaciones */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="notifications"
          role="tabpanel"
          eventKey="notifications"
        >
          <BannerMenu
            seoTitle="Notificaciones"
            title="Notificaciones"
            item="Dashboard"
            activeItem="Registro de Notificaciones"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Notificaciones."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Notificaciones"
            reference="notifications"
          />
        </Tab.Pane>

        {/* Vista de Zonas */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="zones"
          role="tabpanel"
          eventKey="zones"
        >
          <BannerMenu
            seoTitle="Zonas"
            title="Zonas"
            item="Dashboard"
            activeItem="Registro de Zonas"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Zonas."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Zonas"
            reference="zones"
          />
        </Tab.Pane>

        {/* Vista de Rutas */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="routes"
          role="tabpanel"
          eventKey="routes"
        >
          <BannerMenu
            seoTitle="Rutas"
            title="Rutas"
            item="Dashboard"
            activeItem="Registro de Rutas"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Rutas."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Rutas"
            reference="routes"
          />
        </Tab.Pane>

        {/* Vista de Países */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="users"
          role="tabpanel"
          eventKey="countries"
        >
          <BannerMenu
            seoTitle="Países"
            title="Países"
            item="Dashboard"
            activeItem="Registro de Países"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Países."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Países"
            reference="country"
          />
        </Tab.Pane>

        {/* Vista de Departamentos */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="users"
          role="tabpanel"
          eventKey="departments"
        >
          <BannerMenu
            seoTitle="Departamentos"
            title="Departamentos"
            item="Dashboard"
            activeItem="Registro de Departamentos"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Departamentos."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Departamentos"
            reference="departments"
          />
        </Tab.Pane>

        {/* Vista de Ciudad */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="users"
          role="tabpanel"
          eventKey="cities"
        >
          <BannerMenu
            seoTitle="Ciudades"
            title="Ciudades"
            item="Dashboard"
            activeItem="Registro de Ciudades"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Ciudades."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Ciudades"
            reference="cities"
          />
        </Tab.Pane>

        {/* Vista de tipos documentos */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="users"
          role="tabpanel"
          eventKey="documentTypes"
        >
          <BannerMenu
            seoTitle="Tipos de Documento"
            title="Tipos de Documento"
            item="Dashboard"
            activeItem="Registro de Tipos de Documento"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Tipos de Documento."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Tipos de Documento"
            reference="documentTypes"
          />
        </Tab.Pane>

        {/* Vista de Empresas Super Admin */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="companies"
          role="tabpanel"
          eventKey="companies"
        >
          <BannerMenu
            seoTitle="Empresas"
            title="Empresas"
            item=""
            activeItem="Registro"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Empresas."
            componentDescription="En esta tabla se encuentran listados todos los empresas para su administración."
            tableTitle="Empresas"
            reference="companies"
          />
        </Tab.Pane>

        {/* Vista de los Roles */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="Roles"
          role="tabpanel"
          eventKey="roles"
        >
          <BannerMenu
            seoTitle="Roles"
            title="Roles"
            item="Dashboard"
            activeItem="Roles"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Roles."
            componentDescription="En esta tabla se encuentran los Roles disponibles."
            tableTitle="Roles"
            reference="roles"
          />
        </Tab.Pane>

        {/* Vista de los mapas */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="maps"
          role="tabpanel"
          eventKey="maps"
        >
          <BannerMenu
            seoTitle="Mapa General"
            title="Mapa General"
            item="Dashboard"
            activeItem=""
          />
          <GoogleMapsPage mapToShow={"all"} />
        </Tab.Pane>
        <Tab.Pane
          className="tab-pane text-muted"
          id="zonesMap"
          role="tabpanel"
          eventKey="zonesMap"
        >
          <BannerMenu
            seoTitle="Mapa de Zonas"
            title="Mapa Zonas"
            item="Dashboard"
            activeItem=""
          />
          <GoogleMapsPage mapToShow={"areas"} />
        </Tab.Pane>
        <Tab.Pane
          className="tab-pane text-muted"
          id="campusMap"
          role="tabpanel"
          eventKey="campusMap"
        >
          <BannerMenu
            seoTitle="Mapa de Sedes"
            title="Mapa Sedes"
            item="Dashboard"
            activeItem=""
          />
          <GoogleMapsPage mapToShow={"campus"} />
        </Tab.Pane>
        <Tab.Pane
          className="tab-pane text-muted"
          id="employeesMaps"
          role="tabpanel"
          eventKey="employeesMaps"
        >
          <BannerMenu
            seoTitle="Mapa de Empleados"
            title="Mapa Empleados"
            item="Dashboard"
            activeItem=""
          />
          <GoogleMapsPage mapToShow={"employees"} />
        </Tab.Pane>
        <Tab.Pane
          className="tab-pane text-muted"
          id="routesMaps"
          role="tabpanel"
          eventKey="routesMaps"
        >
          <BannerMenu
            seoTitle="Mapa de Rutas"
            title="Mapa Rutas"
            item="Dashboard"
            activeItem=""
          />
          <GoogleMapsPage mapToShow={"routes"} />
        </Tab.Pane>
        <Tab.Pane
          className="tab-pane text-muted"
          id="fixedPointsMaps"
          role="tabpanel"
          eventKey="fixedPointsMaps"
        >
          <BannerMenu
            seoTitle="Mapa de Puntos Fijos"
            title="Mapa Puntos Fijos"
            item="Dashboard"
            activeItem=""
          />
          <GoogleMapsPage mapToShow={"fixedPoints"} />
        </Tab.Pane>

        {/* Vista de la Empresa */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="company"
          role="tabpanel"
          eventKey="company"
        >
          <CompanyPage theme={theme} />
        </Tab.Pane>

        {/* Vista del perfil */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="profile"
          role="tabpanel"
          eventKey="profile"
        >
          <Profile />
        </Tab.Pane>

        {/* Vista del Empleados */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="Empleados"
          role="tabpanel"
          eventKey="employees"
        >
          <BannerMenu
            seoTitle="Empleados"
            title="Empleados"
            item="Dashboard"
            activeItem="Empleados"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Empleados."
            componentDescription="En esta tabla se encuentran los Empleados disponibles."
            tableTitle="Empleados"
            reference="employees"
          />
        </Tab.Pane>

        {/* Vista del Logos */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="logos"
          role="tabpanel"
          eventKey="logos"
        >
          <BannerMenu
            seoTitle="Logos"
            title="Logos"
            item="Dashboard"
            activeItem="Registro de Logos"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Logos."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Logos"
            reference="logos"
          />
        </Tab.Pane>

        {/* Vista del Logos SuperAdministrador */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="logos"
          role="tabpanel"
          eventKey="logosSuperAdmin"
        >
          <BannerMenu
            seoTitle="Logos"
            title="Logos"
            item="Dashboard"
            activeItem="Registro de Logos"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Logos."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Logos"
            reference="logosSuperAdmin"
          />
        </Tab.Pane>

        {/* Vista del Fondos */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="fondos"
          role="tabpanel"
          eventKey="fondos"
        >
          <BannerMenu
            seoTitle="Fondos"
            title="Fondos"
            item="Dashboard"
            activeItem="Registro de Fondos"
          />
          <DataTableComponent
            componentTitle="Tabla del Listado de Fondos."
            componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
            tableTitle="Fondos"
            reference="backgroundImages"
          />
        </Tab.Pane>

        {/* Vista de Plantillas */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="plantillas"
          role="tabpanel"
          eventKey="plantillas"
        >
          <BannerMenu
            seoTitle="Plantillas"
            title="Plantillas"
            item="Dashboard"
            activeItem="Plantillas corporativas"
          />
          <TempladeContent />
        </Tab.Pane>

        {/* Vista del reporte de Jornada Laboral */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="workingday"
          role="tabpanel"
          eventKey="workingday"
        >
          <BannerMenu
            seoTitle="Jornada Laboral"
            title="Jornada Laboral"
            item="Dashboard"
            activeItem="Reporte de Jornadas Laborales"
          />
          <DataTableComponent
            componentTitle="Reporte de Jornadas Laborales"
            componentDescription="En esta tabla se encuentran el reporte de las jornadas laborales."
            tableTitle="Jornada Laboral"
            reference="workingday"
          />
        </Tab.Pane>
        {/* Vista del reporte de Visitas/reuniones */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="meetings"
          role="tabpanel"
          eventKey="meetings"
        >
          <BannerMenu
            seoTitle="Reuniones"
            title="Reuniones"
            item="Dashboard"
            activeItem="Reporte de Reuniones"
          />
          <DataTableComponent
            componentTitle="Reporte de Reuniones"
            componentDescription="En esta tabla se encuentran el reporte de las reuniones realizadas."
            tableTitle="Reuniones"
            reference="meetings"
          />
        </Tab.Pane>

        {/* Reporte exclusivo para Superadmin */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="superadminEmployees"
          role="tabpanel"
          eventKey="superadminEmployees"
        >
          <BannerMenu
            seoTitle="Reporte de Empleados"
            title="Reporte de Empleados"
            item="Dashboard"
            activeItem="Empleados"
          />
          <DataTableComponent
            componentTitle="Reporte de Empleados"
            componentDescription="Este reporte muestra información detallada y analítica sobre los empleados registrados en el sistema, accesible únicamente por superadministradores."
            tableTitle="Empleados"
            reference="superadminEmployees"
          />
        </Tab.Pane>

        {/* Reporte Estadisticas usuarios */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="statisticalReports"
          role="tabpanel"
          eventKey="statisticalReports"
        >
          <BannerMenu
            seoTitle="Reporte de Estadisticas"
            title="Reporte de Estadisticas"
            item="Dashboard"
            activeItem="Estadisticas"
          />
          <DataTableComponent
            componentTitle="Reporte de Estadisticas"
            componentDescription="Este reporte muestra información detallada y analítica sobre la estadistica de consumo cada vez que un usuario comparta su tarjeta y sea visualizada."
            tableTitle="Estadisticas"
            reference="statisticalReports"
          />
        </Tab.Pane>

        {/* Reporte Estadisticas usuarios detalles */}
        <Tab.Pane
          className="tab-pane text-muted"
          id="statisticalReportsDetails"
          role="tabpanel"
          eventKey="statisticalReportsDetails"
        >
          <BannerMenu
            seoTitle="Reporte de Estadisticas"
            title="Reporte de Estadisticas"
            item="Dashboard"
            activeItem="Estadisticas"
          />
          <DataTableComponent
            componentTitle="Reporte de Estadisticas"
            componentDescription="Este reporte muestra información detallada y analítica sobre la estadistica de consumo cada vez que un usuario comparta su tarjeta y sea visualizada."
            tableTitle="Estadisticas"
            reference="statisticalReportsDetails"
          />
        </Tab.Pane>

        {/* Reporte  metricas empleados con mas visitas en su plantilla*/}
        <Tab.Pane
          className="tab-pane text-muted"
          id="employeesMostVisits"
          role="tabpanel"
          eventKey="employeesMostVisits"
        >
          <BannerMenu
            seoTitle="Reporte de visitas de empleado"
            title="Reporte de visitas de empleado"
            item="Dashboard"
            activeItem="Visitas"
          />
          <EmployeesMostVisits
          />
        </Tab.Pane>

        {/* Reporte  metricas urls con mas clicks*/}
        <Tab.Pane
          className="tab-pane text-muted"
          id="clicksUrl"
          role="tabpanel"
          eventKey="clicksUrl"
        >
          <BannerMenu
            seoTitle="Reporte clicks de las url's"
            title="Reporte clicks de las url's"
            item="Dashboard"
            activeItem="Clicks"
          />
          <UrlClicksByEmployee />

        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default Header;
