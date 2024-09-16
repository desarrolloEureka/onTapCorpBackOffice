import { colombianCitiesData } from "@/data/colombianCitiesData";

export const roles = [
    { value: "Super Administrador", label: "Super Administrador" },
    { value: "Administrador", label: "Administrador" },
    { value: "Funcionario", label: "Funcionario" },
    { value: "Profesional", label: "Profesional" },
    { value: "Paciente", label: "Paciente" },
];

export const idTypes = [
    { value: "CC", label: "CC" },
    { value: "NIT", label: "NIT" },
    { value: "RC", label: "RC" },
    { value: "TI", label: "TI" },
    { value: "CN", label: "CN" },
    { value: "CD", label: "CD" },
    { value: "CE", label: "CE" },
    { value: "PA", label: "PA" },
    { value: "SC", label: "SC" },
    { value: "PE", label: "PE" },
    { value: "AS", label: "AS" },
    { value: "MS", label: "MS" },
];

export const idTypesTable = [
    { id: 1, label: "CC" },
    { id: 2, label: "NIT" },
    { id: 3, label: "RC" },
    { id: 4, label: "TI" },
    { id: 5, label: "CN" },
    { id: 6, label: "CD" },
    { id: 7, label: "CE" },
    { id: 8, label: "PA" },
    { id: 9, label: "SC" },
    { id: 10, label: "PE" },
    { id: 11, label: "AS" },
    { id: 12, label: "MS" },
];

export const countries = [{ value: "CO", label: "Colombia" }];

export const countriesTable = [{ id: 1, label: "Colombia" }];

export const personTypes = [
    { value: "Jurídico", label: "Jurídico" },
    { value: "Natural", label: "Natural" },
];

export const ColombianStates = colombianCitiesData.map((state) => ({
    value: state.id + 1,
    label: state.departamento,
}));

export const getCities = (id: number) =>
    colombianCitiesData[id - 1].ciudades.map((city) => ({
        value: city,
        label: city,
    }));

export const specialties = [{ value: "Example", label: "Example" }];

export const contracts = [{ value: "Example", label: "Example" }];

export const isActiveData = [
    {
        value: true,
        label: "Activo",
        statusInfo: "success",
        color: "#198754",
    },
    {
        value: false,
        label: "Inactivo",
        statusInfo: "danger",
        color: "#dc3545",
    },
];

export const areas = [
    { value: "Administrativo", label: "Administrativo" },
    { value: "Despachos", label: "Despachos" },
    { value: "Diagnósticos", label: "Diagnósticos" },
    { value: "Escáner Modelos", label: "Escáner Modelos" },
    { value: "Modelos", label: "Modelos" },
    { value: "Radiología", label: "Radiología" },
    { value: "Recepción/Caja", label: "Recepción/Caja" },
];
