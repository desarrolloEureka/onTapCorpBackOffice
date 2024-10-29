import { ModalParamsMainForm } from "@/types/modals";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { InputAdornment, PaletteMode, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import ZonesFormHook from "./hook/zonesFormHook";

const ZonesFormModal = ({
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
        zoneName,
        setZoneName,
        zoneManager,
        setZoneManager,
        addresses,
        zoneNameError,
        zoneManagerError,
        addressesError,
        handleSendForm,
        handleClose,
        handleReset,
        handleAddressChange,
        handleAddAddress,
        isEdit,
        handleEditForm,
    } = ZonesFormHook({
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
            size={reference === "companies" ? "xl" : "lg"}
            centered
            show={show}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
            contentClassName={reference !== "companies" ? "modal-admin" : ""}
        >
            <Form onReset={handleReset} onSubmit={handleSendForm}>
                <ThemeProvider theme={theme}>
                    <Modal.Title
                        className={`modal-title-admin tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                        as="h6"
                    >
                        <span>Zona nueva</span>
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
                                            value={zoneName}
                                            onChange={(e) =>
                                                setZoneName(e.target.value)
                                            }
                                            type="text"
                                            id="zoneName"
                                            fullWidth
                                            label="Nombre Zona"
                                            variant="standard"
                                            color="primary"
                                            helperText={zoneNameError}
                                            error={!!zoneNameError}
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
                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                        <TextField
                                            value={zoneManager}
                                            onChange={(e) =>
                                                setZoneManager(e.target.value)
                                            }
                                            type="text"
                                            id="zoneManager"
                                            fullWidth
                                            label="Jefe Zona"
                                            variant="standard"
                                            color="primary"
                                            helperText={zoneManagerError}
                                            error={!!zoneManagerError}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonOutlineOutlinedIcon />
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
                                    {addresses.map((address, index) => (
                                        <div
                                            key={index}
                                            className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full"
                                        >
                                            <TextField
                                                value={address}
                                                onChange={(e) =>
                                                    handleAddressChange(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                type="text"
                                                id={`address-${index}`}
                                                fullWidth
                                                label={`Dirección ${
                                                    index + 1
                                                }`}
                                                variant="standard"
                                                color="primary"
                                                helperText={
                                                    index ===
                                                    addresses.length - 1
                                                        ? addressesError
                                                        : ""
                                                }
                                                error={
                                                    index ===
                                                        addresses.length - 1 &&
                                                    !!addressesError
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <ExploreOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        fontSize: "20px",
                                                        fontWeight: "bold",
                                                        color:
                                                            modeTheme ===
                                                            "light"
                                                                ? "#396593"
                                                                : "#8bb8e7",
                                                    },
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-7 tw-mb-4 tw-w-full">
                                        <div className="tw-flex tw-flex-row tw-w-38 tw-rounded-3xl tw-bg-[#396593]">
                                            <Button
                                                variant="outlined"
                                                onClick={handleAddAddress}
                                                className="tw-text-white"
                                            >
                                                Añadir Dirección
                                            </Button>
                                        </div>
                                    </div>
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
                                <FiEdit size={28} />
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

export default ZonesFormModal;
