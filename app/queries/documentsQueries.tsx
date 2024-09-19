import {
    deleteDocumentById,
    deleteSocialNetwork,
    getAllDocumentsFb,
    getAreasByCompanyId,
    getDocsByCompanyId,
    getDocumentsByIdFb,
    getHeadquartersByCompanyId,
    getMeetingStatusByCompanyId,
    getNotificationsByCompanyId,
    getReference,
    getRoutesByCompanyId,
    getWorkArasByCompanyId,
    getZoneById,
    getZonesByCompanyId,
    saveCampus,
    saveDocumentsFb,
    saveEmployee,
    saveMeeting,
    saveNotification,
    saveOneDocumentFb,
    saveRoute,
    saveSocialNetworkImage,
    saveZone,
    updateCampus,
    updateDocumentsByIdFb,
    updateEmployee,
    updateMeeting,
    updateRoute,
    updateSocialNetwork,
    updateZone,
} from "@/firebase/Documents";
import {
    uploadFile,
    uploadFiles,
    uploadIconFile,
    urlFile,
} from "@/firebase/files";
import { ErrorData } from "@/types/documents";
import {
    DownloadFileProps,
    saveFilesDocumentsProps,
    saveFilesDocumentsQueryProps,
} from "@/types/files";

export const saveDocumentsQuery = async ({
    data,
    reference,
}: {
    data: any[];
    reference: string;
}) => {
    let dataError: ErrorData[] = [];
    for (const record of data) {
        const queryResult = await saveDocumentsFb(record, reference);
        if (queryResult) {
            dataError.push({ success: true, code: record.code });
        } else {
            dataError.push({ success: false, code: record.code });
        }
    }
    // console.log("Data", data);
    // console.log("Reference", reference);
    return dataError;
};

export const saveFilesDocumentsQuery = async ({
    code,
    record,
    data,
}: saveFilesDocumentsQueryProps) => {
    let dataError: ErrorData[] = [];
    const queryResult = await uploadFiles({
        folder: data.supplier.toLowerCase(),
        fileName: code,
        file: record,
    });
    if (queryResult) {
        dataError.push({ success: true, code });
    } else {
        dataError.push({ success: false, code });
    }
    return dataError;
};

export const saveFilesDocuments = async ({
    urlName,
    record,
    uid,
    reference,
}: saveFilesDocumentsProps) => {
    // let dataError: ErrorDataForm[] = [];
    const queryResult = await uploadFile({
        folder: uid,
        fileName: urlName,
        file: record,
        reference,
    });
    return queryResult;
};

export const saveIconFile = async ({
    urlName,
    record,
    uid,
    reference,
}: saveFilesDocumentsProps) => {
    // let dataError: ErrorDataForm[] = [];
    const queryResult = await uploadIconFile({
        folder: uid,
        fileName: urlName,
        file: record,
        reference,
    });
    return queryResult;
};

export const getDocumentsByIdQuery = async (ref: string, uid: string) => {
    const querySnapshot = await getDocumentsByIdFb(ref, uid);
    if (querySnapshot.exists()) {
        return querySnapshot.data();
    }
    return;
};

export const getAllDocumentsQuery = async (ref: string) => {
    const documents: any[] = [];
    const querySnapshot = await getAllDocumentsFb(ref);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const dataResult = doc.data();
            documents.push(dataResult);
        });
    }
    return documents;
};

export const getDocsByCompanyIdQuery = async (
    idCompany: string,
    reference: string,
) => {
    const documents = await getDocsByCompanyId(idCompany, reference);
    return documents;
};

export const getZonesByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getZonesByCompanyId(idCompany);
    return documents;
};

export const getZonesByIdQuery = async (idCompany: string) => {
    const documents = await getZoneById(idCompany);
    return documents;
};

export const getNotificationsByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getNotificationsByCompanyId(idCompany);
    return documents;
};

export const getWorkArasByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getWorkArasByCompanyId(idCompany);
    return documents;
};

export const getMeetingStatusByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getMeetingStatusByCompanyId(idCompany);
    return documents;
};

