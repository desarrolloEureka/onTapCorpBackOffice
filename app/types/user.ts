import { Coords, RoutesCoords, ScheduleRoutes } from "./googleMaps";

export type LoginParams = {
    email: string;
    password: string;
};
export interface DemoChangerElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

export type DataPhone = {
    text: string;
    checked: false;
    indicative: string;
    ext: string;
};

export type DataAdditional = {
    autodato: string;
    dato: string;
    checked: boolean;
};

export type FormValues = {
    phones?: DataPhone[];
    emails?: DataPhone[];
    dataAdditional?: DataAdditional[];
};

/* 
export type DataPhone = {
    text: '',
    checked: false,
};

export type DataEmail = {
    text: '',
    checked: false,
};

export type DataAdditional = {
    autodato: string;
    dato: string;
    checked: boolean;
};

export type FormValues = {
    firstName: string;
    lastName: string;
    documentNumber: string;
    dateOfBirth: string;
    position: string;
    phones?: DataPhone[];
    emails?: DataEmail[];
    additional?: DataAdditional[];
}; */

export type DataEmail = {
    text: string;
    checked: false;
};

export type FormValuesData = {
    uid: string;
    firstName: [string, boolean];
    lastName: [string, boolean];
    documentType: [string, boolean];
    documentNumber: [string, boolean];
    dateOfBirth: [string, boolean];
    position: [string, boolean];
    phones?: DataPhone[];
    emails?: DataEmail[];
    additional?: DataAdditional[];
    geolocation?: Coords;
    selectedHeadquarter?: string;
    selectedArea?: string;
    ImageProfile?: string;
    routes?: ScheduleRoutes;
};
