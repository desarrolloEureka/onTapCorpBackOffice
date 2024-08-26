import { ModalParamsMainForm } from "@/types/modals";
import _ from "lodash";
import {
    Button,
    Form,
    Modal
} from "react-bootstrap";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Card } from "react-bootstrap";
import ZonesFormHook from "./hook/zonesFormHook";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const ZonesFormModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
    data
}: ModalParamsMainForm) => {
    const {
        show,
        isLoading,
        zoneName,
        setZoneName,
        zoneManager,
        setZoneManager,
        addresses,
        setAddresses,
        zoneNameError,
        zoneManagerError,
        addressesError,
        handleSendForm,
        handleClose,
        handleReset,
        isEdit,
        handleEditForm,
        handleAddressChange,
        handleAddAddress
    } = ZonesFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
    });

    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Form onReset={handleReset} onSubmit={handleSendForm}>
                <Modal.Body className="">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title className="tw-font-bold tw-mb-5">
                                Zona nueva:
                            </Card.Title>
                            <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0">
                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                    <div className="tw-flex tw-p-2 tw-pb-8 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body tw-bg-[#F2F2F2]">
                                        <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">

                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                <TextField
                                                    value={zoneName}
                                                    onChange={(e) => setZoneName(e.target.value)}
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
                                                />
                                            </div>
                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                <TextField
                                                    value={zoneManager}
                                                    onChange={(e) => setZoneManager(e.target.value)}
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
                                                />
                                            </div>
                                            {addresses.map((address, index) => (
                                                <div key={index} className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
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

                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
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
                            </div>
                        </Card.Body>

                        <Card.Footer className="text-muted tw-flex tw-justify-end tw-items-center">
                            {!isEdit && handleShowMainFormEdit ? (
                                <Button variant="primary" onClick={handleEditForm}>
                                    Editar
                                </Button>
                            ) : (
                                <Button className="tw-rounded-3xl" variant="dark" type="submit" disabled={isLoading}>
                                    {isLoading ? "Guardando..." : "Guardar zona"}
                                </Button>
                            )}

                        </Card.Footer>
                    </Card>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default ZonesFormModal;
