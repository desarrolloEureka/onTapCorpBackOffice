import { AllRefPropsFirebase, RefPropsFirebase } from "@/types/userFirebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  Unsubscribe,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import moment from "moment";
import { db } from "shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const auth = getAuth();

export const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

const currentDate = moment().format();

const docRef = ({ ref, collection }: RefPropsFirebase) =>
  doc(db, ref, collection);

export const getReference = (reference: string) => {
  const documentRef = doc(allRef({ ref: reference }));
  return documentRef;
};

export const getDocumentsByIdFb = async (reference: string, uid: string) => {
  const documentRef = doc(db, reference, uid);
  return await getDoc(documentRef);
};

export const getAllDocumentsFb = async (ref: string) =>
  await getDocs(allRef({ ref }));

// export const getDocumentsByIdFb = async (
//     //only by coupons
//     id: string,
//     date: number,
//     saleLimit: number | undefined,
//     reference: string,
// ) => {
//     if (saleLimit) {
//         return getDocs(
//             query(
//                 collection(db, reference),
//                 where("supplier_code", "==", id),
//                 where("date_end", "<=", date),
//                 where("is_active", "==", true),
//                 where("redeemed", "==", false),
//                 where("sold", "==", false),
//                 limit(saleLimit),
//             ),
//         );
//     } else {
//         return getDocs(
//             query(
//                 collection(db, reference),
//                 where("supplier_code", "==", id),
//                 where("date_end", "<=", date),
//                 where("is_active", "==", true),
//                 where("redeemed", "==", false),
//                 where("sold", "==", false),
//             ),
//         );
//     }
// };

export const saveDocumentsFb = async (data: any, reference: string) => {
  const documentRef = await addDoc(allRef({ ref: reference }), data);
  return documentRef;
};

export const saveOneDocumentFb = async (documentRef: any, data: any) => {
  try {
    // Guarda el documento en Firestore
    await setDoc(documentRef, {
      ...data,
      timestamp: currentDate,
    });

    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving data", error };
  }
};

export const saveDocumentByIdFb = async (
  id: string,
  data: any,
  reference: string
) => {
  try {
    const document = docRef({ ref: reference, collection: id });
    await setDoc(document, {
      ...data,
      timestamp: currentDate,
    });
    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving data", error };
  }
};

export const updateDocumentsByCsvByIdFb = async (
  id: string,
  newData: any,
  reference: string
) => {
  const userDocRef = doc(db, reference, id);
  return await updateDoc(userDocRef, newData);
};

export const updateDocumentsByIdFb = async (
  id: string,
  newData: any,
  reference: string
) => {
  try {
    const document = docRef({ ref: reference, collection: id });
    await updateDoc(document, {
      ...newData,
      timestamp: currentDate,
    });
    return { success: true, message: "Data updated successfully" };
  } catch (error) {
    console.error("Error updating data:", error);
    return { success: false, message: "Error updating data", error };
  }
};

export const saveNotification = async (dataSave: any) => {
  try {
    const notificationsRef = collection(db, "notifications");

    // Agregar un nuevo documento a la colección
    const docRef = await addDoc(notificationsRef, dataSave);

    return { success: true, message: "Notification saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving notification", error };
  }
};

export const sendNotificationsToUsers = async (tokens: string[], title: string, body: string, image: string) => {
  try {
    if (tokens?.length === 0) {
      return { success: false, message: "No tokens provided" };
    }
    const responses = await Promise.all(
      tokens.map(async token => {
        try {
          const response = await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, title, body, image }),
          });
          const data = await response.json();
          return { token, success: response.ok, ...data };
        } catch (error) {
          return { token, success: false, error: error };
        }
      })
    );
    return { success: true, message: "Notification sent successfully" };
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
    return { success: false, message: "Error sent notification", error };
  }
};

