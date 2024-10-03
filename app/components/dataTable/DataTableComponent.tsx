"use client";
import { DataTableComponentProps } from "@/types/tables";
import { Card, Col, Row } from "react-bootstrap";
import CampusModal from "../campus/CampusModal";
import EmployeesFormModal from "../employees/employeesFormModal";
import LogosFormModal from "../logos/logosFormModal";
import MainFormModal from "../mainForm/mainFormModal";
import MeetingStatusesModal from "../meetings/MeetingStatusesModal";
import FormModal from "../modal/formModal/FormModal";
import NotificationsFormModal from "../notifications/notificationsFormModal";
import RoutesFormModal from "../routes/routesFormModal";
import CSVReader from "../uploadCsv/UploadCsv";
import ZonesFormModal from "../zones/zonesFormModal";
import { ExportCSV } from "./dataTables/dataTables";
import DataTablesHook from "./hook/DataTablesHook";
import CategoriesModal from "../Categories/CategoriesModal";
import NewsModal from "../News/NewsModal";

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
        handleDeleteItem,
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
                {reference === "notifications" ? (
                    <NotificationsFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "zones" ? (
                    <ZonesFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "employees" ? (
                    <EmployeesFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "routes" ? (
                    <RoutesFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "logos" ? (
                    <LogosFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "meetingStatus" ? (
                    <MeetingStatusesModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "campus" ? (
                    <CampusModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "fixedPoints" ? (
                    <CategoriesModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : reference === "circular" ||
                  reference === "events" ||
                  reference === "policy" ||
                  reference === "forms" ||
                  reference === "news" ? (
                    <NewsModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                ) : (
                    <MainFormModal
                        handleShowMainForm={handleShowMainForm}
                        setHandleShowMainForm={setHandleShowMainForm}
                        handleShowMainFormEdit={handleShowMainFormEdit}
                        setHandleShowMainFormEdit={setHandleShowMainFormEdit}
                        editData={editData}
                        title={tableTitle}
                        reference={reference}
                    />
                )}
            </Row>
        )
    );
};

export default DataTableComponent;
