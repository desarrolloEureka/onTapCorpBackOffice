import {
    PaletteMode,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Col, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { LuDownload } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import ModalQRHook from "./hook/ModalQRHook";
import { QRCodeSVG } from "qrcode.react";

const ModalQR = ({
    handleShowMainForm,
    setHandleShowMainForm,
    data,
}: {
    handleShowMainForm: boolean;
    setHandleShowMainForm: (e: boolean) => void;
    data: any;
}) => {
    const {
        modeTheme,
        show,
        urlQR,
        handleClose,
        handleDownloadQR
    } = ModalQRHook({
        handleShowMainForm,
        setHandleShowMainForm,
        data
    });

    const theme = createTheme({
        palette: {
            mode: modeTheme as PaletteMode,
        },
    });

    return (
        <Modal
            centered
            show={show}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
            contentClassName={"modal-admin"}
            backdrop="static"
        >
            <ThemeProvider theme={theme}>
                <Modal.Title
                    className={`modal-title-admin tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                    as="h6"
                >
                    <span></span>
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

                <Modal.Body className="tw-px-10">
                    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                        <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                            <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">
                                <div className="tw-flex tw-flex-row tw-px-3 tw-mt-6 tw-w-full">
                                    {urlQR && (
                                        <QRCodeSVG
                                            id="qrcode-svg"
                                            value={urlQR}
                                            size={380}
                                            className=""
                                        />
                                    )}
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
                        onClick={() => handleDownloadQR()}
                    >
                        <LuDownload size={28} />
                    </button>
                    <button
                        type="button"
                        className="tw-flex tw-items-center tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-text-white"
                        onClick={handleClose}
                    >
                        <ImCancelCircle size={28} />
                    </button>
                </Col>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalQR;
