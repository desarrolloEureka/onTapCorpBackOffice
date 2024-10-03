
import { InfoWindowMapsProps } from "@/types/googleMaps";
import { InfoWindow } from "@react-google-maps/api";
import React from "react";
import { FaCircle, FaRoute } from "react-icons/fa6";
import { IoBusiness, IoPin } from "react-icons/io5";

const CustomInfoWindow = ({
    data,
    onClose,
    position,
    type,
}: InfoWindowMapsProps) => {
    return (
        <InfoWindow
            position={position}
            onCloseClick={onClose} // Cierra el InfoWindow
        >
            <>
                {(type === "fixedPoints" || type === "all") && (
                    <div className="tw-text-black tw-flex tw-flex-col tw-w-52">
                        <div className="tw-flex tw-flex-row tw-space-x-2">
                            <span style={{ color: data.color }}>
                                <IoPin size={28} />
                            </span>
                            <h4 className="tw-m-0">Nombre: </h4>
                        </div>
                        <span className="tw-text-lg tw-pb-2">{data.name}</span>
                        <h5 className="tw-m-0 tw-text-[#396593]">
                            Nombre Punto:
                        </h5>
                        <span className="tw-text-base tw-pb-2">
                            {data.pointName}
                        </span>
                        <h5 className="tw-m-0 tw-text-[#396593]">Dirección:</h5>
                        <span className="tw-text-base tw-pb-2">
                            {data.address}
                        </span>
                    </div>
                )}

                {(type === "routes" || type === "all") && (
                    <div className="tw-text-black tw-flex tw-flex-col tw-w-80">
                        <div className="tw-flex tw-flex-row tw-space-x-2 tw-items-center">
                            <span style={{ color: "#071FD1" }}>
                                <FaCircle size={18} />
                            </span>
                            <h4 className="tw-m-0">Nombre: </h4>
                        </div>
                        <span className="tw-text-lg tw-pb-2">
                            {data.routeName}
                        </span>
                        <h5 className="tw-m-0 tw-text-[#396593]">
                            Zona a la que corresponde:
                        </h5>
                        <span className="tw-text-base tw-pb-2">
                            {data.zoneName}
                        </span>
                        <h5 className="tw-m-0 tw-text-[#396593]">
                            Jefe de ruta:
                        </h5>
                        <span className="tw-text-base tw-pb-2">
                            {data.routeManager}
                        </span>
                        {data.geolocations?.map((point: any, index: number) => (
                            <div key={index}>
                                <div className="tw-flex tw-flex-row tw-space-x-2">
                                    <span>
                                        <FaRoute size={28} />
                                    </span>
                                    <h4 className="tw-m-0 tw-text-[#396593]">
                                        Dirección:{" "}
                                    </h4>
                                </div>
                                <span className="tw-text-lg tw-pb-2">
                                    {point.address}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {(type === "employees" || type === "all") && (
                    <div className="tw-text-black tw-flex tw-flex-col tw-w-auto">
                        <div className="tw-flex tw-flex-row tw-space-x-2">
                            <span style={{ color: "#E32B2B" }}>
                                <IoBusiness size={28} />
                            </span>
                            <h4 className="tw-m-0">Nombre: </h4>
                        </div>
                        <span className="tw-text-lg tw-pb-2">{data.name}</span>
                        <h5 className="tw-m-0 tw-text-[#396593]">
                            Dirección de la sede:
                        </h5>
                        <span className="tw-text-base tw-pb-2">
                            {data.address}
                        </span>
                    </div>
                )}
            </>
        </InfoWindow>
    );
};

export default CustomInfoWindow;
