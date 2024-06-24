"use client";
import { showPasswordParams } from "@/types/mainForm";
import {
    Button,
    Card,
    Col,
    Form,
    FormGroup,
    InputGroup,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Seo from "shared/layout-components/seo/seo";
import PageHeader from "../page-header";
import ProfileHook from "./hook/profileHook";

const ShowPasswordButton = ({ show, setShow }: showPasswordParams) => (
    <Button
        variant="outline-primary"
        className="btn btn-icon btn-wave tw-h-[38.5px]"
        onClick={() => setShow(!show)}
    >
        {show ? (
            <i className="fe fe-eye-off"></i>
        ) : (
            <i className="fe fe-eye"></i>
        )}
    </Button>
);

const Profile = () => {
    const {
        data,
        isDisabled,
        key,
        router,
        setKey,
        changeHandler,
        handleUpdateProfile,
        showPassword,
        setShowPassword,
        errorPass,
        setErrorPass,
    } = ProfileHook();

    return (
        <>
            <Seo title="Profile" />
            <PageHeader title="Perfil" item="Dashboard" active_item="Perfil" />
            <div className="">
                <Tab.Container
                    id="center-tabs-example"
                    defaultActiveKey="first"
                    activeKey={key}
                    onSelect={setKey}
                >
                    <Row className="square">
                        <div>
                            <Card className="custom-card">
                                <Card.Body>
                                    <div className="panel profile-cover tw-pb-24">
                                        <div className="profile-cover__img ">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${data?.displayName}?size=150?bold=true`}
                                                alt="Profile Photo"
                                                width="150"
                                            />
                                            <h3 className="h3">
                                                {data?.displayName
                                                    ? data?.displayName
                                                    : "John Doe"}
                                            </h3>
                                        </div>
                                        <div className="profile-cover__action bg-img"></div>
                                    </div>
                                    <div className="profile-tab tab-menu-heading">
                                        <Nav className=" main-nav-line p-3 tabs-menu profile-nav-line">
                                            <Nav.Item>
                                                <Nav.Link
                                                    className={`hover:tw-text-[#e9a225] focus:tw-text-[#E9A225] active:tw-text-[#E9A225] ${
                                                        key === "first" &&
                                                        "tw-text-[#E9A225]"
                                                    }`}
                                                    eventKey="first"
                                                >
                                                    Información
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    className={`hover:tw-text-[#E9A225] focus:tw-text-[#E9A225] active:tw-text-[#E9A225] ${
                                                        key === "editProfile" &&
                                                        "tw-text-[#E9A225]"
                                                    }`}
                                                    eventKey="editProfile"
                                                >
                                                    Editar perfil
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    className={`hover:tw-text-[#E9A225] focus:tw-text-[#E9A225] active:tw-text-[#E9A225] ${
                                                        key === "settings" &&
                                                        "tw-text-[#E9A225]"
                                                    }`}
                                                    eventKey="settings"
                                                >
                                                    Configuración
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                    <Row className="row-sm">
                        <Col md={12} lg={12}>
                            <div className="card custom-card main-content-body-profile">
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className="main-content-body tab-pane p-sm-4 p-0 border-top-0">
                                            <div className="card-body border">
                                                <div className="border p-3">
                                                    <div className="mb-4 tw-font-bold tw-text-xl text-capitalize tw-text-[#E9A225]">
                                                        Información Personal
                                                    </div>
                                                    <div className="mb-4 tw-text-xl text-capitalize">
                                                        Nombre
                                                    </div>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 tw-py-[0.14rem] mb-3">
                                                                Nombre de
                                                                Usuario
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {
                                                                    data?.displayName
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Nombre/s
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.name}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Apellido/s
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.lastName}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Rol
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.rol}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Cargo
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.position}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="border p-3 mt-2">
                                                    <div className="mb-4 tw-font-bold tw-text-xl tw-text-[#E9A225]">
                                                        Información de Contacto
                                                    </div>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Email
                                                                <i>
                                                                    (requerido)
                                                                </i>
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.email}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Teléfono
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.phone}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="tw-mb-4 row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Dirección
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15">
                                                                {data?.address}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="border p-3 mt-2">
                                                    <div className="mb-4 tw-font-bold tw-text-xl text-capitalize tw-text-[#E9A225]">
                                                        Algo Sobre Ti
                                                    </div>
                                                    <Row className=" row-sm">
                                                        <Col md={3}>
                                                            <h4 className="fs-15 text-capitalize mb-3">
                                                                Biografía
                                                            </h4>
                                                        </Col>
                                                        <Col md={9}>
                                                            <p className="fs-15 tw-text-justify">
                                                                {data?.aboutMe}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="tw-flex tw-justify-end tw-items-center">
                                                    <Button
                                                        onClick={() =>
                                                            setKey(
                                                                "editProfile",
                                                            )
                                                        }
                                                        className="btn ripple btn-main-primary btn-block mt-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="editProfile">
                                        <div className="main-content-body tab-pane p-sm-4 p-0 border-top-0">
                                            <div className="card-body border">
                                                <Form className="form-horizontal">
                                                    <div className="border p-3">
                                                        <div className="mb-4 tw-font-bold tw-text-xl tw-text-[#E9A225]">
                                                            Información Personal
                                                        </div>
                                                        <div className="mb-4 tw-text-xl">
                                                            Nombre
                                                        </div>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 mb-3">
                                                                        Nombre
                                                                        de
                                                                        Usuario
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.displayName
                                                                        }
                                                                        type="text"
                                                                        name="displayName"
                                                                        placeholder="User Name"
                                                                        // defaultValue="Mack Adamia"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Nombre/s
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.name
                                                                        }
                                                                        type="text"
                                                                        name="name"
                                                                        placeholder="First Name"
                                                                        // defaultValue="Mack Adamia"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className="row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Apellido/s
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.lastName
                                                                        }
                                                                        type="text"
                                                                        name="lastName"
                                                                        placeholder="Last Name"
                                                                        // defaultValue="Mack Adamia"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className="row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Rol
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.rol
                                                                        }
                                                                        type="text"
                                                                        name="rol"
                                                                        placeholder="Rol"
                                                                        // defaultValue="Admin"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Cargo
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.position
                                                                        }
                                                                        type="text"
                                                                        name="position"
                                                                        placeholder="Designation"
                                                                        // defaultValue="Web Designer"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="border p-3 mt-2">
                                                        <div className="mb-4 tw-font-bold tw-text-xl tw-text-[#E9A225]">
                                                            Información de
                                                            Contacto
                                                        </div>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Email
                                                                        <i>
                                                                            (requerido)
                                                                        </i>
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        disabled
                                                                        value={
                                                                            data &&
                                                                            data?.email
                                                                        }
                                                                        type="text"
                                                                        name="email"
                                                                        placeholder="email"
                                                                        // defaultValue="info@Spruha.in"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Teléfono
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.phone
                                                                        }
                                                                        type="text"
                                                                        name="phone"
                                                                        placeholder="phone number"
                                                                        // defaultValue="+245 354 654"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Dirección
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        aria-label="Comments"
                                                                        value={
                                                                            data &&
                                                                            data?.address
                                                                        }
                                                                        as="textarea"
                                                                        name="address"
                                                                        rows={2}
                                                                        placeholder="Address"
                                                                        // defaultValue="San Francisco, CA"
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="border p-3 mt-2">
                                                        <div className="mb-4 tw-font-bold tw-text-xl tw-text-[#E9A225]">
                                                            Algo Sobre Ti
                                                        </div>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Biografía
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <Form.Control
                                                                        value={
                                                                            data &&
                                                                            data?.aboutMe
                                                                        }
                                                                        name="aboutMe"
                                                                        rows={4}
                                                                        as="textarea"
                                                                        // aria-label="pleasure rationally encounter but because pursue consequences that are extremely painful.occur in which toil and pain can procure him some great pleasure.."
                                                                        placeholder="About you"
                                                                        // defaultValue="John Doe es un administrador experimentado en laboratorios de radiografías orales, con más de una década de experiencia. Es reconocido por su habilidad para garantizar la precisión y seguridad en todas las operaciones del laboratorio, así como por su enfoque proactivo en la actualización de equipos y tecnologías. Su dedicación a la excelencia en la salud bucal lo convierte en un líder valorado en su campo."
                                                                        onChange={
                                                                            changeHandler
                                                                        }
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="tw-flex tw-justify-end tw-items-center">
                                                        <Button
                                                            onClick={() =>
                                                                router.replace(
                                                                    "/",
                                                                )
                                                            }
                                                            className="btn ripple btn-main-primary btn-block mt-2 tw-mx-5"
                                                        >
                                                            Cancelar
                                                        </Button>
                                                        <Button
                                                            // disabled={
                                                            //     isDisabled
                                                            // }
                                                            onClick={
                                                                handleUpdateProfile
                                                            }
                                                            className="btn ripple btn-main-primary btn-block mt-2 tw-mx-5"
                                                        >
                                                            Guardar
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="settings">
                                        <div className="main-content-body tab-pane p-sm-4 p-0 border-top-0">
                                            <div className="card-body border">
                                                <Form
                                                    className="form-horizontal"
                                                    onSubmit={
                                                        handleUpdateProfile
                                                    }
                                                >
                                                    <div className="border p-3 mt-2">
                                                        <div className="mb-4 tw-font-bold tw-text-xl tw-text-[#E9A225]">
                                                            Cambio Contraseña
                                                        </div>
                                                        {/* <FormGroup className="form-group tw-mb-10">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Contraseña
                                                                        anterior
                                                                        <span className="tw-text-red-500">
                                                                            *
                                                                        </span>
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <InputGroup className="">
                                                                        <Form.Control
                                                                            required
                                                                            type={
                                                                                showPassword
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            minLength={
                                                                                8
                                                                            }
                                                                            maxLength={
                                                                                16
                                                                            }
                                                                            name="password"
                                                                            className=""
                                                                            placeholder="Anterior"
                                                                            aria-label="password"
                                                                            onChange={
                                                                                changeHandler
                                                                            }
                                                                            title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                                        />
                                                                        <ShowPasswordButton
                                                                            setShow={
                                                                                setShowPassword
                                                                            }
                                                                            show={
                                                                                showPassword
                                                                            }
                                                                        />
                                                                    </InputGroup>
                                                                </Col>
                                                            </Row>
                                                        </FormGroup> */}
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Nueva
                                                                        Contraseña
                                                                        <span className="tw-text-red-500">
                                                                            *
                                                                        </span>
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            required
                                                                            type={
                                                                                showPassword
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            minLength={
                                                                                8
                                                                            }
                                                                            maxLength={
                                                                                16
                                                                            }
                                                                            name="password"
                                                                            className="form-control"
                                                                            placeholder="Nueva"
                                                                            aria-label="password"
                                                                            onChange={
                                                                                changeHandler
                                                                            }
                                                                            title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                                        />
                                                                        <ShowPasswordButton
                                                                            setShow={
                                                                                setShowPassword
                                                                            }
                                                                            show={
                                                                                showPassword
                                                                            }
                                                                        />
                                                                    </InputGroup>
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        <FormGroup className="form-group">
                                                            <Row className=" row-sm">
                                                                <Col md={3}>
                                                                    <Form.Label className="fs-15 text-capitalize mb-3">
                                                                        Confirmar
                                                                        Contraseña
                                                                        <span className="tw-text-red-500">
                                                                            *
                                                                        </span>
                                                                    </Form.Label>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <InputGroup>
                                                                        <Form.Control
                                                                            required
                                                                            type={
                                                                                showPassword
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            minLength={
                                                                                8
                                                                            }
                                                                            maxLength={
                                                                                16
                                                                            }
                                                                            name="confirmPassword"
                                                                            className="form-control"
                                                                            placeholder="Confirmar"
                                                                            aria-label="confirmPassword"
                                                                            onChange={
                                                                                changeHandler
                                                                            }
                                                                            title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                                        />
                                                                        <ShowPasswordButton
                                                                            setShow={
                                                                                setShowPassword
                                                                            }
                                                                            show={
                                                                                showPassword
                                                                            }
                                                                        />
                                                                    </InputGroup>
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                        {errorPass && (
                                                            <Row className=" row-sm">
                                                                <Col md={12}>
                                                                    <Alert
                                                                        variant="info"
                                                                        className="alert alert-info alert-dismissible fade show"
                                                                        role="alert"
                                                                    >
                                                                        <strong>
                                                                            Contraseñas
                                                                            no
                                                                            coinciden!.
                                                                        </strong>
                                                                        Vuelva a
                                                                        intentar!
                                                                        <Button
                                                                            variant=""
                                                                            type="button"
                                                                            className="btn-close"
                                                                            data-bs-dismiss="alert"
                                                                            aria-label="Close"
                                                                            onClick={() =>
                                                                                setErrorPass(
                                                                                    false,
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="bi bi-x"></i>
                                                                        </Button>
                                                                    </Alert>
                                                                </Col>
                                                            </Row>
                                                        )}
                                                    </div>

                                                    <div className="tw-flex tw-justify-end tw-items-center">
                                                        <Button
                                                            onClick={() =>
                                                                router.replace(
                                                                    "/",
                                                                )
                                                            }
                                                            className="btn ripple btn-main-primary btn-block mt-2 tw-mx-5"
                                                        >
                                                            Cancelar
                                                        </Button>
                                                        <Button
                                                            // disabled={
                                                            //     isDisabled
                                                            // }
                                                            type="submit"
                                                            // onClick={
                                                            //     handleUpdateProfile
                                                            // }
                                                            className="btn ripple btn-main-primary btn-block mt-2 tw-mx-5"
                                                        >
                                                            Guardar
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    );
};
Profile.layout = "Contentlayout";

export default Profile;
