import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
} from "firebase/firestore";
import { db, auth, firebaseConfig } from "shared/firebase/firebase";
import axios from "axios";
// import { useQuery } from '@tanstack/react-query';

const user = auth.currentUser;

const backendClient = async (accessTokenUser: string) => {
  return axios.create({
    baseURL: firebaseConfig.backendBaseUrl,
    headers: {
      Authorization: `Bearer ${accessTokenUser}`,
    },
  });
};

export const addUser = async ({
  email,
  password,
  accessTokenUser,
  uid,
}: {
  email: string;
  password: string;
  accessTokenUser: string;
  uid: string;
}) => {
  return new Promise((resolve, reject) => {
    backendClient(accessTokenUser).then(async (client) => {
      const data = await client.post(`auth/createUser`, {
        uid,
        email,
        password,
      });
      console.log(data.status);
      if (data.status === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
};

export const updateUserPassword = async ({
  uid,
  password,
  accessTokenUser,
}: {
  uid: string;
  password: string;
  accessTokenUser: string;
}) => {
  return new Promise((resolve, reject) => {
    backendClient(accessTokenUser).then(async (client) => {
      const data = await client.post(`auth/updatePassword`, {
        uid,
        password,
      });
      console.log(data.status);
      if (data.status === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
};

export const saveUserById = async (data: any) => {
  const docRef = await setDoc(doc(db, "users", data.uid), data);
  return docRef;
};

export const getProfileDataByIdFb = async (uid: any) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  let userData = {};

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    userData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return userData;
};

export const getCompanyDataByIdFb = async (companyid: any) => {
  const docRef = doc(db, "companies", companyid);
  const docSnap = await getDoc(docRef);
  let companyData = {};

  if (docSnap.exists()) {
    companyData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return companyData;
};

export const getAreaDataByIdFb = async (companyid: any) => {
  const docRef = doc(db, "workAreas", companyid);
  const docSnap = await getDoc(docRef);
  let areaData = {};

  if (docSnap.exists()) {
    areaData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return areaData;
};

export const getHeadquarterDataByIdFb = async (companyid: any) => {
  const docRef = doc(db, "campus", companyid);
  const docSnap = await getDoc(docRef);
  let headquarterData = {};

  if (docSnap.exists()) {
    headquarterData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return headquarterData;
};

export const GetUser = async (refetch?: boolean) => {
  const userLogged = await localStorage.getItem("@user");
  if (userLogged) {
    const user = JSON.parse(userLogged);
    const updatedUser = await getDoc(doc(db, "users", user.uid));
    if (updatedUser.exists()) {
      const userData = updatedUser.data();
      await localStorage.setItem("@user", JSON.stringify(userData));
      return userData;
    } else {
      return user;
    }
  } else {
    return null;
  }
};

// export const updatePass = async (user: any, newPassword: string) => {
//     await updatePassword(user, newPassword)
//         .then(() => {
//             console.log("Actualizado");
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };

export const registerFirebase = async (user: string, password: string) =>
  await createUserWithEmailAndPassword(auth, user, password);

export const loginFirebase = async (user: string, password: string) =>
  await signInWithEmailAndPassword(auth, user, password);

export const resetPasswordFirebase = async (email: string) =>
  await sendPasswordResetEmail(auth, email);

export const confirmPasswordResetFirebase = async (
  oobCode: string,
  confirmPassword: string
) => await confirmPasswordReset(auth, oobCode, confirmPassword);

export const updateProfileFirebase = async (
  displayName: string,
  photoURL?: string
) => {
  return await user?.updateProfile({
    displayName,
    photoURL,
  });
};

export const getEmployeeDataById = async (uid: any) => {
  const docRef = doc(db, "employees", uid);
  const docSnap = await getDoc(docRef);
  let userData = {};

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    userData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return userData;
};

export const SendViewUser = async (userId: string, viewsNew: number) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, { views: viewsNew });
};

export const SendDataMetrics = async (userId: string, data: any) => {
  const userDocRef = doc(db, "users", userId);
  const res = await updateDoc(userDocRef, {
    DataMetrics: arrayUnion(data),
  });
  return res;
};

export const getAllTemplates = async () => {
  const templatesData: any[] = [];
  const querySnapshot = await getDocs(collection(db, "templates"));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const dataResult = doc.data();
      templatesData.push({ ...dataResult, id: doc.id });
    });
  }
  return templatesData;
};

export const SendTemplateSelected = async (userId: string, data: any[]) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const existingTemplateData = Array.isArray(userData.templateData) ? userData.templateData : [];
    existingTemplateData[0] = data[0];
    await setDoc(userDocRef, {templateData: existingTemplateData}, {merge: true}); // Sobrescribe el array templateData con los nuevos datos
    await localStorage.setItem("@user", JSON.stringify(userData));
  }
};

export const GetTemplate = async ({
  id,
  setId,
}: {
  id: string | null;
  setId: (e: string | null) => void;
}) => {
  if (id) {
    setId(null);
    const querySnapshot = await getDoc(doc(db, "templates", id));
    if (querySnapshot.exists()) {
      return querySnapshot.data();
    }
    return null;
  }
  return null;
};

export const GetAllSocialNetworks = async () => {
  const backgroundImages: any[] = [];
  const querySnapshot = await getDocs(collection(db, "logos"));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc: any) => {
      const dataResult = doc.data();
      backgroundImages.push({ ...dataResult, id: doc.id });
    });
  }
  return backgroundImages;
};
