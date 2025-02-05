import React, { useEffect, useState } from "react";
import { GoogleMapComponentProps } from "@/types/googleMaps";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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
  mapToShow,
  zoneCoordinates,
  officeLocations,
  employeeLocations,
  routeCoordinates,
  fixedPoints,
}: GoogleMapComponentProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "";

  const [dataCampusInfo, setDataCampusInfo] = useState<any>();
  const [dataEmployeeInfo, setDataEmployeeInfo] = useState<any>();
  const [dataRoutesInfo, setDataRoutesInfo] = useState<any>();
  const [dataFixedPointsInfo, setDataFixedPointsInfo] = useState<any>();
  const [day, setDay] = useState("");

  const [positionViewCampus, setPositionViewCampus] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [positionViewEmployee, setPositionViewEmployee] = useState<
    google.maps.LatLngLiteral | any
  >(null);
  const [positionViewRoute, setPositionViewRoute] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [positionViewFixedPoint, setPositionViewFixedPoint] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const today = new Date().getDay();
    // Mapeo de días a las rutas correspondientes
    const routes: { [key: number]: string } = {
      0: "sundayRoute",
      1: "mondayRoute",
      2: "tuesdayRoute",
      3: "wednesdayRoute",
      4: "thursdayRoute",
      5: "fridayRoute",
      6: "saturdayRoute",
    };
    // Establece la ruta correspondiente al día actual
    setDay(routes[today]);
  }, []);

  return (
    center && (
      <APIProvider apiKey={apiKey}>
        <Map
          style={mapContainerStyle}
          defaultCenter={center}
          defaultZoom={15}
          mapId={mapId}
          disableDefaultUI={false}
          streetViewControl={false}
        >
          {(mapToShow === "fixedPoints" || mapToShow === "all") && (
            <>
              {/* Marcadores en puntos específicos */}
              {fixedPoints?.map((point, index) => (
                <AdvancedMarker
                  key={index}
                  position={point}
                  onClick={() => {
                    setPositionViewFixedPoint({
                      lat: point.lat,
                      lng: point.lng,
                    });
                    setDataFixedPointsInfo(point);
                  }}
                >
                  <IoPin size={38} color={point?.color} />
                </AdvancedMarker>
              ))}
              {/* Si hay un marcador seleccionado, mostramos InfoWindow */}
              {positionViewFixedPoint?.lat && positionViewFixedPoint?.lng && (
                <InfoWindow
                  position={positionViewFixedPoint}
                  onCloseClick={() => {
                    setPositionViewFixedPoint(null);
                    setDataFixedPointsInfo(null);
                  }}
                >
                  <div className="tw-text-black tw-flex tw-flex-col tw-w-52">
                    <div className="tw-flex tw-flex-row tw-space-x-2">
                      <span
                        style={{
                          color: dataFixedPointsInfo?.color,
                        }}
                      >
                        <IoPin size={28} />
                      </span>
                      <h4 className="tw-m-0">Nombre: </h4>
                    </div>
                    <span className="tw-text-lg tw-pb-2">
                      {dataFixedPointsInfo?.name}
                    </span>
                    <h5 className="tw-m-0 tw-text-[#396593]">Nombre Punto:</h5>
                    <span className="tw-text-base tw-pb-2">
                      {dataFixedPointsInfo?.pointName}
                    </span>
                    <h5 className="tw-m-0 tw-text-[#396593]">Dirección:</h5>
                    <span className="tw-text-base tw-pb-2">
                      {dataFixedPointsInfo?.address}
                    </span>
                  </div>
                </InfoWindow>
              )}
            </>
          )}

          {(mapToShow === "campus" || mapToShow === "all") && (
            <>
              {/* Marcadores en las sedes */}
              {officeLocations?.map((campus, index) => (
                <AdvancedMarker
                  key={index}
                  position={campus.geolocation}
                  onClick={() => {
                    setPositionViewCampus(campus.geolocation);
                    setDataCampusInfo(campus);
                  }}
                >
                  <IoBusiness size={32} color="#CF10EE" />
                </AdvancedMarker>
              ))}

              {/* Si hay una sede seleccionada, mostramos InfoWindow */}
              {positionViewCampus && (
                <InfoWindow
                  position={positionViewCampus}
                  onCloseClick={() => {
                    setPositionViewCampus(null);
                    setDataCampusInfo(null);
                  }}
                >
                  <div className="tw-text-black tw-flex tw-flex-col tw-w-64">
                    <div className="tw-flex tw-flex-row tw-space-x-2 tw-items-center">
                      <IoBusiness size={28} color="#CF10EE" />
                      <h4 className="tw-m-0">Nombre: </h4>
                    </div>
                    <span className="tw-text-lg tw-pb-2">
                      {dataCampusInfo?.name}
                    </span>
                    <h5 className="tw-m-0 tw-text-[#396593]">Dirección:</h5>
                    <span className="tw-text-base tw-pb-2">
                      {dataCampusInfo?.address}
                    </span>
                    <h5 className="tw-m-0 tw-text-[#396593]">Url:</h5>
                    <span className="tw-text-base tw-pb-2">
                      {dataCampusInfo?.url}
                    </span>
                    <div className="tw-flex tw-pb-2 tw-w-full">
                      {dataCampusInfo?.phones?.map(
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
                                {phone.indicative.includes("+")
                                  ? phone.indicative
                                  : `+${phone.indicative}`}
                              </span>
                              <span className="tw-text-base">{phone.text}</span>
                            </div>
                            <div className="">
                              <h5 className="tw-m-0 tw-text-[#396593]">Ext:</h5>
                              <span className="tw-text-base">{phone.ext}</span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </>
          )}

          {(mapToShow === "employees" || mapToShow === "all") && (
            <>
              {/* Marcadores de los empleados */}
              {employeeLocations?.map((employee, index) => (
                <AdvancedMarker
                  key={index}
                  position={employee.geolocation}
                  onClick={() => {
                    setPositionViewEmployee(employee.geolocation);
                    setDataEmployeeInfo(employee);
                  }}
                >
                  <PiPersonArmsSpreadFill size={32} color="#E32B2B" />
                </AdvancedMarker>
              ))}
              {/* Si hay un Empleado seleccionado, mostramos InfoWindow */}
              {positionViewEmployee && (
                <InfoWindow
                  className="border-top border-primary"
                  headerContent={
                    // Encabezado del InfoWindow
                    <div className="tw-text-[#E32B2B] tw-text-lg tw-flex tw-items-center tw-flex-row tw-space-x-2 tw-px-5 lg:tw-px-10">
                      <PiPersonArmsSpreadFill size={26} />
                      <h6 className="tw-m-0">Empleado: </h6>
                      <span className="tw-text-[#396593] tw-text-base tw-font-bold">
                        {dataEmployeeInfo?.firstName}{" "}
                        {dataEmployeeInfo?.lastName}
                      </span>
                    </div>
                  }
                  position={positionViewEmployee}
                  onCloseClick={() => {
                    setPositionViewEmployee(null);
                    setDataEmployeeInfo(null);
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
                          backgroundColor: dataEmployeeInfo.ImageProfile
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
                        {dataEmployeeInfo.ImageProfile && (
                          <img
                            style={{
                              width: "101%",
                              height: "101%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                            className="tw-rounded-full tw-object-cover"
                            src={dataEmployeeInfo?.ImageProfile || ""}
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
                            {dataEmployeeInfo?.firstName}
                          </span>
                        </div>
                        <span className="tw-text-sm">Nombre</span>
                      </div>

                      {/* Apellido */}
                      <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                          <PersonOutlineOutlinedIcon />
                          <span className="tw-text-lg tw-font-normal">
                            {dataEmployeeInfo?.lastName}
                          </span>
                        </div>
                        <span className="tw-text-sm">Apellido</span>
                      </div>

                      {/* Tipo de documento */}
                      <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                          <FaRegAddressCard size={19} />
                          <span className="tw-text-lg tw-font-normal">
                            {dataEmployeeInfo?.documentType}
                          </span>
                        </div>
                        <span className="tw-text-sm">Tipo de Documento</span>
                      </div>

                      {/* Documento */}
                      <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                          <FaRegAddressCard size={19} />
                          <span className="tw-text-lg tw-font-normal">
                            {dataEmployeeInfo?.documentNumber}
                          </span>
                        </div>
                        <span className="tw-text-sm">Documento</span>
                      </div>

                      {/* Fecha de nacimiento */}
                      <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                          <LiaBirthdayCakeSolid size={22} />
                          <span className="tw-text-lg tw-font-normal">
                            {dataEmployeeInfo?.dateOfBirth}
                          </span>
                        </div>
                        <span className="tw-text-sm">Fecha de Nacimiento</span>
                      </div>

                      {/* Cargo */}
                      <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4">
                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                          <MdOutlineBusinessCenter size={20} />
                          <span className="tw-text-lg tw-font-normal">
                            {dataEmployeeInfo?.position}
                          </span>
                        </div>
                        <span className="tw-text-sm">Cargo</span>
                      </div>

                      {/* Emails */}
                      {dataEmployeeInfo?.emails?.map(
                        (email: string, index: number) => (
                          <div
                            key={index}
                            className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4"
                          >
                            <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                              <AiOutlineMail size={22} />
                              <span className="tw-text-lg tw-font-normal">
                                {email}
                              </span>
                            </div>
                            <span className="tw-text-sm">
                              Correo {index + 1}
                            </span>
                          </div>
                        )
                      )}

                      {/* Teléfonos */}
                      {dataEmployeeInfo?.phones.map(
                        (phone: any, index: number) => (
                          <div
                            key={index}
                            className="tw-flex tw-w-full tw-flex-col tw-space-y-1 tw-pb-4"
                          >
                            <div className="tw-flex tw-flex-row tw-space-x-2 tw-text-[#396593] border-bottom border-primary tw-items-center">
                              <MdOutlinePhone size={18} />
                              <span className="tw-text-lg tw-font-normal">
                                {phone.text}
                              </span>
                            </div>
                            <span className="tw-text-sm">Teléfono</span>
                          </div>
                        )
                      )}
                    </div>
                    {/* Datos laborales */}
                    <div className="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                      <div className="tw-flex tw-w-full tw-flex-row tw-justify-center tw-items-center tw-pb-4">
                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1 ">
                          <h5 className="tw-m-0">Área de trabajo:</h5>
                          <span className="tw-text-base tw-bg-[#396593] tw-rounded-md tw-px-3 tw-w-3/4 tw-text-white tw-py-1">
                            {dataEmployeeInfo?.selectedArea}
                          </span>
                        </div>
                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1">
                          <h5 className="tw-m-0">Sede:</h5>
                          <span className="tw-text-base tw-bg-[#396593] tw-rounded-md tw-px-3 tw-w-3/4 tw-text-white tw-py-1">
                            {dataEmployeeInfo?.selectedHeadquarter}
                          </span>
                        </div>
                      </div>

                      <div className="tw-flex tw-w-full tw-flex-row tw-justify-center tw-items-center tw-pb-4">
                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-1">
                          <h5 className="tw-m-0">Nombre de Ruta:</h5>
                          <span className="tw-text-base text-black">
                            {dataEmployeeInfo?.routes[day]
                              ? dataEmployeeInfo?.routes[day]
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </>
          )}

          {(mapToShow === "routes" || mapToShow === "all") && (
            <>
              <div>
                {routeCoordinates?.map((route: any, index: number) => {
                  return (
                    <DirectionsMaps
                      key={index}
                      waypointsCoords={route?.geolocations?.map((geo: any) => geo.coords)}
                    />
                  );
                })}
              </div>
              {positionViewRoute && (
                // Mostrar información de la ruta
                <InfoWindow
                  position={positionViewRoute}
                  onCloseClick={() => {
                    setPositionViewRoute(null);
                    setDataRoutesInfo(null);
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
                      {dataRoutesInfo?.routeName}
                    </span>
                    <h5 className="tw-m-0 tw-text-[#396593]">
                      Zona a la que corresponde:
                    </h5>
                    <span className="tw-text-base tw-pb-2">
                      {dataRoutesInfo?.zoneName}
                    </span>
                    <h5 className="tw-m-0 tw-text-[#396593]">Jefe de ruta:</h5>
                    <span className="tw-text-base tw-pb-2">
                      {dataRoutesInfo?.routeManager}
                    </span>
                    {dataRoutesInfo?.geolocations?.map(
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
                      )
                    )}
                  </div>
                </InfoWindow>
              )}
            </>
          )}

          {(mapToShow === "areas" || mapToShow === "all") && (
            <>
              {/* Resaltar un área con polígono */}
              {zoneCoordinates?.map((zone: any, index: number) => (
                <Polygon
                  paths={zone?.slice(2)}
                  key={index}
                  fillColor="#FB9232"
                  fillOpacity={0.5}
                  strokeColor="#FB9232"
                  strokeOpacity={1}
                  strokeWeight={2}
                />
              ))}
            </>
          )}
        </Map>
      </APIProvider>
    )
  );
};
export default GoogleMapComponent2;
