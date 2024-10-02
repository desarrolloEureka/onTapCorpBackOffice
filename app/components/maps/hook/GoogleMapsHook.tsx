import {
    employeeLocations,
    // fixedPoints,
    officeLocations,
    // routeCoordinates,
    // zoneCoordinates,
} from "@/data/googleMapsData";
import useAuth from "@/firebase/auth";
import {
    getHeadquartersByCompanyIdQuery,
    getRoutesByCompanyIdQuery,
    getZonesByCompanyIdQuery,
} from "@/queries/documentsQueries";
import {
    CampusCoords,
    Coords,
    FixedPointsCoords,
    RoutesCoords,
} from "@/types/googleMaps";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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

    const [routeCoordinates, setRouteCoordinates] = useState<RoutesCoords[]>();

    const [officeLocations, setOfficeLocations] = useState<any>();

    const [zoneCoordinates, setZoneCoordinates] = useState<Coords[][]>();

    const [dataFixedPoints, setDataFixedPoints] = useState<any>();

    const [dataRoutes, setDataRoutes] = useState<any>();

    const [dataCampus, setDataCampus] = useState<any>();

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

    const getRoutes = useCallback(async () => {
        if (companyData) {
            const routesFound = await getRoutesByCompanyIdQuery(
                companyData.uid,
            );

            const routesLocations: RoutesCoords[] = routesFound.map(
                (route: any) => {
                    const { geolocations, zoneName, routeName, routeManager } =
                        route;
                    return {
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
                    const { geolocation, name, address, url, phones } = campus;
                    return {
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

            zonesFound && setZoneCoordinates(zonesLocations);
        }
    }, [companyData]);

    useEffect(() => {
        getRoutes();
        getZones();
        getCampus();
    }, [getCampus, getRoutes, getZones]);

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
        employeeLocations,
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
    };
};
