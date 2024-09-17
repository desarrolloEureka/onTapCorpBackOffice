import HeaderHook from "@/components/header/hook/HeaderHook";
import { main_logo_light } from "@/globals/images";
import dynamic from "next/dynamic";
import {
    Container,
    // Dropdown,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import { BiSpreadsheet } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapLocationDot, FaRegAddressCard } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { IoMdBusiness } from "react-icons/io";
import { IoDocumentOutline, IoPerson } from "react-icons/io5";
import { MdList, MdOutlinePersonPin } from "react-icons/md";
import { PiGpsDuotone, PiMapPinSimpleFill } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";

const HeadDropDown = dynamic(
    () => import("@/components/header/headDropDown/HeadDropDown"),
    {
        ssr: false,
    },
);

const HeaderContent = ({
    hamburger,
    setTheme,
}: {
    hamburger?: boolean;
    setTheme: (e: any) => void;
}) => {
    const { logOut, main_logo, data, userRole } = HeaderHook();

    return (
        <header className="app-header bg-primary">
            <img
                src={main_logo_light.src}
                className="tw-absolute tw-left-10 tw-top-1.5 tw-w-14"
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
                                    <ImHome3
                                        size={18}
                                        className="tw-mb-1 tw-mr-1"
                                    />
                                    Home
                                </Nav.Link>
                            </Nav.Item>

                            {/* Locaciones */}
                            {(userRole === "superadmin" ||
                                userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <FaMapLocationDot
                                                    size={20}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                Locaciones
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown text-white"
                                    >
                                        {userRole === "operativo" ||
                                            userRole === "administrativo" ? (
                                            <>
                                                <NavDropdown.Item eventKey="second">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Sedes
                                                </NavDropdown.Item>
                                                <NavDropdown.Item eventKey="zones">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Zonas
                                                </NavDropdown.Item>

                                                <NavDropdown.Item eventKey="routes">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Rutas
                                                </NavDropdown.Item>

                                                <NavDropdown.Item eventKey="second">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Puntos Fijos
                                                </NavDropdown.Item>
                                            </>
                                        ) : (
                                            <>
                                                <NavDropdown.Item eventKey="countries">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    País
                                                </NavDropdown.Item>
                                                <NavDropdown.Item eventKey="departments">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Departamentos
                                                </NavDropdown.Item>
                                                <NavDropdown.Item eventKey="cities">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Ciudades
                                                </NavDropdown.Item>
                                            </>
                                        )}
                                    </NavDropdown>
                                )}

                            {/*  Perfil */}
                            {(userRole === "superadmin" ||
                                userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <MdOutlinePersonPin
                                                    size={22}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                Perfil
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown"
                                    >
                                        {userRole === "operativo" ||
                                            userRole === "administrativo" ? (
                                            <>
                                                <NavDropdown.Item
                                                    href="#company"
                                                    eventKey="company"
                                                >
                                                    <IoMdBusiness
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Empresa
                                                </NavDropdown.Item>
                                                <NavDropdown.Item eventKey="workAreas">
                                                    <FaMapMarkerAlt
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Áreas de Trabajo
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    href="#functionary"
                                                    eventKey="second"
                                                >
                                                    <IoPerson
                                                        size={22}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Funcionarios
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    //href="#functionary"
                                                    eventKey="employees"
                                                >
                                                    <IoPerson
                                                        size={22}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Empleados
                                                </NavDropdown.Item>
                                            </>
                                        ) : (
                                            <>
                                                <NavDropdown.Item
                                                    href="#companies"
                                                    eventKey="companies"
                                                >
                                                    <IoMdBusiness
                                                        size={18}
                                                        className="tw-mb-1 tw-mr-1"
                                                    />
                                                    Empresas
                                                </NavDropdown.Item>
                                            </>
                                        )}
                                    </NavDropdown>
                                )}

                            {/*  Configuraciónes */}
                            {(userRole === "superadmin" ||
                                userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <VscSettings
                                                    size={20}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                Configuraciones
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown"
                                    >
                                        <NavDropdown.Item
                                            href="#company"
                                            eventKey="roles"
                                        >
                                            <BsPersonCircle
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Roles
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#company"
                                            eventKey="documentTypes"
                                        >
                                            <FaRegAddressCard
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Tipos Documento
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}

                            {/*  GPS */}
                            {(userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <PiGpsDuotone
                                                    size={20}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                GPS
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown"
                                    >
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <PiMapPinSimpleFill
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Áreas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <PiMapPinSimpleFill
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Sedes
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <PiMapPinSimpleFill
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Empleados
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <PiMapPinSimpleFill
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Rutas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <PiMapPinSimpleFill
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Puntos Fijos
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}

                            {/*  Plantillas, quitar userRole === "superadmin" || despues del desarrollo */}
                            {(
                                userRole === "superadmin" ||
                                userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <BiSpreadsheet
                                                    size={20}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                Plantillas
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown"
                                    >
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="logos"
                                        >
                                            <FaRegAddressCard
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Logos
                                        </NavDropdown.Item>

                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="tarjetas"
                                        >
                                            <FaRegAddressCard
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Tarjetas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <FaRegAddressCard
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Empleados
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}

                            {/*  Reportes */}
                            {(userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <HiOutlineDocumentReport
                                                    size={20}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                Reportes
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown"
                                    >
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Rutas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Zonas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Sedes
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Áreas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Métricas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Visitas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            //href="#functionary"
                                            eventKey="second"
                                        >
                                            <IoDocumentOutline
                                                size={20}
                                                className="tw-mb-1 tw-mr-1"
                                            />
                                            Clics
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}

                            {/*  General */}
                            {(userRole === "operativo" ||
                                userRole === "administrativo") && (
                                    <NavDropdown
                                        title={
                                            <>
                                                <MdList
                                                    size={20}
                                                    className="tw-mb-1 tw-mr-1"
                                                />
                                                General
                                            </>
                                        }
                                        id="nav-dropdown"
                                        className="nav-item dropdown"
                                    >
                                        <NavDropdown.Item
                                            href="#roles"
                                            eventKey="second"
                                        >
                                            Roles
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#roles"
                                            eventKey="notifications"
                                        >
                                            Notificaciones
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}
                        </Nav>

                        <HeadDropDown
                            // notifications={false}
                            dark
                            // multiLingual={false}
                            data={data}
                            logOut={logOut}
                            setTheme={setTheme}
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default HeaderContent;
