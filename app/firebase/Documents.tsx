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
    deleteDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

export const getZoneById = async (zoneId: any) => {
    const zoneRef = doc(db, "zones", zoneId); // Reemplaza "zones" con el nombre de tu colección
    const zoneSnap = await getDoc(zoneRef);

    if (zoneSnap.exists()) {
        return zoneSnap.data(); // Retorna los datos del documento
    } else {
        console.log("No such document!");
        return null; // O retorna un valor que indique que el documento no existe
    }
}

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

export const getRoutesByCompanyId = async (companyId: any) => {
    try {
        const q = query(
            collection(db, "routes"),
            where("idCompany", "==", companyId),
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
            where("companyId", "==", companyId),
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
    /* try {
        const q = query(
            collection(db, "workAreas"),
            where("companyId", "==", companyId),
        );

        const querySnapshot = await getDocs(q);

        const Routes = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        return Routes;
    } catch (error) {
        console.error("Error fetching areas", error);
        return [];
    } */
    return [];
};

export const saveEmployee = async (dataSave: any) => {
    try {
        const documentId = uuidv4();

        const docRef = doc(db, "employees", documentId);

        const dataWithId = {
            ...dataSave,
            uid: documentId,
        };

        console.log('dataWithId ', dataWithId);
        // Guarda el documento en Firestore
        await setDoc(docRef, dataWithId);

        return { success: true, message: "employees saved successfully" };
    } catch (error) {
        console.error("Error saving notification:", error);
        return { success: false, message: "Error saving employees", error };
    }
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

export const deleteDocumentById = async (collectionName: string, documentId: string) => {
    const docRef = doc(db, collectionName, documentId); // Crea una referencia al documento

    try {
        await deleteDoc(docRef); // Elimina el documento
        return { success: true, message: 'Documento eliminado con éxito' };
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
        return { success: false, message: 'Error al eliminar el documento', error };
    }
};

/* export const saveSocialNetworkImage = async (data: any, imageFile: File) => {
    const storage = getStorage();
    const imageRef = ref(storage, `social_networks/${data?.logoName}`);

    try {
        // Subir el nuevo archivo
        const snapshot = await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(snapshot.ref);

        //  Registrar su referencia en Firestore
        const docRef = await addDoc(allRef({ ref: 'logos' }), {
            ...data,
            imageUrl: imageUrl,
        });

        return { success: true, message: 'Documento registrado con éxito' };
    } catch (error) {
        console.error('Error al cargar la imagen en Firebase Storage: ', error);
        return { success: false, message: 'Error al registrar el documento', error };
    }
}; */

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
        const docRef = doc(db, 'logos', newUid);

        // Registrar su referencia en Firestore
        await setDoc(docRef, {
            ...data,
            imageUrl: imageUrl,
            uid: newUid, // Asignar el UID al nuevo documento
        });

        return { success: true, message: 'Documento registrado con éxito', docId: newUid };
    } catch (error) {
        console.error('Error al cargar la imagen en Firebase Storage: ', error);
        return { success: false, message: 'Error al registrar el documento', error };
    }
};

// Actualizar una red social,
export const updateSocialNetwork = async (
    imageFile: any,       // Archivo de imagen nuevo
    oldImageName: string,  // Nombre de la imagen antigua (para eliminarla)
    newImageName: string,  // Nombre de la nueva imagen
    docId: string          // ID del documento en Firestore
) => {
    const storage = getStorage();
    // Crear referencias para la imagen nueva y la antigua
    const newImageRef = ref(storage, `social_networks/${newImageName}`);
    const oldImageRef = ref(storage, `social_networks/${oldImageName}`);

    try {
        let newImageUrl = ''

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
        const docRef = doc(db, 'logos', docId);

        // Actualizar la referencia en Firestore con la nueva URL y el nuevo nombre
        if (newImageUrl) {
            await updateDoc(docRef, {
                imageName: newImageName,
                imageUrl: newImageUrl,  // Actualiza la URL de la nueva imagen
                logoName: newImageName  // Actualiza el nombre de la imagen
            });
        } else {
            await updateDoc(docRef, {
                logoName: newImageName  // Actualiza el nombre de la imagen
            });
        }



        return { success: true, message: 'Documento actualizado con éxito' };
    } catch (error) {
        console.error("Error during update operation:", error);
        return { success: false, message: 'Error al actualizar el documento', error };
    }
};

// Elimina una red social, incluyendo la imagen asociada y el documento en Firestore
export const deleteSocialNetwork = async (imageName: string, docId: string) => {
    const storage = getStorage();

    // Crear referencia de la imagen en Firebase Storage
    const imageRef = ref(storage, `social_networks/${imageName}`);

    try {
        // Eliminar la imagen de Firebase Storage
        await deleteObject(imageRef);

        // Eliminar el documento en Firestore que contiene la referencia a la imagen
        const docRef = doc(db, 'logos', docId);  // Ajusta 'logos' si es necesario
        await deleteDoc(docRef);

        return { success: true, message: 'Red social eliminada con éxito' };
    } catch (error) {
        console.error("Error during the delete process: ", error);
        return { success: false, message: 'Error al eliminar la red social', error };
    }
};
