import { ModalParamsMainForm } from "@/types/modals";
import {  Modal } from "react-bootstrap";
import EmployeesFormHook from "./hook/employeesFormHook";
import { IoMdClose } from "react-icons/io";

const AlertModal = ({
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
        dataForm,
        handleClose,
    } = EmployeesFormHook({
        handleShowMainForm,
        setHandleShowMainForm,
        handleShowMainFormEdit,
        setHandleShowMainFormEdit,
        editData,
        title,
        reference,
    });

    return (
        dataForm && (
            <Modal
                size={"sm"}
                centered
                show={show}
                onHide={handleClose}
                aria-hidden="false"
                aria-modal="true"
                backdrop="static"
            >
                <Modal.Title
                    className={`modal-title tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between h5`}
                    as="h6"
                >
                    <span>Atención</span>
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
                            <IoMdClose size={35} color={"gray"} />
                        </button>
                    </div>
                </Modal.Title>

                <Modal.Body
                    className="tw-px-8"
                    style={{ borderTop: "2px solid #396593", marginTop: 6, textAlign: "center" }}
                >
                    <p>La cantidad de licencias autorizada ha llegado a su límite, por favor comunicarse con Redacol.</p>

                </Modal.Body>
            </Modal>
        )
    );
};

export default AlertModal;