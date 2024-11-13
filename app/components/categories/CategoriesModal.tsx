import { colorList } from "@/data/formConstant";
import { ModalParamsMainForm } from "@/types/modals";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import {
    InputAdornment,
    PaletteMode,
    TextField,
    Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Circle from "@uiw/react-color-circle";
import { Col, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import { TbCategory, TbMapPin } from "react-icons/tb";
import CategoriesHook from "./hook/CategoriesHook";

const CategoriesModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
}: ModalParamsMainForm) => {
    const {
        modeTheme,
        show,
        isLoading,
        isEdit,
        data,
        nameError,
        pointNameError,
        addressError,
        showPickerColor,
        setShowPickerColor,
        handleChangeColor,
        handleChange,
        handleReset,
        handleClose,
        handleSendForm,
        handleEditForm,
        handleDeleteItem,
        handleAddData,
        handleChangeItem,
    } = CategoriesHook({
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
        <Modal
            size={"lg"}
            centered
            show={show}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
            contentClassName={"modal-admin"}
            backdrop="static"
        >
            <Form onReset={handleReset} onSubmit={handleSendForm}>
                <ThemeProvider theme={theme}>
                    <Modal.Title
                        className={`modal-title-admin tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                        as="h6"
                    >
                        <span>
                            {handleShowMainFormEdit ? "Editar" : "Nuevo"}
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
                                <IoMdClose size={35} color={"white"} />
                            </button>
                        </div>
                    </Modal.Title>

                    <Modal.Body className="tw-px-8">
                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                            <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body tw-space-y-4">
                                <div className="tw-flex tw-w-full tw-justify-between">
                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                        Datos Punto Fijo
                                    </h6>
                                </div>

                                <div className="tw-px-5 tw-py-3 tw-w-full">
                                    <TextField
                                        value={data.name}
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                        id="name"
                                        fullWidth
                                        label="Nombre Categoria"
                                        variant="standard"
                                        color="primary"
                                        helperText={nameError}
                                        error={!!nameError}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <TbCategory size={25} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                color:
                                                    modeTheme === "light"
                                                        ? "#396593"
                                                        : "#8bb8e7",
                                            },
                                        }}
                                    />
                                </div>
                                <div className="tw-px-5 tw-py-3 tw-w-full">
                                    <Typography className="tw-font-bold tw-text-sm url-label">
                                        Seleccione el Color:
                                    </Typography>
                                </div>
                                <div className="tw-relative tw-px-5 tw-py-3 tw-w-full tw-flex tw-items-start tw-justify-start">
                                    <div
                                        onClick={() =>
                                            setShowPickerColor(!showPickerColor)
                                        }
                                        className="tw-flex tw-flex-row tw-w-20 tw-text-black tw-h-7 picker-color tw-cursor-pointer"
                                    >
                                        <div className="tw-w-full arrow tw-flex tw-items-center tw-justify-center">
                                            <IoIosArrowDown size={20} />
                                        </div>
                                        <div
                                            className="tw-w-full"
                                            style={{
                                                backgroundColor: data.color,
                                            }}
                                        />
                                    </div>
                                    {showPickerColor && (
                                        <div className="tw-absolute tw-left-0 tw-bottom-0 tw-w-auto lg:tw-w-[100%] color-picker-pallet tw-p-5">
                                            <Circle
                                                className="tw-w-full"
                                                colors={colorList}
                                                color={data.color}
                                                pointProps={{
                                                    style: {
                                                        width: "16px",
                                                        height: "16px",
                                                        borderRadius: "100%",
                                                        // margin: 11,
                                                    },
                                                }}
                                                onChange={(color) =>
                                                    handleChangeColor(color.hex)
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body tw-space-y-4">
                                <div className="tw-flex tw-w-full tw-justify-between">
                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                        Direcciones
                                    </h6>
                                    {/* {data.directions &&
                                        data.directions.length < 3 && (
                                            <div
                                                onClick={() =>
                                                    handleAddData("address")
                                                }
                                                className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                            >
                                                <IoAddCircle size={25} />
                                                Agregar Otra Dirección
                                            </div>
                                        )} */}
                                </div>

                                <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                    {data.directions &&
                                        data.directions.map((item, index) => (
                                            <div
                                                key={index}
                                                className="tw-flex tw-flex-row tw-w-full"
                                            >
                                                <div className="tw-w-full">
                                                    <div className="tw-px-5 tw-py-3 tw-w-full">
                                                        <TextField
                                                            value={
                                                                item.pointName
                                                            }
                                                            onChange={(e) =>
                                                                handleChangeItem(
                                                                    "directions",
                                                                    index,
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="pointName"
                                                            id="pointName"
                                                            fullWidth
                                                            label="Nombre Punto"
                                                            variant="standard"
                                                            color="primary"
                                                            helperText={
                                                                pointNameError
                                                            }
                                                            error={
                                                                !!pointNameError
                                                            }
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
                                                                        <InputAdornment position="start">
                                                                            <ExploreOutlinedIcon />
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
                                                        />
                                                    </div>
                                                    <div className="tw-px-5 tw-py-3 tw-w-full">
                                                        <TextField
                                                            value={item.address}
                                                            onChange={(e) =>
                                                                handleChangeItem(
                                                                    "directions",
                                                                    index,
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            name="address"
                                                            id="address"
                                                            fullWidth
                                                            label="Dirección"
                                                            variant="standard"
                                                            color="primary"
                                                            helperText={
                                                                addressError ||
                                                                'Solo la dirección, Ej: "Calle 1 #2-3"'
                                                            }
                                                            error={
                                                                !!addressError
                                                            }
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
                                                                        <InputAdornment position="start">
                                                                            <TbMapPin
                                                                                size={
                                                                                    25
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
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="tw-flex tw-flex-col tw-px-3 tw-my-6 tw-w-auto tw-space-y-4 tw-justify-center tw-items-center">
                                                    <div className="tw-flex tw-w-1/5  tw-items-center tw-justify-center">
                                                        <IconButton
                                                            onClick={() =>
                                                                handleDeleteItem(
                                                                    index,
                                                                )
                                                            }
                                                            size="small"
                                                            component="span"
                                                        >
                                                            <FaTrashCan
                                                                size={25}
                                                            />
                                                        </IconButton>
                                                    </div>
                                                </div> */}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </ThemeProvider>

                <Modal.Footer className="tw-flex tw-flex-row tw-justify-between">
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
                                onClick={handleEditForm}
                            >
                                <RiSave2Fill size={28} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className={`${
                                    isLoading && "btn-loader"
                                } tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center`}
                            >
                                {isLoading ? (
                                    <span className="ml-2 loading">
                                        <i className="ri-loader-2-fill"></i>
                                    </span>
                                ) : (
                                    <span className="tw-text-white">
                                        <RiSave2Fill size={28} />
                                    </span>
                                )}
                            </button>
                        )}
                    </Col>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CategoriesModal;
