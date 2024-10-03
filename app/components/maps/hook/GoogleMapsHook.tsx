import useAuth from "@/firebase/auth";
import {
    getDocsByCompanyIdQuery,
    getHeadquartersByCompanyIdQuery,
    getLocationsByCompanyIdQuery,
    getRoutesByCompanyIdQuery,
    getWorkAreasByCompanyIdQuery,
    getZonesByCompanyIdQuery,
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
        if (companyData) {
            const employees = await getDocsByCompanyIdQuery(
                companyData.uid,
                "employees",
            );

            const workAreas = await getWorkAreasByCompanyIdQuery(
                companyData.uid,
            );

            const routes = await getDocsByCompanyIdQuery(
                companyData.uid,
                "routes",
            );
            const campus = await getDocsByCompanyIdQuery(
                companyData.uid,
                "campus",
            );

            const geolocationsFound = await getLocationsByCompanyIdQuery(
                companyData.uid,
            );

            const employeesLocations: FormValuesData[] = employees.map(
                (employee: any) => {
                    const {
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
                        // additional,
                        mondayRoute,
                        tuesdayRoute,
                        wednesdayRoute,
                        thursdayRoute,
                        fridayRoute,
                        saturdayRoute,
                        sundayRoute,
                    } = employee;

                    const routesSchedule: { [key: string]: string } = {
                        mondayRoute,
                        tuesdayRoute,
                        wednesdayRoute,
                        thursdayRoute,
                        fridayRoute,
                        saturdayRoute,
                        sundayRoute,
                    };

                    const arrayRoutes = Object.entries(routesSchedule);

                    const routesNames = arrayRoutes.map(([key, value]) => {
                        const routeFound = routes?.find(
                            (route: any) => route.uid === value,
                        );
                        return [key, routeFound?.routeName];
                    });

                    const geolocations = getMostRecentItem(
                        geolocationsFound.filter(
                            (geolocation: any) =>
                                geolocation.employeeId === employee.uid,
                        ),
                    );
                    const campusFound = campus?.find(
                        (campus: any) => campus.uid === selectedHeadquarter,
                    );

                    const areaFound = workAreas?.find(
                        (area: any) => area.uid === selectedArea,
                    );

                    return {
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

                        geolocation: {
                            lat: Number(geolocations?.latitude),
                            lng: Number(geolocations?.longitude),
                        },
                    };
                },
            );

            employees && setEmployeeLocations(employeesLocations);
        }
    }, [companyData]);

    const getRoutes = useCallback(async () => {
        if (companyData) {
            const routesFound = await getRoutesByCompanyIdQuery(
                companyData.uid,
            );

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
        }
    }, [companyData]);

    const getCampus = useCallback(async () => {
        if (companyData) {
            const campusFound = await getHeadquartersByCompanyIdQuery(
                companyData.uid,
            );

            const campusLocations: CampusCoords[] = campusFound.map(
                (campus: any) => {
                    const { uid, geolocation, name, address, url, phones } =
                        campus;
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
        }
    }, [companyData]);

    const getZones = useCallback(async () => {
        if (companyData) {
            const zonesFound = await getZonesByCompanyIdQuery(companyData.uid);

            const zonesLocations: Coords[][] = zonesFound.map((zone: any) => {
                const { geolocations } = zone;
                const zoneLocations = geolocations.map((point: any) => {
                    return point.coords;
                });
                return zoneLocations;
            });

            zonesFound &&
                (setZoneCoordinates(zonesLocations), setDataZones(zonesFound));
        }
    }, [companyData]);

    useEffect(() => {
        getRoutes();
        getZones();
        getCampus();
        getEmployees();
    }, [getCampus, getRoutes, getZones, getEmployees]);

    useEffect(() => {
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
