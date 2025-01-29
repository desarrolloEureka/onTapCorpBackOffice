import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { FaSquare } from "react-icons/fa6";
import { IoBusiness, IoPin, IoSearchSharp } from "react-icons/io5";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { GooglePageProps } from "../../types/googleMaps";
import GoogleMapComponent2 from "./components/GoogleMapComponent2";
import { GoogleMapsHook } from "./hook/GoogleMapsHook";
import { Form } from "react-bootstrap";

//componente para el filtro de empleados por Area por Sede por Zona por Ruta
const BranchFilter = ({
  names,
  names2,
  titulo,
  branches = [],
  setSelectedBranch,
}: {
  names: string
  names2: string
  titulo: string;
  branches: any[];
  setSelectedBranch: (branch: string) => void;
}) => {
  return (

    <Form.Group controlId="branchFilter">
      <Form.Label style={{ fontSize: "15px" }} className="filter-label">Filtrar por {titulo}</Form.Label>
      <Form.Control
        style={{
          width: "170px"
        }}

        as="select"
        onChange={(e) => setSelectedBranch(e.target.value)}
        defaultValue=""
      >
        <option value="">
          {branches.length > 0
            //? `Seleccionar ${titulo}`
            ? `Mostrar Todos`
            : `No hay ${titulo?.toLocaleLowerCase()}s disponibles`}
        </option>
        {branches.map((branch) => {
          const displayValue = names2 !== "" ? `${branch?.[names]?.[0]} ${branch?.[names2]?.[0]}` : names === "name" && titulo === "Sede" ? branch?.[names]?.[0] : branch?.[names];
          return (
            <option
              key={branch?.uid || branch}
              value={branch?.uid}
            >
              {displayValue}
            </option>
          );
        })}
      </Form.Control>

    </Form.Group>
  )
}

