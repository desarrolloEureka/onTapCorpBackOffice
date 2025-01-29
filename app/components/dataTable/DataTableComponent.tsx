"use client";
import { DataTableComponentProps } from "@/types/tables";
import { Card, Col, Row } from "react-bootstrap";
import CampusModal from "../campus/CampusModal";
import EmployeesFormModal from "../employees/employeesFormModal";
import AlertModal from "../employees/alertModal";
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
import CategoriesModal from "../categories/CategoriesModal";
import NewsModal from "../news/NewsModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "react-bootstrap/Alert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  PaletteMode,
} from "@mui/material";
import { Key } from "react";
import ModalQR from "./components/ModalQR";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
    handleSearchAndFilter,
    searchTerm,
    clearSearch,
    handleDeleteItem,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    createdValid,
    handleShowQr,
    onShowQr,
    setHandleShowQr,
    metadata,
    setMetadata,
    selectReport,
    setSelectReport,
    statisticsDetail,
    setStatisticsDetail,
    showAlert,
    modeTheme,
    isShowQR,
    setSelectedArea,
    selectedArea,
    selectedSede,
    setSelectedSede,
    selectedZona,
    setSelectedZona,
    selectedRuta,
    setSelectedRuta,
    AreaData,
    SedeData,
    RutaData,
    ZonaData,
    isShowAlertCSV,
    setIsShowAlertCSV,
    dataAlertCSV,
    setDataShowAlertCSV
  } = DataTablesHook(reference);

  const theme = createTheme({
    palette: {
      mode: modeTheme as PaletteMode,
    },
  });

  return (
    dataTable && (
      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <div className="table-responsive">
                {selectReport && (
                  <div>
                    <button
                      onClick={() => {
                        setSelectReport("");
                        setMetadata([]);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "black",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ArrowBackIcon
                        style={{ color: "black", fontSize: "2rem" }}
                      />
                    </button>
                    {/* Información de usuarios */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre completo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Total Vistas</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {metadata ? (
                            <TableRow key={metadata?.uid}>
                              <TableCell>
                                {metadata?.firstName?.[0]}{" "}
                                {metadata?.lastName?.[0]}
                              </TableCell>
                              <TableCell>
                                {metadata?.emails?.[0]?.text || "N/A"}
                              </TableCell>
                              <TableCell>{metadata?.views || 0}</TableCell>
                            </TableRow>
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} align="center">
                                No data available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}

                <ExportCSV
                  // onUploadDataModalPdf={onUploadDataModalPdf}
                  onUploadDataModalCsv={onUploadDataModalCsv}
                  onMainFormModal={onMainFormModal}
                  onShowQr={onShowQr}
                  onMainFormModalEdit={onMainFormModalEdit}
                  data={data} // solo data
                  tableData={dataTable} // data + columnas
                  columns={columns}
                  tableTitle={tableTitle}
                  reference={reference}
                  isEmptyDataRef={isEmptyDataRef}
                  handleSearchAndFilter={handleSearchAndFilter}
                  searchTerm={searchTerm}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  clearSearch={clearSearch}
                  setSelectedArea={setSelectedArea}
                  selectedArea={selectedArea}
                  selectedSede={selectedSede}
                  setSelectedSede={setSelectedSede}
                  selectedZona={selectedZona}
                  setSelectedZona={setSelectedZona}
                  selectedRuta={selectedRuta}
                  setSelectedRuta={setSelectedRuta}
                  AreaData={AreaData}
                  SedeData={SedeData}
                  RutaData={RutaData}
                  ZonaData={ZonaData}
                  isShowAlertCSV={isShowAlertCSV}
                  setIsShowAlertCSV={setIsShowAlertCSV}
                  dataAlertCSV={dataAlertCSV}
                  setDataShowAlertCSV={setDataShowAlertCSV}
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
          isShowAlertCSV={isShowAlertCSV}
          setIsShowAlertCSV={setIsShowAlertCSV}
          dataAlertCSV={dataAlertCSV}
          setDataShowAlertCSV={setDataShowAlertCSV}
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
        ) : handleShowMainFormEdit && !isShowQR && reference === "employees" ? (
          <EmployeesFormModal
            handleShowMainForm={handleShowMainForm}
            setHandleShowMainForm={setHandleShowMainForm}
            handleShowMainFormEdit={handleShowMainFormEdit}
            setHandleShowMainFormEdit={setHandleShowMainFormEdit}
            editData={editData}
            title={tableTitle}
            reference={reference}
          />
        ) : isShowQR && reference === "employees" ? (
          <ModalQR
            handleShowMainForm={handleShowMainForm}
            setHandleShowMainForm={setHandleShowMainForm}
            data={editData}
          />
        ) : createdValid && !isShowQR && reference === "employees" ? (
          <EmployeesFormModal
            handleShowMainForm={handleShowMainForm}
            setHandleShowMainForm={setHandleShowMainForm}
            handleShowMainFormEdit={handleShowMainFormEdit}
            setHandleShowMainFormEdit={setHandleShowMainFormEdit}
            editData={editData}
            title={tableTitle}
            reference={reference}
          />
        ) : !createdValid && !isShowQR && reference === "employees" ? (
          <AlertModal
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
        ) : reference === "logos" || reference === "logosSuperAdmin" ? (
          <LogosFormModal
            handleShowMainForm={handleShowMainForm}
            setHandleShowMainForm={setHandleShowMainForm}
            handleShowMainFormEdit={handleShowMainFormEdit}
            setHandleShowMainFormEdit={setHandleShowMainFormEdit}
            editData={editData}
            title={tableTitle}
            reference={reference}
            isSuperAdmin={reference === "logosSuperAdmin" ? true : false}
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
        ) : reference === "superadminEmployees" ? (
          <ModalQR
            handleShowMainForm={handleShowMainForm}
            setHandleShowMainForm={setHandleShowMainForm}
            data={editData}
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

        {showAlert && (
          <Alert
            //variant="primary"
            variant={theme.palette.mode === "light" ? "primary" : "info"}
            dismissible
            className="tw-mt-2 tw-ml-3"
            style={{
              maxWidth: "215px",
            }}
          >
            Texto copiado al portapapeles
          </Alert>
        )}
      </Row>
    )
  );
};

export default DataTableComponent;
