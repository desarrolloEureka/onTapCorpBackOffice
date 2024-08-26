import { ModalParamsMainForm } from "@/types/modals";
import _ from "lodash";
import {
    Button,
    Form,
    Modal
} from "react-bootstrap";
import NotificationsFormHook from "./hook/notificationsFormHook";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Card } from "react-bootstrap";

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

    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Form onReset={handleReset} onSubmit={handleSendForm}>
                <Modal.Body className="tw-px-1">
                    <div className="">
                        <Card className="custom-card tw-px-8 tw-py-1">
                            <Card.Body>
                                <Card.Title className="tw-font-bold tw-mb-5">
                                    Notificaciones:
                                </Card.Title>
                                <form>
                                    <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0">
                                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-p-2 tw-pb-8 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body tw-bg-[#F2F2F2]">
                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded tw-bg-[#030124] tw-text-white">
                                                    Notificaciones empleados

                                                </h6>
                                                <div className="tw-flex tw-flex-row tw-px-3 tw-w-full">
                                                    <div className="tw-flex tw-flex-col tw-w-[80%]">
                                                        <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                                            <TextField
                                                                value={issue}
                                                                onChange={(e) => setIssue(e.target.value)}
                                                                type="text"
                                                                id="issue"
                                                                fullWidth
                                                                label="Asunto"
                                                                variant="standard"
                                                                color="primary"
                                                                helperText={issueError}
                                                                error={!!issueError}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <ExploreOutlinedIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="tw-flex tw-flex-row tw-px-3 tw-mt-9 tw-w-full tw-h-full">
                                                            <TextField
                                                                value={content}
                                                                onChange={(e) => setContent(e.target.value)}
                                                                id="content"
                                                                fullWidth
                                                                label="Contenido (max 120 caracteres)"
                                                                variant="standard"
                                                                color="primary"
                                                                helperText={contentError}
                                                                error={!!contentError}
                                                                multiline
                                                                minRows={3}
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <ExploreOutlinedIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                                    style: {
                                                                        whiteSpace: 'pre-wrap',
                                                                        borderBottom: '1px solid #ccc',
                                                                        paddingBottom: '5px',
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="tw-flex tw-flex-row tw-w-[20%] tw-justify-center tw-items-start">
                                                        <IconButton
                                                            style={{
                                                                color: '#030124',
                                                                marginTop: 30
                                                            }}
                                                            onClick={() => {
                                                                setIssue("");
                                                                setContent("");
                                                            }}
                                                        >
                                                            <DeleteOutlineIcon style={{ fontSize: '1.8rem' }} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button className="tw-rounded-3xl" variant="dark" type="submit" disabled={isLoading}>
                                    {isLoading ? "Guardando..." : "Enviar Notificación"}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default NotificationsFormModal;