export interface AddressValues {
    pointName: string;
    address: string;
    lat: any;
    lng: any;
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
