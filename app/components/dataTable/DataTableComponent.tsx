"use client";
import { Card, Col, Row } from "react-bootstrap";
import FormModal from "../modal/formModal/FormModal";
import CSVReader from "../uploadCsv/UploadCsv";
import { ExportCSV } from "./dataTables/dataTables";
import DataTablesHook from "./hook/DataTablesHook";
import MainFormModal from "../mainForm/mainFormModal";
import { DataTableComponentProps } from "@/types/tables";
import NotificationsFormModal from "../notifications/notificationsFormModal";
import ZonesFormModal from "../zones/zonesFormModal";

const DataTableComponent = ({
    componentTitle,
    componentDescription,
    tableTitle,
    reference,
}: DataTableComponentProps) => {
    const {
        columns,
        data,
        handleShowCsv,
        setHandleShowCsv,
        handleShowPdf,
        setHandleShowPdf,
        onUploadDataModalCsv,
        onUploadDataModalPdf,
        onMainFormModal,
        onMainFormModalEdit,
        dataTable,
        setHandleShowMainForm,
        setHandleShowMainFormEdit,
        handleShowMainForm,
        handleShowMainFormEdit,
        editData,
        isEmptyDataRef,
        handleSearch,
        searchTerm,
        clearSearch,
    } = DataTablesHook(reference);

    return (
        dataTable && (
            <Row className="row-sm">
                <Col lg={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            {/* <div>
                                <h6 className="main-content-label mb-1">
                                    {componentTitle}
                                </h6>
                                <p className="text-muted card-sub-title">
                                    {componentDescription}
                                </p>
                            </div> */}

                            <div className="table-responsive">
                                <ExportCSV
                                    // onUploadDataModalPdf={onUploadDataModalPdf}
                                    onUploadDataModalCsv={onUploadDataModalCsv}
                                    onMainFormModal={onMainFormModal}
                                    onMainFormModalEdit={onMainFormModalEdit}
                                    data={data} // solo data
                                    tableData={dataTable} // data + columnas
                                    columns={columns}
                                    tableTitle={tableTitle}
                                    reference={reference}
                                    isEmptyDataRef={isEmptyDataRef}
                                    handleSearch={handleSearch}
                                    searchTerm={searchTerm}
                                    clearSearch={clearSearch}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <FormModal
                    handleShowPdf={handleShowPdf}
                    setHandleShowPdf={setHandleShowPdf}
                    title={tableTitle}
                    reference={reference}
                />
                <CSVReader
                    handleShowCsv={handleShowCsv}
                    setHandleShowCsv={setHandleShowCsv}
                    title={tableTitle}
                    reference={reference}
                />
                {reference === 'notifications' ?
                    <NotificationsFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                    :
                    reference === "zones" ?
                        <ZonesFormModal
                            handleShowMainForm={handleShowMainForm}
                            setHandleShowMainForm={setHandleShowMainForm}
                            handleShowMainFormEdit={handleShowMainFormEdit}
                            setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                            editData={editData}
                            title={tableTitle}
                            reference={reference}
                        />
                        :
                        <MainFormModal
                            handleShowMainForm={handleShowMainForm}
                            setHandleShowMainForm={setHandleShowMainForm}
                            handleShowMainFormEdit={handleShowMainFormEdit}
                            setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                            editData={editData}
                            title={tableTitle}
                            reference={reference}
                        />
                }

            </Row>
        )
    );
};

export default DataTableComponent;
