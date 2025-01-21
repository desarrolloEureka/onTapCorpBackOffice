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
        monday: { openTime: "N/A", closeTime: "N/A" },
        tuesday: { openTime: "N/A", closeTime: "N/A" },
        wednesday: { openTime: "N/A", closeTime: "N/A" },
        thursday: { openTime: "N/A", closeTime: "N/A" },
        friday: { openTime: "N/A", closeTime: "N/A" },
        saturday: { openTime: "N/A", closeTime: "N/A" },
        sunday: { openTime: "N/A", closeTime: "N/A" },
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
hoursArray.unshift({ value: "N/A", label: "N/A" });
