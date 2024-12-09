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
  } = useEmployeesMostVisitsHook();

  const [searchTerm, setSearchTerm] = useState("");

  // Filtro de busqueda por empleado
  const filteredEmployees = employeesData.filter((employee) =>
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row className="row-sm">
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Header className="border-bottom-0 pb-4">
            <div>
              <h5 className="main-content-label mb-2">Empleados con más visitas</h5>
              <p className="text-muted fs-12 mb-0">
                Visualiza las visitas de los empleados más destacados.
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

              <Button
                variant="primary"
                size="sm"
                onClick={toggleSortOrder}
              >
                Ordenar: {sortOrder === "asc" ? "Menor a Mayor" : "Mayor a Menor"}
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p>Cargando datos...</p>
            ) : filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
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
        </Card>
      </Col>
    </Row>
  );
};

export default EmployeesMostVisits;
