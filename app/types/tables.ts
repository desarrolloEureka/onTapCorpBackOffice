import { DataObject } from "./documents";
import { DataMainFormObject } from "./mainForm";

export interface UploadDataModalProps {
  onUploadDataModalPdf?: () => void;
  onUploadDataModalCsv?: () => void;
  onShowQr?: () => void;
  onMainFormModal?: () => void;
  onMainFormModalEdit: (e: any) => void;
  handleSearchAndFilter: (e: any) => void;
  data: any;
  tableData?: setDataTable;
  columns: any;
  noHeader?: boolean;
  tableTitle: string;
  reference: string;
  searchTerm: string;
  startDate: string;
  setStartDate: (value: any) => void;
  endDate: string;
  setEndDate: (value: any) => void;
  clearSearch: () => void;
  isEmptyDataRef: boolean;
}
export interface UploadDataButtonModalProps {
  onUploadDataModalPdf?: () => void;
  onUploadDataModalCsv?: () => void;
  onMainFormModal?: () => void;
}
export interface TableDataItemOld {
  id: string;
  SNO: number;
  NAME: string;
  LASTNAME: string;
  POSITION: string;
  DATE: string;
  SALARY: string;
  EMAIL: string;
}
export interface TableDataItem {
  supplier_code: string;
  code: string;
  supplier: string;
  buy_value: string;
  date_start: number;
  date_end: number;
  date_sold: number;
  date_redeemed: number;
  is_active: boolean;
  redeem: boolean;
  sold: boolean;
  sold_value: string;
  title: string;
  description: string;
  customer: string;
  url: string;
}

export interface TableDataObject {
  uid: string;
  icon: string;
  idType: string;
  id: string;
  name: string;
  description: string;
  personType: string;
  discount: string;
  rut: string;
  lastName: string;
  birthDate: string;
  age: string;
  phone: any;
  phone2: any;
  address: string;
  country: string;
  state: any;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
  // cardNumber: string;
  // medicalRecord: string;
  specialty: string;
  contract: string;
  rol: string;
  area: string;
  urlPhoto: string;
  timestamp: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface DataTableComponentProps {
  componentTitle?: string;
  componentDescription?: string;
  tableTitle: string;
  reference: string;
}

export interface CSVRow {
  [key: string]: string;
}

export interface ExportProps {
  onExport: (value: string) => void;
}

export interface NoDataCardProps {
  emptyRef: boolean;
  reference: string;
}

export interface setDataTable {
  columns: any | undefined;
  data: DataMainFormObject[] | undefined;
  // data: DataObject[];
}

export interface ColumnsTable {
  name: string;
  selector: (row: TableDataItem) => [any];
  sortable: boolean;
}
