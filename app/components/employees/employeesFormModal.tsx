import { ModalParamsMainForm } from "@/types/modals";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
    FormControlLabel,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import { Button, Col, Form, Modal } from "react-bootstrap";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { VscSave } from "react-icons/vsc";
import CustomTextField from "../company/components/CustomTextField";
import CustomSelectSwitch from "./components/CustomSelectSwitch";
import SwitchForm from "./components/SwitchForm";
import EmployeesFormHook from "./hook/employeesFormHook";

const EmployeesFormModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
    data,
}: ModalParamsMainForm) => {
    const {
        modeTheme,
        show,
        dataForm,
        isLoading,
        handleSendForm,
        handleClose,
        handleReset,
        isEdit,
        allChecked,
        handleChange,
        handleAddData,
        handleChangeItem,
        step,
        employeeCardStatus,
        handleChangeSwitch,
        routeData,
        areaData,
        mondayRoute,
        tuesdayRoute,
        wednesdayRoute,
        thursdayRoute,
        fridayRoute,
        saturdayRoute,
        sundayRoute,
        handleChangeSelect,
        handleRouteChange,
        routeApplicable,
        selectedArea,
        handleAreaChange,
        headquartersData,
        selectedHeadquarter,
        handleHeadquartersChange,
        handleEditForm,
        handleFileChange,
        selectedImage,
        setStep,
        handleDeleteItem,
        errors,
        handleChangeStep,
        selectedAreaError,
        selectedHeadquarterError,
        routeApplicableError,
        mondayRouteError,
        tuesdayRouteError,
        wednesdayRouteError,
        thursdayRouteError,
        fridayRouteError,
        saturdayRouteError,
        sundayRouteError,
        employeeCardStatusError,
    } = EmployeesFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
    });

    const CustomSelect = styled(Select)({
        backgroundColor: "#396593",
        width: 250,
        height: 40,
        color: "#fff",
        "& .MuiSelect-icon": {
            color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
        },
    });

    // Estilizando el Radio
    const CustomRadio = styled(Radio)(({ theme }) => ({
        color: "#396593",
        "&.Mui-checked": {
            color: "#396593",
        },
    }));

    return (
        dataForm && (
            <Modal
                size={"lg"}
                centered
                show={show}
                onHide={handleClose}
                aria-hidden="false"
                aria-modal="true"
            >
                <Form
                    onReset={handleReset}
                    onSubmit={
                        !isEdit && handleShowMainFormEdit
                            ? handleEditForm
                            : handleSendForm
                    }
                >
                    <Modal.Title
                        className={`modal-title tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                        as="h6"
                    >
                        <span>Agregar los datos del empleado</span>
                        <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-center tw-items-center -tw-mt-2">
                            <Button
                                onClick={handleClose}
                                className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center"
                                style={{
                                    padding: 0,
                                    background: "transparent",
                                    border: "none",
                                }}
                            >
                                <IoMdClose size={35} color={"gray"} />
                            </Button>
                        </div>
                    </Modal.Title>

                    <Modal.Body
                        className="tw-px-8"
                        style={{ borderTop: "2px solid #396593", marginTop: 6 }}
                    >
                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                            <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                                {step && step === 1 ? (
                                    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                            <h6 className="h5">
                                                Datos personales
                                            </h6>
                                        </div>
                                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4 tw-justify-start tw-items-center tw-pb-2">
                                            <div className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                                                <div
                                                    style={{
                                                        width: "162px",
                                                        height: "162px",
                                                        border: "11px solid #396593",
                                                        borderRadius: "50%",
                                                        backgroundColor:
                                                            selectedImage
                                                                ? "transparent"
                                                                : "#396593",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        color: "white",
                                                        fontSize: "16px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {selectedImage ? (
                                                        <img
                                                            style={{
                                                                width: "101%",
                                                                height: "101%",
                                                                objectFit:
                                                                    "cover",
                                                                borderRadius:
                                                                    "50%",
                                                            }}
                                                            className="tw-rounded-full tw-object-cover"
                                                            src={
                                                                selectedImage
                                                                    ? selectedImage
                                                                    : ""
                                                            }
                                                            alt="Profile Photo"
                                                        />
                                                    ) : (
                                                        <span>
                                                            Agregar foto
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center"
                                                style={{ position: "absolute" }}
                                            >
                                                <div className="tw-flex tw-w-48 tw-h-14 tw-flex-col tw-justify-start tw-items-end -tw-mr-2">
                                                    <div
                                                        className="tw-flex tw-w-10 tw-h-10 tw-flex-col tw-justify-center tw-items-center tw-bg-[#396593]"
                                                        style={{
                                                            borderRadius: 20,
                                                        }}
                                                    >
                                                        <label
                                                            htmlFor="dropzone-file"
                                                            className="tw-absolute"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                component="span"
                                                                className="tw-absolute tw-inset-0"
                                                            >
                                                                <AddOutlinedIcon
                                                                    style={{
                                                                        fontSize: 25,
                                                                        color: "white",
                                                                    }}
                                                                />
                                                            </IconButton>
                                                            <input
                                                                type="file"
                                                                id="dropzone-file"
                                                                accept=".jpg, .jpeg, .png"
                                                                onChange={
                                                                    handleFileChange
                                                                }
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-p-2 tw-pb-8 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                {" "}
                                                Datos empleado
                                            </h6>
                                            <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">
                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                    <CustomTextField
                                                        checked={allChecked}
                                                        data={
                                                            dataForm.firstName
                                                        }
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
                                                        required
                                                        name="firstName"
                                                        type="text"
                                                        switch="true"
                                                        theme={modeTheme}
                                                        id="firstName"
                                                        fullWidth
                                                        label="Nombre"
                                                        errorShow={
                                                            errors.firstName
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PersonOutlineOutlinedIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                    <CustomTextField
                                                        checked={allChecked}
                                                        data={dataForm.lastName}
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
                                                        required
                                                        name="lastName"
                                                        type="text"
                                                        switch="true"
                                                        theme={modeTheme}
                                                        id="lastName"
                                                        fullWidth
                                                        errorShow={
                                                            errors.lastName
                                                        }
                                                        label="Apellido"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PersonOutlineOutlinedIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                    <CustomSelectSwitch
                                                        checked={allChecked}
                                                        data={
                                                            dataForm.documentType
                                                        }
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
                                                        required
                                                        name="documentType"
                                                        type="text"
                                                        switch="true"
                                                        id="documentType"
                                                        fullWidth
                                                        errorShow={
                                                            errors.documentType
                                                        }
                                                        label="Número de Documento"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AttachFileIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                    <CustomTextField
                                                        checked={allChecked}
                                                        data={
                                                            dataForm.documentNumber
                                                        }
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
                                                        required
                                                        name="documentNumber"
                                                        type="text"
                                                        switch="true"
                                                        theme={modeTheme}
                                                        id="documentNumber"
                                                        fullWidth
                                                        label="Número de Documento"
                                                        errorShow={
                                                            errors.documentNumber
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AttachFileIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                    <CustomTextField
                                                        checked={allChecked}
                                                        data={
                                                            dataForm.dateOfBirth
                                                        }
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
                                                        required
                                                        name="dateOfBirth"
                                                        type="date"
                                                        switch="true"
                                                        theme={modeTheme}
                                                        id="dateOfBirth"
                                                        fullWidth
                                                        errorShow={
                                                            errors.dateOfBirth
                                                        }
                                                        label="Fecha de Nacimiento"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CalendarMonthOutlinedIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                    <CustomTextField
                                                        checked={allChecked}
                                                        data={dataForm.position}
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
                                                        required
                                                        name="position"
                                                        type="text"
                                                        switch="true"
                                                        theme={modeTheme}
                                                        id="position"
                                                        fullWidth
                                                        errorShow={
                                                            errors.position
                                                        }
                                                        label="Cargo"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AttachFileIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tw-flex tw-w-[85%] tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Teléfonos de Contacto
                                                    </h6>
                                                    <div
                                                        onClick={() =>
                                                            handleAddData(
                                                                "phone",
                                                            )
                                                        }
                                                        className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                    >
                                                        <IoAddCircle
                                                            size={25}
                                                        />
                                                        Agregar otro teléfono
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-flex-col tw-w-full">
                                                    {dataForm.phones &&
                                                        dataForm.phones.map(
                                                            (item, index) => (
                                                                <CustomTextField
                                                                    key={index}
                                                                    checked={
                                                                        item.checked
                                                                    }
                                                                    data={
                                                                        item.text
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                        checked: boolean,
                                                                    ) =>
                                                                        handleChangeItem(
                                                                            "phones",
                                                                            index,
                                                                            name,
                                                                            value,
                                                                        )
                                                                    }
                                                                    name={`text`}
                                                                    type="text"
                                                                    switch="true"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id={`phone-${index}`}
                                                                    fullWidth
                                                                    label="Teléfono"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment position="start">
                                                                                    <AttachFileIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                />
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tw-flex tw-w-[85%] tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Correo de Contacto
                                                    </h6>
                                                    <div
                                                        onClick={() =>
                                                            handleAddData(
                                                                "email",
                                                            )
                                                        }
                                                        className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                    >
                                                        <IoAddCircle
                                                            size={25}
                                                        />
                                                        Agregar otro correo
                                                    </div>
                                                </div>

                                                <div className="tw-flex tw-flex-col tw-w-full">
                                                    {dataForm.emails &&
                                                        dataForm.emails.map(
                                                            (item, index) => (
                                                                <CustomTextField
                                                                    key={index}
                                                                    data={
                                                                        item.text
                                                                    }
                                                                    checked={
                                                                        item.checked
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                        checked: boolean,
                                                                    ) =>
                                                                        handleChangeItem(
                                                                            "emails",
                                                                            index,
                                                                            name,
                                                                            value,
                                                                            checked,
                                                                        )
                                                                    }
                                                                    name={`text`}
                                                                    type="text"
                                                                    switch="true"
                                                                    theme={
                                                                        modeTheme
                                                                    }
                                                                    id={`email-${index}`}
                                                                    fullWidth
                                                                    label="Correo"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment position="start">
                                                                                    <AttachFileIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                />
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tw-flex tw-w-[85%] tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Datos Adicionales
                                                    </h6>
                                                    <div
                                                        onClick={() =>
                                                            handleAddData(
                                                                "additional",
                                                            )
                                                        }
                                                        className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                    >
                                                        <IoAddCircle
                                                            size={25}
                                                        />
                                                        Agregar dato adicional
                                                    </div>
                                                </div>

                                                <div className="tw-flex tw-flex-col tw-w-full">
                                                    {dataForm.additional &&
                                                        dataForm.additional.map(
                                                            (item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="tw-flex tw-flex-col tw-space-y-2"
                                                                >
                                                                    <CustomTextField
                                                                        checked={
                                                                            allChecked
                                                                        }
                                                                        data={
                                                                            item.autodato
                                                                        }
                                                                        onChange={(
                                                                            value: string,
                                                                            name: string,
                                                                            checked: boolean,
                                                                        ) =>
                                                                            handleChangeItem(
                                                                                "additional",
                                                                                index,
                                                                                name,
                                                                                value,
                                                                            )
                                                                        }
                                                                        name={`dato`}
                                                                        type="text"
                                                                        id={`additional-${index}-autodato`}
                                                                        switch="true"
                                                                        theme={
                                                                            modeTheme
                                                                        }
                                                                        fullWidth
                                                                        label="Nombre del dato"
                                                                        InputProps={{
                                                                            startAdornment:
                                                                                (
                                                                                    <InputAdornment position="start">
                                                                                        <AttachFileIcon />
                                                                                    </InputAdornment>
                                                                                ),
                                                                        }}
                                                                    />
                                                                    <CustomTextField
                                                                        checked={
                                                                            allChecked
                                                                        }
                                                                        data={
                                                                            item.dato
                                                                        }
                                                                        onChange={(
                                                                            value: string,
                                                                            name: string,
                                                                            checked: boolean,
                                                                        ) =>
                                                                            handleChangeItem(
                                                                                "additional",
                                                                                index,
                                                                                name,
                                                                                value,
                                                                            )
                                                                        }
                                                                        name={`autodato`}
                                                                        type="text"
                                                                        id={`additional-${index}-autodato`}
                                                                        theme={
                                                                            modeTheme
                                                                        }
                                                                        fullWidth
                                                                        label="Dato"
                                                                        deleted={
                                                                            "true"
                                                                        }
                                                                        onClick={() => {
                                                                            handleDeleteItem(
                                                                                item,
                                                                            );
                                                                        }}
                                                                        InputProps={{
                                                                            startAdornment:
                                                                                (
                                                                                    <InputAdornment position="start">
                                                                                        <AttachFileIcon />
                                                                                    </InputAdornment>
                                                                                ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="tw-flex tw-flex-col  tw-justify-center tw-items-center tw-px-8 tw-pb-3">
                                        <div className="tw-flex tw-w-full tw-flex-col">
                                            <div className="tw-flex tw-w-full tw-flex-col">
                                                <h6 className="h5">
                                                    Datos Laborales
                                                </h6>
                                            </div>
                                            <div className="tw-flex tw-pt-4 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <h6 className="h5">
                                                    Elige un área de trabajo:
                                                </h6>
                                                <div className="tw-flex tw-flex-col tw-w-full tw-h-8 tw-justify-center">
                                                    <p className="tw-text-left">
                                                        Todos los datos del área
                                                        seleccionada serán
                                                        visibles por el
                                                        empleado.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="tw-flex tw-h-14 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start tw-w-60">
                                                    <CustomSelect
                                                        labelId="area-label"
                                                        value={selectedArea}
                                                        onChange={
                                                            handleAreaChange
                                                        }
                                                        label=""
                                                    >
                                                        {areaData &&
                                                            areaData.map(
                                                                (
                                                                    area,
                                                                    index,
                                                                ) => (
                                                                    <MenuItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            area.uid
                                                                        }
                                                                    >
                                                                        {
                                                                            area.areaName
                                                                        }
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                    </CustomSelect>
                                                    {selectedAreaError ? (
                                                        <div
                                                            style={{
                                                                color: "#d32f2f",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {selectedAreaError}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-w-full tw-flex-col tw-mt-5">
                                            <div className="tw-flex tw-pt-4 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <h6 className="h5">
                                                    Elige una sede:
                                                </h6>
                                                <div className="tw-flex tw-flex-col tw-w-full tw-h-8 tw-justify-center">
                                                    <p className="tw-text-left">
                                                        Todos los datos de la
                                                        sede seleccionada serán
                                                        visibles por el
                                                        empleado.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-h-14 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start tw-w-60">
                                                    <CustomSelect
                                                        labelId="headquarters-label"
                                                        value={
                                                            selectedHeadquarter
                                                        }
                                                        onChange={
                                                            handleHeadquartersChange
                                                        }
                                                        label="Sede"
                                                    >
                                                        {headquartersData &&
                                                            headquartersData.map(
                                                                (
                                                                    area,
                                                                    index,
                                                                ) => (
                                                                    <MenuItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            area.uid
                                                                        }
                                                                    >
                                                                        {
                                                                            area.areaName
                                                                        }
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                    </CustomSelect>
                                                    {selectedHeadquarterError ? (
                                                        <div
                                                            style={{
                                                                color: "#d32f2f",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {
                                                                selectedHeadquarterError
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-w-full tw-flex-col tw-mt-5">
                                            <div className="tw-flex tw-pt-4 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <h6 className="h5">Ruta:</h6>
                                                <div className="tw-flex tw-flex-col tw-w-full tw-h-8 tw-justify-center">
                                                    <p className="tw-text-left">
                                                        ¿Este empleado aplica
                                                        para ruta?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-h-14 tw-rounded tw-flex-col tw-justify-center tw-items-start tw-mb-5">
                                                <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start tw-w-60">
                                                    <RadioGroup
                                                        row
                                                        value={routeApplicable.toString()}
                                                        onChange={
                                                            handleRouteChange
                                                        }
                                                    >
                                                        <FormControlLabel
                                                            value="true"
                                                            control={
                                                                <CustomRadio />
                                                            }
                                                            label="Sí"
                                                        />
                                                        <FormControlLabel
                                                            value="false"
                                                            control={
                                                                <CustomRadio />
                                                            }
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                    {routeApplicableError ? (
                                                        <div
                                                            style={{
                                                                color: "#d32f2f",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {
                                                                routeApplicableError
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="tw-flex  tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start tw-w-100">
                                                    <TableContainer>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        Día
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        Ruta
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        L
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    mondayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "monday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {mondayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        mondayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        M
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    tuesdayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "tuesday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {tuesdayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        tuesdayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        X
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    wednesdayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "wednesday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {wednesdayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        wednesdayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        J
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    thursdayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "thursday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {thursdayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        thursdayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        V
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    fridayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "friday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {fridayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        fridayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        S
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    saturdayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "saturday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {saturdayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        saturdayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell
                                                                        sx={{
                                                                            width: "80px",
                                                                            border: "1px solid #DFDFDF",
                                                                            textAlign:
                                                                                "center",
                                                                            color:
                                                                                modeTheme ===
                                                                                "light"
                                                                                    ? "#000000"
                                                                                    : "#8bb8e7",
                                                                        }}
                                                                    >
                                                                        D
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            border: "1px solid #DFDFDF",
                                                                        }}
                                                                    >
                                                                        <FormControl
                                                                            variant="outlined"
                                                                            fullWidth
                                                                        >
                                                                            <CustomSelect
                                                                                labelId="area-label"
                                                                                value={
                                                                                    sundayRoute
                                                                                }
                                                                                onChange={(
                                                                                    event,
                                                                                ) =>
                                                                                    handleChangeSelect(
                                                                                        "sunday",
                                                                                        event,
                                                                                    )
                                                                                }
                                                                                label=""
                                                                            >
                                                                                {routeData &&
                                                                                    routeData.map(
                                                                                        (
                                                                                            route,
                                                                                            index,
                                                                                        ) => (
                                                                                            <MenuItem
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                value={
                                                                                                    route.uid
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    route.routeName
                                                                                                }
                                                                                            </MenuItem>
                                                                                        ),
                                                                                    )}
                                                                            </CustomSelect>
                                                                            {sundayRouteError ? (
                                                                                <div
                                                                                    style={{
                                                                                        color: "#d32f2f",
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        sundayRouteError
                                                                                    }
                                                                                </div>
                                                                            ) : null}
                                                                        </FormControl>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            </div>
                                            <div
                                                className="tw-flex tw-flex-col tw-justify-center tw-items-start tw-mt-7"
                                                style={{
                                                    borderTop:
                                                        "1px solid #DFDFDF",
                                                }}
                                            >
                                                <div className="tw-flex tw-flex-col tw-h-24 tw-justify-center tw-items-start tw-w-100">
                                                    <SwitchForm
                                                        modeTheme={"light"}
                                                        checked={
                                                            employeeCardStatus
                                                        }
                                                        onChange={(e) => {
                                                            handleChangeSwitch();
                                                        }}
                                                    />
                                                    {/* {employeeCardStatusError ? <div style={{ color: '#d32f2f', fontSize: '12px' }}>{employeeCardStatusError}</div> : null} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="tw-flex tw-flex-row tw-justify-between">
                        <Col>{step === 1 ? "Paso 1/2" : "Paso 2/2"}</Col>
                        <Col className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-justify-end">
                            <Button
                                className="tw-flex tw-items-center btn-admin"
                                variant="light"
                                onClick={handleClose}
                            >
                                <ImCancelCircle size={20} />
                            </Button>

                            {!isEdit && handleShowMainFormEdit && step === 1 ? (
                                <Button
                                    className=""
                                    type={"button"}
                                    variant="primary"
                                    onClick={() => handleChangeStep()}
                                >
                                    <GrNext size={17} />
                                </Button>
                            ) : (
                                <>
                                    {step === 1 ? (
                                        <Button
                                            className=""
                                            type={"button"}
                                            variant="primary"
                                            onClick={() => handleChangeStep()}
                                        >
                                            <GrNext size={17} />
                                        </Button>
                                    ) : (
                                        <div className="tw-flex tw-flex-row w-full mx-16">
                                            <Button
                                                className=""
                                                type="button"
                                                variant="primary"
                                                onClick={() => setStep(1)}
                                            >
                                                <GrPrevious size={17} />
                                            </Button>
                                            <Button
                                                className={`${
                                                    isLoading && "btn-loader"
                                                } tw-ml-5 btn-save-admin`}
                                                type="submit"
                                            >
                                                {isLoading ? (
                                                    <span className="ml-2 loading">
                                                        <i className="ri-loader-2-fill"></i>
                                                    </span>
                                                ) : (
                                                    <span className="">
                                                        <VscSave size={18} />
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
        )
    );
};

export default EmployeesFormModal;
