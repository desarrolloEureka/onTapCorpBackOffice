import {
    GoogleMap,
    InfoWindow,
    Marker,
    Polygon,
    Polyline,
    useLoadScript,
} from "@react-google-maps/api";
import { useCallback } from "react";

import { GoogleMapComponentProps } from "@/types/googleMaps";
import _ from "lodash";
import CustomInfoWindow from "./InfoWindowMaps";
import { IoPin } from "react-icons/io5";
import { FaCircle, FaRoute } from "react-icons/fa6";

const GoogleMapComponent1 = ({
    mapContainerStyle,
    center,
    options,
    fixedPoints,
    zoneCoordinates,
    officeLocations,
    employeeLocations,
    mapToShow,
    zoom = 11,
    selectedMarker,
    setSelectedMarker,
    routeCoordinates,
    dataRoutes,
    setDataRoutes,
    dataFixedPoints,
    setDataFixedPoints,
    selectedPosition,
    setSelectedPosition,
}: GoogleMapComponentProps) => {
    // Cargar el mapa
    const onMapLoad = useCallback((map: any) => {
        // console.log("Mapa cargado:", map);
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });

    if (loadError) return <div>Error al cargar el mapa</div>;
    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
            options={options}
            onLoad={onMapLoad}
        >
            {(mapToShow === "fixedPoints" || mapToShow === "all") && (
                <div>
                    {/* Marcadores en puntos específicos */}
                    {fixedPoints?.map((point, index) => (
                        <Marker
                            key={index}
                            position={point}
                            icon={{
                                path: "M336 96a80 80 0 1 0-96 78.39v283.17a32.09 32.09 0 0 0 2.49 12.38l10.07 24a3.92 3.92 0 0 0 6.88 0l10.07-24a32.09 32.09 0 0 0 2.49-12.38V174.39A80.13 80.13 0 0 0 336 96zm-56 0a24 24 0 1 1 24-24 24 24 0 0 1-24 24z", // Path SVG
                                fillColor: point.color, // Color del relleno
                                fillOpacity: 1,
                                strokeColor: "transparent", // Color del borde
                                strokeWeight: 2,
                                scale: 0.09,
                                anchor: new google.maps.Point(250, 500),
                            }}
                            onClick={() => {
                                setSelectedMarker({
                                    lat: point.lat,
                                    lng: point.lng,
                                });
                                setDataFixedPoints(point);
                            }}
                        />
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
                    {officeLocations?.map((point, index) => (
                        <Marker
                            key={index}
                            position={point.geolocation}
                            icon={{
                                path: "M432 176H320V64a48 48 0 0 0-48-48H80a48 48 0 0 0-48 48v416a16 16 0 0 0 16 16h104a8 8 0 0 0 8-8v-71.55c0-8.61 6.62-16 15.23-16.43A16 16 0 0 1 192 416v72a8 8 0 0 0 8 8h264a16 16 0 0 0 16-16V224a48 48 0 0 0-48-48zM98.08 431.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm80 240a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm80 320a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zm0-80a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79zM444 464H320V208h112a16 16 0 0 1 16 16v236a4 4 0 0 1-4 4z M400 400a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm0-80a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm0-80a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm-64 160a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm0-80a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm0-80a16 16 0 1 0 16 16 16 16 0 0 0-16-16z", // Path SVG
                                fillColor: "#CF10EE", // Color del relleno
                                fillOpacity: 1,
                                strokeColor: "transparent", // Color del borde
                                strokeWeight: 2,
                                scale: 0.07,
                                anchor: new google.maps.Point(200, 500),
                            }}
                        />
                    ))}
                </div>
            )}

            {(mapToShow === "employees" || mapToShow === "all") && (
                <div>
                    {/* Marcadores de los empleados */}
                    {employeeLocations?.map((point, index) => (
                        <Marker
                            key={index}
                            position={point}
                            icon={{
                                path: "M100,36a28,28,0,1,1,28,28A28,28,0,0,1,100,36ZM227.6,92.57A15.7,15.7,0,0,0,212,80H44a16,16,0,0,0-6.7,30.53l.06,0,53.89,23.73-21.92,83.3a16,16,0,0,0,7.9,20.91A15.83,15.83,0,0,0,84,240a16,16,0,0,0,14.44-9.06L128,180l29.58,51a16,16,0,0,0,29.07-13.35l-21.92-83.3,54-23.76A15.7,15.7,0,0,0,227.6,92.57Z", // Path SVG
                                fillColor: "#E32B2B", // Color del relleno
                                fillOpacity: 1,
                                strokeColor: "transparent", // Color del borde
                                strokeWeight: 2,
                                scale: 0.1,
                                anchor: new google.maps.Point(100, 200),
                            }}
                        />
                    ))}
                </div>
            )}

            {(mapToShow === "routes" || mapToShow === "all") && (
                <div>
                    {routeCoordinates?.map((route: any, index: number) => (
                        <Polyline
                            key={index}
                            path={route.geolocations.map(
                                (point: any) => point.coords,
                            )}
                            options={{
                                strokeColor: "#071FD1",
                                strokeOpacity: 1.0,
                                strokeWeight: 5,
                                clickable: true,
                            }}
                            onClick={(event) => {
                                // Capturamos las coordenadas del clic en la Polyline
                                const latLng = {
                                    lat: event.latLng?.lat() || 0,
                                    lng: event.latLng?.lng() || 0,
                                };
                                setSelectedPosition(latLng);
                                setDataRoutes(route);
                            }}
                        />
                    ))}

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
                    {zoneCoordinates?.map((zone: any, index: number) => (
                        <Polygon
                            key={index}
                            paths={zone}
                            options={{
                                fillColor: "#FB9232",
                                fillOpacity: 0.5,
                                strokeColor: "#FB9232",
                                strokeOpacity: 1,
                                strokeWeight: 2,
                            }}
                        />
                    ))}
                </div>
            )}
        </GoogleMap>
    );
};

export default GoogleMapComponent1;
