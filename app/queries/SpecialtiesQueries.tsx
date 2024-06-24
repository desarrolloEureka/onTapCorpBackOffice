import { getAllSpecialtiesFb } from "@/firebase/specialties";
import { SpecialtyBd, SpecialtySelector } from "@/types/specialty";

export const getAllSpecialtiesQuery = async () => {
    const dataResult: SpecialtySelector[] = [];
    const querySnapshot = await getAllSpecialtiesFb();
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as SpecialtyBd;
            const dataSelector = {
                value: data.name,
                label: data.name,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};
