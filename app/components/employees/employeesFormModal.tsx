import { ModalParamsMainForm } from "@/types/modals";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton, InputAdornment, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { GrNext } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { VscSave } from "react-icons/vsc";
import CustomTextField from "../company/components/CustomTextField";
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
        theme,
        handleEditForm,
        handleFileChange,
        selectedImage,
    } = EmployeesFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
    });

    return (
        dataForm && (
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Form
                    onReset={handleReset}
                    onSubmit={
                        !isEdit && handleShowMainFormEdit
                            ? handleEditForm
                            : handleSendForm
                    }
                >
                    <Modal.Body style={{ padding: 0, margin: 0 }}>
                        <Card
                            className="custom-card tw-w-full"
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Card.Body style={{ padding: 0, margin: 0 }}>
                                <div
                                    className="tw-flex tw-w-full tw-flex-row tw-px-8 tw-pt-5 tw-pb-3"
                                    style={{
                                        borderBottom: "2px solid #396593",
                                        marginBottom: 25,
                                    }}
                                >
                                    <div className="tw-flex tw-w-[93%] tw-flex-col">
                                        <Card.Title className="tw-font-bold">
                                            Agregar los datos del empleado
                                        </Card.Title>
                                    </div>
                                    <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-start tw-items-center -tw-mt-2">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent"
                                            style={{
                                                padding: 0,
                                                background: "transparent",
                                                border: "none",
                                            }}
                                        >
                                            <IoMdClose
                                                size={35}
                                                color="#646464"
                                            />
                                        </button>
                                    </div>
                                </div>

                                {step && step === 1 ? (
                                    <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0 tw-px-9 tw-pb-8">
                                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                                <h6 className="h5">
                                                    Datos personales
                                                </h6>
                                            </div>
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4 tw-justify-start tw-items-center tw-pb-2">
                                                <div className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                                                    <img
                                                        style={{
                                                            width: "200px",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                            border: "10px solid #396593",
                                                            borderRadius: "50%",
                                                        }}
                                                        className="tw-rounded-full tw-w-[150px] tw-h-[150px] tw-object-cover"
                                                        src={
                                                            selectedImage
                                                                ? selectedImage
                                                                : ""
                                                        }
                                                        alt="Profile Photo"
                                                    />
                                                </div>
                                                <div
                                                    className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center"
                                                    style={{
                                                        position: "absolute",
                                                    }}
                                                >
                                                    <div className="tw-flex tw-w-48 tw-h-14 tw-flex-col tw-justify-start tw-items-end tw-mr-0">
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
                                                            name="firstName"
                                                            type="text"
                                                            switch="true"
                                                            theme={theme}
                                                            id="firstName"
                                                            fullWidth
                                                            label="Nombre"
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
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
                                                            data={
                                                                dataForm.lastName
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
                                                            name="lastName"
                                                            type="text"
                                                            switch="true"
                                                            theme={theme}
                                                            id="lastName"
                                                            fullWidth
                                                            label="Apellido"
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
                                                                        <InputAdornment position="start">
                                                                            <PersonOutlineOutlinedIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                                        <FormControl
                                                            variant="standard"
                                                            sx={{
                                                                m: 1,
                                                                minWidth:
                                                                    "100%",
                                                            }}
                                                        >
                                                            <InputLabel
                                                                id="demo-simple-select-standard-label"
                                                                style={{
                                                                    color: "#396593",
                                                                    fontSize:
                                                                        "20px",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Tipo de
                                                                Documento
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                startAdornment={
                                                                    <InputAdornment position="start">
                                                                        <AttachFileIcon />
                                                                    </InputAdornment>
                                                                }
                                                            >
                                                                <MenuItem value="AS">
                                                                    AS
                                                                </MenuItem>
                                                                <MenuItem value="CC">
                                                                    CC
                                                                </MenuItem>
                                                                <MenuItem value="CD">
                                                                    CD
                                                                </MenuItem>
                                                                <MenuItem value="CE">
                                                                    CE
                                                                </MenuItem>
                                                                <MenuItem value="CN">
                                                                    CN
                                                                </MenuItem>
                                                                <MenuItem value="MS">
                                                                    MS
                                                                </MenuItem>
                                                                <MenuItem value="NIT">
                                                                    NIT
                                                                </MenuItem>
                                                                <MenuItem value="PA">
                                                                    PA
                                                                </MenuItem>
                                                                <MenuItem value="PE">
                                                                    PE
                                                                </MenuItem>
                                                                <MenuItem value="RC">
                                                                    RC
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
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
                                                            name="documentNumber"
                                                            type="text"
                                                            switch="true"
                                                            theme={theme}
                                                            id="documentNumber"
                                                            fullWidth
                                                            label="Número de Documento"
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
                                                            name="dateOfBirth"
                                                            type="date"
                                                            switch="true"
                                                            theme={theme}
                                                            id="dateOfBirth"
                                                            fullWidth
                                                            label="Fecha de Nacimiento"
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
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
                                                            data={
                                                                dataForm.position
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
                                                            name="position"
                                                            type="text"
                                                            switch="true"
                                                            theme={theme}
                                                            id="position"
                                                            fullWidth
                                                            label="Cargo"
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
                                                                    "phone",
                                                                )
                                                            }
                                                            className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                        >
                                                            <IoAddCircle
                                                                size={25}
                                                            />
                                                            Agregar otro
                                                            teléfono
                                                        </div>
                                                    </div>

                                                    <div className="tw-flex tw-flex-col tw-w-full">
                                                        {dataForm.phones &&
                                                            dataForm.phones.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <CustomTextField
                                                                        key={
                                                                            index
                                                                        }
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
                                                                            theme
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
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <CustomTextField
                                                                        key={
                                                                            index
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
                                                                                "emails",
                                                                                index,
                                                                                name,
                                                                                value,
                                                                            )
                                                                        }
                                                                        name={`text`}
                                                                        type="text"
                                                                        switch="true"
                                                                        theme={
                                                                            theme
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
                                                            Agregar dato
                                                            adicional
                                                        </div>
                                                    </div>

                                                    <div className="tw-flex tw-flex-col tw-w-full">
                                                        {dataForm.additional &&
                                                            dataForm.additional.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
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
                                                                                handleChange(
                                                                                    value,
                                                                                    name,
                                                                                    checked,
                                                                                )
                                                                            }
                                                                            name={`additional-${index}-autodato`}
                                                                            type="text"
                                                                            id={`additional-${index}-autodato`}
                                                                            switch="true"
                                                                            theme={
                                                                                theme
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
                                                                                handleChange(
                                                                                    value,
                                                                                    name,
                                                                                    checked,
                                                                                )
                                                                            }
                                                                            name={`additional-${index}-autodato`}
                                                                            type="text"
                                                                            id={`additional-${index}-autodato`}
                                                                            theme={
                                                                                theme
                                                                            }
                                                                            fullWidth
                                                                            label="Dato"
                                                                            deleted={
                                                                                "true"
                                                                            }
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
                                    </div>
                                ) : (
                                    <div className="tw-flex tw-flex-col  tw-justify-center tw-items-center tw-px-8 tw-pb-3"></div>
                                )}
                            </Card.Body>

                            <Card.Footer className="text-muted tw-flex tw-justify-end tw-items-center">
                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-1 tw-w-full">
                                    <div className="tw-flex tw-w-[50%] tw-flex-col">
                                        <div className="tw-flex tw-w-28 tw-flex-col ">
                                            <h6 className=" tw-m-0 tw-p-2 tw-rounded icon-actions-table">
                                                Paso {step}/2
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="tw-flex tw-w-[50%] tw-flex-col tw-justify-center tw-items-end">
                                        {step && step === 1 ? (
                                            <div className="tw-flex tw-w-28 tw-flex-col">
                                                <Button
                                                    onClick={handleSendForm}
                                                    className="tw-flex tw-flex-row tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-mb-1"
                                                    style={{
                                                        padding: 0,
                                                        background:
                                                            "transparent",
                                                        border: "none",
                                                        color: "black",
                                                    }}
                                                >
                                                    <h6
                                                        className=" tw-m-0 tw-p-1 tw-rounded icon-actions-table"
                                                        style={{
                                                            color: "black",
                                                        }}
                                                    >
                                                        Siguiente
                                                    </h6>
                                                    <GrNext
                                                        size={25}
                                                        color="#646464"
                                                        className="icon-actions-table"
                                                    />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="tw-flex tw-w-40 tw-flex-col">
                                                {/*   <Button
                                                onClick={handleSendForm}
                                                className="tw-flex tw-flex-row tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-mb-1"
                                                style={{ padding: 0, background: 'transparent', border: 'none', color: 'black' }}
                                            >
                                                <IoAddCircle
                                                    size={28}
                                                    color="#396593"
                                                />
                                                <h6 className=" tw-m-0 tw-p-1 tw-rounded" style={{ color: 'black' }}>
                                                    Agregar empleado
                                                </h6>
                                            </Button> */}

                                                <div className="tw-flex tw-flex-row w-full mx-16">
                                                    <Button
                                                        className="tw-flex tw-items-center"
                                                        variant="light"
                                                        onClick={handleClose}
                                                    >
                                                        <ImCancelCircle
                                                            size={20}
                                                        />
                                                        {/* Cancelar */}
                                                    </Button>

                                                    <Button
                                                        variant="primary"
                                                        className={`btn  ${
                                                            isLoading &&
                                                            "btn-loader"
                                                        } tw-ml-5`}
                                                        type="submit"
                                                    >
                                                        {isLoading ? (
                                                            <span className="ml-2 loading">
                                                                <i className="ri-loader-2-fill"></i>
                                                            </span>
                                                        ) : (
                                                            <span className="">
                                                                <VscSave
                                                                    size={18}
                                                                />
                                                            </span>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Modal.Body>
                </Form>
            </Modal>
        )
    );
};

export default EmployeesFormModal;
