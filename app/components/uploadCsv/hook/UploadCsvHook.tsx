"use client";
import {
    dataEmployees
} from "@/data/mainFormData";
import {
    getDocumentReference,
    saveEmployeeQuery
} from "@/queries/documentsQueries";
import { DataObject, ErrorData } from "@/types/documents";
import { ModalParamsCsv } from "@/types/modals";
import { useEffect, useState } from "react";
import { useCSVReader } from "react-papaparse";
import Swal from "sweetalert2";

import { DEFAULT_REMOVE_HOVER_COLOR } from "../styles/stylesUploadCsv";
import useAuth from "@/firebase/auth";

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
    const { accessTokenUser, userData } = useAuth();
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

    const handleUploadAccepted = async (results: { data: any }) => {
        try {
        for (const val of results.data) {

            if (reference === "employees") {
                const currentDataObject = { ...dataEmployees };
                const documentRefUser: any = getDocumentReference("users");
                currentDataObject.uid =  documentRefUser.id,
                currentDataObject.idCompany =  userData?.companyId,
                currentDataObject.rolId =  "uysG1ULyEDklfbGDFate";
                currentDataObject.views =  0;
                currentDataObject.switch_activateCard = true;
                currentDataObject.templateData =  [
                    {
                      id: "VGMUWYOP3RK374gi30I8",
                      checked: true,
                    },
                  ],
                currentDataObject.firstName = Array.isArray(val[1]) ? val[1] : val[1];
                currentDataObject.lastName = Array.isArray(val[3]) ? val[3] : val[3];
                currentDataObject.documentType = Array.isArray(val[5]) ? val[5] : val[5];
                currentDataObject.documentNumber = Array.isArray(val[7]) ? val[7] : val[7];
                currentDataObject.phone = val[11]; 
                currentDataObject.email = val[12];
                currentDataObject.ImageProfile = "";
                currentDataObject.fridayRoute = "";
                currentDataObject.isActive = true;
                currentDataObject.isGPSActive = false;
                currentDataObject.mondayRoute = "";
                currentDataObject.routeApplicable = "";
                currentDataObject.saturdayRoute = "";
                currentDataObject.selectedArea = "";
                currentDataObject.selectedHeadquarter = "";
                currentDataObject.sundayRoute = "";
                currentDataObject.switch_activateCard = true;
                currentDataObject.thursdayRoute = "";
                currentDataObject.tuesdayRoute = "";
                currentDataObject.wednesdayRoute = "";
                currentDataObject.dateOfBirth = ["", false];
                currentDataObject.position = ["", false];
                currentDataObject.phones = [];
                currentDataObject.emails = [];
                currentDataObject.additional = [];
                currentDataObject.selectedHeadquarter = "";
                currentDataObject.selectedArea = "";
                currentDataObject.isActive = false;
                currentDataObject.isGPSActive = false; 
                //currentDataObject.ImageProfile = "";
                await saveEmployeeQuery(
                    currentDataObject,
                );
            }
        }

        confirmAlert(title);

        setZoneHover(false);
    } catch (error) {
        console.error("error",error)
    }
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
