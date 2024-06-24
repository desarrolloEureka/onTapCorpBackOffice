import { getAllAgreementsFb } from "@/firebase/agreements";
import { AgreementBd, AgreementSelector } from "@/types/agreements";

export const getAllAgreementsQuery = async () => {
    const dataResult: AgreementSelector[] = [];
    const querySnapshot = await getAllAgreementsFb();
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as AgreementBd;
            const dataSelector = {
                value: data.name,
                label: data.name,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};
