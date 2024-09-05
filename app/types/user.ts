export type LoginParams = {
    email: string;
    password: string;
};
export interface DemoChangerElement extends HTMLElement {
    style: CSSStyleDeclaration;
}

export type DataPhone = {
    text: '',
    checked: false,
};

export type DataAdditional = {
    autodato: string;
    dato: string;
    checked: boolean;
};

export type FormValues = {
    phones?: DataPhone[];
    emails?: DataPhone[];
    dataAdditional?: DataAdditional[]
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
    text: '',
    checked: false,
};

export type FormValuesData = {
    firstName: string;
    lastName: string;
    documentNumber: string;
    dateOfBirth: string;
    position: string;
    phones?: DataPhone[];
    emails?: DataEmail[];
    additional?: DataAdditional[];
    ImageProfile: string | null;  // Tipo añadido a FormValuesData
    mondayRoute: string;          // Campo añadido
    tuesdayRoute: string;         // Campo añadido
    wednesdayRoute: string;       // Campo añadido
    thursdayRoute: string;        // Campo añadido
    fridayRoute: string;          // Campo añadido
    saturdayRoute: string;        // Campo añadido
    sundayRoute: string;          // Campo añadido
    routeApplicable: boolean;      // Campo añadido
    selectedArea: string;         // Campo añadido
    selectedHeadquarter: string;  // Campo añadido
    employeeCardStatus: boolean;  // Campo añadido
};