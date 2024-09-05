import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, firebaseConfig } from "shared/firebase/firebase";
import axios from "axios";

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
    confirmPassword: string,
) => await confirmPasswordReset(auth, oobCode, confirmPassword);

export const updateProfileFirebase = async (
    displayName: string,
    photoURL?: string,
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
