import { ModalParamsMainForm } from "@/types/modals";
import { styled } from "@mui/system";
import { Col, Form, Modal } from "react-bootstrap";
import { BsBuildingAdd } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import CustomTextField from "../company/components/CustomTextField";
import React from "react";
import PlansHook from "./hooks/PlansHook";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    InputAdornment,
    PaletteMode,
    TextField,
} from "@mui/material";

const PlansModal = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference
}: ModalParamsMainForm) => {
    const {
        show,
        isLoading,
        isEdit,
        planName,
        planPrice,
        setPlanPrice,
        planPriceError,
        handleClose,
        handleReset,
        handleEditForm,
        modeTheme
    } = PlansHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
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
            <Form onReset={handleReset} /* onSubmit={handleSendForm} */>
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
                                            type="text"
                                            id="planName"
                                            fullWidth
                                            label="Nombre del Plan"
                                            variant="standard"
                                            value={planName}
                                            disabled
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <BsBuildingAdd />
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

                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full tw-mb-6">
                                        <TextField
                                            type="number"
                                            id="planPrice"
                                            fullWidth
                                            label="Precio del Plan"
                                            variant="standard"
                                            value={planPrice}
                                            onChange={(e) => setPlanPrice(e.target.value)}
                                            error={!!planPriceError}
                                            helperText={planPriceError}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">$</InputAdornment>
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

                        <button
                            type="submit"
                            className="tw-flex tw-items-center tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-text-white"
                            onClick={handleEditForm}
                        >
                            <RiSave2Fill size={28} />
                        </button>
                    </Col>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PlansModal;
