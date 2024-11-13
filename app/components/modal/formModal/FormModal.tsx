import { Alert, Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/esm/Modal";
import FormModalHook from "./hook/FormModalHook";
import { ModalParamsPdf } from "@/types/modals";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

const FormModal = ({
    handleShowPdf,
    setHandleShowPdf,
    title,
    reference,
}: ModalParamsPdf) => {
    const {
        currentDate,
        show,
        handleSendForm,
        handleMultipleChange,
        changeHandler,
        handleClose,
        dateChangeHandler,
        isLoading,
        errorDataUpload,
        errorForm,
        setErrorForm,
        suppliers,
        selectChangeHandler,
    } = FormModalHook({ handleShowPdf, setHandleShowPdf, title, reference });

    return (
        suppliers && (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title as="h6">{`Crear ${title} masivos desde PDF`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="supplier">
                            <Form.Label>
                                Proveedor:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Select
                                isClearable
                                name="supplier"
                                options={[
                                    { value: "Example", label: "Example" },
                                ]}
                                className="default basic-multi-select"
                                id="supplier"
                                menuPlacement="auto"
                                classNamePrefix="Select2"
                                isSearchable={true}
                                // defaultValue={[suppliers[0]]}
                                onChange={selectChangeHandler}
                            />
                            {/* <Form.Control
              type='text'
              name='supplier'
              placeholder='Escriba el nombre de su proveedor'
              autoFocus
              onChange={changeHandler}
            /> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="buy_value">
                            <Form.Label>
                                Valor:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="buy_value"
                                placeholder="30000"
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date_end">
                            <Form.Label>
                                Fecha de vencimiento:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="date_end"
                                aria-label="dueDate"
                                onChange={dateChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="date_start"
                            hidden
                        >
                            <Form.Label>
                                Fecha de compra:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="date_start"
                                aria-label="buyDate"
                                onChange={changeHandler}
                                value={currentDate}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>
                                Titulo:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Escriba el titulo del cupon"
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>
                                Descripción:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                rows={3}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="files">
                            <Form.Label>
                                Subir todos los PDF:{" "}
                                <span className="tw-text-red-500">*</span>
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="files"
                                multiple
                                placeholder="Escriba el titulo del cupon"
                                onChange={handleMultipleChange}
                            />
                        </Form.Group>
                    </Form>
                    {errorForm && (
                        <Alert
                            variant="warning"
                            className="alert alert-warning alert-dismissible fade show"
                            role="alert"
                            show={show}
                            // onClick={() => setErrorForm(false)}
                        >
                            <strong>Error de envío!.</strong> Todos los campos
                            son obligatorios!
                            <Button
                                variant=""
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => setErrorForm(false)}
                            >
                                <i className="bi bi-x"></i>
                            </Button>
                        </Alert>
                    )}
                    {errorDataUpload?.map((value) => {
                        return !value.success && `error: ${value.code}`;
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        className={`btn  ${isLoading && "btn-loader"}`}
                        onClick={handleSendForm}
                    >
                        <span className="me-2">Enviar</span>
                        {isLoading && (
                            <span className="loading">
                                <i className="ri-loader-2-fill fs-16"></i>
                            </span>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    );
};

export default FormModal;
