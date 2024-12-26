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

    const [day, setDay] = useState("");

      const [selectedEmpleado, setSelectedEmpleado] = useState<string>("");
      const [selectedEmpleadoByserch, setSelectedEmpleadoByserch] = useState<string>("");
      const [selectedSede, setSelectedSede] = useState<string>("");
      const [selectedZona, setSelectedZona] = useState<string>("");
      const [selectedRuta, setSelectedRuta] = useState<string>("");
      const [selectedPuntoFijo, setSelectedPuntoFijo] = useState<string>("");

      const [EmpleadoData, setEmpleadoData] = useState<any>();
      const [SedeData, setSedeData] = useState<any>();
      const [ZonaData, setZonaData] = useState<any>();
      const [RutaData, setRutaData] = useState<any>();
      const [PuntoFijoData, setPuntoFijoData] = useState<any>();

      const [zoneCoordinatesData, setZoneCoordinatesData] = useState<Coords[][]>();
      const [officeLocationsData, setOfficeLocationsData] = useState<any>();
      const [routeCoordinatesData, setRouteCoordinatesData] = useState<RoutesCoords[]>();
      const [fixedPointsData, setFixedPointsData] = useState<FixedPointsCoords[]>([]);
      const [employeeLocationsData, setEmployeeLocationsData] = useState<any>();

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
                            setEmployeeLocations(dataUpdated)
                            setEmployeeLocationsData(dataUpdated);
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
                    
                    routesFound && (setRouteCoordinates(routesLocations),
                        setRouteCoordinatesData(routesLocations));
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
                    
                    campusFound && (setOfficeLocations(campusLocations),
                        setOfficeLocationsData(campusLocations));
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
                            const { geolocations, uid } = zone;
                            const zoneLocations = geolocations.map(
                                (point: any) => {
                                    return point.coords;
                                },
                            );
                            return [uid, ...zoneLocations];
                        },
                    );
                    zonesFound &&
                        (setZoneCoordinatesData(zonesLocations),
                        setZoneCoordinates(zonesLocations),
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
                            const { directions, color, name, uid } = doc.data();
                            return { ...directions[0], color, name, uid };
                        });
                        setFixedPoints(fixedPointsCoordsFound)
                        setFixedPointsData(fixedPointsCoordsFound);
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
            setCenter(companyData.geolocation);
        }
    }, [companyData]);

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

      useEffect(() => {
        const fetchData = async () => {      
        if(companyData?.uid){
        const fetchDataEmployees = await getEmployeesByCompanyIdQuery(companyData?.uid);
        const fetchDataSedes = await getDocsByCompanyIdQuery(companyData.uid, "campus")
        const fetchDataRutas = await getDocsByCompanyIdQuery(companyData.uid, "routes")
        const fetchDataZonas = await getZonesByCompanyIdQuery(companyData.uid);
        const fetchDataPuntosFijos = await getDocsByCompanyIdQuery(companyData.uid, "fixedPoints")
        setEmpleadoData(fetchDataEmployees.sort((a: any, b: any) => a?.firstName[0].localeCompare(b?.firstName[0])))
        setRutaData(fetchDataRutas.sort((a: any, b: any) => a?.routeName.localeCompare(b?.routeName)))
        setPuntoFijoData(fetchDataPuntosFijos.sort((a: any, b: any) => a?.name.localeCompare(b?.name)))
        setSedeData(fetchDataSedes.sort((a: any, b: any) => a?.name[0].localeCompare(b?.name[0])))
        setZonaData(fetchDataZonas.sort((a: any, b: any) => a?.zoneName.localeCompare(b?.zoneName)))
        }
        }
        fetchData()
        }, [companyData?.uid]);
            useEffect(() => {
            renderZones()
            }, [selectedZona]);

            useEffect(() => {
                renderRoutes()
            }, [selectedRuta]);

            useEffect(() => {
                renderFixedPoints()
            }, [selectedPuntoFijo]);

            useEffect(() => {
                renderCampuses()
            }, [selectedSede]);

            useEffect(() => {
                const filteredEmployees = filterEmployeesBySearch(employeeLocationsData, selectedEmpleadoByserch);
                const filteredSelect = renderEmployees(filteredEmployees);
                setEmployeeLocations(filteredSelect);
            }, [selectedEmpleado, employeeLocationsData, selectedEmpleadoByserch]);
            

        // Filtrar empleados por nombre, apellido o cédula
        const filterEmployeesBySearch = (data: any[], searchValue: string) => {
            if (!searchValue) {
                return data; 
            }

            return data.filter((item: any) => {
                const searchLower = searchValue.toLowerCase();

                const fullName = `${item.firstName || ""} ${item.lastName || ""}`.toLowerCase();

                return (
                    fullName.includes(searchLower) || // Nombre completo
                    item.documentNumber?.toString().toLowerCase().includes(searchLower) // Documento
                );
            });
        };

    const renderZones = ( ) => {
        
        console.log("coordinatesZones", selectedZona)
        if (selectedZona === "") {
            setZoneCoordinates(zoneCoordinatesData)

          } else {
            const filteredZones = zoneCoordinatesData && zoneCoordinatesData.filter((item: any) => {
                return item[0] === selectedZona;
            });
              setZoneCoordinates(filteredZones)
          }
    };
    
    
    const renderRoutes = () => {
        if (selectedRuta === "") {
            setRouteCoordinates(routeCoordinatesData);
            return;
        }
    
        const filteredRoutes = routeCoordinatesData?.filter((item: any) => {
            return Object.values(item).includes(selectedRuta);
        });
    
        setRouteCoordinates(filteredRoutes);
    };
    
    const renderCampuses = () => {
        if (selectedSede === "") {
            setOfficeLocations(officeLocationsData);
            return;
        }
    
        const filteredCampuses = officeLocationsData?.filter((item: any) => {
            return item.uid === selectedSede;
        });
        setOfficeLocations(filteredCampuses);
    };
    
    const renderEmployees = (data:any[]) => {
        if (selectedEmpleado === "") {
            return data;
        }
    
        const filteredEmployees = data?.filter((item: any) => {
            return item.uid === selectedEmpleado;
        });
    
        return filteredEmployees;
    };
    
    const renderFixedPoints = () => {
        if (selectedPuntoFijo === "") {
            setFixedPoints(fixedPointsData);
            return;
        }
    
        const filteredFixedPoints = fixedPointsData?.filter((item: FixedPointsCoords) => {
            return item.uid === selectedPuntoFijo;
        });
        
        setFixedPoints(filteredFixedPoints);
    }

    const renderSearchEmployees = () => {
        if (!employeeLocationsData || !selectedEmpleadoByserch) {
            // Si no hay búsqueda, restaura todos los datos originales
            setEmployeeLocations(employeeLocationsData);
            setZoneCoordinates(zoneCoordinatesData);
            setRouteCoordinates(routeCoordinatesData);
            setOfficeLocations(officeLocationsData);
            setFixedPoints(fixedPointsData);
            return;
        }
    
        // Filtrar empleados por nombre, apellido, cédula
        const filteredEmployees = filterEmployeesBySearch(employeeLocationsData, selectedEmpleadoByserch);
        setEmployeeLocations(filteredEmployees);
    
        const filteredEmployeeUIDs = filteredEmployees.map((employee) => employee.uid);
    
        const filteredZones = zoneCoordinatesData?.filter((zone: any) => filteredEmployeeUIDs.includes(zone[0]));
        setZoneCoordinates(filteredZones);
    
        const filteredRoutes = routeCoordinatesData?.filter((route: any) => filteredEmployeeUIDs.includes(route.uid));
        setRouteCoordinates(filteredRoutes);
    
        const filteredCampuses = officeLocationsData?.filter((campus: any) => filteredEmployeeUIDs.includes(campus.uid));
        setOfficeLocations(filteredCampuses);
    
        const filteredFixedPoints = fixedPointsData?.filter((point: any) => filteredEmployeeUIDs.includes(point.uid));
        setFixedPoints(filteredFixedPoints);
    };
    
    

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
        setSelectedPuntoFijo,
        setSelectedRuta,
        setSelectedZona,
        setSelectedSede,
        setSelectedEmpleado,
        setSelectedEmpleadoByserch,
        EmpleadoData,
        SedeData,
        ZonaData,
        RutaData,
        PuntoFijoData,
        selectedEmpleado,
        renderSearchEmployees,
        selectedEmpleadoByserch
    };
};
