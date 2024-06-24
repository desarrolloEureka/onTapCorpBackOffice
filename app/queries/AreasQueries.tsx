import { getAllAreasFb } from "@/firebase/areas";
import { AreasBd, AreasSelector } from "@/types/areas";

export const getAllAreasQuery = async () => {
    const dataResult: AreasSelector[] = [];
    const querySnapshot = await getAllAreasFb();
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as AreasBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
                campus: data.availableCampus,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};
