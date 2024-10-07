import useAuth from "@/firebase/auth";
import { getDocsByCompanyIdInRealTime } from "@/firebase/Documents";
import {
    getDocsByCompanyIdQuery,
    getEmployeesByCompanyIdQuery,
    getWorkAreasByCompanyIdQuery
} from "@/queries/documentsQueries";
import {
    CampusCoords,
    Coords,
    FixedPointsCoords,
    RoutesCoords,
} from "@/types/googleMaps";
import { FormValuesData } from "@/types/user";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { db } from "shared/firebase/firebase";

export const GoogleMapsHook = () => {
    const { companyData } = useAuth();
    const [center, setCenter] = useState<Coords>(
        companyData && (companyData.geolocation as Coords),
    );

    const [fixedPoints, setFixedPoints] = useState<FixedPointsCoords[]>([]);

    const [zoom, setZoom] = useState<number>(11);

    const [selectedMarker, setSelectedMarker] =
        useState<google.maps.LatLngLiteral | null>(null);

    const [selectedPosition, setSelectedPosition] =
        useState<google.maps.LatLngLiteral | null>(null);

    const [selectedCampus, setSelectedCampus] =
        useState<google.maps.LatLngLiteral | null>(null);

    const [selectedEmployee, setSelectedEmployee] =
        useState<google.maps.LatLngLiteral | null>(null);

    const [routeCoordinates, setRouteCoordinates] = useState<RoutesCoords[]>();

    const [officeLocations, setOfficeLocations] = useState<any>();

    const [zoneCoordinates, setZoneCoordinates] = useState<Coords[][]>();

    const [dataFixedPoints, setDataFixedPoints] = useState<any>();

    const [employeeLocations, setEmployeeLocations] = useState<any>();

    const [dataEmployeeLocations, setDataEmployeeLocations] = useState<any>();

    const [dataRoutes, setDataRoutes] = useState<any>();

    const [dataCampus, setDataCampus] = useState<any>();

    const [dataEmployee, setDataEmployee] = useState<any>();

    const [dataZones, setDataZones] = useState<any>();

    const [day, setDay] = useState("mondayRoute");

    // Define las opciones para el mapa
    const mapContainerStyle = {
        width: "100%",
        height: "550px",
        borderRadius: "0.5rem",
        overflow: "hidden",
    };

    // Define las opciones de mapa
    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const handleChangeDay = (e: any) => {
        setDay(e.target.value);
    };

    // Función para encontrar la fecha más reciente
    const getMostRecentItem = (
        data: { [key: string]: any }[],
    ): { [key: string]: any } | null => {
        if (data.length === 0) return null; // Si no hay datos, retornar null

        const mostRecent = data.reduce((latest, current) => {
            const currentTimestamp = moment(current.timestamp);
            const latestTimestamp = moment(latest.timestamp);

            // Si la fecha de 'current' es más reciente que 'latest', actualizar 'latest'
            return currentTimestamp.isAfter(latestTimestamp) ? current : latest;
        });

        return mostRecent;
    };

    const getEmployees = useCallback(async () => {
        if (!companyData) return;

        try {
            // Ejecutar todas las queries en paralelo para mejorar rendimiento
            const [employees, workAreas, routes, campus] = await Promise.all([
                getEmployeesByCompanyIdQuery(companyData.uid),
                getWorkAreasByCompanyIdQuery(companyData.uid),
                getDocsByCompanyIdQuery(companyData.uid, "routes"),
                getDocsByCompanyIdQuery(companyData.uid, "campus"),
                // getDocsByCompanyIdQuery(companyData.uid, "locations"),
            ]);

            const employeesLocations: FormValuesData[] = employees.map(
                (employee: any) => {
                    const {
                        uid,
                        firstName,
                        lastName,
                        documentType,
                        documentNumber,
                        dateOfBirth,
                        position,
                        phones,
                        emails,
                        ImageProfile,
                        selectedHeadquarter,
                        selectedArea,
                        mondayRoute,
                        tuesdayRoute,
                        wednesdayRoute,
                        thursdayRoute,
                        fridayRoute,
                        saturdayRoute,
                        sundayRoute,
                    } = employee;

                    // Calcular rutas y obtener nombres de las rutas
                    const routesSchedule: { [key: string]: string } = {
                        mondayRoute,
                        tuesdayRoute,
                        wednesdayRoute,
                        thursdayRoute,
                        fridayRoute,
                        saturdayRoute,
                        sundayRoute,
                    };

                    const routesNames = Object.entries(routesSchedule).map(
                        ([key, value]) => {
                            const routeFound = routes?.find(
                                (route: any) => route.uid === value,
                            );
                            return [key, routeFound?.routeName || ""] as [
                                string,
                                string,
                            ];
                        },
                    );

                    const campusFound = campus?.find(
                        (campus: any) => campus.uid === selectedHeadquarter,
                    );

                    const areaFound = workAreas?.find(
                        (area: any) => area.uid === selectedArea,
                    );

                    return {
                        uid,
                        selectedHeadquarter: campusFound?.name[0],
                        selectedArea: areaFound?.areaName,
                        routes: Object.fromEntries(routesNames),
                        ImageProfile,
                        firstName: firstName[0],
                        lastName: lastName[0],
                        documentType: documentType[0],
                        documentNumber: documentNumber[0],
                        dateOfBirth: dateOfBirth[0],
                        position: position[0],
                        phones: phones?.map((phone: any) => ({
                            text: phone.text,
                            indicative: phone.indicative,
                            ext: phone.ext,
                        })),
                        emails: emails?.map((email: any) => email.text),
                    };
                },
            );

            const unsubscribe = getDocsByCompanyIdInRealTime(
                companyData.uid,
                "locations",
                (locationsFound: any) => {
                    const dataUpdated = employeesLocations.map(
                        (employee: any) => {
                            const geolocations = getMostRecentItem(
                                locationsFound.filter(
                                    (geolocation: any) =>
                                        geolocation.employeeId === employee.uid,
                                ),
                            );
                            const dataWithGeolocation = {
                                ...employee,
                                geolocation: {
                                    lat: Number(geolocations?.latitude),
                                    lng: Number(geolocations?.longitude),
                                },
                            };
                            return dataWithGeolocation;
                        },
                    );
                    setEmployeeLocations(dataUpdated);
                },
            );

            return () => unsubscribe();
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    }, [companyData]);

    const getRoutes = useCallback(async () => {
        if (companyData) {
            const unsubscribe = getDocsByCompanyIdInRealTime(
                companyData.uid,
                "routes",
                (routesFound: any) => {
                    const routesLocations: RoutesCoords[] = routesFound.map(
                        (route: any) => {
                            const {
                                uid,
                                geolocations,
                                zoneName,
                                routeName,
                                routeManager,
                            } = route;
                            return {
                                uid,
                                geolocations,
                                zoneName,
                                routeName,
                                routeManager,
                            };
                        },
                    );
                    routesFound && setRouteCoordinates(routesLocations);
                },
            );

            return () => unsubscribe();
        }
    }, [companyData]);

    const getCampus = useCallback(async () => {
        if (companyData) {
            const unsubscribe = getDocsByCompanyIdInRealTime(
                companyData.uid,
                "campus",
                (campusFound: any) => {
                    const campusLocations: CampusCoords[] = campusFound.map(
                        (campus: any) => {
                            const {
                                uid,
                                geolocation,
                                name,
                                address,
                                url,
                                phones,
                            } = campus;
                            return {
                                uid,
                                geolocation,
                                name: name[0],
                                address: address[0],
                                url: url[0],
                                phones,
                            };
                        },
                    );
                    campusFound && setOfficeLocations(campusLocations);
                },
            );

            return () => unsubscribe();
        }
    }, [companyData]);

    const getZones = useCallback(async () => {
        if (companyData) {
            const unsubscribe = getDocsByCompanyIdInRealTime(
                companyData.uid,
                "zones",
                (zonesFound: any) => {
                    const zonesLocations: Coords[][] = zonesFound.map(
                        (zone: any) => {
                            const { geolocations } = zone;
                            const zoneLocations = geolocations.map(
                                (point: any) => {
                                    return point.coords;
                                },
                            );
                            return zoneLocations;
                        },
                    );
                    zonesFound &&
                        (setZoneCoordinates(zonesLocations),
                        setDataZones(zonesFound));
                },
            );

            return () => unsubscribe();
        }
    }, [companyData]);

    const getFixedPoints = useCallback(() => {
        if (companyData) {
            const q = query(
                collection(db, "fixedPoints"),
                where("idCompany", "==", companyData.uid),
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const fixedPointsCoordsFound: FixedPointsCoords[] =
                        querySnapshot.docs.map((doc) => {
                            const { directions, color, name } = doc.data();
                            return { ...directions[0], color, name };
                        });
                    setFixedPoints(fixedPointsCoordsFound);
                }
            });
            return () => unsubscribe();
        }
    }, [companyData]);

    useEffect(() => {
        getRoutes();
        getZones();
        getCampus();
        getEmployees();
        getFixedPoints();
        return () => {
            getRoutes();
            getZones();
            getCampus();
            getEmployees();
            getFixedPoints();
        };
    }, [getCampus, getEmployees, getFixedPoints, getRoutes, getZones]);

    // useEffect(() => {

    // }, [companyData]);

    useEffect(() => {
        if (companyData) {
            setCenter(companyData.geolocation);
        }
    }, [companyData]);

    return {
        mapContainerStyle,
        center,
        options,
        zoom,
        fixedPoints,
        officeLocations,
        employeeLocations,
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
        dataEmployeeLocations,
        setDataEmployeeLocations,
        selectedEmployee,
        setSelectedEmployee,
        dataEmployee,
        setDataEmployee,
        handleChangeDay,
        day,
    };
};
