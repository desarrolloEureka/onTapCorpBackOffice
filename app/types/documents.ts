export type DataObject = {
    supplier_code: string;
    code: string;
    date_start: number;
    date_end: number;
    supplier: string;
    is_active?: boolean;
    redeemed?: boolean;
    sold: boolean;
    customer: string;
    date_sold: number;
    date_redeemed: number;
    buy_value: string;
    sold_value: string;
    title: string;
    description: string;
    url: string;
};

export type ErrorData = { success: boolean; code: string };
export type ErrorDataForm = { success: boolean; urlName: string };
export interface DocumentsById {
    id: string;
    coupon: DataObject;
}