export const sendNotification = async (token: string, title: string, body: string, image: string) => {
  try {
    if (!token) {
      return { success: false, message: "No token provided" };
    }
    const response = await fetch("https://one-tap-corp.vercel.app/api/notifications/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, title, body, image }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Notification sent successfully", data };
    } else {
      return { success: false, message: "Failed to send notification", data };
    }
  } catch (error) {
    console.error("Error al enviar la notificación2:", error);
    return { success: false, message: "Error sending notification", error };
  }
};

export const saveZone = async (dataSave: any) => {
  try {
    const documentId = uuidv4();

    // Crea una referencia al documento usando el UID como ID
    const docRef = doc(db, "zones", documentId);

    const notificationsRef = collection(db, "zones");

    // Agrega el UID al objeto de datos
    const dataWithId = {
      ...dataSave,
      uid: documentId, // Incluye el UID como un campo en el documento
    };

    // Guarda el documento en Firestore
    await setDoc(docRef, dataWithId);

    return { success: true, message: "zone saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving zone", error };
  }
};

export const updateZone = async (id: string, dataSave: any) => {
  try {
    const zoneRef = doc(db, "zones", id);
    await updateDoc(zoneRef, dataSave);

    return { success: true, message: "Zone updated successfully" };
  } catch (error) {
    console.error("Error updating zone:", error);
    return { success: false, message: "Error updating zone", error };
  }
};

export const saveMeeting = async (dataToSave: any, docRef: any) => {
  try {
    // Guarda el documento en Firestore
    await setDoc(docRef, { ...dataToSave, timestamp: currentDate });

    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving data", error };
  }
};

export const updateMeeting = async (id: string, dataSave: any) => {
  try {
    const docRef = doc(db, "meetingStatus", id);
    await updateDoc(docRef, dataSave);

    return { success: true, message: "Data updated successfully" };
  } catch (error) {
    console.error("Error updating data:", error);
    return { success: false, message: "Error updating data", error };
  }
};

export const saveCampus = async (dataToSave: any, docRef: any) => {
  try {
    // Guarda el documento en Firestore
    await setDoc(docRef, { ...dataToSave, timestamp: currentDate });

    return { success: true, message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving data", error };
  }
};

export const updateCampus = async (dataSave: any) => {
  try {
    const docRef = doc(db, "campus", dataSave.uid);
    await updateDoc(docRef, { ...dataSave, timestamp: currentDate });

    return { success: true, message: "Data updated successfully" };
  } catch (error) {
    console.error("Error updating data:", error);
    return { success: false, message: "Error updating data", error };
  }
};

export const getDocsByCompanyId = async (
  companyId: any,
  reference: string,
  fieldPathInDB?: string,
  valueToFound?: string
) => {
  try {
    const q =
      fieldPathInDB && valueToFound
        ? query(
          collection(db, reference),
          where("idCompany", "==", companyId),
          where(fieldPathInDB, "==", valueToFound),
        )
        : query(
          collection(db, reference),
          where("idCompany", "==", companyId),
        );

    const querySnapshot = await getDocs(q);

    const docs: { [key: string]: any } = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return docs;
  } catch (error) {
    console.error("Error fetching Docs:", error);
    return [];
  }
};

export const getLogosBySuperAdmin = async (
  idAdmin: any,
  reference: string,
  fieldPathInDB?: string,
  valueToFound?: string
) => {
  try {
    const q = query(
      collection(db, reference),
      where("type", "==", "global"),
      where("createdBy", "==", idAdmin)
    );

    const querySnapshot = await getDocs(q);

    const docs: { [key: string]: any } = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return docs;
  } catch (error) {
    console.error("Error fetching Docs:", error);
    return [];
  }
};

export const getDocsByCompanyIdInRealTime = (
  companyId: any,
  reference: string,
  callBack: (data: any[]) => void,
  fieldPathInDB?: string,
  valueToFound?: string
): Unsubscribe => {
  try {
    const q =
      fieldPathInDB && valueToFound
        ? query(
          collection(db, reference),
          where("idCompany", "==", companyId),
          where(fieldPathInDB, "==", valueToFound),
        )
        : query(
          collection(db, reference),
          where("idCompany", "==", companyId),
        );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const dataFound: any[] = querySnapshot.docs.map((doc) => doc.data());
        callBack(dataFound);
      }
    });

    return unsubscribe; // Retornar la variable inicializada
  } catch (error) {
    console.error("Error fetching Docs:", error);
    const unsubscribe = () => { };
    return unsubscribe; // Retornar array vacío en caso de error
  }
};

