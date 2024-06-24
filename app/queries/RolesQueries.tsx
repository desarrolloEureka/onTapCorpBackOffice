import { getAllRolesFb } from "@/firebase/roles";
import { RolesSelector, RolesBd } from "@/types/roles";

export const getAllRolesQuery = async () => {
    const dataResult: RolesSelector[] = [];
    const querySnapshot = await getAllRolesFb();
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as RolesBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};
