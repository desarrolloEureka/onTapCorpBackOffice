import { CampusDataPhone } from "./campus";
import { FormValuesData } from "./user";

export interface MapContainerProps {
    width: string;
    height: string;
    borderRadius: string;
    overflow: string;
}

export interface Coords {
    lat: number;
    lng: number;
}

// export type ScheduleRoutes = {
//     mondayRoute: string;
//     tuesdayRoute: string;
//     wednesdayRoute: string;
//     thursdayRoute: string;
//     fridayRoute: string;
//     saturdayRoute: string;
//     sundayRoute: string;
//     [key: string]: string;
// };

export type ScheduleRoutes = { [key: string]: string };

export interface RoutesCoords {
    uid: string;
    geolocations: Coords[];
    zoneName: string;
    routeName: string;
    routeManager: string;
    // routesSchedule?: ScheduleRoutes;
}

export interface CampusCoords {
    geolocation: Coords;
    name: string;
    address: string;
    url: string;
    phones: CampusDataPhone[];
}

export interface FixedPointsCoords {
    lat: number;
    lng: number;
    color: string;
    name: string;
    pointName: string;
    address: string;
}
export interface EmployeesCoords {
    lat: number;
    lng: number;
    color: string;
    name: string;
    pointName: string;
    address: string;
}

export interface GoogleMapComponentProps {
    mapContainerStyle: MapContainerProps;
    center: Coords | undefined;
    options?: { [key: string]: any };
    onMapLoad?: (map: any) => void;
    zoom?: number;
    fixedPoints?: FixedPointsCoords[];
    routeCoordinates?: RoutesCoords[];
    zoneCoordinates?: Coords[][];
    officeLocations?: CampusCoords[];
    employeeLocations?: FormValuesData[];
    polygonCoords?: number[][][];
    mapToShow?:
        | "all"
        | "campus"
        | "fixedPoints"
        | "employees"
        | "routes"
        | "areas";
    selectedMarker: google.maps.LatLngLiteral | null;
    setSelectedMarker: (e: any) => void;
    dataRoutes: any;
    setDataRoutes: (e: any) => void;
    dataFixedPoints: any;
    setDataFixedPoints: (e: any) => void;
    selectedPosition: google.maps.LatLngLiteral | null;
    setSelectedPosition: (e: any) => void;
    dataCampus: any;
    setDataCampus: (e: any) => void;
    selectedCampus: google.maps.LatLngLiteral | null;
    setSelectedCampus: (e: any) => void;
    dataEmployeeLocations: any;
    setDataEmployeeLocations: (e: any) => void;
    selectedEmployee: google.maps.LatLngLiteral | null;
    setSelectedEmployee: (e: any) => void;
    dataEmployee: any;
    setDataEmployee: (e: any) => void;
    handleChangeDay: (e: any) => void;
    day: string;
}

// Definir la estructura de las coordenadas
type Coordinates = [number, number];

// Definir la estructura del polígono
export type PolygonData = {
    polygon: Coordinates[];
};

export interface GooglePageProps {
    mapToShow?:
        | "all"
        | "campus"
        | "fixedPoints"
        | "employees"
        | "routes"
        | "areas";
}

export type InfoWindowMapsProps = {
    data: any;
    type: string;
    onClose: () => void;
    position: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
};