const GoogleMapsPage = ({ mapToShow }: GooglePageProps) => {
  const {
    mapContainerStyle,
    center,
    options,
    zoom,
    fixedPoints,
    officeLocations,
    zoneCoordinates,
    selectedMarker,
    setSelectedMarker,
    routeCoordinates,
    dataRoutes,
    setDataRoutes,
    dataFixedPoints,
    setDataFixedPoints,
    selectedPosition,
    setSelectedPosition,
    selectedCampus,
    setSelectedCampus,
    dataCampus,
    setDataCampus,
    employeeLocations,
    dataEmployeeLocations,
    setDataEmployeeLocations,
    selectedEmployee,
    setSelectedEmployee,
    dataEmployee,
    setDataEmployee,
    handleChangeDay,
    day,
    setSelectedPuntoFijo,
    setSelectedRuta,
    setSelectedZona,
    setSelectedSede,
    setSelectedEmpleado,
    EmpleadoData,
    SedeData,
    ZonaData,
    RutaData,
    PuntoFijoData,
    selectedEmpleado,
    selectedEmpleadoByserch,
    renderSearchEmployees,
    setSelectedEmpleadoByserch
  } = GoogleMapsHook();

  return (
    <div className="tw-flew tw-w-full tw-justify-center tw-items-center">
      <div className="tw-container tw-flex tw-flex-col tw-w-auto lg:tw-w-full tw-items-center">
        <div className="tw-w-full tw-px-10 tw-pb-4">
          <div className="tw-flex tw-items-center tw-space-x-4">
            {/* Barra de búsqueda */}
            <Paper
              component="form"
              className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-w-auto lg:tw-w-[50%] tw-rounded-full"
            >
              <InputBase
                className="tw-flex-1 tw-ml-1"
                placeholder="Búsqueda"
                inputProps={{ "aria-label": "Búsqueda" }}
                value={selectedEmpleadoByserch}
                onChange={(e) => setSelectedEmpleadoByserch(e.target.value)}

              />
              <IconButton
                type="button"
                className="tw-p-3"
                aria-label="search"
                onClick={() => renderSearchEmployees()}

              >
                <IoSearchSharp size={32} />
              </IconButton>
            </Paper>

            {/* Filtros */}
            {(mapToShow === "all" || mapToShow === "areas") && (
              <BranchFilter
                names={"zoneName"}
                names2={""}
                titulo={"Zona"}
                setSelectedBranch={setSelectedZona}
                branches={ZonaData}
              />
            )}
            {(mapToShow === "all" || mapToShow === "campus") && (
              <BranchFilter
                names={"name"}
                names2={""}
                titulo={"Sede"}
                setSelectedBranch={setSelectedSede}
                branches={SedeData}
              />
            )}
            {(mapToShow === "all" || mapToShow === "routes") && (
              <BranchFilter
                names={"routeName"}
                names2={""}
                titulo={"Ruta"}
                setSelectedBranch={setSelectedRuta}
                branches={RutaData}
              />
            )}
            {(mapToShow === "all" || mapToShow === "fixedPoints") && (
              <BranchFilter
                names={"name"}
                names2={""}
                titulo={"Puntos Fijos"}
                setSelectedBranch={setSelectedPuntoFijo}
                branches={PuntoFijoData}
              />
            )}
            {(mapToShow === "all" || mapToShow === "employees") && (
              <BranchFilter
                names={"firstName"}
                names2={"lastName"}
                titulo={"Empleado"}
                setSelectedBranch={setSelectedEmpleado}
                branches={EmpleadoData}
              />
            )}
          </div>
        </div>

        <div className="tw-w-full tw-shadow-2xl tw-rounded-lg">
          <GoogleMapComponent2
            zoom={zoom}
            mapContainerStyle={mapContainerStyle}
            employeeLocations={employeeLocations}
            center={center}
            mapToShow={mapToShow}
            fixedPoints={fixedPoints}
            routeCoordinates={routeCoordinates}
            zoneCoordinates={zoneCoordinates}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            dataRoutes={dataRoutes}
            dataFixedPoints={dataFixedPoints}
            setDataFixedPoints={setDataFixedPoints}
            officeLocations={officeLocations}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            setDataRoutes={setDataRoutes}
            dataCampus={dataCampus}
            setDataCampus={setDataCampus}
            selectedCampus={selectedCampus}
            setSelectedCampus={setSelectedCampus}
            dataEmployeeLocations={dataEmployeeLocations}
            setDataEmployeeLocations={setDataEmployeeLocations}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            dataEmployee={dataEmployee}
            setDataEmployee={setDataEmployee}
            handleChangeDay={handleChangeDay}
            day={day}
          />
        </div>
        <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-center tw-items-center sm:tw-justify-between tw-w-full tw-px-10 tw-pt-16 tw-space-x-0 sm:tw-space-x-4 tw-space-y-4 sm:tw-space-y-0">
          <div className="tw-text-[#FB9232] tw-space-x-1 lg:tw-space-x-4 tw-text-base lg:tw-text-2xl tw-items-center tw-justify-center tw-flex">
            <FaSquare />
            <span>Zona</span>
          </div>
          <div className="tw-text-[#071FD1] tw-space-x-1 lg:tw-space-x-4 tw-text-base lg:tw-text-2xl tw-items-center tw-justify-center tw-flex">
            <FaSquare />
            <span>Ruta</span>
          </div>
          <div className="tw-text-[#000000] tw-space-x-1 lg:tw-space-x-4 tw-text-base lg:tw-text-2xl tw-items-center tw-justify-center tw-flex">
            <IoPin size={32} />
            <span>Punto Fijo</span>
          </div>
          <div className="tw-text-[#CF10EE] tw-space-x-1 lg:tw-space-x-4 tw-text-base lg:tw-text-2xl tw-items-center tw-justify-center tw-flex">
            <IoBusiness />
            <span>Sedes</span>
          </div>
          <div className="tw-text-[#E32B2B] tw-space-x-1 lg:tw-space-x-4 tw-text-base lg:tw-text-2xl tw-items-center tw-justify-center tw-flex">
            <PiPersonArmsSpreadFill />
            <span>Empleado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsPage;
