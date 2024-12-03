import { ModalParamsMainForm } from "@/types/modals";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
    InputAdornment,
    MenuItem,
    PaletteMode,
    Select,
    TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import RoutesFormHook from "./hook/routesFormHook";
import CustomTextField from "../company/components/CustomTextField";

const RoutesFormModal = ({
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
        isLoading,
        routeName,
        setRouteName,
        routeManager,
        setRouteManager,
        addresses,
        setAddresses,
        routeNameError,
        routeManagerError,
        addressesError,
        handleSendForm,
        handleClose,
        handleReset,
        isEdit,
        handleEditForm,
        handleAddressChange,
        handleAddAddress,
        handleDeleteAddress,
        zonesData,
        handleChangeZone,
        selectedZone,
        hours,
        setHours,
        setMinutes,
        minutes,
        generateOptions,
        hourRef,
        minuteRef,
        zoneError,
        hoursError,
        minutesError,
    } = RoutesFormHook({
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
                        <span>Ruta nueva</span>
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
                                            value={routeName}
                                            onChange={(e) =>
                                                setRouteName(e.target.value)
                                            }
                                            type="text"
                                            id="routeName"
                                            fullWidth
                                            label="Nombre Ruta"
                                            variant="standard"
                                            color="primary"
                                            helperText={routeNameError}
                                            error={!!routeNameError}
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

                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-7 tw-w-full">
                                        <TextField
                                            value={routeManager}
                                            onChange={(e) =>
                                                setRouteManager(e.target.value)
                                            }
                                            type="text"
                                            id="routeManager"
                                            fullWidth
                                            label="Jefe Ruta"
                                            variant="standard"
                                            color="primary"
                                            helperText={routeManagerError}
                                            error={!!routeManagerError}
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

                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-7 tw-w-full">
                                        <div className="tw-flex tw-flex-col tw-w-full">
                                            <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                <div
                                                    style={{
                                                        fontSize: "14.5px",
                                                        fontWeight: "bold",
                                                        color:
                                                            modeTheme === "light"
                                                                ? "#396593"
                                                                : "#8bb8e7",
                                                    }}
                                                >
                                                    Zona a la que corresponde
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-h-14 tw-rounded tw-flex-row tw-justify-start tw-items-center">
                                                <div className="tw-flex tw-rounded tw-flex-col tw-h-10 tw-justify-center tw-items-center tw-w-5">
                                                    <InputAdornment position="start">
                                                        <ExploreOutlinedIcon />
                                                    </InputAdornment>
                                                </div>
                                                <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start tw-w-60 tw-ml-1">
                                                    <CustomSelect
                                                        labelId="area-label"
                                                        value={selectedZone}
                                                        onChange={(e: any) =>
                                                            handleChangeZone(e)
                                                        }
                                                        label=""
                                                    >
                                                        {zonesData &&
                                                            zonesData.map(
                                                                (zone, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        value={
                                                                            zone.uid
                                                                        }
                                                                    >
                                                                        {
                                                                            zone.zoneName
                                                                        }
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                    </CustomSelect>
                                                    {zoneError && (
                                                        <div
                                                            style={{
                                                                color: "#d32f2f",
                                                                fontSize: "12px",
                                                            }}
                                                        >
                                                            {zoneError}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-flex-row tw-w-full tw-justify-end tw-items-center">
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

                                    <div className="tw-flex tw-flex-col tw-px-1 tw-w-full tw-mt-3 tw-justify-end">
                                        <div className="tw-flex tw-flex-col tw-w-full tw-h-auto">
                                            <div
                                                className="tw-px-2 tw-pb-4">
                                                {addresses.map(
                                                    (address, index) => (
                                                        <div
                                                            key={index}
                                                            className={`tw-flex tw-flex-row ${
                                                                index !== 0
                                                                    ? "tw-mt-6"
                                                                    : "tw-mt-2"
                                                            } tw-w-full`}
                                                        >
                                                            <CustomTextField
                                                                data={address}
                                                                onChange={(newValue: string, name: string, checked: boolean) =>
                                                                    handleAddressChange(index, newValue)
                                                                }
                                                                type="text"
                                                                id={`address-${index}`}
                                                                fullWidth
                                                                label={`Dirección ${index + 1}`}
                                                                variant="standard"
                                                                color="primary"
                                                                theme={modeTheme}
                                                                deleted={index < 2 ? "" : "true" }
                                                                onClick={() => {handleDeleteAddress(index)}}
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
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-flex tw-flex-col tw-px-3 tw-mt-2 tw-w-full">
                                        <div className="tw-flex tw-pt-1 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                            <div
                                                style={{
                                                    fontSize: "14.5px",
                                                    fontWeight: "bold",
                                                    color:
                                                        modeTheme === "light"
                                                            ? "#396593"
                                                            : "#8bb8e7",
                                                }}
                                            >
                                                Tiempo estimado
                                            </div>
                                        </div>

                                        <div className="tw-flex tw-h-32 tw-rounded tw-flex-row tw-justify-start tw-items-center">
                                            <div className="tw-flex tw-rounded tw-flex-col tw-h-10 tw-justify-center tw-items-center tw-w-5">
                                                <InputAdornment position="start">
                                                    <TimerOutlinedIcon />
                                                </InputAdornment>
                                            </div>
                                            <div className="tw-flex tw-rounded tw-flex-col tw-justify-center tw-items-start tw-w-60 tw-ml-1">
                                                <div className="tw-flex tw-h-32 tw-rounded tw-w-52 tw-flex-row tw-justify-start tw-items-center tw-bg-[#396593] tw-p-2 tw-mt-2">
                                                    <div className="tw-flex tw-rounded tw-flex-col tw-h-full tw-justify-center tw-items-center tw-w-1/2">
                                                        <div
                                                            ref={hourRef}
                                                            className="tw-h-full tw-overflow-y-auto"
                                                        >
                                                            {generateOptions(
                                                                23,
                                                            ).map((hour) => (
                                                                <div
                                                                    key={hour}
                                                                    className={`tw-p-2 ${
                                                                        hour ===
                                                                        hours
                                                                            ? "tw-text-white"
                                                                            : "tw-text-[#A3A3A3]"
                                                                    }`}
                                                                    onClick={() =>
                                                                        setHours(
                                                                            hour,
                                                                        )
                                                                    }
                                                                >
                                                                    {hour} horas
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="tw-flex tw-rounded tw-flex-col tw-h-full tw-justify-center tw-items-center tw-w-1/2 tw-ml-2">
                                                        <div
                                                            ref={minuteRef}
                                                            className="tw-h-full tw-overflow-y-auto"
                                                        >
                                                            {generateOptions(
                                                                59,
                                                            ).map((minute) => (
                                                                <div
                                                                    key={minute}
                                                                    className={`tw-p-2 ${
                                                                        minute ===
                                                                        minutes
                                                                            ? "tw-text-white"
                                                                            : "tw-text-[#A3A3A3]"
                                                                    }`}
                                                                    onClick={() =>
                                                                        setMinutes(
                                                                            minute,
                                                                        )
                                                                    }
                                                                >
                                                                    {minute}{" "}
                                                                    minutos
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {hoursError && (
                                        <div
                                            style={{
                                                color: "#d32f2f",
                                                fontSize: "12px",
                                                marginTop: 15,
                                                marginLeft: 15,
                                            }}
                                        >
                                            {hoursError}
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

export default RoutesFormModal;
