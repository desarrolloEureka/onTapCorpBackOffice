import { ModalParamsMainForm } from "@/types/modals";
import _ from "lodash";
import { Button, Form, Modal } from "react-bootstrap";
import NotificationsFormHook from "./hook/notificationsFormHook";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import {
    createTheme,
    IconButton,
    InputAdornment,
    PaletteMode,
    TextField,
    ThemeProvider,
} from "@mui/material";
import { Card } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { VscSave } from "react-icons/vsc";

const NotificationsFormModal = ({
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
        issue,
        setIssue,
        content,
        setContent,
        issueError,
        contentError,
        handleSendForm,
        handleClose,
        handleReset,
    } = NotificationsFormHook({
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
                    <Card className="custom-card tw-w-full" style={{ padding: 0, margin: 0 }}>
                        <Card.Body style={{ padding: 0, margin: 0 }}>
                            <div className="tw-flex tw-w-full tw-flex-row tw-px-8 tw-pt-5 tw-pb-3">
                                <div className="tw-flex tw-w-[93%] tw-flex-col">
                                    <Card.Title className="tw-font-bold">
                                        Notificaciones:
                                    </Card.Title>
                                </div>
                                <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-start tw-items-center -tw-mt-2">
                                    <Button
                                        onClick={handleClose}
                                        className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent"
                                        style={{ padding: 0, background: 'transparent', border: 'none' }}
                                    >
                                        <IoMdClose size={35} color="#646464" />
                                    </Button>
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0 tw-px-9 tw-pb-8">
                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                    <div className="tw-flex tw-p-2 tw-pb-8 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                        <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded tw-text-white">
                                            Notificaciones empleados
                                        </h6>
                                        <div className="tw-flex tw-flex-row tw-px-3 tw-w-full">
                                            <ThemeProvider
                                                theme={theme}
                                            >
                                                <div className="tw-flex tw-flex-col tw-w-[80%]">
                                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                        <TextField
                                                            value={
                                                                issue
                                                            }
                                                            onChange={(
                                                                e,
                                                            ) =>
                                                                setIssue(
                                                                    e
                                                                        .target
                                                                        .value,
                                                                )
                                                            }
                                                            type="text"
                                                            id="issue"
                                                            fullWidth
                                                            label="Asunto"
                                                            variant="standard"
                                                            color="primary"
                                                            helperText={
                                                                issueError
                                                            }
                                                            error={
                                                                !!issueError
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
                                                    <div className="tw-flex tw-flex-row tw-px-3 tw-mt-9 tw-w-full tw-h-full">
                                                        <TextField
                                                            value={
                                                                content
                                                            }
                                                            onChange={(
                                                                e,
                                                            ) =>
                                                                setContent(
                                                                    e
                                                                        .target
                                                                        .value,
                                                                )
                                                            }
                                                            id="content"
                                                            fullWidth
                                                            label="Contenido (max 120 caracteres)"
                                                            variant="standard"
                                                            color="primary"
                                                            helperText={
                                                                contentError
                                                            }
                                                            error={
                                                                !!contentError
                                                            }
                                                            multiline
                                                            minRows={3}
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
                                                                        <InputAdornment position="start">
                                                                            <ExploreOutlinedIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                                style: {
                                                                    whiteSpace:
                                                                        "pre-wrap",
                                                                    borderBottom:
                                                                        "1px solid #ccc",
                                                                    paddingBottom:
                                                                        "5px",
                                                                },
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
                                                <div className="tw-flex tw-flex-row tw-w-[20%] tw-justify-center tw-items-start">
                                                    <IconButton
                                                        style={{
                                                            marginTop: 30,
                                                        }}
                                                        onClick={() => {
                                                            setIssue(
                                                                "",
                                                            );
                                                            setContent(
                                                                "",
                                                            );
                                                        }}
                                                    >

                                                        <FaTrashCan
                                                            size={25}
                                                        />
                                                    </IconButton>
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

export default NotificationsFormModal;
