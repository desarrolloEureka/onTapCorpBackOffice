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
  sendNotificationsToUsers,
  sendNotification,
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
  getMeetingByCompanyId,
  getAllEmployees,
  getLogosBySuperAdmin,
  getAllCompanies,
  getCompaniesByUid,
  updateCompany,
  validateArea,
  validateHeadquarter,
  validateRoutes,
  saveBackgroundImage,
  updateBackgroundImage,
  getLogosByCompanyId,
  getCompanyById,
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

export const listenToDocumentsQuery = (
  ref: string,
  setData: (data: any[]) => void,
  uid: any
) => {
  const collectionRef = collection(db, ref); // Asegúrate de tener acceso a dataBase
  if (!uid) {
    // Si uid no es válido, no se establece el listener
    setData([]); // O puedes manejarlo de otra manera
    return () => { }; // Retorna una función de limpieza vacía
  }
  // Crea una consulta que filtre por idCompany
  const q = query(collectionRef, where("idCompany", "==", uid));

  const unsubscribe = onSnapshot(q, (snapshot: any) => {
    const updatedData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (ref === "zones") {
      updatedData.sort((a: any, b: any) =>
        a.zoneName.localeCompare(b.zoneName)
      );
    } else if (ref === "logos") {
      updatedData.sort((a: any, b: any) =>
        a.logoName.localeCompare(b.logoName)
      );
    }
    setData(updatedData); // Actualiza el estado con los datos obtenidos
  });

  return unsubscribe; // Devuelve la función de limpieza
};

export const listenToIconsQuery = (ref: string, setData: (data: any[]) => void, idCompany: string | null) => {
  if (!idCompany) {
    // Si no hay un ID de empresa válido, limpia los datos y no establece el listener
    setData([]);
    return () => { };
  }

  // Referencia a la colección
  const collectionRef = collection(db, ref);

  // Consulta los íconos globales o específicos de la empresa
  const q = query(
    collectionRef,
    where("type", "in", ["global", "company"]),
  );

  // Si hay un idCompany, agrega una segunda consulta para los íconos de la empresa
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const updatedData = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((icon: any) => {
        if (icon.type === "company" && icon.idCompany === idCompany) {
          return true;
        }
        return icon.type === "global"; // Los íconos globales siempre deben incluirse
      })
      .sort((a: any, b: any) => {
        return a.logoName.localeCompare(b.logoName, undefined, { numeric: true });
      });

    setData(updatedData);
  });

  return unsubscribe;
};


export const getDocsByCompanyIdQuery = async (
  idCompany: string,
  reference: string,
  fieldPathInDB?: string,
  valueToFound?: string
) => {
  const documents = await getDocsByCompanyId(
    idCompany,
    reference,
    fieldPathInDB,
    valueToFound
  );
  return documents;
};

export const getLogosByCompanyIdQuery = async (
  idCompany: string,
  reference: string,
  fieldPathInDB?: string,
  valueToFound?: string
) => {
  const documents = await getLogosByCompanyId(
    idCompany,
    reference,
    fieldPathInDB,
    valueToFound
  );
  return documents;
};

export const getCompanyByIdQuery = async (
  idCompany: string,
  reference: string,
) => {
  const documents = await getCompanyById(
    idCompany,
    reference,
  );
  return documents;
};

export const getLogosBySuperAdminQuery = async (
  idAdmin: string,
  reference: string,
  fieldPathInDB?: string,
  valueToFound?: string
) => {
  const documents = await getLogosBySuperAdmin(
    idAdmin,
    reference,
    fieldPathInDB,
    valueToFound
  );
  return documents;
};

export const getLocationsByCompanyIdQuery = async (
  idCompany: string,
  fieldPath?: string,
  valueToFound?: string
) => {
  const documents = await getLocationsByCompanyId(
    idCompany,
    fieldPath,
    valueToFound
  );
  return documents;
};

