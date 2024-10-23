"use client";
import {
    dataFunctionaryObject,
    dataPatientObject,
    dataProfessionalObject
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
            if (reference === "functionary") {
                const currentDataObject = { ...dataFunctionaryObject };

                currentDataObject.uid = documentRef.id;
                currentDataObject.idType = val[1];
                currentDataObject.id = val[2];
                currentDataObject.name = val[3];
                currentDataObject.lastName = val[4];
                currentDataObject.phone = val[5];
                currentDataObject.email = val[6];
                currentDataObject.password = val[7];
                currentDataObject.confirmPassword = val[8];
                // currentDataObject.rol = val[0];
                currentDataObject.area = val[9];
                // currentDataObject.isActive = val[11];
                // currentDataObject.urlPhoto = urlName;

                newData = { ...currentDataObject };
            }

            if (reference === "patients") {
                const currentDataObject = { ...dataPatientObject };

                currentDataObject.uid = documentRef.id;
                currentDataObject.idType = val[0];
                currentDataObject.id = val[1];
                currentDataObject.name = val[2];
                currentDataObject.lastName = val[3];
                currentDataObject.birthDate = val[4];
                currentDataObject.age = val[5];
                currentDataObject.phone = val[6];
                currentDataObject.phone2 = val[7];
                currentDataObject.address = val[8];
                currentDataObject.country = val[9];
                currentDataObject.state = val[10];
                currentDataObject.city = val[11];
                currentDataObject.email = val[12];
                currentDataObject.password = val[13];
                currentDataObject.confirmPassword = val[14];
                currentDataObject.isActive = val[15] === "true" ? true : false;
                currentDataObject.rol = val[16];

                newData = { ...currentDataObject };
            }

            if (reference === "professionals") {
                const currentDataObject = { ...dataProfessionalObject };

                currentDataObject.uid = documentRef.id;
                currentDataObject.idType = val[0];
                currentDataObject.id = val[1];
                currentDataObject.name = val[2];
                currentDataObject.lastName = val[3];
                currentDataObject.phone = val[4];
                currentDataObject.phone2 = val[5];
                currentDataObject.address = val[6];
                currentDataObject.country = val[7];
                currentDataObject.state = val[8];
                currentDataObject.city = val[9];
                currentDataObject.email = val[10];
                currentDataObject.password = val[11];
                currentDataObject.confirmPassword = val[12];
                // currentDataObject.cardNumber = val[13];
                // currentDataObject.medicalRecord = val[14];
                currentDataObject.specialty = val[15];
                currentDataObject.contract = val[16];
                currentDataObject.isActive = val[17] === "true" ? true : false;
                currentDataObject.rol = val[18];

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
