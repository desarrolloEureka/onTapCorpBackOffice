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
    length: number;
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
    uid: string;
    distance: number;
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
    mapToShow?:
    | "all"
    | "campus"
    | "fixedPoints"
    | "employees"
    | "routes"
    | "areas";
    zoneCoordinates?: Coords[][];
    officeLocations?: CampusCoords[];
    employeeLocations?: FormValuesData[];
    routeCoordinates?: RoutesCoords[];
    fixedPoints?: FixedPointsCoords[];
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