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
import { ModalParamsMainForm } from "@/types/modals";
import "filepond/dist/filepond.min.css";
import _ from "lodash";
import dynamic from "next/dynamic";
import {
    Alert,
    Button,
    Col,
    Form,
    InputGroup,
    Modal,
    Row,
} from "react-bootstrap";
import { FilePond } from "react-filepond";
import MainFormHook from "./hook/mainFormHook";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { components } from "react-select";
import { showPasswordParams } from "@/types/mainForm";
import makeAnimated from "react-select/animated";
import PhoneInput from "react-phone-input-2";
import moment from "moment";

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
        phoneChangeHandler,
        phoneTwoChangeHandler,
        findValue,
        handleEditForm,
        handleMultipleChange,
        selectChangeHandlerPersonType,
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
        <Modal size="xl" centered show={show} onHide={handleClose}>
            <Form
                // noValidate
                // validated={errorForm}
                onReset={handleReset}
                onSubmit={handleSendForm}
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        className="tw-text-[#e9a225]"
                        as="h6"
                    >{`Nuevo Registro ${title}`}</Modal.Title>
                </Modal.Header>
                {isEdit ? (
                    <Modal.Body className="tw-px-8">
                        <Row>
                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "areas" && (
                                    <>
                                        <Col md={6} lg={4} className="mb-3">
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
                                                    className="basic-multi-select"
                                                    classNamePrefix="Select2"
                                                    onChange={
                                                        selectChangeHandlerIdType
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} lg={4} className="mb-3">
                                            <Form.Label className="">
                                                Documento
                                                <span className="tw-text-red-500">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={data.id}
                                                type="text"
                                                minLength={2}
                                                maxLength={250}
                                                name="id"
                                                className="form-control"
                                                placeholder="Número"
                                                aria-label="Last name"
                                                onChange={changeHandler}
                                            />
                                        </Col>
                                    </>
                                )}

                            <Col
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
                            </Col>

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
                                        <Form.Group controlId="idType">
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
                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "diagnoses" &&
                                reference !== "agreements" &&
                                reference !== "areas" && (
                                    <Col
                                        md={6}
                                        lg={reference !== "campus" && 4}
                                        className="mb-3"
                                    >
                                        <Form.Label className="">
                                            Celular
                                            <span className="tw-text-red-500">
                                                *
                                            </span>
                                        </Form.Label>
                                        <PhoneInput
                                            autoFormat={false}
                                            inputProps={{
                                                name: "phone",
                                                required: true,
                                                pattern:
                                                    "^(\\+?\\d{1,4})?\\s?\\d{10,15}$",
                                                title: "Por favor, ingrese un número de teléfono válido",
                                            }}
                                            country={"co"}
                                            specialLabel=""
                                            placeholder=""
                                            prefix="+"
                                            dropdownStyle={{
                                                color: "black",
                                                borderRadius: 12,
                                            }}
                                            value={data.phone}
                                            onChange={phoneChangeHandler}
                                        />
                                        {/* <Form.Control
                                            required
                                            value={data.phone}
                                            type="tel"
                                            maxLength={250}
                                            name="phone"
                                            className=""
                                            placeholder="Número"
                                            aria-label="Phone number"
                                            onChange={changeHandler}
                                            title="Deben ser números o caracteres telefónicos"
                                            pattern="^(\+?)?[0-9\s]+$"
                                        /> */}
                                    </Col>
                                )}

                            {reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
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
                                                onChange={phoneTwoChangeHandler}
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
                                        <Col md={6} className="mb-3">
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
                                                className=""
                                                placeholder="Dirección"
                                                aria-label="address"
                                                onChange={changeHandler}
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

                            <Col
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
                            </Col>

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
                            <Col md={12} className="tw-text-end tw-pb-3">
                                <Button
                                    type="reset"
                                    variant="primary"
                                    onClick={clearSelectFields}
                                >
                                    Limpiar
                                </Button>
                            </Col>
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
                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "areas" && (
                                    <>
                                        {data.idType && (
                                            <Col md={6} lg={4} className="">
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Tipo Documento
                                                    </h6>
                                                    <p className="border-bottom fw-light">
                                                        {data.idType}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.id && (
                                            <Col md={6} lg={4} className="">
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Documento
                                                    </h6>
                                                    <p className="border-bottom fw-light">
                                                        {data.id}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                    </>
                                )}
                            {data.name && (
                                <Col
                                    md={6}
                                    lg={
                                        reference !== "agreements" &&
                                        reference !== "areas" &&
                                        reference !== "specialties" &&
                                        reference !== "campus"
                                            ? 4
                                            : 6
                                    }
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
                                        <p className="border-bottom fw-light">
                                            {data.name}
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

                            {reference === "c" && (
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
                                                lg={reference !== "campus" && 4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Celular
                                                    </h6>
                                                    <p className="border-bottom fw-light">
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
                                                lg={reference !== "campus" && 4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Teléfono fijo (opcional)
                                                    </h6>
                                                    <p className="border-bottom fw-light">
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
                                                    <p className="border-bottom fw-light">
                                                        {data.address}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.country && (
                                            <Col
                                                md={6}
                                                lg={
                                                    reference !==
                                                    "professionals"
                                                        ? reference !== "campus"
                                                            ? 4
                                                            : 6
                                                        : 3
                                                }
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        País
                                                    </h6>
                                                    <p className="border-bottom fw-light">
                                                        {data.country}
                                                    </p>
                                                </div>
                                            </Col>
                                        )}
                                        {data.state && (
                                            <Col
                                                md={6}
                                                lg={
                                                    reference !==
                                                    "professionals"
                                                        ? reference !== "campus"
                                                            ? 4
                                                            : 6
                                                        : 3
                                                }
                                                className="mb-3"
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Departamento
                                                    </h6>
                                                    <p className="border-bottom fw-light">
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
                                                lg={
                                                    reference !==
                                                    "professionals"
                                                        ? reference !== "campus"
                                                            ? 4
                                                            : 6
                                                        : 3
                                                }
                                                className="mb-3"
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Ciudad
                                                    </h6>
                                                    <p className="border-bottom fw-light">
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

                            {reference !== "campus" &&
                                reference !== "specialties" &&
                                reference !== "agreements" &&
                                reference !== "diagnoses" &&
                                reference !== "areas" && (
                                    <>
                                        {data.email && (
                                            <Col
                                                md={6}
                                                lg={reference !== "campus" && 4}
                                                className=""
                                            >
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Email
                                                    </h6>
                                                    <p className="border-bottom fw-light">
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
                                lg={
                                    reference !== "agreements" &&
                                    reference !== "areas" &&
                                    reference !== "specialties" &&
                                    reference !== "campus"
                                        ? 4
                                        : 6
                                }
                                className=""
                            >
                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                    <h6 className="fw-bold">Estado</h6>
                                    <p className="border-bottom fw-light">
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
                                            <Col md={6} lg={4} className="">
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Fecha Registro
                                                    </h6>
                                                    <p className="border-bottom fw-light">
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
                                                {/* {data.rol} */}
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
                                reference !== "agreements" &&
                                reference !== "areas" && (
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
                                )}
                        </Row>
                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {!isEdit && handleShowMainFormEdit ? (
                        <Button variant="primary" onClick={handleEditForm}>
                            Editar
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            className={`btn  ${isLoading && "btn-loader"}`}
                            // onClick={handleSendForm}
                            type="submit"
                            // disabled={dataDocumentsToSel ? false : true}
                        >
                            <span className="me-2">
                                {handleShowMainFormEdit ? "Guardar" : "Crear"}
                            </span>
                            {isLoading && (
                                <span className="loading">
                                    <i className="ri-loader-2-fill fs-16"></i>
                                </span>
                            )}
                        </Button>
                    )}
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default MainFormModal;
