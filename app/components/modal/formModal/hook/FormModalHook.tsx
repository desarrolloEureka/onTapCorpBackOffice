"use client";
import { dataObject } from "@/data/documentsData";
import { FormPdfMultipleData } from "@/data/formPdfMultiple";
import {
    saveDocumentsQuery,
    saveFilesDocumentsQuery,
} from "@/queries/documentsQueries";
import { getAllSupplierQuery } from "@/queries/suppliersQueries";
import { DataObject, ErrorData } from "@/types/documents";
import { ModalParamsPdf } from "@/types/modals";
import { SuppliersSelector } from "@/types/suppliers";
import moment from "moment";
import { SetStateAction, useCallback, useEffect, useState } from "react";

const FormModalHook = ({
    handleShowPdf,
    setHandleShowPdf,
    reference,
}: ModalParamsPdf) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(FormPdfMultipleData);
    const [files, setFiles] = useState<SetStateAction<any>[]>([]);
    const [errorDataUpload, setErrorDataUpload] = useState<ErrorData[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [suppliers, setSuppliers] = useState<SuppliersSelector[]>();
    // const currentDate = moment().format('DD-MM-YYYY');
    const currentDate = moment().valueOf();

    const handleClose = () => {
        setShow(false);
        setHandleShowPdf(false);
    };

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const dateChangeHandler = (e: any) => {
        const dateFormat = moment(e.target.value).format("YYYY-MM-DD");
        setData({ ...data, [e.target.name]: dateFormat });
    };

    const selectChangeHandler = (e: any) => {
        setData({ ...data, ["supplier_code"]: e?.id, ["supplier"]: e?.value });
    };

    const handleMultipleChange = (event: { target: any }) => {
        event.target.files && setFiles([...event.target.files]);
    };

    const uploadHandle = async () => {
        const dataUpload: DataObject[] = [];
        const error: ErrorData[] = [];
        for (const record of files) {
            const code = record.name.split(".")[0];

            await saveFilesDocumentsQuery({ code, record, data })
                .then((result) => {
                    const dateEnd = moment(data.date_end).valueOf();
                    const currentDataObject = { ...dataObject };
                    currentDataObject.supplier_code = data.supplier_code;
                    currentDataObject.code = code;
                    currentDataObject.date_start = currentDate;
                    currentDataObject.date_end = dateEnd;
                    currentDataObject.supplier = data.supplier;
                    currentDataObject.buy_value = data.buy_value;
                    currentDataObject.title = data.title;
                    currentDataObject.description = data.description;
                    error.push(...result);
                    dataUpload.push(currentDataObject);
                })
                .catch((err) => {
                    error.push({ success: false, code });
                });
        }
        const res = await saveDocumentsQuery({ data: dataUpload, reference });
        return [...res, ...error];
    };

    const handleSendForm = async () => {
        if (
            data.supplier &&
            data.supplier_code &&
            data.buy_value &&
            currentDate &&
            data.date_end &&
            data.title &&
            data.description &&
            files.length > 0
        ) {
            setIsLoading(true);
            const dataUpload = await uploadHandle();
            setErrorDataUpload(dataUpload);
            setIsLoading(false);
            const errorFound = dataUpload.find((value) => !value.success);
            !errorFound && handleClose();
        } else {
            setErrorForm(true);
        }
    };

    const getAllSuppliers = useCallback(async () => {
        if (handleShowPdf) {
            const suppliersResult = await getAllSupplierQuery();
            suppliersResult && setSuppliers(suppliersResult);
        }
    }, [handleShowPdf]);

    useEffect(() => {
        getAllSuppliers();
    }, [getAllSuppliers]);

    useEffect(() => {
        handleShowPdf && setShow(true);
    }, [handleShowPdf]);


    return {
        currentDate,
        show,
        handleSendForm,
        handleMultipleChange,
        changeHandler,
        selectChangeHandler,
        handleClose,
        dateChangeHandler,
        isLoading,
        errorDataUpload,
        errorForm,
        setErrorForm,
        suppliers,
    };
};

export default FormModalHook;
