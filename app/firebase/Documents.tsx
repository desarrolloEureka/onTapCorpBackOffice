import { AllRefPropsFirebase, RefPropsFirebase } from "@/types/userFirebase";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    limit,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import moment from "moment";
import { db } from "shared/firebase/firebase";

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

const currentDate = moment().format();

const docRef = ({ ref, collection }: RefPropsFirebase) =>
    doc(db, ref, collection);

export const getReference = (reference: string) => {
    const documentRef = doc(allRef({ ref: reference }));
    return documentRef;
};

export const getDocumentRefById = (reference: string, uid: string) => {
    const documentRef = doc(db, reference, uid);
    return documentRef;
};

export const getAllDocumentsFb = async (ref: string) =>
    await getDocs(allRef({ ref }));

export const getDocumentsByIdFb = async (
    //only by coupons
    id: string,
    date: number,
    saleLimit: number | undefined,
    reference: string,
) => {
    if (saleLimit) {
        return getDocs(
            query(
                collection(db, reference),
                where("supplier_code", "==", id),
                where("date_end", "<=", date),
                where("is_active", "==", true),
                where("redeemed", "==", false),
                where("sold", "==", false),
                limit(saleLimit),
            ),
        );
    } else {
        return getDocs(
            query(
                collection(db, reference),
                where("supplier_code", "==", id),
                where("date_end", "<=", date),
                where("is_active", "==", true),
                where("redeemed", "==", false),
                where("sold", "==", false),
            ),
        );
    }
};

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
