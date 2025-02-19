import useAuth from "@/firebase/auth";
import {
    getDocsByCompanyIdInRealTime,
    getLocationsByCompanyIdInRealTime,
} from "@/firebase/Documents";
import {
    getDocsByCompanyIdQuery,
    getEmployeesByCompanyIdQuery,
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
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { db } from "shared/firebase/firebase";

export const GoogleMapsHook = () => {
    const { companyData } = useAuth();
    const [center, setCenter] = useState<Coords>(
        companyData && (companyData.geolocation as Coords),
    );

    const [zoneCoordinatesData, setZoneCoordinatesData] = useState<Coords[][]>([]);
    const [zoneCoordinatesFiltered, setZoneCoordinatesFiltered] = useState<Coords[][]>();

    const [officeLocationsData, setOfficeLocationsData] = useState<any>();
    const [officeLocationsFiltered, setOfficeLocationsFiltered] = useState<any>();

    const [employeeLocationsData, setEmployeeLocationsData] = useState<any>();
    const [employeeLocationsFiltered, setEmployeeLocationsFiltered] = useState<any>();

    const [routeCoordinatesData, setRouteCoordinatesData] = useState<RoutesCoords[]>([]);
    const [routeCoordinatesFiltered, setRouteCoordinatesFiltered] = useState<RoutesCoords[]>([]);

    const [fixedPointsData, setFixedPointsData] = useState<FixedPointsCoords[]>([]);
    const [fixedPointsFiltered, setFixedPointsFiltered] = useState<FixedPointsCoords[]>([]);

    const [selectedBySearch, setSelectedBySearch] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [fixedPointsFilteredByCat, setFixedPointsFilteredByCat] = useState<FixedPointsCoords[]>([]);
    const [fixedPointsFilteredByCatAux, setFixedPointsFilteredByCatAux] = useState<FixedPointsCoords[]>([]);


    // Define las opciones para el mapa
    const mapContainerStyle = {
        width: "100%",
        height: "550px",
        borderRadius: "0.5rem",
        overflow: "hidden",
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

    const getZones = useCallback(async () => {
        if (companyData) {
            const unsubscribe = getDocsByCompanyIdInRealTime(
                companyData.uid,
                "zones",
                (zonesFound: any) => {
                    const zonesLocations: Coords[][] = zonesFound.map(
                        (zone: any) => {
                            const { geolocations, uid, zoneName } = zone;
                            const zoneLocations = geolocations.map(
                                (point: any) => {
                                    return point.coords;
                                },
                            );
                            return [uid, zoneName, ...zoneLocations];
                        },
                    );

                    const sortedZones = zonesLocations.sort((a: any, b: any) => a[1].localeCompare(b[1]))
                    zonesFound &&
                        (setZoneCoordinatesData(sortedZones),
                            setZoneCoordinatesFiltered(sortedZones)
                        );
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

                    const sortedCampus = campusLocations.sort((a: any, b: any) => a?.name.localeCompare(b?.name))
                    campusFound && (
                        setOfficeLocationsFiltered(sortedCampus),
                        setOfficeLocationsData(sortedCampus));
                },
            );

            return () => unsubscribe();
        }
    }, [companyData]);

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
                (employee) => {
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
                        isActive,
                        isGPSActive,
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
                        isActive,
                        isGPSActive,
                    };
                },
            );

            const unsubscribe = getLocationsByCompanyIdInRealTime(
                companyData.uid,
                "locations",
                (locationsFound: any) => {
                    const dataUpdated =
                        employeesLocations.length > 0
                            ? employeesLocations.map((employee: any) => {
                                const geolocations = getMostRecentItem(
                                    locationsFound.filter(
                                        (geolocation: any) =>
                                            geolocation.employeeId ===
                                            employee.uid,
                                    ),
                                );
                                const dataWithGeolocation = {
                                    ...employee,
                                    geolocation: geolocations
                                        ? {
                                            lat: Number(
                                                geolocations?.latitude,
                                            ),
                                            lng: Number(
                                                geolocations?.longitude,
                                            ),
                                        }
                                        : null,
                                };
                                return dataWithGeolocation;
                            })
                            : [];

                    const sortedEmployees = dataUpdated.sort((a: any, b: any) => a?.firstName.localeCompare(b?.firstName));
                    setEmployeeLocationsFiltered(sortedEmployees);
                    setEmployeeLocationsData(sortedEmployees);
                },
            );

            return () => unsubscribe();
        } catch (error) {
            setEmployeeLocationsData([]);
            setEmployeeLocationsFiltered([]);
        }
    }, [companyData]);

    const getRoutes = useCallback(async () => {
        if (!companyData) return

        return getDocsByCompanyIdInRealTime(companyData.uid, "routes", (routesFound: any) => {
            if (!routesFound) return;

            const routesLocations: RoutesCoords[] = routesFound.map(({ uid, geolocations, zoneName, routeName, routeManager }: any) => ({
                uid,
                geolocations,
                zoneName,
                routeName,
                routeManager,
            }));

            const sortedRoutes = routesLocations.sort((a, b) => a.routeName.localeCompare(b.routeName));
            setRouteCoordinatesFiltered(sortedRoutes);
            setRouteCoordinatesData(sortedRoutes);
        });
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
                            const { directions, color, name, uid } = doc.data();
                            return { ...directions[0], color, name, uid };
                        });


                    const sortedFixedPoints = fixedPointsCoordsFound.sort((a: any, b: any) => a?.name.localeCompare(b?.name))
                    setFixedPointsData(sortedFixedPoints);


                    const uniqueFixedPoints = Object.values(
                        fixedPointsCoordsFound.reduce((acc, current) => {
                            acc[current.name] = current; // Sobrescribe el valor anterior si el nombre ya existe
                            return acc;
                        }, {} as Record<string, FixedPointsCoords>)
                    );
                    setFixedPointsFilteredByCatAux(uniqueFixedPoints);
                    setFixedPointsFiltered(uniqueFixedPoints);
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

    useEffect(() => {
        if (companyData) {
            setCenter(companyData?.geolocation);
        }
    }, [companyData]);

    const restoreOriginalData = () => {
        setZoneCoordinatesFiltered(zoneCoordinatesData);
        setOfficeLocationsFiltered(officeLocationsData);
        setEmployeeLocationsFiltered(employeeLocationsData);
        setRouteCoordinatesFiltered(routeCoordinatesData);
        setFixedPointsFiltered(fixedPointsData);
    };

    const resetFilters = () => {
        setZoneCoordinatesFiltered([]);
        setOfficeLocationsFiltered([]);
        setEmployeeLocationsFiltered([]);
        setRouteCoordinatesFiltered([]);
        setFixedPointsFiltered([]);
    };

    /////////////////////////////////////////////////////////////////////////////
    const filterSelect = (typeFilter: string, uidSelect: string) => {

        if (uidSelect === "" && (typeFilter !== "Puntos Fijos/Categoría" && typeFilter !== "Categorías")) {
            restoreOriginalData();
            return
        }

        if (typeFilter != "Categorías" && (typeFilter !== "Puntos Fijos/Categoría" && typeFilter !== "Categorías")) {
            resetFilters();
        }

        switch (typeFilter.trim()) {
            case "Zona":
                setZoneCoordinatesFiltered(zoneCoordinatesData.filter((item: any) => item[0] === uidSelect));
                break;
            case "Sede":
                setOfficeLocationsFiltered(officeLocationsData?.filter((item: any) => item.uid === uidSelect));
                break;
            case "Empleado":
                setEmployeeLocationsFiltered(employeeLocationsData?.filter((item: any) => item?.uid === uidSelect));
                break;
            case "Ruta":
                setRouteCoordinatesFiltered(routeCoordinatesData?.filter((item: any) => item?.uid === uidSelect));
                break;
            case "Puntos Fijos":
                setFixedPointsFiltered(fixedPointsData?.filter((item: FixedPointsCoords) => item.uid === uidSelect));
                break;
            case "Puntos Fijos/Categoría":
                if (uidSelect === "") {
                    setFixedPointsFiltered(fixedPointsData?.filter((item: FixedPointsCoords) => item.name === selectedCategory));
                } else {
                    setFixedPointsFiltered(fixedPointsData?.filter((item: FixedPointsCoords) => item.uid === uidSelect));
                }
                break;
            case "Categorías":
                if (uidSelect === "") {
                    setSelectedCategory("");
                    setFixedPointsFilteredByCat([]);
                    setFixedPointsFiltered(fixedPointsData);
                } else {
                    const dataCategory: any = fixedPointsData?.filter((item: FixedPointsCoords) => item.uid === uidSelect);
                    const nameCategory = dataCategory[0]?.name;
                    setSelectedCategory(nameCategory);
                    const aux = fixedPointsData?.filter((item: FixedPointsCoords) => item.name === nameCategory);
                    setFixedPointsFilteredByCat(aux);
                    setFixedPointsFiltered(aux);
                }
                break;
            default:
                restoreOriginalData();
                break;
        }
    }

    // Filtrar empleados por nombre, apellido o cédula
    const filterEmployeesBySearch = (searchValue: string, employees: any[]) => {
        return employees.filter((item: any) => {
            const fullName = `${item?.firstName || ""} ${item?.lastName || ""}`.toLowerCase();
            return (
                fullName.includes(searchValue.toLowerCase()) || // Nombre completo
                item?.documentNumber?.toString().includes(searchValue.toLowerCase()) // Documento
            );
        });
    };

    const handleInputChange = useCallback((text: string) => {
        setSelectedBySearch(text);
        if (text === "") {
            setZoneCoordinatesFiltered(zoneCoordinatesData);
            setOfficeLocationsFiltered(officeLocationsData);
            setEmployeeLocationsFiltered(employeeLocationsData);
            setRouteCoordinatesFiltered(routeCoordinatesData);
            setFixedPointsFiltered(fixedPointsData);
        } else {
            setZoneCoordinatesFiltered([]);
            setOfficeLocationsFiltered([]);
            setRouteCoordinatesFiltered([]);
            setFixedPointsFiltered([]);
            setEmployeeLocationsFiltered(filterEmployeesBySearch(text, employeeLocationsData));
        }
    }, [zoneCoordinatesData, officeLocationsData, employeeLocationsData, routeCoordinatesData, fixedPointsData]);

    return {
        mapContainerStyle,
        center,

        zoneCoordinatesData,
        officeLocationsData,
        employeeLocationsData,
        routeCoordinatesData,
        fixedPointsData,
        zoneCoordinatesFiltered,
        officeLocationsFiltered,
        employeeLocationsFiltered,
        routeCoordinatesFiltered,
        fixedPointsFiltered,

        selectedBySearch,
        handleInputChange,

        filterSelect,
        selectedCategory,
        setSelectedCategory,
        fixedPointsFilteredByCat,
        fixedPointsFilteredByCatAux
    };
};
