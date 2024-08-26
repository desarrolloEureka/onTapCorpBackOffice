import { Tab } from "react-bootstrap";
import BannerMenu from "../bannerMenu/BannerMenu";
import HomeDash from "../dashBoard/homeDash/HomeDash";
import DataTableComponent from "../dataTable/DataTableComponent";
import Profile from "../profile/page";
import HeaderContent from "./components/headerContent/HeaderContent";
import CompanyPage from "../company/CompanyPage";
import theme from "../../theme";
import { useState } from "react";

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

                {/* Vista de Funcionarios */}
                <Tab.Pane
                    className="tab-pane text-muted"
                    id="users"
                    role="tabpanel"
                    eventKey="second"
                >
                    <BannerMenu
                        seoTitle="Funcionarios"
                        title="Funcionarios"
                        item="Dashboard"
                        activeItem="Registro de Funcionarios"
                    />
                    <DataTableComponent
                        componentTitle="Tabla del Listado de Funcionarios."
                        componentDescription="En esta tabla se encuentran listados todos los usuarios para su administración."
                        tableTitle="Funcionarios"
                        reference="functionary"
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
            </Tab.Content>
        </Tab.Container>
    );
};

export default Header;
