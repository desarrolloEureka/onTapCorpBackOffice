import { AllRefPropsFirebase, RefPropsFirebase } from "@/types/userFirebase";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    getDoc,
    limit,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import moment from "moment";
import { db } from "shared/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

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

export const saveOneDocumentFb = async (
    documentRef: any,
    data: any,
    // reference: string,
) => {
    // const documentRef = doc(allRef({ ref: reference }));
    await setDoc(documentRef, {
        ...data,
        // uid: documentRef.id,
        timestamp: currentDate,
    });

    // console.log({ ...data, uid: documentRef.id, timestamp: new Date() });
    // console.log(currentDate);
    return documentRef;
};

export const saveDocumentByIdFb = async (
    id: string,
    data: any,
    reference: string,
) => {
    //await setDoc(doc(db, "cities", "new-city-id"), data);
    // const documentRef = await addDoc(allRef({ ref: reference }), data);
    const document = docRef({
        ref: reference,
        collection: id,
    });

    // console.log("document", document);

    await setDoc(
        document,
        // doc(db, "cities", "0irK7kDetSMJJTLgAxww"),
        data,
    );
    return document;
};

export const updateDocumentsByCsvByIdFb = async (
    id: string,
    newData: any,
    reference: string,
) => {
    const userDocRef = doc(db, reference, id);
    return await updateDoc(userDocRef, newData);
};

export const updateDocumentsByIdFb = async (
    id: string,
    newData: any,
    reference: string,
) => {
    const document = docRef({ ref: reference, collection: id });
    return await updateDoc(document, {
        ...newData,
        timestamp: currentDate,
    });
};

export const updateCampusByIdFb = async (
    id: string,
    refArea: string,
    reference: string,
    data: any,
    refExist?: boolean,
) => {
    const document = docRef({ ref: reference, collection: id });

    return await updateDoc(
        document,
        refExist
            ? {
                  availableAreas: data.includes(refArea)
                      ? data.filter((item: string) => item !== refArea)
                      : [...data],
                  timestamp: currentDate,
              }
            : {
                  availableAreas: !data.includes(refArea)
                      ? [...data, refArea]
                      : [...data],
                  timestamp: currentDate,
              },
    );
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

export const getZonesByCompanyId = async (companyId: any) => {
    try {
        const q = query(
            collection(db, "zones"),
            where("idCompany", "==", companyId),
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

export const getNotificationsByCompanyId = async (companyId: any) => {
    try {
        const q = query(
            collection(db, "notifications"),
            where("idCompany", "==", companyId),
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

export const getWorkArasByCompanyId = async (companyId: any) => {
    try {
        const q = query(
            collection(db, "workAreas"),
            where("idCompany", "==", companyId),
        );

        const querySnapshot = await getDocs(q);

        const workAreas = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        return workAreas;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
};
