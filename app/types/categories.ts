export interface AddressValues {
    pointName: string;
    address: string;
}

export interface CategoriesValues {
    uid: string;
    idCompany: string;
    name: string;
    color: string;
    directions: AddressValues[];
    timestamp: string;
    isDeleted: boolean;
}
