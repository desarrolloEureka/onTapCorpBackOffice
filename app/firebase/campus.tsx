import { AllRefPropsFirebase } from "@/types/userFirebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "shared/firebase/firebase";

export const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

export const getAllCampusFb = async () =>
    await getDocs(allRef({ ref: "campus" }));
