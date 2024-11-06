import {
    deleteDocumentById,
    deleteSocialNetwork,
    getAllDocumentsFb,
    getAreasByCompanyId,
    getDocsByCompanyId,
    getDocsByCompanyRolId,
    getDocumentsByIdFb,
    getEmployeesByCompanyId,
    getHeadquartersByCompanyId,
    getLocationsByCompanyId,
    getLocationsByCompanyIdAndWorkingday,
    getMeetingStatusByCompanyId,
    getNotificationsByCompanyId,
    getReference,
    getRoutesByCompanyId,
    getWorkAreasByCompanyId,
    getWorkAreaByUid,
    updateArea,
    getZoneById,
    getZonesByCompanyId,
    saveCampus,
    saveDocumentByIdFb,
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
    getMeetingByCompanyId
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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "shared/firebase/firebase";

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

export const listenToDocumentsQuery = (ref: string, setData: (data: any[]) => void, uid: any) => {
    const collectionRef = collection(db, ref); // Asegúrate de tener acceso a dataBase
    if (!uid) {
        // Si uid no es válido, no se establece el listener
        setData([]); // O puedes manejarlo de otra manera
        return () => {}; // Retorna una función de limpieza vacía
    } 
    // Crea una consulta que filtre por idCompany
     const q = query(collectionRef, where("idCompany", "==", uid));
    
    const unsubscribe = onSnapshot(q, (snapshot: any) => {
        const updatedData = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        }));
        setData(updatedData); // Actualiza el estado con los datos obtenidos
    });

    return unsubscribe; // Devuelve la función de limpieza
}

export const getDocsByCompanyIdQuery = async (
    idCompany: string,
    reference: string,
    fieldPathInDB?: string,
    valueToFound?: string,
) => {
    const documents = await getDocsByCompanyId(
        idCompany,
        reference,
        fieldPathInDB,
        valueToFound,
    );
    return documents;
};

export const getLocationsByCompanyIdQuery = async (
    idCompany: string,
    fieldPath?: string,
    valueToFound?: string,
) => {
    const documents = await getLocationsByCompanyId(
        idCompany,
        fieldPath,
        valueToFound,
    );
    return documents;
};

export const getDocsByCompanyRolIdQuery = async (
    idCompany: string,
    reference: string,
) => {
    const documents = await getDocsByCompanyRolId(idCompany, reference);
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

export const getWorkAreasByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getWorkAreasByCompanyId(idCompany);
    return documents;
};

export const getMeetingStatusByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getMeetingStatusByCompanyId(idCompany);
    return documents;
};

export const getMeetingsByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getMeetingByCompanyId(idCompany);
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

export const getEmployeesByCompanyIdQuery = async (idCompany: string) => {
    const documents = await getEmployeesByCompanyId(idCompany);
    return documents;
};

export const getLocationsByCompanyIdAndWorkingdayQuery = async (idCompany: string) => {
    const documents = await getLocationsByCompanyIdAndWorkingday(idCompany);
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

export const saveDataDocumentsQueryById = async ({
    id,
    data,
    reference,
}: {
    id: string;
    data: any;
    reference: string;
}) => {
    const queryResult = await saveDocumentByIdFb(id, data, reference);
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
    try {
        const queryResult = await updateDocumentsByIdFb(id, data, reference);
        return queryResult;
    } catch (error) {
        console.error("Error al editar el documento:", error);
        return {
            success: false,
            message: "Error al editar el documento",
            error,
        };
    }
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

export const editAreaQuery = async (dataSave: any, docId: string) => {
    const result = await updateArea(dataSave, docId);
    return result;
};

export const getWorkAreaByUidQuery = async (uidArea: string) => {
    const documents = await getWorkAreaByUid(uidArea);
    return documents;
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
