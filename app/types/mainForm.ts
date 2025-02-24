import { Coords } from "./googleMaps";

export interface DataMainFormObject {
    uid: string;
    adminId: string;
    icon: string;
    idType: string;
    idTypeAdmin: string;
    id: string;
    companyId: string;
    idAdmin: string;
    name: string;
    businessName: string;
    tradename: string;
    cards: string;
    cardGPS: string;
    description: string;
    personType: string;
    discount: string;
    rut: string;
    code: string;
    lastName: string;
    birthDate: string;
    age: string;
    indicative: string;
    indicativeTwo: string;
    phone: string;
    phoneAdmin: string;
    phone2: string;
    ext: string;
    webSite: string;
    sector: string;
    geolocation: Coords;
    address: string;
    country: string;
    state: any;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
    // cardNumber: string;
    // medicalRecord: string;
    specialty: string;
    contract: string;
    rol: string;
    campus: string;
    area: string;
    availableAreas: string[];
    urlPhoto: string;
    timestamp: string;
    areaName: string;
    areaHead: string;
    urlName: [string, boolean, object];
    urlLink: string;
    iconName: string;
    isActive: boolean;
    isDeleted: boolean;
}

export type DataFunctionaryObject = {
    uid: string;
    idType: string;
    id: string;
    name: string;
    lastName: string;
    phone: any;
    email: string;
    phone2: any;
    address: string;
    country: string;
    state: any;
    city: string;
    password: string;
    confirmPassword: string;
    rol: string;
    area: string;
    urlPhoto: string;
    timestamp: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataPatientObject = {
    uid: string;
    idType: string;
    id: string;
    name: string;
    lastName: string;
    birthDate: string;
    age: string;
    phone: any;
    phone2: any;
    address: string;
    country: string;
    state: any;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
    rol: string;
    urlPhoto: string;
    timestamp: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataProfessionalObject = {
    uid: string;
    idType: string;
    id: string;
    name: string;
    lastName: string;
    phone: any;
    phone2: any;
    address: string;
    country: string;
    state: any;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
    // cardNumber: string;
    // medicalRecord: string;
    specialty: string;
    contract: string;
    rol: string;
    urlPhoto: string;
    timestamp: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataCampusObject = {
    uid: string;
    name: string;
    description: string;
    // phone: any;
    phone2: any;
    address: string;
    country: string;
    state: any;
    city: string;
    availableAreas: string[];
    timestamp: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataSpecialtyObject = {
    uid: string;
    icon: string;
    name: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataDiagnosesObject = {
    uid: string;
    name: string;
    code: string;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataWorkAreasObject = {
    uid: string;
    companyId: string;
    areaName: string;
    areaHead: string;
    icon: string;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataAgreementsObject = {
    uid: string;
    name: string;
    personType: string;
    discount: string;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataAdminCompanyObject = {
    uid: string;
    name: string;
    lastName: string;
    email: string;
    idTypeAdmin: string;
    idAdmin: string;
    indicativeTwo: string;
    phoneAdmin: string;
    urlPhoto: string;
    companyId: string;
    rolId: string;
};

export type DataCompanyObject = {
    uid: string;
    adminId: string;
    idType: string;
    id: string;
    icon: string;
    businessName: string;
    tradename: string;
    cards: string;
    cardGPS: string;
    indicative: string;
    phone: string;
    ext: string;
    webSite: string;
    sector: string;
    geolocation: Coords;
    address: string;
    country: string;
    state: any;
    city: string;
    timestamp: string;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataDiagnosticianObject = {
    uid: string;
    idType: string;
    id: string;
    name: string;
    phone: any;
    phone2: any;
    email: string;
    rut: string;
    address: string;
    country: string;
    state: any;
    city: string;
    timestamp: Date;
    isActive: boolean;
    isDeleted: boolean;
};

export interface showPasswordParams {
    show: boolean;
    setShow: (e: boolean) => void;
}

export type DataEmployees = {
    idCompany: string;
    uid: string;
    rolId: string;
    firstName: string[];
    lastName: string[];
    documentType: string[];
    documentNumber: string[];
    isActive: boolean;
    preview: string;
    templateData: [{id: string; checked: boolean;}];
    email: string;
    phone: string; 
    views: number,
    ImageProfile: string; 
    fridayRoute: string; 
    isGPSActive: boolean; 
    mondayRoute: string; 
    routeApplicable: boolean; 
    saturdayRoute: string; 
    selectedArea: string; 
    selectedHeadquarter: string; 
    sundayRoute: string; 
    switch_activateCard: boolean; 
    thursdayRoute: string; 
    tuesdayRoute: string; 
    wednesdayRoute: string; 
    dateOfBirth: [string, boolean]; 
    position: [string, boolean]; 
    phones: any; 
    emails:any; 
    additional: any;
    createdDate: any;
};

// Definición del tipo ErrorData
export type ErrorData = {
    success: boolean;
    code: string;
};