import { ModalParamsMainForm } from "@/types/modals";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import {
    InputAdornment,
    PaletteMode,
    TextField,
    Typography
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { VscSave } from "react-icons/vsc";
import { ImCancelCircle } from "react-icons/im";
import LogosFormHook from "./hook/logosFormHook";

const LogosFormModal = ({
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
        isUpdateImage
    } = LogosFormHook({
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
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Form onReset={handleReset} onSubmit={!isEdit && handleShowMainFormEdit ? handleEditForm : handleSendForm}>
                <Modal.Body style={{ padding: 0, margin: 0 }}>
                    <Card className="custom-card tw-w-full tw-bg-[#396593]" style={{ padding: 0, margin: 0 }}>
                        <Card.Body style={{ padding: 0, margin: 0 }}>
                            <div className="tw-flex tw-w-full tw-flex-row tw-px-8 tw-pt-5 tw-pb-3">
                                <div className="tw-flex tw-w-[93%] tw-flex-col">
                                    <Card.Title className="tw-font-bold tw-text-white">
                                        Agregar los datos del logo
                                    </Card.Title>
                                </div>
                                <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-start tw-items-center -tw-mt-2">
                                    <Button
                                        onClick={handleClose}
                                        className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent"
                                        style={{ padding: 0, background: 'transparent', border: 'none' }}
                                    >
                                        <IoMdClose size={35} color="white" />
                                    </Button>
                                </div>
                            </div>


                            <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0 tw-px-9 tw-pb-8">
                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                    <div className="tw-flex tw-p-2 tw-pb-8 tw-rounded tw-flex-col tw-justify-center tw-items-start tw-bg-white">
                                        <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">
                                            <ThemeProvider theme={theme}>
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
                                                                color: modeTheme === "light" ? "#396593" : "#8bb8e7",
                                                            },
                                                        }}
                                                    />
                                                </div>

                                                {/* Vista previa de la imagen seleccionada */}
                                                {selectedImage && (
                                                    <div className="tw-mt-4">
                                                        <img
                                                            src={!isEdit && handleShowMainFormEdit ? isUpdateImage ? URL.createObjectURL(selectedImage) : selectedImage + "" : URL.createObjectURL(selectedImage)}
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
                                                            {selectedImage ? selectedImage.name : ""}
                                                        </Typography>

                                                        <input
                                                            type="file"
                                                            name="icon"
                                                            id="iconButton"
                                                            accept=".jpg, .jpeg, .png"
                                                            hidden
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                    </label>
                                                </div>



                                                {imageError && (
                                                    <div className="tw-text-[#d32f2f] tw-mt-2 tw-ml-2" style={{ fontSize: "12px" }}>
                                                        {imageError}
                                                    </div>
                                                )}
                                            </ThemeProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>

                        <Card.Footer className="text-muted tw-flex tw-justify-end tw-items-center">
                            <div className="tw-flex tw-flex-row w-full mx-16">
                                <Button
                                    className="tw-flex tw-items-center"
                                    variant="light"
                                    onClick={handleClose}
                                >
                                    <ImCancelCircle size={20} />
                                    {/* Cancelar */}
                                </Button>

                                <Button
                                    variant="primary"
                                    className={`btn ${isLoading && "btn-loader"} tw-ml-5`}
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
                        </Card.Footer>
                    </Card>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default LogosFormModal;