export interface DataMainFormObject {
    uid: string;
    icon: string;
    idType: string;
    idTypeAdmin: string;
    id: string;
    idAdmin: string;
    name: string;
    businessName: string;
    tradename: string;
    description: string;
    personType: string;
    discount: string;
    rut: string;
    code: string;
    lastName: string;
    birthDate: string;
    age: string;
    indicativeOne: string;
    indicativeTwo: string;
    phone: string;
    phoneAdmin: string;
    phone2: string;
    ext: string;
    webSite: string;
    sector: string;
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
    availableCampus: string[];
    area: string;
    availableAreas: string[];
    urlPhoto: string;
    timestamp: Date;
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
    campus: string;
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

export type DataAgreementsObject = {
    uid: string;
    name: string;
    personType: string;
    discount: string;
    isActive: boolean;
    isDeleted: boolean;
};

export type DataAreasObject = {
    uid: string;
    name: string;
    description: string;
    availableCampus: string[];
    isActive: boolean;
    isDeleted: boolean;
};

export type DataCompanyObject = {
    uid: string;
    idType: string;
    idTypeAdmin: string;
    id: string;
    idAdmin: string;
    icon: string;
    name: string;
    lastName: string;
    businessName: string;
    tradename: string;
    indicativeOne: string;
    indicativeTwo: string;
    phone: string;
    phoneAdmin: string;
    phone2: string;
    ext: string;
    webSite: string;
    sector: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    country: string;
    state: any;
    city: string;
    urlPhoto: string;
    timestamp: Date;
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
