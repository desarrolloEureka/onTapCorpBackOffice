import { CampusDataPhone } from "./campus";

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

export interface RoutesCoords {
    geolocations: Coords[];
    zoneName: string;
    routeName: string;
    routeManager: string;
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
    employeeLocations?: Coords[];
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