export const getLocationsByCompanyIdInRealTime = (
  companyId: any,
  reference: string,
  callBack: (data: any[]) => void,
  fieldPathInDB?: string,
  valueToFound?: string
): Unsubscribe => {
  try {
    const q =
      fieldPathInDB && valueToFound
        ? query(
          collection(db, reference),
          where("companyId", "==", companyId),
          where(fieldPathInDB, "==", valueToFound),
        )
        : query(
          collection(db, reference),
          where("companyId", "==", companyId),
        );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const dataFound: any[] = querySnapshot.docs.map((doc) => doc.data());
        callBack(dataFound);
      }
    });

    return unsubscribe; // Retornar la variable inicializada
  } catch (error) {
    console.error("Error fetching Docs:", error);
    const unsubscribe = () => { };
    return unsubscribe; // Retornar array vacío en caso de error
  }
};

export const getDocsByCompanyRolId = async (
  companyId: any,
  reference: string
) => {
  try {
    const q = query(
      collection(db, reference),
      where("idCompany", "==", companyId),
      where("rolId", "==", "vE7NrHpiRU2s1Gjv5feg") // UID SUPERADMIN
    );

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docs;
  } catch (error) {
    console.error("Error fetching Docs:", error);
    return [];
  }
};

export const getLocationsByCompanyId = async (
  companyId: any,
  fieldPathInDB?: string,
  valueToFound?: string
) => {
  try {
    const q =
      fieldPathInDB && valueToFound
        ? query(
          collection(db, "locations"),
          where("companyId", "==", companyId),
          where(fieldPathInDB, "==", valueToFound),
        )
        : query(
          collection(db, "locations"),
          where("companyId", "==", companyId),
        );

    const querySnapshot = await getDocs(q);

    const locations: { [key: string]: any } = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const getZonesByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "zones"),
      where("idCompany", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const zones = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return zones;
  } catch (error) {
    console.error("Error fetching zones:", error);
    return [];
  }
};

export const getZoneById = async (zoneId: any) => {
  const zoneRef = doc(db, "zones", zoneId); // Reemplaza "zones" con el nombre de tu colección
  const zoneSnap = await getDoc(zoneRef);

  if (zoneSnap.exists()) {
    return zoneSnap.data(); // Retorna los datos del documento
  } else {
    console.log("No such document!");
    return null; // O retorna un valor que indique que el documento no existe
  }
};

export const getNotificationsByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("idCompany", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const getWorkAreasByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "workAreas"),
      where("companyId", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const workAreas = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return workAreas;
  } catch (error) {
    console.error("Error fetching Work Areas:", error);
    return [];
  }
};

export const getWorkAreaByUid = async (uid: any) => {
  try {
    const q = query(collection(db, "workAreas"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    const workAreas = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return workAreas;
  } catch (error) {
    console.error("Error fetching Work Areas:", error);
    return [];
  }
};

// Función para obtener las empresas por uid
export const getCompaniesByUid = async (uid: string) => {
  try {
    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const companies = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return companies;
  } catch (error) {
    console.error("Error fetching companies by UID", error);
    return [];
  }
};


export const getMeetingStatusByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "meetingStatus"),
      where("idCompany", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const meetingStatus = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return meetingStatus;
  } catch (error) {
    console.error("Error fetching Meeting Status:", error);
    return [];
  }
};

