import { AllRefPropsFirebase } from "@/types/userFirebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "shared/firebase/firebase";

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

export const getAllAgreementsFb = async () =>
    await getDocs(allRef({ ref: "agreements" }));
