import { Tab } from "react-bootstrap";
import BannerMenu from "../bannerMenu/BannerMenu";
import HomeDash from "../dashBoard/homeDash/HomeDash";
import DataTableComponent from "../dataTable/DataTableComponent";
import Profile from "../profile/page";
import HeaderContent from "./components/headerContent/HeaderContent";

const Header = ({ hamburger }: { hamburger?: boolean }) => {
    return (
        <Tab.Container defaultActiveKey="first">
            <HeaderContent />
            <Tab.Content>
                <Tab.Pane
                    className="tab-pane show  text-muted"
                    id="home1"
                    role="tabpanel"
                    eventKey="first"
                >
                    <HomeDash />
                </Tab.Pane>
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
                <Tab.Pane
                    className="tab-pane text-muted"
                    id="Roles"
                    role="tabpanel"
                    eventKey="tenth"
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
