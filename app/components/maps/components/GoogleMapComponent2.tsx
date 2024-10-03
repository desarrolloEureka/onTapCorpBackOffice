import { daysInSpanish } from "@/data/campus";
import { GoogleMapComponentProps } from "@/types/googleMaps";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
} from "@vis.gl/react-google-maps";
import { AiOutlineMail } from "react-icons/ai";
import { FaCircle, FaRegAddressCard } from "react-icons/fa6";
import { IoBusiness, IoPin } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineBusinessCenter, MdOutlinePhone } from "react-icons/md";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import DirectionsMaps from "./Directions";
import Polygon from "./Polygon";

const GoogleMapComponent2 = ({
    mapContainerStyle,
    center,
    fixedPoints,
    routeCoordinates,
    zoneCoordinates,
    selectedMarker,
    setSelectedMarker,
    dataRoutes,
    dataFixedPoints,
    setDataFixedPoints,
    selectedPosition,
    setSelectedPosition,
    setDataRoutes,
    officeLocations,
    zoom = 11,
    mapToShow,
    employeeLocations,
    dataCampus,
    setDataCampus,
    selectedCampus,
    setSelectedCampus,
    selectedEmployee,
    setSelectedEmployee,
    dataEmployee,
    setDataEmployee,
    handleChangeDay,
    day,
}: GoogleMapComponentProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "";

    const CustomSelect = styled(Select)({
        backgroundColor: "#396593",
        width: "auto",
        height: 32,
        color: "#fff",
        "& .MuiSelect-icon": {
            color: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
        },
    });

    return (
        center && (
            <APIProvider apiKey={apiKey}>
                <Map
                    style={mapContainerStyle}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    // gestureHandling={"greedy"}
                    mapId={mapId}
                    disableDefaultUI={false}
                    // scaleControl={true}
                    streetViewControl={false}
                >
                    {(mapToShow === "fixedPoints" || mapToShow === "all") && (
                        <div>
                            {/* Marcadores en puntos específicos */}
                            {fixedPoints?.map((point, index) => (
                                <AdvancedMarker
                                    key={index}
                                    position={point}
                                    onClick={() => {
                                        setSelectedMarker({
                                            lat: point.lat,
                                            lng: point.lng,
                                        });
                                        setDataFixedPoints(point);
                                    }}
                                >
                                    <IoPin size={38} color={point?.color} />
                                </AdvancedMarker>
                            ))}
                            {/* Si hay un marcador seleccionado, mostramos InfoWindow */}
                            {selectedMarker && (
                                <InfoWindow
                                    position={selectedMarker}
                                    onCloseClick={() => {
                                        setSelectedMarker(null);
                                        setDataFixedPoints(null);
                                    }}
                                >
                                    <div className="tw-text-black tw-flex tw-flex-col tw-w-52">
                                        <div className="tw-flex tw-flex-row tw-space-x-2">
                                            <span
                                                style={{
                                                    color: dataFixedPoints?.color,
                                                }}
                                            >
                                                <IoPin size={28} />
                                            </span>
                                            <h4 className="tw-m-0">Nombre: </h4>
                                        </div>
                                        <span className="tw-text-lg tw-pb-2">
                                            {dataFixedPoints?.name}
                                        </span>
                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                            Nombre Punto:
                                        </h5>
                                        <span className="tw-text-base tw-pb-2">
                                            {dataFixedPoints?.pointName}
                                        </span>
                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                            Dirección:
                                        </h5>
                                        <span className="tw-text-base tw-pb-2">
                                            {dataFixedPoints?.address}
                                        </span>
                                    </div>
                                </InfoWindow>
                            )}
                        </div>
                    )}

                    {(mapToShow === "campus" || mapToShow === "all") && (
                        <div>
                            {/* Marcadores en las sedes */}
                            {officeLocations?.map((campus, index) => (
                                <AdvancedMarker
                                    key={index}
                                    position={campus.geolocation}
                                    onClick={() => {
                                        setSelectedCampus(campus.geolocation);
                                        setDataCampus(campus);
                                    }}
                                >
                                    <IoBusiness size={32} color="#CF10EE" />
                                </AdvancedMarker>
                            ))}

                            {/* Si hay una sede seleccionada, mostramos InfoWindow */}
                            {selectedCampus && (
                                <InfoWindow
                                    position={selectedCampus}
                                    onCloseClick={() => {
                                        setSelectedCampus(null);
                                        setDataCampus(null);
                                    }}
                                >
                                    <div className="tw-text-black tw-flex tw-flex-col tw-w-64">
                                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-items-center">
                                            <IoBusiness
                                                size={28}
                                                color="#CF10EE"
                                            />
                                            <h4 className="tw-m-0">Nombre: </h4>
                                        </div>
                                        <span className="tw-text-lg tw-pb-2">
                                            {dataCampus?.name}
                                        </span>
                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                            Dirección:
                                        </h5>
                                        <span className="tw-text-base tw-pb-2">
                                            {dataCampus?.address}
                                        </span>
                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                            Url:
                                        </h5>
                                        <span className="tw-text-base tw-pb-2">
                                            {dataCampus?.url}
                                        </span>
                                        <div className="tw-flex tw-pb-2 tw-w-full">
                                            {dataCampus?.phones?.map(
                                                (phone: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="tw-flex tw-flex-col tw-w-full tw-gap-2"
                                                    >
                                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                                            Teléfono:
                                                        </h5>
                                                        <div className="tw-space-x-2">
                                                            <span className="tw-text-base">
                                                                {phone.indicative.includes(
                                                                    "+",
                                                                )
                                                                    ? phone.indicative
                                                                    : `+${phone.indicative}`}
                                                            </span>
                                                            <span className="tw-text-base">
                                                                {phone.text}
                                                            </span>
                                                        </div>
                                                        <div className="">
                                                            <h5 className="tw-m-0 tw-text-[#396593]">
                                                                Ext:
                                                            </h5>
                                                            <span className="tw-text-base">
                                                                {phone.ext}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </div>
                    )}

                    {(mapToShow === "employees" || mapToShow === "all") && (
                        <div>
                            {/* Marcadores de los empleados */}
                            {employeeLocations?.map((employee, index) => (
                                <AdvancedMarker
                                    key={index}
                                    position={employee.geolocation}
                                    onClick={() => {
                                        setSelectedEmployee(
                                            employee.geolocation,
                                        );
                                        setDataEmployee(employee);
                                    }}
                                >
                                    <PiPersonArmsSpreadFill
                                        size={32}
                                        color="#E32B2B"
                                    />
                                </AdvancedMarker>
                            ))}
                            {/* Si hay un Empleado seleccionado, mostramos InfoWindow */}
                            {selectedEmployee && (
                                <InfoWindow
                                    className="border-top border-primary"
                                    headerContent={
                                        // Encabezado del InfoWindow
                                        <div className="tw-text-[#E32B2B] tw-text-lg tw-flex tw-items-center tw-flex-row tw-space-x-2 tw-px-5 lg:tw-px-10">
                                            <PiPersonArmsSpreadFill size={26} />
                                            <h6 className="tw-m-0">
                                                Empleado:{" "}
                                            </h6>
                                            <span className="tw-text-[#396593] tw-text-base tw-font-bold">
                                                {dataEmployee?.firstName}{" "}
                                                {dataEmployee?.lastName}
                                            </span>
                                        </div>
                                    }
                                    position={selectedEmployee}
                                    onCloseClick={() => {
                                        setSelectedEmployee(null);
                                        setDataEmployee(null);
                                    }}
                                >
                                    <div className="tw-text-black tw-flex tw-flex-col tw-w-auto lg:tw-w-[600px] tw-h-full tw-px-5 lg:tw-px-10 tw-space-y-4">
                                        {/* Encabezado */}
                                        <div className="tw-flex tw-w-full tw-flex-col">
                                            <h5 className="tw-text-[#396593] tw-pt-5 tw-pb-0 tw-m-0">
                                                Datos Personales{" "}
                                            </h5>
                                        </div>
                                        {/* Imagen */}
                                        <div className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                                            <div
                                                style={{
                                                    width: "122px",
                                                    height: "122px",
                                                    border: "8px solid #396593",
                                                    borderRadius: "50%",
                                                    backgroundColor:
                                                        dataEmployee.ImageProfile
                                                            ? "transparent"
                                                            : "#396593",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "white",
                                                    fontSize: "16px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {dataEmployee.ImageProfile && (
                                                    <img
                                                        style={{
                                                            width: "101%",
                                                            height: "101%",
                                                            objectFit: "cover",
                                                            borderRadius: "50%",
                                                        }}
                                                        className="tw-rounded-full tw-object-cover"
                                                        src={
                                                            dataEmployee.ImageProfile
                                                                ? dataEmployee.ImageProfile
                                                                : ""
                                                        }
                                                        alt="Profile Photo"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {/* Cuerpo / datos empleado */}
                                        <div className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                                            {/* Nombre */}
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                                                <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                    <PersonOutlineOutlinedIcon />
                                                    <span className="tw-text-lg tw-font-normal">
                                                        {
                                                            dataEmployee?.firstName
                                                        }
                                                    </span>
                                                </div>
                                                <span className="tw-text-sm">
                                                    Nombre
                                                </span>
                                            </div>

                                            {/* Apellido */}
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                                                <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                    <PersonOutlineOutlinedIcon />
                                                    <span className="tw-text-lg tw-font-normal">
                                                        {dataEmployee?.lastName}
                                                    </span>
                                                </div>
                                                <span className="tw-text-sm">
                                                    Apellido
                                                </span>
                                            </div>

                                            {/* Tipo de documento */}
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                                                <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                    <FaRegAddressCard
                                                        size={19}
                                                    />
                                                    <span className="tw-text-lg tw-font-normal">
                                                        {
                                                            dataEmployee?.documentType
                                                        }
                                                    </span>
                                                </div>
                                                <span className="tw-text-sm">
                                                    Tipo de Documento
                                                </span>
                                            </div>

                                            {/* Documento */}
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                                                <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                    <FaRegAddressCard
                                                        size={19}
                                                    />
                                                    <span className="tw-text-lg tw-font-normal">
                                                        {
                                                            dataEmployee?.documentNumber
                                                        }
                                                    </span>
                                                </div>
                                                <span className="tw-text-sm">
                                                    Documento
                                                </span>
                                            </div>

                                            {/* Fecha de nacimiento */}
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                                                <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                    <LiaBirthdayCakeSolid
                                                        size={22}
                                                    />
                                                    <span className="tw-text-lg tw-font-normal">
                                                        {
                                                            dataEmployee?.dateOfBirth
                                                        }
                                                    </span>
                                                </div>
                                                <span className="tw-text-sm">
                                                    Fecha de Nacimiento
                                                </span>
                                            </div>

                                            {/* Cargo */}
                                            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                                                <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                    <MdOutlineBusinessCenter
                                                        size={20}
                                                    />
                                                    <span className="tw-text-lg tw-font-normal">
                                                        {dataEmployee?.position}
                                                    </span>
                                                </div>
                                                <span className="tw-text-sm">
                                                    Cargo
                                                </span>
                                            </div>

                                            {/* Emails */}
                                            {dataEmployee?.emails?.map(
                                                (
                                                    email: string,
                                                    index: number,
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4"
                                                    >
                                                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                            <AiOutlineMail
                                                                size={22}
                                                            />
                                                            <span className="tw-text-lg tw-font-normal">
                                                                {email}
                                                            </span>
                                                        </div>
                                                        <span className="tw-text-sm">
                                                            Correo {index + 1}
                                                        </span>
                                                    </div>
                                                ),
                                            )}

                                            {/* Teléfonos */}
                                            {dataEmployee?.phones.map(
                                                (phone: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4"
                                                    >
                                                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                                                            <MdOutlinePhone
                                                                size={18}
                                                            />
                                                            <span className="tw-text-lg tw-font-normal">
                                                                {phone.text}
                                                            </span>
                                                        </div>
                                                        <span className="tw-text-sm">
                                                            Teléfono
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        {/* Datos laborales */}
                                        <div className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                                            <div className="tw-flex tw-w-full tw-flex-row tw-justify-center tw-items-center tw-pb-4">
                                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 ">
                                                    <h5 className="tw-m-0">
                                                        Área de trabajo:
                                                    </h5>
                                                    <span className="tw-text-base tw-bg-[#396593] tw-rounded-md tw-px-3 tw-w-3/4 tw-text-white tw-py-1">
                                                        {
                                                            dataEmployee?.selectedArea
                                                        }
                                                    </span>
                                                </div>
                                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1">
                                                    <h5 className="tw-m-0">
                                                        Sede:
                                                    </h5>
                                                    <span className="tw-text-base tw-bg-[#396593] tw-rounded-md tw-px-3 tw-w-3/4 tw-text-white tw-py-1">
                                                        {
                                                            dataEmployee?.selectedHeadquarter
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="tw-flex tw-w-full tw-flex-row tw-justify-center tw-items-center tw-pb-4">
                                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1">
                                                    <h5 className="tw-m-0">
                                                        Día de Ruta:
                                                    </h5>

                                                    <CustomSelect
                                                        className="tw-rounded-md tw-w-3/4"
                                                        labelId="area-label"
                                                        value={day}
                                                        onChange={
                                                            handleChangeDay
                                                        }
                                                        label=""
                                                    >
                                                        {dataEmployee?.routes &&
                                                            Object.keys(
                                                                dataEmployee?.routes,
                                                            ).map(
                                                                (
                                                                    day,
                                                                    index,
                                                                ) => (
                                                                    <MenuItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            day
                                                                        }
                                                                    >
                                                                        {
                                                                            daysInSpanish[
                                                                                day.slice(
                                                                                    0,
                                                                                    -5,
                                                                                )
                                                                            ]
                                                                        }
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                    </CustomSelect>
                                                </div>
                                                <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1">
                                                    <h5 className="tw-m-0">
                                                        Nombre de Ruta:
                                                    </h5>
                                                    <span className="tw-text-base text-black">
                                                        {
                                                            dataEmployee
                                                                ?.routes[day]
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </div>
                    )}

                    {(mapToShow === "routes" || mapToShow === "all") && (
                        <div>
                            {routeCoordinates?.map(
                                (route: any, index: number) => (
                                    <DirectionsMaps
                                        key={index}
                                        originCoords={
                                            route.geolocations[0].coords
                                        }
                                        destinationCoords={
                                            route.geolocations.at(-1).coords
                                        }
                                        onClick={(event) => {
                                            // // Capturamos las coordenadas del clic en la Polyline
                                            // const latLng = {
                                            //     lat: event.latLng?.lat() || 0,
                                            //     lng: event.latLng?.lng() || 0,
                                            // };
                                            // setSelectedPosition(latLng);
                                            // setDataRoutes(route);
                                        }}
                                    />
                                ),
                            )}
                            {selectedPosition && (
                                // Mostrar información de la ruta
                                <InfoWindow
                                    position={selectedPosition}
                                    onCloseClick={() => {
                                        setSelectedPosition(null);
                                        setDataRoutes(null);
                                    }}
                                >
                                    <div className="tw-text-black tw-flex tw-flex-col tw-w-80">
                                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-items-center">
                                            <span style={{ color: "#071FD1" }}>
                                                <FaCircle size={18} />
                                            </span>
                                            <h4 className="tw-m-0">Nombre: </h4>
                                        </div>
                                        <span className="tw-text-lg tw-pb-2">
                                            {dataRoutes?.routeName}
                                        </span>
                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                            Zona a la que corresponde:
                                        </h5>
                                        <span className="tw-text-base tw-pb-2">
                                            {dataRoutes?.zoneName}
                                        </span>
                                        <h5 className="tw-m-0 tw-text-[#396593]">
                                            Jefe de ruta:
                                        </h5>
                                        <span className="tw-text-base tw-pb-2">
                                            {dataRoutes?.routeManager}
                                        </span>
                                        {dataRoutes?.geolocations?.map(
                                            (point: any, index: number) => (
                                                <div key={index}>
                                                    <div className="tw-flex tw-flex-row tw-space-x-2">
                                                        <h4 className="tw-m-0 tw-text-[#396593]">
                                                            Dirección:{" "}
                                                        </h4>
                                                    </div>
                                                    <span className="tw-text-lg tw-pb-2">
                                                        {point.address}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </InfoWindow>
                            )}
                        </div>
                    )}

                    {(mapToShow === "areas" || mapToShow === "all") && (
                        <div>
                            {/* Resaltar un área con polígono */}
                            {zoneCoordinates?.map(
                                (zone: any, index: number) => (
                                    <Polygon
                                        paths={zone}
                                        key={index}
                                        fillColor="#FB9232"
                                        fillOpacity={0.5}
                                        strokeColor="#FB9232"
                                        strokeOpacity={1}
                                        strokeWeight={2}
                                    />
                                ),
                            )}
                        </div>
                    )}
                </Map>
            </APIProvider>
        )
    );
};

export default GoogleMapComponent2;
