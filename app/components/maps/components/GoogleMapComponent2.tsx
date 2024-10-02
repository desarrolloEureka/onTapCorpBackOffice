import { GoogleMapComponentProps } from "@/types/googleMaps";
import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
} from "@vis.gl/react-google-maps";
import { FaCircle } from "react-icons/fa6";
import { IoBusiness, IoPin } from "react-icons/io5";
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
}: GoogleMapComponentProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "";
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
                            {employeeLocations?.map((point, index) => (
                                <AdvancedMarker key={index} position={point}>
                                    <PiPersonArmsSpreadFill
                                        size={32}
                                        color="#E32B2B"
                                    />
                                </AdvancedMarker>
                            ))}
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
