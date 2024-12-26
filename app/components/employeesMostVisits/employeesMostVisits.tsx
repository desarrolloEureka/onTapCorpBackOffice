import React, { useState } from "react";
import { Card, Col, Row, ProgressBar, Button, Form } from "react-bootstrap";
import useEmployeesMostVisitsHook from "./hook/employeesMostVisitsHook";

const EmployeesMostVisits = () => {
  const {
    employeesData,
    loading,
    sortOrder,
    toggleSortOrder,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearFilters
  } = useEmployeesMostVisitsHook();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // Filtro de búsqueda por empleado
  const filteredEmployees = employeesData.filter((employee) =>
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el índice de inicio y fin de la página actual
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Funciones de cambio de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Row className="row-sm">
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Header className="border-bottom-0 pb-4">
            <div>
              <h5 className="main-content-label mb-2">Empleados con más vistas</h5>
              <p className="text-muted fs-12 mb-0">
                Visualiza las vistas de los empleados más destacados.
              </p>
            </div>

            <div className="d-flex ms-auto gap-2 align-items-center">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control-sm"
                />
              </Form.Group>

              <Form.Group controlId="startDate">
                <Form.Label className="d-none">Fecha Inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="form-control-sm"
                />
              </Form.Group>

              <Form.Group controlId="endDate">
                <Form.Label className="d-none">Fecha Fin</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  min={startDate || ""}
                  disabled={!startDate}
                  className="form-control-sm"
                />
              </Form.Group>

              <Button variant="primary" size="sm" onClick={toggleSortOrder}>
                Ordenar: {sortOrder === "asc" ? "Menor a Mayor" : "Mayor a Menor"}
              </Button>

              <Button variant="primary" size="sm" onClick={clearFilters}>
                Borrar
              </Button>
            </div>
          </Card.Header>
          <Card.Body style={{ maxHeight: "600px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#9c9c9c #f1f1f1" }}  className="custom-scrollbar">
            {loading ? (
              <p>Cargando datos...</p>
            ) : currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <div key={index} className="mb-3">
                  <h5 className="mb-2 d-block">
                    <span className="fs-14">{employee.nombre}</span>
                    <span className="float-end fs-14">
                      {employee.totalVistas} vistas
                    </span>
                  </h5>
                  <p className="mb-2 text-muted fs-12">
                    Cédula: {employee.cedula}
                  </p>
                  <ProgressBar
                    variant="warning"
                    now={employee.porcentaje}
                    label={`${employee.totalVistas}`}
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
            >
              Siguiente
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default EmployeesMostVisits;
