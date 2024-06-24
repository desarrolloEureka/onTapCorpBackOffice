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
        <header className="app-header ">
            <img
                src={main_logo_dark.src}
                className="tw-absolute tw-left-10 tw-w-48"
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
                            <Nav.Item>
                                <Nav.Link href="#home1" eventKey="first">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <NavDropdown
                                title="Usuarios"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    href="#functionary"
                                    eventKey="second"
                                >
                                    Funcionarios
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                title="General"
                                id="nav-dropdown"
                                className="nav-item dropdown"
                            >
                                <NavDropdown.Item
                                    href="#roles"
                                    eventKey="tenth"
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
