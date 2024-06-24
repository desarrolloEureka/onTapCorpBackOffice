import { getAllCustomersFb } from '@/firebase/customers';
import { CustomersBd, CustomersSelector } from '@/types/customers';

export const getAllCustomersQuery = async () => {
  const dataResult: CustomersSelector[] = [];
  const querySnapshot = await getAllCustomersFb();
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const data = doc.data() as CustomersBd;
      const result = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const dataSelector = {
        value: data.name,
        label: result,
      };
      dataResult.push(dataSelector);
    });
  }
  return dataResult;
};
