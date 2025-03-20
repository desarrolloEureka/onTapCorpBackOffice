import { ModalParamsMainForm } from "@/types/modals";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import {
    InputAdornment,
    PaletteMode,
    TextField,
    Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Col, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import LogosFormHook from "./hook/logosFormHook";

const LogosFormModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
    isSuperAdmin
}: ModalParamsMainForm) => {
    const {
        modeTheme,
        show,
        isLoading,
        logoName,
        selectedImage,
        handleSendForm,
        handleClose,
        handleReset,
        isEdit,
        handleEditForm,
        handleImageChange,
        logoNameError,
        imageError,
        handleLogoNameChange,
        isUpdateImage,
    } = LogosFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
        isSuperAdmin
    });

    const theme = createTheme({
        palette: {
            mode: modeTheme as PaletteMode,
        },
    });

    return (
        <Modal
            size={reference === "companies" ? "xl" : "lg"}
            centered
            show={show}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
            contentClassName={reference !== "companies" ? "modal-admin" : ""}
            backdrop="static"
        >
            <Form onReset={handleReset} onSubmit={handleSendForm}>
                <ThemeProvider theme={theme}>
                    <Modal.Title
                        className={`modal-title-admin tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                        as="h6"
                    >
                        <span>Agregar los datos del logo</span>
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
                            <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                                <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">
                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                        <TextField
                                            value={logoName}
                                            onChange={handleLogoNameChange}
                                            type="text"
                                            id="logoName"
                                            fullWidth
                                            label="Nombre del Logo"
                                            variant="standard"
                                            color="primary"
                                            helperText={logoNameError}
                                            error={!!logoNameError}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FilePresentIcon />
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

                                    {/* Vista previa de la imagen seleccionada */}
                                    {selectedImage && (
                                        <div className="tw-mt-4">
                                            <img
                                                src={
                                                    !isEdit &&
                                                        handleShowMainFormEdit
                                                        ? isUpdateImage
                                                            ? URL.createObjectURL(
                                                                selectedImage,
                                                            )
                                                            : selectedImage + ""
                                                        : URL.createObjectURL(
                                                            selectedImage,
                                                        )
                                                }
                                                alt="Vista previa"
                                                className="tw-w-[150px] tw-h-[150px] tw-object-cover tw-rounded tw-mt-4 tw-mb-1"
                                            />
                                        </div>
                                    )}

                                    {/* Campo para seleccionar la imagen */}
                                    <div className="tw-flex tw-flex-col tw-justify-start tw-items-start tw-px-3 tw-w-full">
                                        <label
                                            htmlFor="iconButton"
                                            className="tw-flex tw-flex-col tw-items-start tw-justify-center"
                                        >
                                            <div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-10 tw-w-36 tw-rounded-3xl tw-bg-[#396593] tw-mt-7 -tw-ml-2">
                                                <Typography className="tw-font-bold tw-text-sm url-label tw-text-white">
                                                    Seleccionar Logo
                                                </Typography>
                                            </div>

                                            <Typography className="tw-font-bold tw-text-sm url-label tw-mt-2">
                                                {selectedImage
                                                    ? selectedImage.name
                                                    : ""}
                                            </Typography>

                                            <input
                                                type="file"
                                                name="icon"
                                                id="iconButton"
                                                accept=".jpg, .jpeg, .png"
                                                hidden
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </label>

                                        <Typography
                                            style={{ fontSize: "15px", textAlign: "left" }}
                                            className={`tw-mt-3 tw-mb-4 ${modeTheme === "light" ? "tw-text-gray-700" : "tw-text-white"
                                                }`}
                                        >
                                            <strong>Tamaño recomendado:</strong> 190x190 px <br />
                                            <span className="tw-mt-2 tw-block">
                                                <strong>Formatos permitidos:</strong> JPG, JPEG, PNG
                                            </span>
                                        </Typography>

                                    </div>

                                    {imageError && (
                                        <div
                                            className="tw-text-[#d32f2f] tw-mt-2 tw-ml-2"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {imageError}
                                        </div>
                                    )}
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
                                className={`${isLoading && "btn-loader"
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

export default LogosFormModal;
