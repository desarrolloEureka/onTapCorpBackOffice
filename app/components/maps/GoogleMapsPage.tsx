import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { FaSquare } from "react-icons/fa6";
import { IoBusiness, IoPin, IoSearchSharp } from "react-icons/io5";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { GooglePageProps } from "../../types/googleMaps";
import GoogleMapComponent2 from "./components/GoogleMapComponent2";
import { GoogleMapsHook } from "./hook/GoogleMapsHook";

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
    } = GoogleMapsHook();

    return (
        <div className="tw-flew tw-w-full tw-justify-center tw-items-center">
            <div className="tw-container tw-flex tw-flex-col tw-w-auto lg:tw-w-full tw-items-center">
                <div className="tw-w-full tw-px-10 tw-pb-4">
                    <Paper
                        component="form"
                        className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-w-auto lg:tw-w-[50%] tw-rounded-full"
                    >
                        <InputBase
                            className="tw-flex-1 tw-ml-1"
                            placeholder="Búsqueda"
                            inputProps={{ "aria-label": "Búsqueda" }}
                        />
                        <IconButton
                            type="button"
                            className="tw-p-3"
                            aria-label="search"
                        >
                            <IoSearchSharp size={32} />
                        </IconButton>
                    </Paper>
                </div>
                <div className="tw-w-full tw-shadow-2xl tw-rounded-lg">
                    {/* <GoogleMapComponent1
                        zoom={zoom}
                        mapToShow={mapToShow}
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        options={options}
                        fixedPoints={fixedPoints}
                        routeCoordinates={routeCoordinates}
                        zoneCoordinates={zoneCoordinates}
                        officeLocations={officeLocations}
                        employeeLocations={employeeLocations}
                        selectedMarker={selectedMarker}
                        setSelectedMarker={setSelectedMarker}
                        dataRoutes={dataRoutes}
                        setDataRoutes={setDataRoutes}
                        dataFixedPoints={dataFixedPoints}
                        setDataFixedPoints={setDataFixedPoints}
                        selectedPosition={selectedPosition}
                        setSelectedPosition={setSelectedPosition}
                    /> */}
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
