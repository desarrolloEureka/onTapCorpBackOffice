import { CampusFormValues, CampusFormValuesData } from "@/types/campus";

export const initialPhones: CampusFormValues = {
    phones: [{ text: "", indicative: "57", checked: false, ext: "" }],
};

export const initialData: CampusFormValuesData = {
    uid: "",
    name: ["", false],
    address: ["", false],
    url: ["", false],
    phones: [{ text: "", indicative: "57", checked: false, ext: "" }],
    schedule: {
        monday: { openTime: "00:00", closeTime: "00:00" },
        tuesday: { openTime: "00:00", closeTime: "00:00" },
        wednesday: { openTime: "00:00", closeTime: "00:00" },
        thursday: { openTime: "00:00", closeTime: "00:00" },
        friday: { openTime: "00:00", closeTime: "00:00" },
        saturday: { openTime: "00:00", closeTime: "00:00" },
        sunday: { openTime: "00:00", closeTime: "00:00" },
    },
    timestamp: "",
    isActive: true,
    isDeleted: false,
};

export const daysInSpanish: { [key: string]: string } = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
};

export const hoursArray = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    return { value: hour, label: hour };
});
