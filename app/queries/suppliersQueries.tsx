import { getAllSuppliersFb } from '@/firebase/suppliers';
import { SuppliersBd, SuppliersSelector } from '@/types/suppliers';

export const getAllSupplierQuery = async () => {
  const dataResult: SuppliersSelector[] = [];
  const querySnapshot = await getAllSuppliersFb();
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const data = doc.data() as SuppliersBd;
      const result = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const dataSelector = {
        value: data.name,
        label: result,
        id: doc.id,
      };
      dataResult.push(dataSelector);
    });
  }
  return dataResult;
};
