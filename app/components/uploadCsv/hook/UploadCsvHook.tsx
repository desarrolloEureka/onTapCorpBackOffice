"use client";
import {
    dataEmployees
} from "@/data/mainFormData";
import {
    getDocumentReference,
    saveDataDocumentsQuery
} from "@/queries/documentsQueries";
import { DataObject, ErrorData } from "@/types/documents";
import { ModalParamsCsv } from "@/types/modals";
import { useEffect, useState } from "react";
import { useCSVReader } from "react-papaparse";
import Swal from "sweetalert2";
import { DEFAULT_REMOVE_HOVER_COLOR } from "../styles/stylesUploadCsv";

const confirmAlert = (title: string) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `Se guardó correctamente en la tabla de ${title}`,
        showConfirmButton: false,
        timer: 2000,
    });
};

const UploadDocumentHook = ({
    handleShowCsv,
    setHandleShowCsv,
    reference,
    title,
}: ModalParamsCsv) => {
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [errorDataUpload, setErrorDataUpload] = useState<ErrorData[]>();
    const [show, setShow] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR,
    );

    const documentRef: any = getDocumentReference(reference);

    const handleClose = () => {
        setShow(false);
        setHandleShowCsv(false);
    };

    const handleUploadAccepted = (results: { data: any }) => {
        const data: DataObject[] = [];
        let newData = {};

        results.data.forEach((val: string, key: number) => {
            if (reference === "employees") {
                const currentDataObject = { ...dataEmployees };
                currentDataObject.firstName = Array.isArray(val[1]) ? val[1][0] : val[1];
                currentDataObject.lastName = Array.isArray(val[2]) ? val[2][0] : val[2];
                currentDataObject.documentNumber = Array.isArray(val[3]) ? val[3][0] : val[3];
                currentDataObject.phone = val[4]; 
                //currentDataObject.ImageProfile = "";
                newData = { ...currentDataObject };

            }
        });

        saveDataDocumentsQuery({
            documentRef,
            data: newData,
        }).then(() => confirmAlert(title));

        setZoneHover(false);
    };

    useEffect(() => {
        handleShowCsv && setShow(true);
    }, [handleShowCsv]);

    return {
        CSVReader,
        zoneHover,
        removeHoverColor,
        setRemoveHoverColor,
        setZoneHover,
        handleUploadAccepted,
        errorDataUpload,
        show,
        handleClose,
    };
};

export default UploadDocumentHook;
