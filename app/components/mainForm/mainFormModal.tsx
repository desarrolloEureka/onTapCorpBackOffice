import {
    ColombianStates,
    countries,
    getCities,
    idTypes,
    isActiveData,
} from "@/data/formConstant";
import { ModalParamsMainForm } from "@/types/modals";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import {
    IconButton,
    InputAdornment,
    PaletteMode,
    TextField,
    Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import _ from "lodash";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsFillTelephoneForwardFill, BsPersonVcard } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { IoBusinessSharp, IoPersonSharp, IoAddCircle } from "react-icons/io5";
import {
    MdAccessTime,
    MdBusinessCenter,
    MdEmail,
    MdLocationPin,
} from "react-icons/md";
import { RiSave2Fill } from "react-icons/ri";
import { VscSave } from "react-icons/vsc";
import CustomMUITelInput from "../company/components/CustomMUITelInput";
import CustomSelect from "../company/components/CustomSelect";
import CustomTextField from "../company/components/CustomTextField";
import MainFormHook from "./hook/mainFormHook";
import IconsUrlModal from "../company/components/iconsUrlModal";

const Select = dynamic(() => import("react-select"), { ssr: false });

// const animatedComponents = makeAnimated();

// const { Option } = components;

// const IconOption = (props: any) => (
//     <Option {...props}>
//         <div>
//             <span className={`status bg-${props.data.statusInfo}`}></span>
//             {props.data.label}
//         </div>
//     </Option>
// );

// const customStyles = (theme: any) => ({
//     control: (provided: any, state: any) => ({
//         ...provided,
//         backgroundColor: state.isDisabled
//             ? theme === "dark"
//                 ? "#565656"
//                 : "#f0f0f0"
//             : theme === "light"
//             ? "white"
//             : "#3a3a3d",
//     }),
// });

// const dot = (color = "transparent") => ({
//     alignItems: "center",
//     display: "flex",

//     ":before": {
//         backgroundColor: color,
//         borderRadius: 10,
//         content: '" "',
//         display: "block",
//         marginRight: 8,
//         height: 7,
//         width: 7,
//     },
// });

// const ShowPasswordButton = ({ show, setShow }: showPasswordParams) => (
//     <Button
//         variant="outline-primary"
//         className="btn btn-icon btn-wave"
//         onClick={() => setShow(!show)}
//     >
//         {show ? (
//             <i className="fe fe-eye-off"></i>
//         ) : (
//             <i className="fe fe-eye"></i>
//         )}
//     </Button>
// );