export const getMeetingByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "meetings")
    );
    const querySnapshot = await getDocs(q);
    const meetingStatus = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return meetingStatus;
  } catch (error) {
    console.error("Error fetching Meeting Status:", error);
    return [];
  }
}

export const getRoutesByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "routes"),
      where("idCompany", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const Routes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return Routes;
  } catch (error) {
    console.error("Error fetching routes", error);
    return [];
  }
};

export const getAreasByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "workAreas"),
      where("companyId", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const Routes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return Routes;
  } catch (error) {
    console.error("Error fetching areas", error);
    return [];
  }
};

export const getHeadquartersByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "campus"),
      where("idCompany", "==", companyId)
    );

    const querySnapshot = await getDocs(q);

    const Routes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return Routes;
  } catch (error) {
    console.error("Error fetching Campus", error);
    return [];
  }
};

export const getLocationsByCompanyIdAndWorkingday = async (companyId: any) => {
  try {
    const q1 = query(
      collection(db, "locations"),
      where("companyId", "==", companyId),
      where("subject", "==", "endDay")
    );

    const q2 = query(
      collection(db, "locations"),
      where("companyId", "==", companyId),
      where("subject", "==", "startDay")
    );

    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);

    const Locations = [
      ...querySnapshot1.docs.map((doc) => ({ ...doc.data() })),
      ...querySnapshot2.docs.map((doc) => ({ ...doc.data() })),
    ]
    return Locations;
  } catch (error) {
    console.error("Error fetching routes", error);
    return [];
  }
};

export const getEmployeesByCompanyId = async (companyId: any) => {
  try {
    const q = query(
      collection(db, "users"),
      where("idCompany", "==", companyId),
      where("rolId", "==", "uysG1ULyEDklfbGDFate"),  //  ID DEL ROL DE EMPLEADO
    );

    const querySnapshot = await getDocs(q);

    const Routes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return Routes;
  } catch (error) {
    console.error("Error fetching Campus", error);
    return [];
  }
};

//empleados general de todas las empresas
export const getAllEmployees = async () => {
  try {
    const q = query(
      collection(db, "users"),
      where("rolId", "==", "uysG1ULyEDklfbGDFate")
    );

    const querySnapshot = await getDocs(q);

    const employees = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return employees;
  } catch (error) {
    console.error("Error fetching employees", error);
    return [];
  }
};

// Función para obtener todas las empresas
export const getAllCompanies = async () => {
  try {
    const companiesRef = collection(db, "companies");
    const querySnapshot = await getDocs(companiesRef);

    const companies = querySnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return companies;
  } catch (error) {
    console.error("Error fetching companies", error);
    return [];
  }
};

export const saveEmployee = async (dataSave: any) => {
  try {

    const docRef = doc(db, "users", dataSave.uid);
    const dataWithId = {
      ...dataSave,
      //Fecha de creación
      // dejar switch_activateCardy no employeeCardStatus
      rolId: "uysG1ULyEDklfbGDFate", //  ID DEL ROL DE EMPLEADO
      views: 0,
      isActive: true,
      preview: `https://one-tap-corp.vercel.app/components/views/cardView/?uid=${dataSave.uid}`,
      /*preview: `https://one-tap-corp-dev.vercel.app/components/views/cardView/?uid=${dataSave.uid}`,
              LINK DE DESARROLLO VERCEL*/
      switch_activateCard: true,
      templateData: [
        {
          id: "VGMUWYOP3RK374gi30I8", // ID DEL TEMPLATE 1
          checked: true,
          background_id: "TtGgR1wrCH5neEFlrgUN",
        },
      ],
    };


    // Guarda el documento en Firestore
    await setDoc(docRef, dataWithId);

    return { success: true, message: "employees saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving employees", error };
  }
};

export const updateEmployee = async (id: string, dataSave: any) => {
  try {
    //const zoneRef = doc(db, "employees", id);
    const zoneRef = doc(db, "users", id);
    await updateDoc(zoneRef, dataSave);

    return { success: true, message: "Employee updated successfully" };
  } catch (error) {
    console.error("Error updating employee:", error);
    return { success: false, message: "Error updating route", error };
  }
};

