import { ModalParamsMainForm } from "@/types/modals";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
    InputAdornment,
    PaletteMode,
    TextField
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Card, Form, Modal } from "react-bootstrap";
import ZonesFormHook from "./hook/zonesFormHook";
import { IoMdClose } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { VscSave } from "react-icons/vsc";

const ZonesFormModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference
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
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Form onReset={handleReset} onSubmit={handleSendForm}>
                <Modal.Body style={{ padding: 0, margin: 0 }}>
                    <Card className="custom-card tw-w-full tw-bg-[#396593]" style={{ padding: 0, margin: 0 }}>
                        <Card.Body style={{ padding: 0, margin: 0 }}>
                            <div className="tw-flex tw-w-full tw-flex-row tw-px-8 tw-pt-5 tw-pb-3">
                                <div className="tw-flex tw-w-[93%] tw-flex-col">
                                    <Card.Title className="tw-font-bold tw-text-white">
                                        Zona nueva
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
                                            {/*   <ThemeProvider theme={theme}> */}
                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                <TextField
                                                    value={zoneName}
                                                    onChange={(e) =>
                                                        setZoneName(
                                                            e.target.value,
                                                        )
                                                    }
                                                    type="text"
                                                    id="zoneName"
                                                    fullWidth
                                                    label="Nombre Zona"
                                                    variant="standard"
                                                    color="primary"
                                                    helperText={
                                                        zoneNameError
                                                    }
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
                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                <TextField
                                                    value={zoneManager}
                                                    onChange={(e) =>
                                                        setZoneManager(
                                                            e.target.value,
                                                        )
                                                    }
                                                    type="text"
                                                    id="zoneManager"
                                                    fullWidth
                                                    label="Jefe Zona"
                                                    variant="standard"
                                                    color="primary"
                                                    helperText={
                                                        zoneManagerError
                                                    }
                                                    error={
                                                        !!zoneManagerError
                                                    }
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PersonOutlineOutlinedIcon />
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
                                            {addresses.map(
                                                (address, index) => (
                                                    <div
                                                        key={index}
                                                        className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full"
                                                    >
                                                        <TextField
                                                            value={address}
                                                            onChange={(e) =>
                                                                handleAddressChange(
                                                                    index,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            id={`address-${index}`}
                                                            fullWidth
                                                            label={`Dirección ${index + 1
                                                                } (Opcional)`}
                                                            variant="standard"
                                                            color="primary"
                                                            helperText={
                                                                index ===
                                                                    addresses.length -
                                                                    1
                                                                    ? addressesError
                                                                    : ""
                                                            }
                                                            error={
                                                                index ===
                                                                addresses.length -
                                                                1 &&
                                                                !!addressesError
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
                                                ),
                                            )}
                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                <div className="tw-flex tw-flex-row tw-w-38 tw-rounded-3xl tw-bg-[#396593]">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={
                                                            handleAddAddress
                                                        }
                                                        className="tw-text-white"
                                                    >
                                                        Añadir Dirección
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* </ThemeProvider> */}
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
                                    className={`btn  ${isLoading && "btn-loader"
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

export default ZonesFormModal;
