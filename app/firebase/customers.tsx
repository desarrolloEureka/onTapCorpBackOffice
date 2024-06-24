import { AllRefPropsFirebase } from '@/types/userFirebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'shared/firebase/firebase';

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

export const getAllCustomersFb = async () =>
  await getDocs(allRef({ ref: 'customers' }));