export const updateArea = async (dataSave: any, id: string) => {
  try {
    //const zoneRef = doc(db, "employees", id);
    const zoneRef = doc(db, "workAreas", id);
    await updateDoc(zoneRef, dataSave);

    return { success: true, message: "Employee updated successfully" };
  } catch (error) {
    console.error("Error updating employee:", error);
    return { success: false, message: "Error updating route", error };
  }
};

export const updateCompany = async (dataSave: any, id: string) => {
  try {
    const zoneRef = doc(db, "companies", id);
    await updateDoc(zoneRef, dataSave);

    return { success: true, message: "Company updated successfully" };
  } catch (error) {
    console.error("Error updating Company:", error);
    return { success: false, message: "Error updating route", error };
  }
};

export const registerFirebase = async (user: string, password: string) => {
  const registerF = await createUserWithEmailAndPassword(auth, user, password);
  return registerF;
};

export const saveRoute = async (dataSave: any) => {
  try {
    const documentId = uuidv4();

    // Crea una referencia al documento usando el UID como ID
    const docRef = doc(db, "routes", documentId);

    // Agrega el UID al objeto de datos
    const dataWithId = {
      ...dataSave,
      uid: documentId, // Incluye el UID como un campo en el documento
    };

    await setDoc(docRef, dataWithId);

    return { success: true, message: "zone saved successfully" };
  } catch (error) {
    console.error("Error saving notification:", error);
    return { success: false, message: "Error saving zone", error };
  }
};

export const updateRoute = async (id: string, dataSave: any) => {
  try {
    const zoneRef = doc(db, "routes", id);
    await updateDoc(zoneRef, dataSave);

    return { success: true, message: "Route updated successfully" };
  } catch (error) {
    console.error("Error updating route:", error);
    return { success: false, message: "Error updating route", error };
  }
};

export const deleteDocumentById = async (
  collectionName: string,
  documentId: string
) => {
  const docRef = doc(db, collectionName, documentId); // Crea una referencia al documento

  try {
    await deleteDoc(docRef); // Elimina el documento
    return { success: true, message: "Documento eliminado con éxito" };
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
    return {
      success: false,
      message: "Error al eliminar el documento",
      error,
    };
  }
};

export const saveSocialNetworkImage = async (data: any, imageFile: File) => {
  const storage = getStorage();
  const imageRef = ref(storage, `social_networks/${data?.logoName}`);

  try {
    // Subir el nuevo archivo
    const snapshot = await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Generar un UID único
    const newUid = uuidv4();

    // Crear una referencia de documento usando el UID
    const docRef = doc(db, "logos", newUid);

    // Registrar su referencia en Firestore
    await setDoc(docRef, {
      ...data,
      imageUrl: imageUrl,
      uid: newUid, // Asignar el UID al nuevo documento
    });

    return {
      success: true,
      message: "Documento registrado con éxito",
      docId: newUid,
    };
  } catch (error) {
    console.error("Error al cargar la imagen en Firebase Storage: ", error);
    return {
      success: false,
      message: "Error al registrar el documento",
      error,
    };
  }
};

