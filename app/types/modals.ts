export interface ModalParamsCsv {
    handleShowCsv: boolean;
    setHandleShowCsv: (e: boolean) => void;
    reference: string;
    title: string;
}

export interface ModalParamsMainForm {
    handleShowMainForm: boolean;
    handleShowMainFormEdit: boolean;
    setHandleShowMainForm: (e: boolean) => void;
    setHandleShowMainFormEdit: (e: boolean) => void;
    reference: string;
    title: string;
    editData: any;
    data?: any;
    handleDeleteItem?: any
    isSuperAdmin?: boolean
}

export interface ModalIcons {
    show: boolean,
    handleClose: any,
    title?: string;
    dataLogos: any
    handleDataNetworks: (text: any, index: any) => void;
    itemKey: any;
    val: any;
    modeTheme: string
}

export interface ModalParamsPdf {
    handleShowPdf: boolean;
    setHandleShowPdf: (e: boolean) => void;
    reference: string;
    title: string;
}

export interface ModalParams {
    handleShow: boolean;
    setHandleShow: (e: boolean) => void;
    reference: string;
    title: string;
}
