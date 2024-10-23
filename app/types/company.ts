export type MyStateType = {
    [key: string]: any[]; // Claves tipo string y valores tipo any[]
};

export interface InitialErrorsDataCompany {
    tradename: string;
    businessName: string;
    id: string;
    sector: string;
    webSite: string;
    phone: string;
    indicative: string;
    ext: string;
    address: string;
    urlLink: string;
    urlName: string;
    additionalData: string;
    additionalDataName: string;
    [key: string]: string;
}