// Actualizar una red social,
export const updateSocialNetwork = async (
  imageFile: any, // Archivo de imagen nuevo
  oldImageName: string, // Nombre de la imagen antigua (para eliminarla)
  newImageName: string, // Nombre de la nueva imagen
  docId: string // ID del documento en Firestore
) => {
  const storage = getStorage();
  // Crear referencias para la imagen nueva y la antigua
  const newImageRef = ref(storage, `social_networks/${newImageName}`);
  const oldImageRef = ref(storage, `social_networks/${oldImageName}`);

  try {
    let newImageUrl = "";

    if (imageFile) {
      // Subir la nueva imagen al path especificado
      const snapshot = await uploadBytes(newImageRef, imageFile);
      newImageUrl = await getDownloadURL(snapshot.ref);
    }

    // Eliminar la imagen antigua si el nombre ha cambiado
    if (newImageName !== oldImageName && newImageUrl) {
      try {
        await deleteObject(oldImageRef);
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError);
        // Puedes decidir si quieres continuar o detenerte aquí.
      }
    }
    const docRef = doc(db, "logos", docId);

    // Actualizar la referencia en Firestore con la nueva URL y el nuevo nombre
    if (newImageUrl) {
      await updateDoc(docRef, {
        imageName: newImageName,
        imageUrl: newImageUrl, // Actualiza la URL de la nueva imagen
        logoName: newImageName, // Actualiza el nombre de la imagen
      });
    } else {
      await updateDoc(docRef, {
        logoName: newImageName, // Actualiza el nombre de la imagen
      });
    }

    return { success: true, message: "Documento actualizado con éxito" };
  } catch (error) {
    console.error("Error during update operation:", error);
    return {
      success: false,
      message: "Error al actualizar el documento",
      error,
    };
  }
};

// Elimina una red social, incluyendo la imagen asociada y el documento en Firestore
export const deleteSocialNetwork = async (imageName: string, docId: string) => {
  const storage = getStorage();

  const imageRef = ref(storage, `social_networks/${imageName}`);

  try {
    await deleteObject(imageRef);

    const docRef = doc(db, "logos", docId);
    await deleteDoc(docRef);

    return { success: true, message: "Red social eliminada con éxito" };
  } catch (error) {
    console.error("Error during the delete process: ", error);
    return {
      success: false,
      message: "Error al eliminar la red social",
      error,
    };
  }
};

//Crear Fondo
export const saveBackgroundImage = async (data: any) => {

  try {
    const docRef = getReference("backgroundImages");

    // Registrar su referencia en Firestore
    await setDoc(docRef, {
      ...data,
      uid: docRef.id,
    });

    return {
      success: true,
      message: "Documento registrado con éxito",
    };
  } catch (error) {
    console.error("Error al cargar la imagen en Firebase Storage: ", error);
    return {
      success: false,
      message: "Error al registrar el documento",
      error,
    };
  }
};

// Actualizar fondo
export const updateBackgroundImage = async (data: any, docId: string) => {
  try {
    const docRef = doc(db, "backgroundImages", docId);
    await updateDoc(docRef, data);

    return { success: true, message: "Documento actualizado con éxito" };
  } catch (error) {
    console.error("Error during update operation:", error);
    return {
      success: false,
      message: "Error al actualizar el documento",
      error,
    };
  }
};

// Elimina una Fondo
export const deleteBackgroundImage = async (docId: string) => {
  try {
    const docRef = doc(db, "backgroundImages", docId);
    await deleteDoc(docRef);

    return { success: true, message: "Fondo eliminado con éxito" };
  } catch (error) {
    console.error("Error during the delete process: ", error);
    return {
      success: false,
      message: "Error al eliminar el fondo",
      error,
    };
  }
};

// Validar si el área existe
export const validateArea = async (areaId: string) => {
  try {
    const areasRef = collection(db, "workAreas");
    const q = query(areasRef, where("uid", "==", areaId));  // Filtrar por el campo id

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Si hay documentos, significa que existe
  } catch (error) {
    console.error("Error validating area:", error);
    return false;
  }
};

// Validar si la sede existe
export const validateHeadquarter = async (headquarterId: string) => {
  try {
    const headquartersRef = collection(db, "campus");
    const q = query(headquartersRef, where("uid", "==", headquarterId)); // Filtrar por id

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Si hay documentos, significa que existe
  } catch (error) {
    console.error("Error validating headquarter:", error);
    return false;
  }
};

// Validar si las rutas existen
export const validateRoutes = async (routeIds: string) => {
  try {
    const routesRef = collection(db, "routes");
    const q = query(routesRef, where("uid", "==", routeIds));

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error validating routes:", error);
    return false;
  }
};





