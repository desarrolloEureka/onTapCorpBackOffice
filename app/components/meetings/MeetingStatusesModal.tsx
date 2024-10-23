import { ModalParamsMainForm } from "@/types/modals";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { InputAdornment, PaletteMode, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Col, Form, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import MeetingStatusesHook from "./hook/MeetingStatusesHook";

const MeetingStatusesModal = ({
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
        meetingNameError,
        meetingName,
        setMeetingName,
        handleReset,
        handleClose,
        handleSendForm,
        handleEditForm,
    } = MeetingStatusesHook({
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
                        <span>Nuevo Estado de Reunión</span>
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
                        <div className="tw-flex tw-w-full tw-flex-col">
                            <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                                <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">
                                    <div className="tw-flex tw-flex-row tw-px-3 tw-my-6 tw-w-full">
                                        <TextField
                                            value={meetingName}
                                            onChange={(e) =>
                                                setMeetingName(e.target.value)
                                            }
                                            type="text"
                                            id="meetingName"
                                            fullWidth
                                            label="Nombre Estado"
                                            variant="standard"
                                            color="primary"
                                            helperText={meetingNameError}
                                            error={!!meetingNameError}
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
                                                        modeTheme === "light"
                                                            ? "#396593"
                                                            : "#8bb8e7",
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

export default MeetingStatusesModal;
