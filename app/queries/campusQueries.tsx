import { getAllCampusFb } from "@/firebase/campus";
import { CampusBd, CampusSelector } from "@/types/campus";

export const getAllCampusQuery = async () => {
    const dataResult: CampusSelector[] = [];
    const querySnapshot = await getAllCampusFb();
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as CampusBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
                areas: data.availableAreas

            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};
