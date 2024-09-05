import { ModalParamsMainForm } from "@/types/modals";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
    Container,
    InputAdornment,
    MenuItem,
    PaletteMode,
    Select,
    TextField
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Card, Form, Modal } from "react-bootstrap";
import RoutesFormHook from "./hook/routesFormHook";
import { IoMdClose } from "react-icons/io";
import { styled } from '@mui/system';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { VscSave } from "react-icons/vsc";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";

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
        minutesError
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

    const CustomContainer = styled(Container)`
        &::-webkit-scrollbar {
            width: 5px; /* Ancho de la barra de desplazamiento */
        }

        &::-webkit-scrollbar-track {
            background: transparent; /* Fondo de la pista de desplazamiento */
        }

        &::-webkit-scrollbar-thumb {
            background: #888; /* Color de la barra de desplazamiento */
            border-radius: 10px; /* Bordes redondeados */
            border: 3px solid #6c6c6c; /* Espacio alrededor de la barra */
        }   

        &::-webkit-scrollbar-thumb:hover {
            background: #555; /* Color cuando se pasa el ratón sobre la barra */
        }
    `;

    const CustomSelect = styled(Select)({
        backgroundColor: '#396593',
        width: 250,
        height: 40,
        color: '#fff',
        '& .MuiSelect-icon': {
            color: '#fff',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
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
                                        Ruta nueva
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
                                                        value={routeName}
                                                        onChange={(e) =>
                                                            setRouteName(
                                                                e.target.value,
                                                            )
                                                        }
                                                        type="text"
                                                        id="routeName"
                                                        fullWidth
                                                        label="Nombre Ruta"
                                                        variant="standard"
                                                        color="primary"
                                                        helperText={
                                                            routeNameError
                                                        }
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
                                                                color: modeTheme === "light" ? "#396593" : "#8bb8e7",
                                                            },
                                                        }}
                                                       /*  FormHelperTextProps={{
                                                            style: {
                                                                color: routeNameError ? "red" : "inherit",
                                                            },
                                                        }} */
                                                    />

                                                </div>

                                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-7 tw-w-full">
                                                    <TextField
                                                        value={routeManager}
                                                        onChange={(e) =>
                                                            setRouteManager(
                                                                e.target.value,
                                                            )
                                                        }
                                                        type="text"
                                                        id="routeManager"
                                                        fullWidth
                                                        label="Jefe Ruta"
                                                        variant="standard"
                                                        color="primary"
                                                        helperText={
                                                            routeManagerError
                                                        }
                                                        error={
                                                            !!routeManagerError
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

                                                <div className="tw-flex tw-flex-col tw-px-3 tw-mt-6 tw-w-full">
                                                    <div className="tw-flex tw-pt-1 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                        <div
                                                            style={{
                                                                fontSize: "14.5px",
                                                                fontWeight: "bold",
                                                                color: modeTheme === "light" ? "#396593" : "#8bb8e7",
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
                                                                onChange={(e: any) => handleChangeZone(e)}
                                                                label=""
                                                            >
                                                                {zonesData && zonesData.map((zone, index) => (
                                                                    <MenuItem key={index} value={zone.uid}>
                                                                        {zone.zoneName}
                                                                    </MenuItem>
                                                                ))}
                                                            </CustomSelect>
                                                            {zoneError && <div style={{ color: '#d32f2f', fontSize: '12px' }}>{zoneError}</div>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="tw-flex tw-flex-col tw-px-1 tw-w-full tw-mt-3 tw-justify-end">
                                                    <div className="tw-flex tw-flex-col tw-w-full tw-h-[95%]">
                                                        <div
                                                            className="tw-overflow-y-auto tw-max-h-56 tw-px-2 tw-pb-4 tw-scrollbar-thin tw-scrollbar-thumb-gray-400 tw-scrollbar-track-gray-200"
                                                            style={{ maxHeight: '250px' }}
                                                        >
                                                            {addresses.map((address, index) => (
                                                                <div key={index} className={`tw-flex tw-flex-row ${index !== 0 ? 'tw-mt-6' : 'tw-mt-2'} tw-w-full`}>
                                                                    <TextField
                                                                        value={address}
                                                                        onChange={(e) => handleAddressChange(index, e.target.value)}
                                                                        type="text"
                                                                        id={`address-${index}`}
                                                                        fullWidth
                                                                        label={`Dirección ${index + 1} (Opcional)`}
                                                                        variant="standard"
                                                                        color="primary"
                                                                        helperText={index === addresses.length - 1 ? addressesError : ""}
                                                                        error={index === addresses.length - 1 && !!addressesError}
                                                                        InputProps={{
                                                                            startAdornment: (
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
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/*  <div className="tw-flex tw-flex-col tw-px-1 tw-w-full tw-mt-3 tw-justify-end">
                                                    <div className="tw-flex tw-flex-col tw-w-full tw-h-[95%]">
                                                        <CustomContainer
                                                            style={{ maxHeight: '250px', overflowY: 'auto', width:'100%' }} // Estilos inline si es necesario
                                                        >
                                                            {addresses.map((address, index) => (
                                                                <div key={index} className={`tw-flex tw-flex-row ${index !== 0 ? 'tw-mt-6' : 'tw-mt-2'} tw-w-full -tw-ml-4 tw--16`}>
                                                                    <TextField
                                                                        value={address}
                                                                        onChange={(e) => handleAddressChange(index, e.target.value)}
                                                                        type="text"
                                                                        id={`address-${index}`}
                                                                        fullWidth
                                                                        label={`Dirección ${index + 1} (Opcional)`}
                                                                        variant="standard"
                                                                        color="primary"
                                                                        helperText={index === addresses.length - 1 ? addressesError : ""}
                                                                        error={index === addresses.length - 1 && !!addressesError}
                                                                        InputProps={{
                                                                            startAdornment: (
                                                                                <InputAdornment position="start">
                                                                                    <ExploreOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </CustomContainer>
                                                    </div>
                                                </div> */}

                                                <div className="tw-flex tw-flex-col tw-px-3 tw-mt-2 tw-w-full">
                                                    <div className="tw-flex tw-pt-1 tw-rounded tw-flex-col tw-justify-center tw-items-start">
                                                        <div
                                                            style={{
                                                                fontSize: "14.5px",
                                                                fontWeight: "bold",
                                                                color: modeTheme === "light" ? "#396593" : "#8bb8e7",
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
                                                                    <div ref={hourRef} className="tw-h-full tw-overflow-y-auto">
                                                                        {generateOptions(23).map((hour) => (
                                                                            <div
                                                                                key={hour}
                                                                                className={`tw-p-2 ${hour === hours ? 'tw-text-white' : 'tw-text-[#A3A3A3]'}`}
                                                                                onClick={() => setHours(hour)}
                                                                            >
                                                                                {hour} horas
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="tw-flex tw-rounded tw-flex-col tw-h-full tw-justify-center tw-items-center tw-w-1/2 tw-ml-2">
                                                                    <div ref={minuteRef} className="tw-h-full tw-overflow-y-auto">
                                                                        {generateOptions(59).map((minute) => (
                                                                            <div
                                                                                key={minute}
                                                                                className={`tw-p-2 ${minute === minutes ? 'tw-text-white' : 'tw-text-[#A3A3A3]'}`}
                                                                                onClick={() => setMinutes(minute)}
                                                                            >
                                                                                {minute} minutos
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {hoursError && <div style={{ color: '#d32f2f', fontSize: '12px', marginTop: 15, marginLeft: 15 }}>{hoursError}</div>}

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

export default RoutesFormModal;
