import { CategoriesValues } from "@/types/categories";

export const initialDataCategories: CategoriesValues = {
    uid: "",
    idCompany: "",
    name: "",
    color: "#3f51b5",
    directions: [{
        pointName: "", address: "",
        lat: null,
        lng: null
    }],
    timestamp: "",
    isDeleted: false,
};
