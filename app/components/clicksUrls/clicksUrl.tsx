import React, { useState, useEffect } from "react";
import { Card, Col, Row, ProgressBar, Button, Form } from "react-bootstrap";
import useClicksUrl from "./hook/clicksUrlHook";
import useAuth from "@/firebase/auth";

const UrlClicksByEmployee = () => {
  const { userData } = useAuth();
  const { clicksData, loading, error, employees } = useClicksUrl(
    userData?.companyId
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Estado para el empleado seleccionado
  const itemsPerPage = 30;

  // Filtrar datos por término de búsqueda solo si searchTerm no está vacío
  const filteredData = searchTerm
    ? clicksData.filter((data) =>
        data.urlName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : clicksData;

  // Filtrar los datos según el empleado seleccionado
  const filteredByEmployee = selectedEmployee
    ? filteredData
        .filter((data) => data.employeeId === selectedEmployee)
        .sort((a: any, b: any) => b?.clickCount - a?.clickCount)
    : filteredData.sort((a: any, b: any) => b?.clickCount - a?.clickCount);

  // Paginación
  const totalPages = Math.ceil(filteredByEmployee.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredByEmployee.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calcular el máximo de clics solo cuando hay datos disponibles
  const maxClicks =
    clicksData.length > 0
      ? Math.max(...clicksData.map((data) => data.clickCount), 100)
      : 100;

  useEffect(() => {
    if (employees.length > 0) {
      setSelectedEmployee(employees[0]?.uid || "");
    }
  }, [employees]);

  return (
    <Row className="row-sm">
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Header className="border-bottom-0 pb-4">
            <div>
              <h5 className="main-content-label mb-2">
                Contadores de Clics por Empleado
              </h5>
              <p className="text-muted fs-12 mb-0">
                Visualiza y filtra los clics realizados en URLs por empleados.
              </p>
            </div>
            <div className="d-flex ms-auto gap-2 align-items-center">
              {/* Formulario para búsqueda por nombre de URL */}
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre de URL"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="form-control-sm"
                />
              </Form.Group>

              {/* Dropdown para seleccionar empleado */}
              <Form.Group controlId="selectEmployee">
                <Form.Control
                  as="select"
                  onChange={(e) => setSelectedEmployee(e?.target?.value)} // Actualizar estado
                  className="form-control-sm"
                >
                  {employees.map((employee) => (
                    <option key={employee.uid} value={employee?.uid}>
                      {employee?.fullName}{" "}
                      {/* Mostrar el nombre completo del empleado */}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
          </Card.Header>
          <Card.Body
            style={{
              maxHeight: "600px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#9c9c9c #f1f1f1",
            }}
            className="custom-scrollbar"
          >
            {loading ? (
              <p>Cargando datos...</p>
            ) : error ? (
              <p>Error: {error?.message}</p>
            ) : currentData.length > 0 ? (
              currentData.map((data) => (
                <div
                  key={`${data.urlLink}-${data.employeeId}`}
                  className="mb-3"
                >
                  <h5 className="mb-2 d-block">
                    <span className="fs-14">{data.urlName}</span>
                    <span className="float-end fs-14">
                      {data.clickCount} clics
                    </span>
                  </h5>
                  <ProgressBar
                    variant="warning"
                    now={(data.clickCount / maxClicks) * 100} // Normalización según el máximo
                    label={`${data.clickCount}`}
                    className="progress-bar-striped progress-bar-animated"
                  />
                </div>
              ))
            ) : (
              <p>No hay datos disponibles para mostrar.</p>
            )}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <Button
              variant="primary"
              size="sm"
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              aria-label="Página anterior"
            >
              Anterior
            </Button>
            <span className="text-muted fs-12">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="primary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              aria-label="Página siguiente"
            >
              Siguiente
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default UrlClicksByEmployee;
