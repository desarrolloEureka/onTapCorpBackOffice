import {
    // areas,
    // campus,
    ColombianStates,
    // contracts,
    countries,
    getCities,
    idTypes,
    isActiveData,
    // specialties,
    personTypes,
} from "@/data/formConstant";
import { showPasswordParams } from "@/types/mainForm";
import { ModalParamsMainForm } from "@/types/modals";
import _ from "lodash";
import moment from "moment";
import dynamic from "next/dynamic";
import {
    Alert,
    Button,
    Col,
    Form,
    InputGroup,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { BsFillTelephoneForwardFill, BsPersonVcard } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { IoBusinessSharp, IoPersonSharp } from "react-icons/io5";
import { MdBusinessCenter, MdEmail, MdLocationPin } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import { components } from "react-select";
import makeAnimated from "react-select/animated";
import MainFormHook from "./hook/mainFormHook";
import { VscSave } from "react-icons/vsc";
const Select = dynamic(() => import("react-select"), { ssr: false });

const animatedComponents = makeAnimated();

const { Option } = components;

const IconOption = (props: any) => (
    <Option {...props}>
        <div>
            <span className={`status bg-${props.data.statusInfo}`}></span>
            {props.data.label}
        </div>
    </Option>
);

const customStyles = (theme: any) => ({
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isDisabled
            ? theme === "dark"
                ? "#565656"
                : "#f0f0f0"
            : theme === "light"
            ? "white"
            : "#3a3a3d",
    }),
});

const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 7,
        width: 7,
    },
});

const ShowPasswordButton = ({ show, setShow }: showPasswordParams) => (
    <Button
        variant="outline-primary"
        className="btn btn-icon btn-wave"
        onClick={() => setShow(!show)}
    >
        {show ? (
            <i className="fe fe-eye-off"></i>
        ) : (
            <i className="fe fe-eye"></i>
        )}
    </Button>
);

const TooltipComponent = ({
    id,
    children,
    title,
}: {
    id: string;
    children: any;
    title: string;
}) => (
    <OverlayTrigger
        placement="bottom"
        delay={{ show: 150, hide: 400 }}
        overlay={<Tooltip id={id}>{title}</Tooltip>}
    >
        {children}
    </OverlayTrigger>
);

const MainFormModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
}: ModalParamsMainForm) => {
    const {
        show,
        errorForm,
        showPassword,
        isLoading,
        data,
        selectedRol,
        selectedIdType,
        selectedIdTypeAdmin,
        selectedState,
        selectedCountry,
        selectedCity,
        selectedSpecialty,
        selectedContract,
        selectedStatus,
        selectedCampus,
        selectedAvailableCampus,
        selectedArea,
        isEdit,
        errorPass,
        campus,
        specialties,
        contracts,
        areas,
        roles,
        theme,
        errorValid,
        nextStep,
        companyVal,
        setNextStep,
        setErrorPass,
        setErrorValid,
        handleSendForm,
        handleClose,
        handleReset,
        setErrorForm,
        changeHandler,
        clearSelectFields,
        dateChangeHandler,
        selectChangeHandlerIdType,
        setShowPassword,
        selectChangeHandlerRol,
        selectChangeHandlerCampus,
        selectChangeHandlerAvailableCampus,
        selectChangeHandlerArea,
        selectChangeHandlerStatus,
        selectChangeHandlerContract,
        selectChangeHandlerSpecialty,
        selectChangeHandlerCity,
        selectChangeHandlerCountry,
        selectChangeHandlerState,
        indicativeOneChangeHandler,
        indicativeTwoChangeHandler,
        findValue,
        handleEditForm,
        handleMultipleChange,
        handleIconFileChange,
        selectChangeHandlerPersonType,
        selectChangeHandlerIdTypeAdmin,
        areasByCampus,
    } = MainFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
    });

    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Form
                // noValidate
                // validated={errorForm}
                onReset={handleReset}
                onSubmit={handleSendForm}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="tw-text-[#64a5e2]" as="h6">
                        Nuevo Registro&nbsp;
                    </Modal.Title>
                </Modal.Header>
                {isEdit ? (
                    <Modal.Body className="tw-px-8">
                        <Row>
                            {reference === "companies" &&
                                (nextStep ? (
                                    <>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Group controlId="idType">
                                                <Form.Label className="">
                                                    Tipo Documento
                                                    <span className="tw-text-red-500">
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <Select
                                                    required
                                                    noOptionsMessage={({
                                                        inputValue,
                                                    }) =>
                                                        `No hay resultados para "${inputValue}"`
                                                    }
                                                    value={
                                                        data.idType
                                                            ? idTypes.find(
                                                                  (value) =>
                                                                      findValue(
                                                                          value,
                                                                          data.idType,
                                                                      ),
                                                              )
                                                            : []
                                                    }
                                                    defaultValue={
                                                        selectedIdType
                                                    }
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    name="idType"
                                                    options={idTypes}
                                                    id="idType"
                                                    aria-label="id type"
                                                    className="basic-multi-select"
                                                    classNamePrefix="Select2"
                                                    onChange={
                                                        selectChangeHandlerIdType
                                                    }
                                                    styles={{
                                                        placeholder: (
                                                            provided,
                                                        ) => ({
                                                            ...provided,
                                                            marginLeft: "30px",
                                                        }),
                                                        singleValue: (
                                                            provided,
                                                        ) => ({
                                                            ...provided,
                                                            paddingLeft: "30px",
                                                        }),
                                                    }}
                                                />
                                                <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                    <BsPersonVcard size={24} />
                                                </span>
                                            </Form.Group>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Documento
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                disabled={
                                                    handleShowMainFormEdit
                                                }
                                                required
                                                value={data.id}
                                                type="text"
                                                minLength={2}
                                                maxLength={250}
                                                name="id"
                                                aria-label="id"
                                                className="form-control tw-pl-8"
                                                placeholder="Número"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <IoPersonSharp size={20} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Razón Social
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={data.businessName}
                                                type="text"
                                                minLength={2}
                                                maxLength={250}
                                                name="businessName"
                                                aria-label="businessName"
                                                className="form-control tw-pl-8"
                                                placeholder="Nombre"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <IoBusinessSharp size={20} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Nombre Comercial
                                            </Form.Label>
                                            <Form.Control
                                                value={data.tradename}
                                                type="text"
                                                minLength={2}
                                                maxLength={1500}
                                                name="tradename"
                                                aria-label="tradename"
                                                className="form-control tw-pl-8"
                                                placeholder="Nombre"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <MdBusinessCenter size={20} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Dirección
                                                {/* <span className="tw-text-red-500">
                                                        *
                                                    </span> */}
                                            </Form.Label>
                                            <Form.Control
                                                // required
                                                value={data.address}
                                                type="text"
                                                minLength={2}
                                                maxLength={550}
                                                name="address"
                                                className="form-control tw-pl-8"
                                                placeholder="Dirección"
                                                aria-label="address"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <MdLocationPin size={18} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={2}
                                            // lg={4}
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                Indicativo
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <PhoneInput
                                                countryCodeEditable={false}
                                                enableLongNumbers={0}
                                                autoFormat={false}
                                                inputProps={{
                                                    readOnly: true,
                                                    required: true,
                                                    name: "indicative",
                                                }}
                                                country={"co"}
                                                specialLabel=""
                                                placeholder=""
                                                prefix="+"
                                                dropdownStyle={{
                                                    color: "black",
                                                    borderRadius: 12,
                                                }}
                                                value={data.indicative}
                                                onChange={
                                                    indicativeOneChangeHandler
                                                }
                                            />
                                        </Col>
                                        <Col
                                            md={4}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Teléfono/Cel
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Form.Control
                                                // required
                                                value={data.phone}
                                                type="tel"
                                                min={0}
                                                max={999999999999999}
                                                name="phone"
                                                className="form-control tw-pl-8"
                                                placeholder="Número"
                                                aria-label="Phone number"
                                                onChange={changeHandler}
                                                pattern="^(\\+?\\d{1,4})?\\s?\\d{10,15}$"
                                                title="Por favor, ingrese un número de teléfono válido"
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <FaPhone size={18} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Ext
                                            </Form.Label>
                                            <Form.Control
                                                value={data.ext}
                                                type="text"
                                                minLength={1}
                                                maxLength={1500}
                                                name="ext"
                                                className="form-control tw-pl-8"
                                                placeholder="Extensión"
                                                aria-label="ext"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <BsFillTelephoneForwardFill
                                                    size={18}
                                                />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Sitio Web
                                            </Form.Label>
                                            <Form.Control
                                                value={data.webSite}
                                                type="text"
                                                minLength={1}
                                                maxLength={1500}
                                                name="webSite"
                                                className="form-control tw-pl-8"
                                                placeholder="Url"
                                                aria-label="webSite"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <BsFillTelephoneForwardFill
                                                    size={18}
                                                />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Sector
                                            </Form.Label>
                                            <Form.Control
                                                value={data.sector}
                                                type="text"
                                                minLength={1}
                                                maxLength={1500}
                                                name="sector"
                                                className="form-control tw-pl-8"
                                                placeholder="Sector"
                                                aria-label="sector"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <BsFillTelephoneForwardFill
                                                    size={18}
                                                />
                                            </span>
                                        </Col>

                                        <Col md={6} lg={4} className="mb-3">
                                            <Form.Label className="">
                                                País
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Select
                                                required
                                                noOptionsMessage={({
                                                    inputValue,
                                                }: any) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.country
                                                        ? countries.find(
                                                              (value) =>
                                                                  findValue(
                                                                      value,
                                                                      data.country,
                                                                  ),
                                                          )
                                                        : []
                                                }
                                                defaultValue={selectedCountry}
                                                placeholder="País"
                                                isClearable
                                                name="country"
                                                options={countries}
                                                id="inputCountry"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={(e): any => {
                                                    selectChangeHandlerCountry(
                                                        e,
                                                    );
                                                }}
                                            />
                                        </Col>
                                        <Col md={6} lg={4} className="mb-3">
                                            <Form.Label className="">
                                                Departamento
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Select
                                                required
                                                isDisabled={!data.country}
                                                noOptionsMessage={({
                                                    inputValue,
                                                }: any) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.country
                                                        ? ColombianStates.find(
                                                              (value) =>
                                                                  findValue(
                                                                      value,
                                                                      data.state,
                                                                  ),
                                                          )
                                                        : []
                                                }
                                                defaultValue={selectedState}
                                                placeholder="Departamento"
                                                isClearable
                                                name="state"
                                                options={ColombianStates}
                                                id="inputState1"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={(value) => {
                                                    selectChangeHandlerState(
                                                        value,
                                                    );
                                                }}
                                                styles={customStyles(theme)}
                                            />
                                        </Col>
                                        <Col md={6} lg={4} className="mb-3">
                                            <Form.Label className="">
                                                Ciudad
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Select
                                                required
                                                isDisabled={
                                                    !data.state || !data.country
                                                }
                                                noOptionsMessage={({
                                                    inputValue,
                                                }: any) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.state
                                                        ? getCities(
                                                              data.state,
                                                          ).find((value) =>
                                                              findValue(
                                                                  value,
                                                                  data.city,
                                                              ),
                                                          )
                                                        : []
                                                }
                                                defaultValue={selectedCity}
                                                placeholder="Ciudad"
                                                isClearable
                                                name="city"
                                                options={
                                                    data.state
                                                        ? getCities(data.state)
                                                        : []
                                                }
                                                id="city"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={
                                                    selectChangeHandlerCity
                                                }
                                                styles={customStyles(theme)}
                                            />
                                        </Col>
                                        <Col className="mb-3">
                                            <Form.Group
                                                className="mb-3"
                                                controlId="files"
                                            >
                                                <Form.Label>
                                                    Subir Logo:
                                                    {/* <span className="tw-text-red-500">
                                                        *
                                                    </span> */}
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="iconFile"
                                                    // multiple
                                                    aria-label="iconFile"
                                                    placeholder="Agregue un Logo"
                                                    onChange={
                                                        handleIconFileChange
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Nombres
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={data.name}
                                                type="text"
                                                minLength={1}
                                                maxLength={250}
                                                name="name"
                                                className="form-control tw-pl-8"
                                                placeholder="Nombres"
                                                aria-label="First name"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <IoPersonSharp size={20} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Apellidos
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={data.lastName}
                                                type="text"
                                                minLength={1}
                                                maxLength={250}
                                                name="lastName"
                                                className="form-control tw-pl-8"
                                                placeholder="Apellidos"
                                                aria-label="Last name"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <IoPersonSharp size={20} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Email
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                disabled={
                                                    handleShowMainFormEdit
                                                }
                                                required
                                                value={data.email}
                                                type="email"
                                                name="email"
                                                className="form-control tw-pl-8"
                                                placeholder="Email"
                                                aria-label="email"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <MdEmail size={18} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Group controlId="idType">
                                                <Form.Label className="">
                                                    Tipo Documento
                                                    {/* <span className="tw-text-red-500">
                                                        *
                                                    </span> */}
                                                </Form.Label>
                                                <Select
                                                    // required
                                                    noOptionsMessage={({
                                                        inputValue,
                                                    }) =>
                                                        `No hay resultados para "${inputValue}"`
                                                    }
                                                    value={
                                                        data.idTypeAdmin
                                                            ? idTypes.find(
                                                                  (value) =>
                                                                      findValue(
                                                                          value,
                                                                          data.idTypeAdmin,
                                                                      ),
                                                              )
                                                            : []
                                                    }
                                                    defaultValue={
                                                        selectedIdTypeAdmin
                                                    }
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    name="idTypeAdmin"
                                                    options={idTypes}
                                                    id="idType"
                                                    className="basic-multi-select"
                                                    classNamePrefix="Select2"
                                                    onChange={
                                                        selectChangeHandlerIdTypeAdmin
                                                    }
                                                    styles={{
                                                        placeholder: (
                                                            provided,
                                                        ) => ({
                                                            ...provided,
                                                            marginLeft: "30px",
                                                        }),
                                                        singleValue: (
                                                            provided,
                                                        ) => ({
                                                            ...provided,
                                                            paddingLeft: "30px",
                                                        }),
                                                    }}
                                                />
                                                <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                    <BsPersonVcard size={24} />
                                                </span>
                                            </Form.Group>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Documento
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Form.Control
                                                // required
                                                value={data.idAdmin}
                                                type="text"
                                                minLength={2}
                                                maxLength={250}
                                                name="idAdmin"
                                                className="form-control tw-pl-8"
                                                placeholder="Número"
                                                onChange={changeHandler}
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <IoPersonSharp size={20} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={2}
                                            // lg={4}
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                Indicativo
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <PhoneInput
                                                countryCodeEditable={false}
                                                enableLongNumbers={0}
                                                autoFormat={false}
                                                inputProps={{
                                                    readOnly: true,
                                                    required: true,
                                                    name: "indicativeTwo",
                                                }}
                                                country={"co"}
                                                specialLabel=""
                                                placeholder=""
                                                prefix="+"
                                                dropdownStyle={{
                                                    color: "black",
                                                    borderRadius: 12,
                                                }}
                                                value={data.indicativeTwo}
                                                onChange={
                                                    indicativeTwoChangeHandler
                                                }
                                            />
                                        </Col>
                                        <Col
                                            md={4}
                                            // lg={4}
                                            className="mb-3 tw-relative"
                                        >
                                            <Form.Label className="">
                                                Celular
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Form.Control
                                                value={data.phoneAdmin}
                                                type="tel"
                                                min={0}
                                                max={999999999999999}
                                                name="phoneAdmin"
                                                className="form-control tw-pl-8"
                                                placeholder="Número"
                                                aria-label="Phone number"
                                                onChange={changeHandler}
                                                // pattern="^d{10,15}$"
                                                // title="Por favor, ingrese un número de teléfono válido"
                                            />
                                            <span className="tw-absolute tw-left-5 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                <FaPhone size={18} />
                                            </span>
                                        </Col>
                                        <Col
                                            md={6}
                                            // lg={4}
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                Estado
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Select
                                                required
                                                noOptionsMessage={({
                                                    inputValue,
                                                }) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={isActiveData.find(
                                                    (value) =>
                                                        findValue(
                                                            value,
                                                            data.isActive,
                                                        ),
                                                )}
                                                defaultValue={selectedStatus}
                                                placeholder="Estado"
                                                isClearable
                                                name="isActive"
                                                options={isActiveData}
                                                id="isActive"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={
                                                    selectChangeHandlerStatus
                                                }
                                                components={{
                                                    Option: IconOption,
                                                }}
                                                styles={{
                                                    singleValue: (
                                                        styles,
                                                        { data }: any,
                                                    ) => ({
                                                        ...styles,
                                                        ...dot(data.color),
                                                    }),
                                                }}
                                            />
                                        </Col>
                                        <Col className="mb-3">
                                            <Form.Group
                                                className="mb-3"
                                                controlId="files"
                                            >
                                                <Form.Label>
                                                    Subir Imagen:
                                                    {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="files"
                                                    // multiple
                                                    placeholder="Agregue una foto"
                                                    onChange={
                                                        handleMultipleChange
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </>
                                ))}

                            {/* <Col
                                md={6}
                                lg={
                                    reference !== "agreements" &&
                                    reference !== "areas" &&
                                    reference !== "specialties" &&
                                    reference !== "campus"
                                        ? 4
                                        : 6
                                }
                                className="mb-3"
                            >
                                <Form.Label className="">
                                    {reference === "functionary" ||
                                    reference === "professionals" ||
                                    reference === "patients"
                                        ? "Nombre/s"
                                        : "Nombre"}
                                    <span className="tw-text-red-500">*</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    value={data.name}
                                    type="text"
                                    minLength={1}
                                    maxLength={250}
                                    name="name"
                                    className="form-control"
                                    placeholder="Nombres"
                                    aria-label="First name"
                                    onChange={changeHandler}
                                />
                            </Col> */}

                            {(reference === "campus" ||
                                reference === "specialties" ||
                                reference === "areas") && (
                                <Col md={6} className="mb-3">
                                    <Form.Label className="">
                                        Descripción (opcional)
                                    </Form.Label>
                                    <Form.Control
                                        value={data.description}
                                        type="text"
                                        minLength={2}
                                        maxLength={1500}
                                        name="description"
                                        className="form-control"
                                        placeholder="Descripción"
                                        aria-label="description"
                                        onChange={changeHandler}
                                    />
                                </Col>
                            )}

                            {reference === "diagnoses" && (
                                <Col md={6} lg={4} className="mb-3">
                                    <Form.Label className="">
                                        Código
                                        <span className="tw-text-red-500">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        value={data.code}
                                        type="text"
                                        minLength={2}
                                        maxLength={250}
                                        name="code"
                                        className="form-control"
                                        placeholder="Número"
                                        aria-label="code"
                                        onChange={changeHandler}
                                        // title="Deben ser números del registro"
                                        // pattern="^[0-9\s]+$"
                                    />
                                </Col>
                            )}

                            {reference === "diagnostician" && (
                                <Col md={6} lg={4} className="mb-3">
                                    <Form.Label className="">
                                        Rut
                                        <span className="tw-text-red-500">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        value={data.rut}
                                        type="text"
                                        minLength={2}
                                        maxLength={250}
                                        name="rut"
                                        className="form-control"
                                        placeholder="Número"
                                        aria-label="rut"
                                        onChange={changeHandler}
                                        title="Deben ser números del registro"
                                        pattern="^[0-9\s]+$"
                                    />
                                </Col>
                            )}

                            {reference === "agreements" && (
                                <>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="personType">
                                            <Form.Label className="">
                                                Tipo de Persona
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Select
                                                required
                                                noOptionsMessage={({
                                                    inputValue,
                                                }) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.personType
                                                        ? personTypes.find(
                                                              (value) =>
                                                                  findValue(
                                                                      value,
                                                                      data.personType,
                                                                  ),
                                                          )
                                                        : []
                                                }
                                                placeholder="Seleccione"
                                                isClearable
                                                name="personType"
                                                options={personTypes}
                                                id="personType"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={
                                                    selectChangeHandlerPersonType
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label className="">
                                            Descuento(%) (Opcional)
                                            {/* <span className="tw-text-red-500">
                                                *
                                            </span> */}
                                        </Form.Label>
                                        <Form.Control
                                            value={data.discount}
                                            type="text"
                                            minLength={1}
                                            maxLength={500}
                                            name="discount"
                                            className="form-control"
                                            placeholder="Porcentaje(%)"
                                            aria-label="discount"
                                            onChange={changeHandler}
                                            title="Debe ingresar porcentaje en números"
                                            // pattern="^(\%?)?[0-9\s]+$"
                                        />
                                    </Col>
                                </>
                            )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnostician" &&
                                reference !== "diagnoses" &&
                                reference !== "companies" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Apellido/s
                                            <span className="tw-text-red-500">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            value={data.lastName}
                                            type="text"
                                            minLength={1}
                                            maxLength={250}
                                            name="lastName"
                                            className="form-control"
                                            placeholder="Apellidos"
                                            aria-label="Last name"
                                            onChange={changeHandler}
                                        />
                                    </Col>
                                )}

                            {reference === "patients" && (
                                <>
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Fecha Nacimiento
                                            {/* <span className="tw-text-red-500">
                                                *
                                            </span> */}
                                        </Form.Label>
                                        <Form.Control
                                            // required
                                            value={data.birthDate}
                                            type="date"
                                            name="birthDate"
                                            className=""
                                            aria-label="birthDate"
                                            // onChange={handleGetBirthDate}
                                            onChange={dateChangeHandler}
                                        />
                                    </Col>
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Edad
                                        </Form.Label>
                                        <Form.Control
                                            value={data.age}
                                            disabled
                                            type="number"
                                            min={0}
                                            max={9999}
                                            name="age"
                                            className=""
                                            placeholder="Edad"
                                            aria-label="Age"
                                            // onChange={changeHandler}
                                        />
                                    </Col>
                                </>
                            )}

                            {reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "companies" &&
                                reference !== "areas" && (
                                    <>
                                        <Col
                                            md={6}
                                            lg={reference !== "campus" && 4}
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                Teléfono fijo (opcional)
                                            </Form.Label>
                                            <PhoneInput
                                                autoFormat={false}
                                                country={"co"}
                                                specialLabel=""
                                                placeholder=""
                                                prefix="+"
                                                dropdownStyle={{
                                                    color: "black",
                                                    borderRadius: 12,
                                                }}
                                                value={data.phone2}
                                                // onChange={phoneTwoChangeHandler}
                                            />
                                            {/* <Form.Control
                                                value={data.phone2}
                                                type="tel"
                                                min={0}
                                                max={999999999999999}
                                                name="phone2"
                                                className=""
                                                placeholder="Número"
                                                aria-label="Phone number"
                                                onChange={changeHandler}
                                            /> */}
                                        </Col>

                                        <Col
                                            md={6}
                                            lg={
                                                reference !== "professionals"
                                                    ? reference !== "campus"
                                                        ? 4
                                                        : 6
                                                    : 3
                                            }
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                País
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Select
                                                // required
                                                noOptionsMessage={({
                                                    inputValue,
                                                }: any) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.country
                                                        ? countries.find(
                                                              (value) =>
                                                                  findValue(
                                                                      value,
                                                                      data.country,
                                                                  ),
                                                          )
                                                        : []
                                                }
                                                defaultValue={selectedCountry}
                                                placeholder="País"
                                                isClearable
                                                name="country"
                                                options={countries}
                                                id="inputCountry"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={(e): any => {
                                                    selectChangeHandlerCountry(
                                                        e,
                                                    );
                                                }}
                                            />
                                        </Col>
                                        <Col
                                            md={6}
                                            lg={
                                                reference !== "professionals"
                                                    ? reference !== "campus"
                                                        ? 4
                                                        : 6
                                                    : 3
                                            }
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                Departamento
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Select
                                                // required
                                                isDisabled={!data.country}
                                                noOptionsMessage={({
                                                    inputValue,
                                                }: any) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.country
                                                        ? ColombianStates.find(
                                                              (value) =>
                                                                  findValue(
                                                                      value,
                                                                      data.state,
                                                                  ),
                                                          )
                                                        : []
                                                }
                                                defaultValue={selectedState}
                                                placeholder="Departamento"
                                                isClearable
                                                name="state"
                                                options={ColombianStates}
                                                id="inputState1"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={(value) => {
                                                    selectChangeHandlerState(
                                                        value,
                                                    );
                                                }}
                                                styles={customStyles(theme)}
                                            />
                                        </Col>
                                        <Col
                                            md={6}
                                            lg={
                                                reference !== "professionals"
                                                    ? reference !== "campus"
                                                        ? 4
                                                        : 6
                                                    : 3
                                            }
                                            className="mb-3"
                                        >
                                            <Form.Label className="">
                                                Ciudad
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Select
                                                // required
                                                isDisabled={
                                                    !data.state || !data.country
                                                }
                                                noOptionsMessage={({
                                                    inputValue,
                                                }: any) =>
                                                    `No hay resultados para "${inputValue}"`
                                                }
                                                value={
                                                    data.state
                                                        ? getCities(
                                                              data.state,
                                                          ).find((value) =>
                                                              findValue(
                                                                  value,
                                                                  data.city,
                                                              ),
                                                          )
                                                        : []
                                                }
                                                defaultValue={selectedCity}
                                                placeholder="Ciudad"
                                                isClearable
                                                name="city"
                                                options={
                                                    data.state
                                                        ? getCities(data.state)
                                                        : []
                                                }
                                                id="city"
                                                className="basic-multi-select"
                                                classNamePrefix="Select2"
                                                onChange={
                                                    selectChangeHandlerCity
                                                }
                                                styles={customStyles(theme)}
                                            />
                                        </Col>
                                    </>
                                )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "companies" &&
                                reference !== "areas" && (
                                    <Col
                                        md={6}
                                        lg={reference !== "campus" && 4}
                                        className="mb-3"
                                    >
                                        <Form.Label className="">
                                            Email
                                            <span className="tw-text-red-500">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            disabled={handleShowMainFormEdit}
                                            required
                                            value={data.email}
                                            type="email"
                                            name="email"
                                            className=""
                                            placeholder="Email"
                                            aria-label="email"
                                            onChange={changeHandler}
                                        />
                                    </Col>
                                )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnostician" &&
                                reference !== "diagnoses" &&
                                reference !== "companies" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <>
                                        {handleShowMainForm && (
                                            <>
                                                <Col
                                                    md={6}
                                                    lg={4}
                                                    className="mb-3"
                                                >
                                                    <Form.Label className="">
                                                        Contraseña
                                                        <span className="tw-text-red-500">
                                                            *
                                                        </span>
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            required
                                                            value={
                                                                data.password
                                                            }
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            minLength={8}
                                                            maxLength={16}
                                                            name="password"
                                                            className="form-control"
                                                            placeholder="Contraseña"
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
                                                            show={showPassword}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col
                                                    md={6}
                                                    lg={4}
                                                    className="mb-3"
                                                >
                                                    <Form.Label className="">
                                                        Confirmar Contraseña
                                                        <span className="tw-text-red-500">
                                                            *
                                                        </span>
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            required
                                                            value={
                                                                data.confirmPassword
                                                            }
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            minLength={8}
                                                            maxLength={16}
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            placeholder="Confirmar"
                                                            aria-label="passwordConfirm"
                                                            onChange={
                                                                changeHandler
                                                            }
                                                            title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                        />
                                                        <ShowPasswordButton
                                                            show={showPassword}
                                                            setShow={
                                                                setShowPassword
                                                            }
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </>
                                        )}
                                    </>
                                )}

                            {reference === "professionals" && (
                                <>
                                    {/* <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Número Tarjeta Profesional *
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            value={data.cardNumber}
                                            type="number"
                                            min={0}
                                            max={9999999999999999999}
                                            name="cardNumber"
                                            className=""
                                            placeholder="Número"
                                            aria-label="cardNumber"
                                            onChange={changeHandler}
                                        />
                                    </Col> */}
                                    {/* <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Registro Médico *
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            value={data.medicalRecord}
                                            type="text"
                                            minLength={1}
                                            maxLength={25}
                                            name="medicalRecord"
                                            className=""
                                            placeholder="Registro"
                                            aria-label="medicalRecord"
                                            onChange={changeHandler}
                                        />
                                    </Col> */}
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Especialidad
                                            {/* <span className="tw-text-red-500">
                                                *
                                            </span> */}
                                        </Form.Label>
                                        <Select
                                            // required
                                            noOptionsMessage={({
                                                inputValue,
                                            }) =>
                                                `No hay resultados para "${inputValue}"`
                                            }
                                            value={
                                                data.specialty
                                                    ? specialties?.find(
                                                          (value) =>
                                                              findValue(
                                                                  value,
                                                                  data.specialty,
                                                              ),
                                                      )
                                                    : []
                                            }
                                            defaultValue={selectedSpecialty}
                                            placeholder="Seleccionar..."
                                            isClearable
                                            name="specialty"
                                            options={specialties}
                                            id="specialty"
                                            className="basic-multi-select"
                                            classNamePrefix="Select2"
                                            onChange={
                                                selectChangeHandlerSpecialty
                                            }
                                        />
                                    </Col>
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Convenio (Opcional)
                                        </Form.Label>
                                        <Select
                                            // required
                                            noOptionsMessage={({
                                                inputValue,
                                            }) =>
                                                `No hay resultados para "${inputValue}"`
                                            }
                                            value={
                                                data.contract
                                                    ? contracts?.find((value) =>
                                                          findValue(
                                                              value,
                                                              data.contract,
                                                          ),
                                                      )
                                                    : []
                                            }
                                            defaultValue={selectedContract}
                                            placeholder="Seleccionar..."
                                            isClearable
                                            name="contract"
                                            options={contracts}
                                            id="contract"
                                            className="basic-multi-select"
                                            classNamePrefix="Select2"
                                            onChange={
                                                selectChangeHandlerContract
                                            }
                                        />
                                    </Col>
                                </>
                            )}

                            {/* <Col
                                md={6}
                                lg={
                                    reference !== "campus" &&
                                    reference !== "areas" &&
                                    reference !== "specialties" &&
                                    reference !== "agreements"
                                        ? 4
                                        : 6
                                }
                                className="mb-3"
                            >
                                <Form.Label className="">
                                    Estado
                                    <span className="tw-text-red-500">*</span>
                                </Form.Label>
                                <Select
                                    required
                                    noOptionsMessage={({ inputValue }) =>
                                        `No hay resultados para "${inputValue}"`
                                    }
                                    value={isActiveData.find((value) =>
                                        findValue(value, data.isActive),
                                    )}
                                    defaultValue={selectedStatus}
                                    placeholder="Estado"
                                    isClearable
                                    name="isActive"
                                    options={isActiveData}
                                    id="isActive"
                                    className="basic-multi-select"
                                    classNamePrefix="Select2"
                                    onChange={selectChangeHandlerStatus}
                                    components={{ Option: IconOption }}
                                    styles={{
                                        singleValue: (
                                            styles,
                                            { data }: any,
                                        ) => ({
                                            ...styles,
                                            ...dot(data.color),
                                        }),
                                    }}
                                />
                            </Col> */}

                            {/* {reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnostician" && (
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Fecha Registro
                                        </Form.Label>
                                        <Form.Control
                                            // disabled
                                            type="date"
                                            className=""
                                            aria-label="dateRegister"
                                        />
                                    </Col>
                                )} */}

                            {reference === "functionary" && (
                                <>
                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Rol
                                            <span className="tw-text-red-500">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Select
                                            required
                                            noOptionsMessage={({
                                                inputValue,
                                            }) =>
                                                `No hay resultados para "${inputValue}"`
                                            }
                                            value={
                                                data.rol
                                                    ? roles?.find((value) =>
                                                          findValue(
                                                              value,
                                                              data.rol,
                                                          ),
                                                      )
                                                    : []
                                            }
                                            defaultValue={selectedRol}
                                            placeholder="Rol"
                                            isClearable
                                            name="rol"
                                            options={roles}
                                            id="rol"
                                            className="basic-multi-select"
                                            classNamePrefix="Select2"
                                            onChange={selectChangeHandlerRol}
                                        />
                                    </Col>

                                    <Col md={6} lg={4} className="mb-3">
                                        <Form.Label className="">
                                            Sede
                                            <span className="tw-text-red-500">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Select
                                            required
                                            noOptionsMessage={({
                                                inputValue,
                                            }) =>
                                                `No hay resultados para "${inputValue}"`
                                            }
                                            value={
                                                data.campus
                                                    ? campus?.find((value) =>
                                                          findValue(
                                                              value,
                                                              data.campus,
                                                          ),
                                                      )
                                                    : []
                                            }
                                            defaultValue={selectedCampus}
                                            placeholder="Sede"
                                            isClearable
                                            name="campus"
                                            options={_.sortBy(campus, [
                                                "label",
                                            ])}
                                            id="campus"
                                            className="basic-multi-select"
                                            classNamePrefix="Select2"
                                            onChange={selectChangeHandlerCampus}
                                        />
                                    </Col>
                                </>
                            )}

                            {reference === "areas" && (
                                <Col md={6} className="mb-3">
                                    <Form.Label className="">
                                        Sedes
                                        <span className="tw-text-red-500">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Select
                                        required
                                        noOptionsMessage={({ inputValue }) =>
                                            `No hay resultados para "${inputValue}"`
                                        }
                                        value={
                                            data.availableCampus
                                                ? campus?.filter((item) =>
                                                      data.availableCampus.includes(
                                                          item.value,
                                                      ),
                                                  )
                                                : []
                                        }
                                        defaultValue={selectedAvailableCampus}
                                        placeholder="Sedes Disponibles"
                                        name="availableCampus"
                                        id="availableCampus"
                                        // closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={_.sortBy(campus, ["label"])}
                                        className="basic-multi-select"
                                        classNamePrefix="Select2"
                                        onChange={
                                            selectChangeHandlerAvailableCampus
                                        }
                                    />
                                </Col>
                            )}

                            {reference === "functionary" && (
                                <Col md={6} lg={4} className="mb-3">
                                    <Form.Label className="">
                                        Área
                                        <span className="tw-text-red-500">
                                            *
                                        </span>
                                    </Form.Label>
                                    <Select
                                        required
                                        isDisabled={!data.campus}
                                        styles={customStyles(theme)}
                                        noOptionsMessage={({ inputValue }) =>
                                            `No hay resultados para "${inputValue}"`
                                        }
                                        value={
                                            data.area
                                                ? areas?.find((value) =>
                                                      findValue(
                                                          value,
                                                          data.area,
                                                      ),
                                                  )
                                                : []
                                        }
                                        defaultValue={selectedArea}
                                        placeholder="Área"
                                        isClearable
                                        name="area"
                                        options={_.sortBy(
                                            areasByCampus(data.campus),
                                            ["label"],
                                        )}
                                        id="area"
                                        className="basic-multi-select"
                                        classNamePrefix="Select2"
                                        onChange={selectChangeHandlerArea}
                                    />
                                </Col>
                            )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnostician" &&
                                reference !== "diagnoses" &&
                                reference !== "agreements" &&
                                reference !== "companies" &&
                                reference !== "areas" && (
                                    <Col className="mb-3">
                                        {/* <FilePond
                                            className="multiple-filepond single-fileupload"
                                            files={files}
                                            onupdatefiles={setFiles}
                                            allowMultiple={false}
                                            maxFiles={1}
                                            server="/api"
                                            name="files"
                                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                        /> */}
                                        <Form.Group
                                            className="mb-3"
                                            controlId="files"
                                        >
                                            <Form.Label>
                                                Subir Imagen:
                                                {/* <span className="tw-text-red-500">
                                                    *
                                                </span> */}
                                            </Form.Label>
                                            <Form.Control
                                                type="file"
                                                name="files"
                                                // multiple
                                                placeholder="Agregue una foto"
                                                onChange={handleMultipleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                )}
                            {/* <Col
                                md={12}
                                className="tw-flex tw-justify-between tw-pb-3"
                            >
                                <TooltipComponent id="clean" title="Limpiar">
                                <Button
                                    type="reset"
                                    variant=""
                                    className="border"
                                    onClick={clearSelectFields}
                                >
                                    <MdOutlineCleaningServices size={20} />
                                    &nbsp; Limpiar
                                </Button>
                                </TooltipComponent>
                            </Col> */}
                        </Row>
                        {errorForm && (
                            <Alert
                                variant="warning"
                                className="alert alert-warning alert-dismissible fade show"
                                role="alert"
                                show={show}
                                // onClick={() => setErrorForm(false)}
                            >
                                <strong>Error de envío!.</strong> Todos los
                                campos son obligatorios!
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => setErrorForm(false)}
                                >
                                    <i className="bi bi-x"></i>
                                </Button>
                            </Alert>
                        )}
                        {errorPass && (
                            <Alert
                                variant="info"
                                className="alert alert-info alert-dismissible fade show"
                                role="alert"
                                show={show}
                                // onClick={() => setErrorForm(false)}
                            >
                                <strong>Contraseñas no coinciden!.</strong>
                                Vuelva a intentar!
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => setErrorPass(false)}
                                >
                                    <i className="bi bi-x"></i>
                                </Button>
                            </Alert>
                        )}
                        {errorValid && (
                            <Alert
                                variant="warning"
                                className="alert alert-warning alert-dismissible fade show"
                                role="alert"
                                show={show}
                                // onClick={() => setErrorForm(false)}
                            >
                                {errorValid.includes("->") ? (
                                    <>
                                        {errorValid.split("->")[0]}
                                        <strong>
                                            {errorValid.split("->")[1]}
                                        </strong>
                                    </>
                                ) : (
                                    <>{errorValid}</>
                                )}
                                {/* Vuelva a intentar! */}
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => setErrorValid("")}
                                >
                                    <i className="bi bi-x"></i>
                                </Button>
                            </Alert>
                        )}
                    </Modal.Body>
                ) : (
                    <Modal.Body className="tw-px-8">
                        <Row>
                            {reference === "companies" && (
                                <>
                                    <Col
                                        md={6}
                                        // lg={4}
                                        className="tw-text-center mb-3"
                                    >
                                        <h6 className="pb-3">Foto</h6>
                                        <div className="tw-flex tw-justify-center tw-items-center">
                                            <img
                                                src={
                                                    data.urlPhoto
                                                        ? data.urlPhoto
                                                        : "http://via.placeholder.com/150x150"
                                                }
                                                alt="Profile Photo"
                                                width="150"
                                            />
                                        </div>
                                    </Col>
                                    <Col
                                        md={6}
                                        // lg={4}
                                        className="tw-text-center mb-3"
                                    >
                                        <h6 className="pb-3">Logo</h6>
                                        <div className="tw-flex tw-justify-center tw-items-center">
                                            <img
                                                src={
                                                    data.icon[0]
                                                        ? data.icon
                                                        : "http://via.placeholder.com/150x150"
                                                }
                                                alt="logo image"
                                                width="150"
                                            />
                                        </div>
                                    </Col>
                                </>
                            )}
                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "areas" && (
                                    <>
                                        {data.idType && (
                                            <Col
                                                md={6}
                                                // lg={4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Tipo Documento
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.idType}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.idAdmin && (
                                            <Col
                                                md={6}
                                                // lg={4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Documento
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.id}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}

                            {data.tradename && (
                                <Col
                                    md={6}
                                    // lg={
                                    //     reference !== "agreements" &&
                                    //     reference !== "areas" &&
                                    //     reference !== "specialties" &&
                                    //     reference !== "campus"
                                    //         ? 4
                                    //         : 6
                                    // }
                                    className=""
                                >
                                    <div className="tw-flex-1 tw-text-star tw-text-base">
                                        <h6 className="fw-bold">
                                            {reference === "functionary" ||
                                            reference === "professionals" ||
                                            reference === "patients"
                                                ? "Nombre/s"
                                                : "Nombre"}
                                        </h6>
                                        <p className="fw-light">
                                            {data.tradename}
                                        </p>
                                    </div>
                                </Col>
                            )}

                            {(reference === "campus" ||
                                reference === "specialties" ||
                                reference === "areas") && (
                                <>
                                    {data.description && (
                                        <Col md={6} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Descripción (opcional)
                                                </h6>
                                                <p className="border-bottom">
                                                    {data.description}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference === "diagnoses" && (
                                <>
                                    {data.code && (
                                        <Col md={6} lg={4} className="mb-3">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Código
                                                </h6>
                                                <p className="border-bottom">
                                                    {data.code}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference === "diagnostician" && (
                                <>
                                    {data.rut && (
                                        <Col md={6} lg={4} className="mb-3">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">Rut</h6>
                                                <p className="border-bottom">
                                                    {data.rut}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference === "agreements" && (
                                <>
                                    {data.personType && (
                                        <Col md={6} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Tipo de Persona
                                                </h6>
                                                <p className="border-bottom">
                                                    {data.personType}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                    {data.discount && (
                                        <Col md={6} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Descuento(%)
                                                </h6>
                                                <p className="border-bottom">
                                                    {data.discount}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnostician" &&
                                reference !== "diagnoses" &&
                                reference !== "companies" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <>
                                        {data.lastName && (
                                            <Col md={6} lg={4} className="">
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Apellido/s
                                                    </h6>
                                                    <p className="border-bottom fw-light">
                                                        {data.lastName}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}

                            {reference === "professional" && (
                                <>
                                    {data.birthDate && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Fecha Nacimiento
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {data.birthDate}
                                                </p>
                                            </div>
                                        </Col>
                                    )}

                                    {data.age && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Edad
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {data.age}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnoses" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <>
                                        {data.phone && (
                                            <Col
                                                md={6}
                                                // lg={reference !== "campus" && 4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Celular
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.phone}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}

                            {reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "areas" && (
                                    <>
                                        {data.phone2 && (
                                            <Col
                                                md={6}
                                                // lg={reference !== "campus" && 4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Teléfono fijo (opcional)
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.phone2}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.address && (
                                            <Col md={6} className="">
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Dirección
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.address}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.country && (
                                            <Col
                                                md={6}
                                                // lg={
                                                //     reference !==
                                                //     "professionals"
                                                //         ? reference !== "campus"
                                                //             ? 4
                                                //             : 6
                                                //         : 3
                                                // }
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        País
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.country}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.state && (
                                            <Col
                                                md={6}
                                                // lg={
                                                //     reference !==
                                                //     "professionals"
                                                //         ? reference !== "campus"
                                                //             ? 4
                                                //             : 6
                                                //         : 3
                                                // }
                                                className="mb-3"
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Departamento
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.state &&
                                                            ColombianStates.find(
                                                                (value) =>
                                                                    findValue(
                                                                        value,
                                                                        data.state,
                                                                    ),
                                                            )?.label}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.city && (
                                            <Col
                                                md={6}
                                                // lg={
                                                //     reference !==
                                                //     "professionals"
                                                //         ? reference !== "campus"
                                                //             ? 4
                                                //             : 6
                                                //         : 3
                                                // }
                                                className="mb-3"
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Ciudad
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.city &&
                                                            getCities(
                                                                data.state,
                                                            ).find((value) =>
                                                                findValue(
                                                                    value,
                                                                    data.city,
                                                                ),
                                                            )?.label}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}

                            {reference === "companies" && (
                                <>
                                    <Col
                                        md={12}
                                        // lg={reference !== "campus" && 4}
                                        className="tw-mb-5"
                                    >
                                        <div className="tw-flex-1 tw-text-star tw-text-base">
                                            <h4 className="fw-bold">
                                                Datos Administrador
                                            </h4>
                                        </div>
                                    </Col>
                                    {data.name && (
                                        <Col md={6} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Nombres
                                                </h6>
                                                <p className="fw-light">
                                                    {data.name}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "areas" && (
                                    <>
                                        {data.email && (
                                            <Col
                                                md={6}
                                                // lg={reference !== "campus" && 4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Email
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data.email}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnostician" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <>
                                        {/* <Col md={6} lg={4} className="">
                                        <div className="tw-flex-1 tw-text-star tw-text-base">
                                            <h6 className="fw-bold">
                                                Contraseña
                                            </h6>
                                            <p className="border-bottom fw-light">
                                                **********
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4} className="">
                                        <div className="tw-flex-1 tw-text-star tw-text-base">
                                            <h6 className="fw-bold">
                                                Confirmar Contraseña
                                            </h6>
                                            <p className="border-bottom fw-light">
                                                **********
                                            </p>
                                        </div>
                                    </Col> */}
                                    </>
                                )}

                            {reference === "professionals" && (
                                <>
                                    {/* <Col md={6} lg={4} className="">
                                        <div className="tw-flex-1 tw-text-star tw-text-base">
                                            <h6 className="fw-bold">
                                                Número Tarjeta Profesional
                                            </h6>
                                            <p className="border-bottom fw-light">
                                                {data.cardNumber}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4} className="">
                                        <div className="tw-flex-1 tw-text-star tw-text-base">
                                            <h6 className="fw-bold">
                                                Registro Médico
                                            </h6>
                                            <p className="border-bottom fw-light">
                                                {data.medicalRecord}
                                            </p>
                                        </div>
                                    </Col> */}
                                    {data.specialty && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Especialidad
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {data.specialty}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                    {data.contract && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Convenio
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {data.contract}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            <Col
                                md={6}
                                // lg={
                                //     reference !== "agreements" &&
                                //     reference !== "areas" &&
                                //     reference !== "specialties" &&
                                //     reference !== "campus"
                                //         ? 4
                                //         : 6
                                // }
                                className=""
                            >
                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                    <h6 className="fw-bold">Estado</h6>
                                    <p className="fw-light">
                                        {data.isActive ? "Activo" : "Inactivo"}
                                    </p>
                                </div>
                            </Col>

                            {reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnostician" &&
                                reference !== "areas" && (
                                    <>
                                        {data.timestamp && (
                                            <Col
                                                md={6}
                                                // lg={4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Fecha Registro
                                                    </h6>
                                                    <p className="fw-light">
                                                        {moment(
                                                            data.timestamp,
                                                        ).format(
                                                            "DD/MM/YYYY HH:mm:ss",
                                                        )}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}

                            {reference === "functionary" && (
                                <>
                                    <Col md={6} lg={4} className="">
                                        <div className="tw-flex-1 tw-text-star tw-text-base">
                                            <h6 className="fw-bold">Rol</h6>
                                            <p className="border-bottom fw-light">
                                                {data.rol &&
                                                    roles?.find((value) =>
                                                        findValue(
                                                            value,
                                                            data.rol,
                                                        ),
                                                    )?.label}
                                            </p>
                                        </div>
                                    </Col>

                                    {data.campus && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Sede
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {data.campus &&
                                                        campus?.find((value) =>
                                                            findValue(
                                                                value,
                                                                data.campus,
                                                            ),
                                                        )?.label}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference === "areas" && (
                                <>
                                    {data.availableCampus && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Sedes
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {/* {data.campus &&
                                                        campus?.find((value) =>
                                                            findValue(
                                                                value,
                                                                data.campus,
                                                            ),
                                                            )?.label} */}
                                                    {data.availableCampus &&
                                                        campus
                                                            ?.filter((item) =>
                                                                data.availableCampus.includes(
                                                                    item.value,
                                                                ),
                                                            )
                                                            .map(
                                                                (val) =>
                                                                    val.label,
                                                            )
                                                            .join(", ")}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference === "functionary" && (
                                <>
                                    {data.area && (
                                        <Col md={6} lg={4} className="">
                                            <div className="tw-flex-1 tw-text-star tw-text-base">
                                                <h6 className="fw-bold">
                                                    Área
                                                </h6>
                                                <p className="border-bottom fw-light">
                                                    {data.area &&
                                                        areas?.find((value) =>
                                                            findValue(
                                                                value,
                                                                data.area,
                                                            ),
                                                        )?.label}
                                                </p>
                                            </div>
                                        </Col>
                                    )}
                                </>
                            )}

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnostician" &&
                                reference !== "diagnoses" &&
                                reference !== "companies" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <>
                                        <Col className="tw-text-center">
                                            <h6 className="pb-3">Foto</h6>
                                            <div className="tw-flex tw-justify-center tw-items-center">
                                                <img
                                                    src={
                                                        data.urlPhoto
                                                            ? data.urlPhoto
                                                            : "http://via.placeholder.com/150x150"
                                                    }
                                                    alt="Profile Photo"
                                                    width="150"
                                                />
                                            </div>
                                        </Col>
                                        {reference === "companies" && (
                                            <Col className="tw-text-center">
                                                <h6 className="pb-3">Logo</h6>
                                                <div className="tw-flex tw-justify-center tw-items-center">
                                                    <img
                                                        src={
                                                            data.urlPhoto
                                                                ? data.icon
                                                                : "http://via.placeholder.com/150x150"
                                                        }
                                                        alt="logo image"
                                                        width="150"
                                                    />
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}
                        </Row>
                    </Modal.Body>
                )}

                <Modal.Footer className="tw-flex tw-flex-row tw-justify-between">
                    {isEdit && handleShowMainFormEdit && (
                        <Col>{nextStep ? "Paso 1/2" : "Paso 2/2"}</Col>
                    )}
                    <Col className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-justify-end">
                        <Button
                            className="tw-flex tw-items-center"
                            variant="light"
                            onClick={handleClose}
                        >
                            <ImCancelCircle size={20} />
                            {/* Cancelar */}
                        </Button>
                        {!isEdit && handleShowMainFormEdit ? (
                            <Button variant="primary" onClick={handleEditForm}>
                                <FiEdit size={20} />
                            </Button>
                        ) : (
                            <>
                                {reference === "companies" && nextStep ? (
                                    <Button
                                        className=""
                                        type={companyVal ? "button" : "submit"}
                                        variant="primary"
                                        onClick={() =>
                                            companyVal && setNextStep(false)
                                        }
                                    >
                                        {/* Siguiente &nbsp; */}
                                        <GrNext size={17} />
                                    </Button>
                                ) : (
                                    <div className="tw-flex tw-flex-row w-full mx-16">
                                        {(!isLoading ||
                                            reference === "companies") && (
                                            <Button
                                                className=""
                                                type="button"
                                                variant="primary"
                                                onClick={() =>
                                                    setNextStep(true)
                                                }
                                            >
                                                <GrPrevious size={17} />
                                                {/* &nbsp; Regresar */}
                                            </Button>
                                        )}
                                        <Button
                                            variant="primary"
                                            className={`btn  ${
                                                isLoading && "btn-loader"
                                            } tw-ml-5`}
                                            type="submit"
                                        >
                                            {isLoading ? (
                                                <span className="ml-2 loading">
                                                    <i className="ri-loader-2-fill"></i>
                                                </span>
                                            ) : (
                                                <span className="">
                                                    <VscSave size={18} />
                                                    {/* {handleShowMainFormEdit ? (
                                                ) : (
                                                    "Crear"
                                                )} */}
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </Col>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default MainFormModal;