// const TooltipComponent = ({
//     id,
//     children,
//     title,
// }: {
//     id: string;
//     children: any;
//     title: string;
// }) => (
//     <OverlayTrigger
//         placement="bottom"
//         delay={{ show: 150, hide: 400 }}
//         overlay={<Tooltip id={id}>{title}</Tooltip>}
//     >
//         {children}
//     </OverlayTrigger>
// );

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
        isLoading,
        data,
        isEdit,
        errorPass,
        modeTheme,
        errorValid,
        nextStep,
        companyVal,
        urlVal,
        fileNameIcon,
        fileNamePhoto,
        emailError,
        setNextStep,
        setErrorPass,
        setErrorValid,
        handleSendForm,
        handleClose,
        handleReset,
        setErrorForm,
        handleChange,
        findValue,
        handleEditForm,
        handleMultipleChange,
        handleIconFileChange,
        handleOpenModalIcons,
        handleCloseModalIcons,
        isOpenModalIcons,
        itemUrlKey,
        dataLogos,
        itemUrlSelected,
        handleDataNetworks,
        handleNewItem,
        objToArrayItems,
        handleDeleteItem
    } = MainFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
    });

    const theme = createTheme({
        palette: {
            mode: modeTheme as PaletteMode,
        },
    });

    return (
        data && (
            <>
                <Modal
                    size={reference === "companies" ? "xl" : "lg"}
                    centered
                    show={show}
                    onHide={handleClose}
                    aria-hidden="false"
                    aria-modal="true"
                    contentClassName={
                        reference !== "companies" ? "modal-admin" : ""
                    }
                    backdrop="static"
                >
                    <Form
                        // noValidate
                        // validated={errorForm}
                        onReset={handleReset}
                        onSubmit={handleSendForm}
                        // className="modal-admin"
                    >
                        {/* <Modal.Header
                            closeButton={true}
                        >
                            
                        </Modal.Header> */}
                        <ThemeProvider theme={theme}>
                            <Modal.Title
                                className={`${
                                    reference === "companies"
                                        ? "modal-title"
                                        : "modal-title-admin"
                                } tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                                as="h6"
                            >
                                <span>
                                    {
                                        !handleShowMainFormEdit ? "Nuevo Registro" : 
                                        reference === "companies" ? "Detalle Empresa" :
                                        reference === "workAreas" ? "Editar Area" : ""

                                    }
                                </span>
                                <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-center tw-items-center -tw-mt-2">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center"
                                        style={{
                                            padding: 0,
                                            background: "transparent",
                                            border: "none",
                                        }}
                                    >
                                        <IoMdClose
                                            size={35}
                                            color={
                                                reference === "companies"
                                                    ? "gray"
                                                    : "white"
                                            }
                                        />
                                    </button>
                                </div>
                            </Modal.Title>
                            {reference === "workAreas" && (
                                <Modal.Body className="tw-px-8">
                                    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                        <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                                            <div className="tw-flex tw-w-full tw-justify-between">
                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                    Área
                                                </h6>
                                            </div>

                                            <div className="tw-px-3 tw-w-full">
                                                <CustomTextField
                                                    data={data && data.areaName}
                                                    onChange={(
                                                        value: string,
                                                        name: string,
                                                    ) => handleChange(value, name)}
                                                    required
                                                    name="areaName"
                                                    type="text"
                                                    theme={modeTheme}
                                                    id="areaName"
                                                    fullWidth
                                                    label="Nombre del Área"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <WorkOutlineOutlinedIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <CustomTextField
                                                    data={data && data.areaHead}
                                                    onChange={(
                                                        value: string,
                                                        name: string,
                                                    ) => handleChange(value, name)}
                                                    required
                                                    name="areaHead"
                                                    type="text"
                                                    theme={modeTheme}
                                                    id="areaHead"
                                                    fullWidth
                                                    label="Jefe de Área"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PersonOutlineOutlinedIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                                <CustomSelect
                                                    aria-hidden="false"
                                                    data={
                                                        data &&
                                                        data.isActive
                                                            ? "true"
                                                            : ""
                                                    }
                                                    options={
                                                        isActiveData
                                                    }
                                                    onChange={(
                                                        value: boolean,
                                                        name: string,
                                                    ) =>
                                                        handleChange(
                                                            value,
                                                            name,
                                                        )
                                                    }
                                                    required
                                                    name="isActive"
                                                    type="text"
                                                    theme={
                                                        modeTheme
                                                    }
                                                    id="isActive"
                                                    fullWidth
                                                    label="Estado"
                                                    InputProps={{
                                                        startAdornment:
                                                            (
                                                                <InputAdornment
                                                                    className="tw-text-[#64a5e2]"
                                                                    position="start"
                                                                >
                                                                    <HiOutlineCheckCircle
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                </InputAdornment>
                                                            ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                                            <div className="tw-flex tw-w-full tw-justify-between">
                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                    Urls Área
                                                </h6>
                                                <div
                                                    onClick={() => handleNewItem("urlName")}
                                                    className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                >
                                                    <IoAddCircle size={25}/>
                                                        Agregar Url Adicional
                                                </div>
                                            </div>
                                            {objToArrayItems?.urlName?.map(
                                                    (item: any, index: any) => {
                                                        const datafilter =
                                                            dataLogos?.find(
                                                                (val: any) =>
                                                                    val.logoName ===
                                                                    item[7],
                                                            );
                                                        return (
                                            <div
                                                key={index}
                                                className="tw-flex tw-flex-col tw-px-3 tw-w-full"
                                            >
                                                <CustomTextField
                                                    data={[
                                                        item[1],
                                                        item[2],
                                                    ]}
                                                    onChange={(
                                                        value: string,
                                                        name: string,
                                                        checked: boolean,
                                                    ) =>
                                                        handleChange(
                                                            value,
                                                            name,
                                                            checked,
                                                        )
                                                    }
                                                    name={item[0]}
                                                    type="text"
                                                    switch="true"
                                                    theme={modeTheme}
                                                    id={item[0]}
                                                    fullWidth
                                                    label="Nombre del url"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <ExploreOutlinedIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />

                                                <CustomTextField
                                                    required
                                                    onChange={(
                                                        value: string,
                                                        name: string,
                                                    ) => handleChange(value, name)}
                                                    onClick={() => {
                                                        handleDeleteItem(
                                                            item,
                                                        );
                                                    }}
                                                    data={item[5]}
                                                    name={item[4]}
                                                    type="url"
                                                    helperText={
                                                        "Ej: https://example.com"
                                                    }
                                                    theme={modeTheme}
                                                    id={item[4]}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography className="tw-font-bold">
                                                                    URL
                                                                </Typography>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    deleted={
                                                        index !==
                                                        0
                                                            ? "true"
                                                            : ""
                                                    }
                                                    icon="true"
                                                    handleOpenModalIcons={() => {handleOpenModalIcons(item, index)}}
                                                    datafilter={datafilter}
                                                    item={item}
                                                    index={index}
                                                />
                                            </div>
                                             )})}
                                        </div>
                                    </div>
                                </Modal.Body>
                            )}

                            {reference === "companies" && (
                                <>
                                    {isEdit ? (
                                        <Modal.Body className="tw-px-8">
                                            {reference === "companies" && (
                                                <Row className="tw-rounded sub-card-body tw-p-2">
                                                    {nextStep ? (
                                                        <>
                                                            <div className="tw-flex tw-w-full">
                                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                                    Datos Empresa
                                                                </h6>
                                                            </div>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <CustomSelect
                                                                    data={
                                                                        data &&
                                                                        data.idType
                                                                    }
                                                                    options={
                                                                        idTypes
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="idType"
                                                                    type="text"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="idType"
                                                                    fullWidth
                                                                    label="Tipo Documento"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <BsPersonVcard
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    inputProps={{
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    disabled={
                                                                        handleShowMainFormEdit
                                                                    }
                                                                    value={
                                                                        data &&
                                                                        data.id
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="id"
                                                                    id="id"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Documento"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <IoPersonSharp
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: data?.idType === "NIT" ? 9 : 12,
                                                                        minLength: data?.idType === "NIT" ? 9 : 6,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.businessName
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="businessName"
                                                                    id="businessName"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Razón Social"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <IoBusinessSharp
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 250,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.tradename
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="tradename"
                                                                    id="tradename"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Nombre Comercial"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <MdBusinessCenter
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 250,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.address
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="address"
                                                                    id="address"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Dirección"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <MdLocationPin
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 550,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={2}
                                                                className="mb-3"
                                                            >
                                                                <CustomMUITelInput
                                                                    className="tw-mt-4 tw-w-full"
                                                                    value={
                                                                        data &&
                                                                        data.indicative &&
                                                                        data.indicative.includes(
                                                                            "+",
                                                                        )
                                                                            ? data.indicative
                                                                            : "+" +
                                                                            data.indicative
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    name="indicative"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="indicative"
                                                                    variant="standard"
                                                                    size="medium"
                                                                    label="Indicativo"
                                                                    InputProps={{
                                                                        readOnly:
                                                                            true,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.phone
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="phone"
                                                                    id="phone"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Teléfono/Cel"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <FaPhone
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 550,
                                                                        minLength: 2,
                                                                        pattern:
                                                                            "^(\\+?\\d{1,4})?\\s?\\d{10,15}$",
                                                                        title: "Por favor, ingrese un número de teléfono válido",
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.ext
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="ext"
                                                                    id="ext"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Ext"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <BsFillTelephoneForwardFill
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 550,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.webSite
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="webSite"
                                                                    id="webSite"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Sitio Web"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <LanguageOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 550,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.sector
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="sector"
                                                                    id="sector"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Sector"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <WorkOutlineOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 550,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.cards
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="cards"
                                                                    id="cards"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Cantidad de tarjetas"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <AddCardOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        min: 0,
                                                                        max: 100000,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.cardGPS
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="cardGPS"
                                                                    id="cardGPS"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Cantidad con GPS"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <GpsFixedOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        min: 0,
                                                                        max: Number(
                                                                            data.cards,
                                                                        ),
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <CustomSelect
                                                                    data={
                                                                        data &&
                                                                        data.country
                                                                    }
                                                                    options={
                                                                        countries
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="country"
                                                                    type="text"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="country"
                                                                    fullWidth
                                                                    label="País"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <MdLocationPin
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    inputProps={{
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <CustomSelect
                                                                    disabled={
                                                                        !data.country
                                                                    }
                                                                    data={
                                                                        data &&
                                                                        data.state
                                                                    }
                                                                    options={
                                                                        ColombianStates
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="state"
                                                                    type="text"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="state"
                                                                    fullWidth
                                                                    label="Departamento"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <MdLocationPin
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    inputProps={{
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <CustomSelect
                                                                    disabled={
                                                                        !data.state ||
                                                                        !data.country
                                                                    }
                                                                    data={
                                                                        data &&
                                                                        data.city
                                                                    }
                                                                    options={
                                                                        data &&
                                                                        data.state
                                                                            ? getCities(
                                                                                data.state,
                                                                            )
                                                                            : []
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="city"
                                                                    type="text"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="city"
                                                                    fullWidth
                                                                    label="Ciudad"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <MdLocationPin
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    inputProps={{
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col 
                                                                md={6}
                                                                className="mb-3 d-flex align-items-center justify-content-end"
                                                            >
                                                                <label
                                                                    htmlFor="iconButton"
                                                                    className="tw-flex tw-flex-col tw-items-center tw-justify-center"
                                                                >
                                                                    <IconButton
                                                                        size="small"
                                                                        component="span"
                                                                    >
                                                                        <AddPhotoAlternateOutlinedIcon
                                                                            className="url-label"
                                                                            style={{
                                                                                fontSize: 50,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                    <Typography className="tw-font-bold tw-text-sm url-label">
                                                                        {fileNameIcon
                                                                            ? fileNameIcon
                                                                            : "Subir Logo"}
                                                                    </Typography>
                                                                    <input
                                                                        type="file"
                                                                        name="iconFile"
                                                                        id="iconButton"
                                                                        accept=".jpg, .jpeg, .png"
                                                                        hidden
                                                                        onChange={
                                                                            handleIconFileChange
                                                                        }
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                    />
                                                                </label>
                                                            </Col>
                                                            <Col 
                                                                md={6}
                                                                className="mb-3 d-flex align-items-center justify-content-start"
                                                            >
                                                                <p style={{ fontSize: "11px", fontWeight: 300, margin: 0, color:
                                                                    modeTheme === "light" ? "#000" : "#fff"}} >
                                                                   Recomendaciones:<br />
                                                                    - Dimensiones: 250 x 200 px<br />
                                                                    - Tamaño: 100 KB<br />
                                                                    - Formato: JPG, JPEG o PNG<br />
                                                                </p>
                                                            </Col>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="tw-flex tw-w-full">
                                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                                    Detalle
                                                                    Administrador
                                                                </h6>
                                                            </div>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.name
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="name"
                                                                    id="name"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Nombres"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <IoPersonSharp
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 250,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.lastName
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="lastName"
                                                                    id="lastName"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Apellidos"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <IoPersonSharp
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 250,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <TextField
                                                                    disabled={
                                                                        handleShowMainFormEdit
                                                                    }
                                                                    value={
                                                                        data &&
                                                                        data.email
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="email"
                                                                    id="email"
                                                                    type="email"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Email"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <MdEmail
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 250,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                    error={!!emailError}
                                                                    helperText={emailError}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <CustomSelect
                                                                    aria-hidden="false"
                                                                    data={
                                                                        data &&
                                                                        data.idTypeAdmin
                                                                    }
                                                                    options={
                                                                        idTypes
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    // required
                                                                    name="idTypeAdmin"
                                                                    type="text"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="idTypeAdmin"
                                                                    fullWidth
                                                                    label="Tipo Documento"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <BsPersonVcard
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    inputProps={{
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.idAdmin
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="idAdmin"
                                                                    id="idAdmin"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Documento"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <IoPersonSharp
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 250,
                                                                        minLength: 2,
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                lg={2}
                                                                className="mb-3"
                                                            >
                                                                <CustomMUITelInput
                                                                    className="tw-mt-4 tw-w-full"
                                                                    value={
                                                                        data &&
                                                                        data.indicativeTwo &&
                                                                        data.indicativeTwo.includes(
                                                                            "+",
                                                                        )
                                                                            ? data.indicativeTwo
                                                                            : "+" +
                                                                            data.indicativeTwo
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    name="indicativeTwo"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="indicativeTwo"
                                                                    variant="standard"
                                                                    // defaultCountry="CO"
                                                                    size="medium"
                                                                    label="Indicativo"
                                                                    InputProps={{
                                                                        readOnly:
                                                                            true,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col
                                                                md={6}
                                                                lg={4}
                                                                className="mb-3"
                                                            >
                                                                <TextField
                                                                    value={
                                                                        data &&
                                                                        data.phoneAdmin
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            e.target
                                                                                .value,
                                                                            e.target
                                                                                .name,
                                                                        )
                                                                    }
                                                                    name="phoneAdmin"
                                                                    id="phoneAdmin"
                                                                    type="text"
                                                                    variant="standard"
                                                                    color="primary"
                                                                    fullWidth
                                                                    className={`tw-my-4`}
                                                                    label="Teléfono/Cel"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <FaPhone
                                                                                        size={
                                                                                            18
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: {
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "bold",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#396593"
                                                                                    : "#8bb8e7",
                                                                        },
                                                                    }}
                                                                    inputProps={{
                                                                        maxLength: 550,
                                                                        minLength: 2,
                                                                        pattern:
                                                                            "^(\\+?\\d{1,4})?\\s?\\d{10,15}$",
                                                                        title: "Por favor, ingrese un número de teléfono válido",
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>

                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3"
                                                            >
                                                                <CustomSelect
                                                                    aria-hidden="false"
                                                                    data={
                                                                        data &&
                                                                        data.isActive
                                                                            ? "true"
                                                                            : ""
                                                                    }
                                                                    options={
                                                                        isActiveData
                                                                    }
                                                                    onChange={(
                                                                        value: boolean,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    required
                                                                    name="isActive"
                                                                    type="text"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id="isActive"
                                                                    fullWidth
                                                                    label="Estado"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment
                                                                                    className="tw-text-[#64a5e2]"
                                                                                    position="start"
                                                                                >
                                                                                    <HiOutlineCheckCircle
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                    inputProps={{
                                                                        readOnly:
                                                                            !isEdit,
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col className="mb-3 d-flex align-items-center justify-content-end">
                                                                <label
                                                                    htmlFor="photoButton"
                                                                    className="tw-flex tw-flex-col tw-items-center tw-justify-center"
                                                                >
                                                                    <IconButton
                                                                        size="small"
                                                                        component="span"
                                                                    >
                                                                        <AddPhotoAlternateOutlinedIcon
                                                                            className="url-label"
                                                                            style={{
                                                                                fontSize: 50,
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                    <Typography className="tw-font-bold tw-text-sm url-label">
                                                                        {fileNamePhoto
                                                                            ? fileNamePhoto
                                                                            : "Seleccionar Foto"}
                                                                    </Typography>
                                                                    <input
                                                                        type="file"
                                                                        name="photoFile"
                                                                        id="photoButton"
                                                                        accept=".jpg, .jpeg, .png"
                                                                        hidden
                                                                        onChange={
                                                                            handleMultipleChange
                                                                        }
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                    />
                                                                </label>
                                                            </Col>
                                                            <Col className="mb-3 d-flex align-items-center justify-content-start" >
                                                                <p style={{ fontSize: "11px", fontWeight: 300, margin: 0, color:
                                                                    modeTheme === "light" ? "#000" : "#fff"}} >
                                                                   Recomendaciones:<br />
                                                                    - Dimensiones: 200 x 200 px<br />
                                                                    - Tamaño: 100 KB<br />
                                                                    - Formato: JPG, JPEG o PNG<br />
                                                                </p>
                                                            </Col>
                                                        </>
                                                    )}
                                                </Row>
                                            )}

                                            {errorForm && (
                                                <Alert
                                                    variant="warning"
                                                    className="alert alert-warning alert-dismissible fade show"
                                                    role="alert"
                                                    show={show}
                                                    // onClick={() => setErrorForm(false)}
                                                >
                                                    <strong>
                                                        Error de envío!.
                                                    </strong>{" "}
                                                    Todos los campos son
                                                    obligatorios!
                                                    <Button
                                                        variant=""
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="alert"
                                                        aria-label="Close"
                                                        onClick={() =>
                                                            setErrorForm(false)
                                                        }
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
                                                    <strong>
                                                        Contraseñas no coinciden!.
                                                    </strong>
                                                    Vuelva a intentar!
                                                    <Button
                                                        variant=""
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="alert"
                                                        aria-label="Close"
                                                        onClick={() =>
                                                            setErrorPass(false)
                                                        }
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
                                                            {
                                                                errorValid.split(
                                                                    "->",
                                                                )[0]
                                                            }
                                                            <strong>
                                                                {
                                                                    errorValid.split(
                                                                        "->",
                                                                    )[1]
                                                                }
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
                                                        onClick={() =>
                                                            setErrorValid("")
                                                        }
                                                    >
                                                        <i className="bi bi-x"></i>
                                                    </Button>
                                                </Alert>
                                            )}
                                        </Modal.Body>
                                    ) : (
                                        <Modal.Body className="tw-px-8">
                                            <Row className="tw-rounded sub-card-body tw-p-2">
                                                {reference === "companies" && (
                                                    <>
                                                        <div className="tw-flex tw-w-full">
                                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded tw-text-white">
                                                                Datos Empresa
                                                            </h6>
                                                        </div>
                                                        <Row>
                                                            {data &&
                                                                data.urlPhoto && (
                                                                    <Col
                                                                        md={6}
                                                                        // lg={12}
                                                                        className="tw-text-center mb-3 tw-w-1/2"
                                                                    >
                                                                        <h6 className="pb-3 text-textfield m-0">
                                                                            Foto
                                                                        </h6>
                                                                        <div className="tw-flex tw-justify-center tw-items-center">
                                                                            <Image
                                                                                className="tw-rounded-3xl"
                                                                                src={
                                                                                    data &&
                                                                                    data.urlPhoto
                                                                                        ? data.urlPhoto
                                                                                        : "https://via.placeholder.com/150x150"
                                                                                }
                                                                                width={
                                                                                    0
                                                                                }
                                                                                height={
                                                                                    0
                                                                                }
                                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                                style={{
                                                                                    width: "auto",
                                                                                    height: "35%",
                                                                                    maxHeight: "35%",
                                                                                    maxWidth: "35%"
                                                                                }}
                                                                                alt="Profile Photo"
                                                                                placeholder="blur"
                                                                                blurDataURL={
                                                                                    data &&
                                                                                    data.urlPhoto
                                                                                        ? data.urlPhoto
                                                                                        : "https://via.placeholder.com/150x150"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                )}
                                                            {data && data.icon && (
                                                                <Col
                                                                    md={6}
                                                                    // lg={12}
                                                                    className="tw-text-center mb-3 tw-w-1/2"
                                                                >
                                                                    <h6 className="pb-3 text-textfield m-0">
                                                                        Logo
                                                                    </h6>
                                                                    <div className="tw-flex tw-justify-center tw-items-center">
                                                                        <Image
                                                                            className="tw-rounded-3xl"
                                                                            src={
                                                                                data &&
                                                                                data.icon
                                                                                    ? _.isArray(
                                                                                        data.icon,
                                                                                    )
                                                                                        ? data
                                                                                            .icon[0]
                                                                                        : data.icon
                                                                                    : "https://via.placeholder.com/150x150"
                                                                            }
                                                                            width={
                                                                                0
                                                                            }
                                                                            height={
                                                                                0
                                                                            }
                                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                            style={{
                                                                                width: "auto",
                                                                                height: "35%",
                                                                                maxHeight: "35%",
                                                                                maxWidth: "35%"
                                                                            }}
                                                                            alt="Icon Photo Company"
                                                                            placeholder="blur"
                                                                            blurDataURL={
                                                                                data &&
                                                                                data.icon
                                                                                    ? _.isArray(
                                                                                        data.icon,
                                                                                    )
                                                                                        ? data
                                                                                            .icon[0]
                                                                                        : data.icon
                                                                                    : "https://via.placeholder.com/150x150"
                                                                            }
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            )}
                                                        </Row>
                                                    </>
                                                )}

                                                {/* {reference === "workAreas" && (
                                                    <>
                                                        {data && data.areaName && (
                                                            <Col
                                                                md={6}
                                                                className=""
                                                            >
                                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                                    <h6 className="fw-bold">
                                                                        Nombre Área
                                                                    </h6>
                                                                    <p className="fw-light">
                                                                        {data &&
                                                                            data.areaName}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        )}
                                                        {data && data.areaHead && (
                                                            <Col
                                                                md={6}
                                                                className=""
                                                            >
                                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                                    <h6 className="fw-bold">
                                                                        Jefe de Área
                                                                    </h6>
                                                                    <p className="fw-light">
                                                                        {data &&
                                                                            data.areaHead}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        )}
                                                        {data && data.urlName && (
                                                            <Col
                                                                md={6}
                                                                className=""
                                                            >
                                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                                    <h6 className="fw-bold">
                                                                        Nombre Área
                                                                    </h6>
                                                                    <p className="fw-light">
                                                                        {data &&
                                                                            data
                                                                                .urlName[0]}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        )}
                                                        {data && data.urlLink && (
                                                            <Col
                                                                md={6}
                                                                className=""
                                                            >
                                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                                    <h6 className="fw-bold">
                                                                        Enlace
                                                                    </h6>
                                                                    <p className="fw-light">
                                                                        {data &&
                                                                            data.urlLink}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        )}
                                                        {data.icon && (
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="tw-text-center mb-3"
                                                            >
                                                                <h6 className="pb-3">
                                                                    Icono
                                                                </h6>
                                                                <div className="tw-flex tw-justify-center tw-items-center">
                                                                    <img
                                                                        src={
                                                                            data.icon
                                                                                ? _.isArray(
                                                                                    data.icon,
                                                                                )
                                                                                    ? data
                                                                                        .icon[0]
                                                                                    : data.icon
                                                                                : "https://via.placeholder.com/150x150"
                                                                        }
                                                                        alt="logo image"
                                                                        width="150"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        )}
                                                    </>
                                                )} */}

                                                {data && data.idType && (
                                                    <Col
                                                        md={6}
                                                        // lg={4}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Tipo Documento
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data &&
                                                                    data.idType}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <BsPersonVcard
                                                                size={24}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}
                                                {data && data.id && (
                                                    <Col
                                                        md={6}
                                                        // lg={4}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Documento
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data && data.id}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <IoPersonSharp
                                                                size={20}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}

                                                {data && data.tradename && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Nombre Comercial
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data &&
                                                                    data.tradename}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdBusinessCenter
                                                                size={20}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}

                                                {data && data.phone && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Celular
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data && data.phone}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <FaPhone size={18} />
                                                        </span>
                                                    </Col>
                                                )}

                                                {/* {data && data.phone2 && (
                                            <Col md={6} className="">
                                                <div className="tw-flex-1 tw-text-star tw-text-base">
                                                    <h6 className="fw-bold">
                                                        Teléfono fijo (opcional)
                                                    </h6>
                                                    <p className="fw-light">
                                                        {data && data.phone2}
                                                    </p>
                                                </div>
                                            </Col>
                                        )} */}

                                                {data && data.address && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Dirección
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data &&
                                                                    data.address}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdLocationPin
                                                                size={18}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}

                                                {data && data.country && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                País
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data &&
                                                                    data.country}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdLocationPin
                                                                size={18}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}

                                                {data && data.state && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Departamento
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data &&
                                                                    data.state &&
                                                                    ColombianStates.find(
                                                                        (value) =>
                                                                            findValue(
                                                                                value,
                                                                                data.state,
                                                                            ),
                                                                    )?.label}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdLocationPin
                                                                size={18}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}

                                                {data && data.city && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Ciudad
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data &&
                                                                    data.city &&
                                                                    getCities(
                                                                        data.state,
                                                                    ).find(
                                                                        (value) =>
                                                                            findValue(
                                                                                value,
                                                                                data.city,
                                                                            ),
                                                                    )?.label}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdLocationPin
                                                                size={18}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}

                                                {reference === "companies" && (
                                                    <>
                                                        <Col
                                                            md={12}
                                                            className="tw-mb-5"
                                                        >
                                                            <div className="tw-flex tw-w-full">
                                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded tw-text-white">
                                                                    Datos
                                                                    Administrador
                                                                </h6>
                                                            </div>
                                                        </Col>
                                                        {data && data.name && (
                                                            <Col
                                                                md={6}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                                    <h6 className="label-textfield fw-bolder tw-text-base">
                                                                        Nombres
                                                                    </h6>
                                                                    <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                        {data &&
                                                                            data.name}
                                                                    </span>
                                                                </div>
                                                                <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                                    <IoPersonSharp
                                                                        size={20}
                                                                    />
                                                                </span>
                                                            </Col>
                                                        )}

                                                        {data && data.lastName && (
                                                            <Col
                                                                md={6}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                                    <h6 className="label-textfield fw-bolder tw-text-base">
                                                                        Apellidos
                                                                    </h6>
                                                                    <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                        {data &&
                                                                            data.lastName}
                                                                    </span>
                                                                </div>
                                                                <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                                    <IoPersonSharp
                                                                        size={20}
                                                                    />
                                                                </span>
                                                            </Col>
                                                        )}
                                                        {data && data.idAdmin && (
                                                            <Col
                                                                md={6}
                                                                // lg={4}
                                                                className="mb-3 tw-relative"
                                                            >
                                                                <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                                    <h6 className="label-textfield fw-bolder tw-text-base">
                                                                        Documento
                                                                    </h6>
                                                                    <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                        {data &&
                                                                            data.idAdmin}
                                                                    </span>
                                                                </div>
                                                                <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                                    <IoPersonSharp
                                                                        size={20}
                                                                    />
                                                                </span>
                                                            </Col>
                                                        )}
                                                    </>
                                                )}

                                                {data && data.email && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Email
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {data && data.email}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdEmail size={18} />
                                                        </span>
                                                    </Col>
                                                )}

                                                <Col
                                                    md={6}
                                                    className="mb-3 tw-relative"
                                                >
                                                    <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                        <h6 className="label-textfield fw-bolder tw-text-base">
                                                            Estado
                                                        </h6>
                                                        <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                            {data && data.isActive
                                                                ? "Activo"
                                                                : "Inactivo"}
                                                        </span>
                                                    </div>
                                                    <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                        <HiOutlineCheckCircle
                                                            size={24}
                                                        />
                                                    </span>
                                                </Col>

                                                {data && data.timestamp && (
                                                    <Col
                                                        md={6}
                                                        className="mb-3 tw-relative"
                                                    >
                                                        <div className="tw-flex tw-w-full tw-flex-col tw-text-star tw-text-base">
                                                            <h6 className="label-textfield fw-bolder tw-text-base">
                                                                Fecha Registro
                                                            </h6>
                                                            <span className="fw-normal custom-border-bottom tw-pl-8 text-textfield tw-pb-1">
                                                                {moment(
                                                                    data.timestamp,
                                                                ).format(
                                                                    "DD/MM/YYYY HH:mm:ss",
                                                                )}
                                                            </span>
                                                        </div>
                                                        <span className="tw-absolute tw-left-3 tw-bottom-2 tw-text-[#64a5e2] tw-text-base">
                                                            <MdAccessTime
                                                                size={24}
                                                            />
                                                        </span>
                                                    </Col>
                                                )}
                                            </Row>
                                        </Modal.Body>
                                    )}
                                </>
                            )}
                        </ThemeProvider>

                        <Modal.Footer className="tw-flex tw-flex-row tw-justify-between">
                            {isEdit &&
                                handleShowMainFormEdit &&
                                reference === "companies" && (
                                    <Col>{nextStep ? "Paso 1/2" : "Paso 2/2"}</Col>
                            )}
                            
                            {isEdit &&
                                !handleShowMainFormEdit &&
                                reference === "companies" && (
                                    <Col>{nextStep ? "Paso 1/2" : "Paso 2/2"}</Col>
                            )}

                            {reference === "workAreas" ? (
                                <Col className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-justify-end">
                                    <button
                                        type="button"
                                        className="tw-flex tw-items-center tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-text-white"
                                        onClick={handleClose}
                                    >
                                        <ImCancelCircle size={28} />
                                        {/* Cancelar */}
                                    </button>

                                    {!isEdit && handleShowMainFormEdit ? (
                                        <button
                                            type="submit"
                                            className="tw-flex tw-items-center tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-text-white"
                                            // onClick={handleEditForm}
                                        >
                                            <RiSave2Fill size={28} />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className={`tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center`}
                                        >
                                            <span className="tw-text-white">
                                                <RiSave2Fill size={28} />
                                            </span>
                                        </button>
                                    )}
                                </Col>
                            ) : (
                                <Col className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-justify-end">
                                    <Button
                                        className="tw-flex tw-items-center btn-admin"
                                        variant="light"
                                        onClick={handleClose}
                                    >
                                        <ImCancelCircle size={20} />
                                        {/* Cancelar */}
                                    </Button>
                                    {!isEdit && handleShowMainFormEdit ? (
                                        <Button
                                            variant="primary"
                                            onClick={handleEditForm}
                                        >
                                            <FiEdit size={20} />
                                        </Button>
                                    ) : (
                                        <>
                                            {reference === "companies" &&
                                            nextStep ? (
                                                <Button
                                                    className=""
                                                    type={
                                                        companyVal &&
                                                        urlVal()
                                                            ? "button"
                                                            : "submit"
                                                    }
                                                    variant="primary"
                                                    onClick={() => {
                                                        urlVal() &&
                                                        companyVal &&
                                                        setNextStep(false)
                                                        }
                                                    }
                                                >
                                                    {/* Siguiente &nbsp; */}
                                                    <GrNext size={17} />
                                                </Button>
                                            ) : (
                                                <div className="tw-flex tw-flex-row w-full mx-16">
                                                    {reference === "companies" && (
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
                                                        // variant="primary"
                                                        className={`tw-ml-5 btn-save-admin`}
                                                        type="submit"
                                                        disabled={!!emailError}
                                                    >
                                                        <span className="">
                                                            <VscSave size={18} />
                                                        </span>
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Col>
                            )}
                        </Modal.Footer>
                    </Form>
                </Modal>
                <IconsUrlModal
                    show={isOpenModalIcons}
                    handleClose={() => handleCloseModalIcons()}
                    dataLogos={dataLogos}
                    handleDataNetworks={handleDataNetworks}
                    itemKey={itemUrlKey}
                    val={itemUrlSelected}
                    modeTheme={modeTheme ? modeTheme : 'light'}
                />
            </>
        )
    );
};

export default MainFormModal;