export const getRoutesByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getRoutesByCompanyId(idCompany);
    return documents;
};

export const getAreasByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getAreasByCompanyId(idCompany);
    return documents;
};

export const getHeadquartersByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getHeadquartersByCompanyId(idCompany);
    return documents;
};

// export const getDocumentsByIdQuery = async (
//     id: string,
//     date: number,
//     saleLimit: number | undefined,
//     reference: string,
// ) => {
//     const dataResultArray: { id: string; coupon: DataObject }[] = [];
//     const querySnapshot = await getDocumentsByIdFb(
//         id,
//         date,
//         saleLimit,
//         reference,
//     );

//     if (querySnapshot) {
//         querySnapshot.forEach((doc: any) => {
//             const dataResult = doc.data() as DataObject;
//             dataResultArray.push({
//                 id: doc.id,
//                 coupon: dataResult,
//             } as DocumentsById);
//         });
//     }

//     return dataResultArray;
// };

export const getUrlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    let url = "";
    const querySnapshot = await urlFile({ folder, fileName, reference });
    if (querySnapshot) {
        url = querySnapshot;
    }
    // console.log(url);
    return url;
};

export const getDocumentReference = (ref: string) => {
    return getReference(ref);
};

export const saveDataDocumentsQuery = async ({
    documentRef,
    data,
}: {
    documentRef: any;
    data: any;
}) => {
    const queryResult = await saveOneDocumentFb(documentRef, data);
    return queryResult;
};

export const saveEditDataDocumentsQuery = async ({
    id,
    data,
    reference,
}: {
    id: string;
    data: any;
    reference: string;
}) => {
    const queryResult = await updateDocumentsByIdFb(id, data, reference);
    // console.log("Editado");
    return queryResult;
    // return;
};

export const saveNotificationQuery = async (dataSave: any) => {
    const result = await saveNotification(dataSave);
    return result;
};

export const saveZoneQuery = async (dataSave: any) => {
    const result = await saveZone(dataSave);
    return result;
};

export const updateZoneQuery = async (dataSave: any, docId: string) => {
    const result = await updateZone(docId, dataSave);
    return result;
};

export const saveMeetingQuery = async (dataSave: any, docRef: any) => {
    const result = await saveMeeting(dataSave, docRef);
    return result;
};

export const updateMeetingQuery = async (dataSave: any, docId: string) => {
    const result = await updateMeeting(docId, dataSave);
    return result;
};

export const saveCampusQuery = async (dataSave: any, docRef: any) => {
    const result = await saveCampus(dataSave, docRef);
    return result;
};

export const updateCampusQuery = async (dataSave: any) => {
    const result = await updateCampus(dataSave);
    return result;
};

export const saveEmployeeQuery = async (dataSave: any) => {
    const result = await saveEmployee(dataSave);
    return result;
};

export const editEmployeeQuery = async (dataSave: any, docId: string) => {
    const result = await updateEmployee(docId, dataSave);
    return result;
};

export const saveRouteQuery = async (dataSave: any) => {
    try {
        const result = await saveRoute(dataSave);
        return result;
    } catch (error) {
        console.error("Error in saveRouteQuery:", error);
        return { success: false, message: "Error in saveRouteQuery", error };
    }
};

export const updateRouteQuery = async (dataSave: any, docId: string) => {
    const result = await updateRoute(docId, dataSave);
    return result;
};

export const deleteDocumentByIdQuery = async (
    collectionName: string,
    documentId: string,
) => {
    const result = await deleteDocumentById(collectionName, documentId);
    return result;
};

export const SaveSocialNetwork = async (data: any, imageFile: File) => {
    const res = await saveSocialNetworkImage(data, imageFile);
    return res;
};

export const UpdateSocialNetwork = async (
    uid: any,
    oldImageName: string,
    newImageName: string,
    imageFile: any,
) => {
    const res = await updateSocialNetwork(
        imageFile,
        oldImageName,
        newImageName,
        uid,
    );
    return res;
};

export const DeleteSocialNetwork = async (imageName: string, docId: any) => {
    const res = await deleteSocialNetwork(imageName, docId);
    return res;
};
