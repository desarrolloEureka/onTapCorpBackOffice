import HeaderHook from "@/components/header/hook/HeaderHook";
import { main_logo_dark } from "@/globals/images";
import dynamic from "next/dynamic";
import { Container, Dropdown, Nav, NavDropdown } from "react-bootstrap";

const HeadDropDown = dynamic(
    () => import("@/components/header/headDropDown/HeadDropDown"),
    {
        ssr: false,
    },
);

const HeaderContent = ({ hamburger }: { hamburger?: boolean }) => {
    const { logOut, main_logo, data } = HeaderHook();

    return (
        <header className="app-header bg-primary">
            <img
                src={main_logo_dark.src}
                className="tw-absolute tw-left-10 tw-w-14"
                alt="img"
            />
            <Container fluid className="main-header-container">
                <div className="header-content-left">
                    {hamburger && (
                        <>
                            <div className="header-element">
                                <a
                                    aria-label="Hide Sidebar"
                                    className="side menu-toggle header-link animated-arrow hor-toggle horizontal-nav toggle"
                                    data-bs-toggle="sidebar"
                                // onClick={() => headerToggleButton()}
                                >
                                    <span></span>
                                </a>
                            </div>
                            <div className="header-element"></div>
                        </>
                    )}
                </div>
                <div className="header-content-right">
                    <div className="d-flex order-lg-2 align-items-center ms-auto">
                        <Nav
                            className="nav nav-tabs border-0"
                            id="myTab"
                            role="tablist"
                            defaultActiveKey="first"
                        >
                            {/* Home */}
                            <Nav.Item>
                                <Nav.Link href="#home1" eventKey="first">
                                    Home
                                </Nav.Link>
                            </Nav.Item>

                            {/*  Perfil */}
                            <NavDropdown
                                title="Perfil"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    href="#functionary"
                                    eventKey="second"
                                >
                                    Funcionarios
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Empleados
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Empresas
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*  Locaciones */}
                            <NavDropdown
                                title="Locaciones"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Areas de Trabajo
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Sedes
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Zonas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Rutas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Puntos Fijos
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*  Gps */}
                            <NavDropdown
                                title="GPS"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Areas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Sedes
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Empleados
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Rutas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Puntos Fijos
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*  Plantillas */}
                            <NavDropdown
                                title="Plantillas"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Logos
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Trajetas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Empleados
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*  Reportes */}
                            <NavDropdown
                                title="Reportes"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Rutas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Zonas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Sedes
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Areas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Metricas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Visitas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    //href="#functionary"
                                    eventKey="second"
                                >
                                    Clics
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*  General */}
                            <NavDropdown
                                title="General"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    href="#roles"
                                    eventKey="second"
                                >
                                    Roles
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <HeadDropDown
                            // notifications={false}
                            dark
                            // multiLingual={false}
                            data={data}
                            logOut={logOut}
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default HeaderContent;