export const getDocsByCompanyRolIdQuery = async (
  idCompany: string,
  reference: string
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

export const getAllEmployeesQuery = async () => {
  const documents = await getAllEmployees();
  //console.log("DATA", documents);
  return documents;
};

// Query para obtener todas las empresas
export const getAllCompaniesQuery = async () => {
  try {
    const documents = await getAllCompanies();
    return documents;
  } catch (error) {
    console.error("Error in getAllCompaniesQuery", error);
    return [];
  }
};

export const listenToEmployeesByCompanyIdQuery = (
  ref: string,
  setData: (data: any[]) => void,
  uid: any
) => {
  const collectionRef = collection(db, ref);
  if (!uid) {

    setData([]);
    return () => { };
  }

  const q = query(
    collectionRef,
    where("idCompany", "==", uid),
    where("rolId", "==", "uysG1ULyEDklfbGDFate")
  );

  const unsubscribe = onSnapshot(q, (snapshot: any) => {
    const updatedData = snapshot.docs.map((doc: any) => ({
      uid: doc.uid,
      ...doc.data(),
    }));
    setData(updatedData); // Actualiza el estado con los datos obtenidos
  });

  return unsubscribe; // Devuelve la función de limpieza
};

export const listenToWorkAreaByCompanyIdQuery = (
  ref: string,
  setData: (data: any[]) => void,
  uid: any
) => {
  const collectionRef = collection(db, ref);
  if (!uid) {

    setData([]);
    return () => { };
  }

  const q = query(collectionRef, where("companyId", "==", uid));
  const unsubscribe = onSnapshot(q, (snapshot: any) => {
    const updatedData = snapshot.docs.map((doc: any) => ({
      ...doc.data(),
    }));
    setData(updatedData); // Actualiza el estado con los datos obtenidos
  });

  return unsubscribe; // Devuelve la función de limpieza
};

export const getLocationsByCompanyIdAndWorkingdayQuery = async (
  idCompany: string
) => {
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

export const sendNotificationsToUsersQuery = async (tokens: string[], title: string, body: string, image: string) => {
  const result = await sendNotificationsToUsers(tokens, title, body, image);
  return result;
};

export const sendNotificationQuery = async (token: string, title: string, body: string, image: string) => {
  const result = await sendNotification(token, title, body, image);
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

export const editCompanyQuery = async (dataSave: any, docId: string) => {
  const result = await updateCompany(dataSave, docId);
  return result;
};

export const getWorkAreaByUidQuery = async (uidArea: string) => {
  const documents = await getWorkAreaByUid(uidArea);
  return documents;
};

export const getCompaniesByUidQuery = async (uid: string) => {
  const companies = await getCompaniesByUid(uid);
  return companies;
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
  documentId: string
) => {
  const result = await deleteDocumentById(collectionName, documentId);
  return result;
};

export const SaveSocialNetwork = async (data: any, imageFile: File) => {
  const res = await saveSocialNetworkImage(data, imageFile);
  return res;
};

export const SaveBackgroundImage = async (data: any) => {
  const res = await saveBackgroundImage(data);
  return res;
};

export const UpdateBackgroundImage = async (data: any, uid: any) => {
  const res = await updateBackgroundImage(data, uid);
  return res;
};

export const UpdateSocialNetwork = async (
  uid: any,
  oldImageName: string,
  newImageName: string,
  imageFile: any
) => {
  const res = await updateSocialNetwork(
    imageFile,
    oldImageName,
    newImageName,
    uid
  );
  return res;
};

export const DeleteSocialNetwork = async (imageName: string, docId: any) => {
  const res = await deleteSocialNetwork(imageName, docId);
  return res;
};

export const validateAreaQuery = async (areaId: string) => {
  const res = await validateArea(areaId);
  return res;
};

export const validateHeadquarterQuery = async (headquarterId: string) => {
  const res = await validateHeadquarter(headquarterId);
  return res;
};

export const validateRoutesQuery = async (routeIds: string) => {
  const res = await validateRoutes(routeIds);
  return res;
};

