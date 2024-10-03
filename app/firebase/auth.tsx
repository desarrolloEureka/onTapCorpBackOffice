"use client";
import { getDocumentsByIdQuery } from "@/queries/documentsQueries";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "shared/firebase/firebase";

interface Role {
    id: string;
    name: string;
    slug: string;
    isAdmin: boolean;
}

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>();
    const [role, setRole] = useState<Role | null>();
    const [error, setError] = useState<string>();
    const [accessTokenUser, setAccessTokenUser] = useState<string>("");
    const [userData, setUserData] = useState<any>();
    const [companyData, setCompanyData] = useState<any>();

    const getRole = useCallback(async () => {
        if (user) {
            // Obtiene el documento del usuario desde Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Obtiene el rolId del documento del usuario
                const roleId = userData.rolId;

                // Determina el rol del usuario en función del rolId
                let role: Role = {
                    id: roleId,
                    name: "",
                    slug: "",
                    isAdmin: false,
                };

                switch (roleId) {
                    case "vE7NrHpiRU2s1Gjv5feg":
                        role.name = "Superadmin";
                        role.slug = "superadmin";
                        break;
                    case "LJTfIeCONNjlxsyooofx":
                        role.name = "Operativo";
                        role.slug = "operativo";
                        break;
                    case "TZ3vIk6qaQ97Pej1qqwV":
                        role.name = "Administrativo";
                        role.slug = "administrativo";
                        role.isAdmin = true;
                        break;
                    case "uysG1ULyEDklfbGDFate":
                        role.name = "Empleado";
                        role.slug = "empleado";
                        break;
                    default:
                        role.name = "Desconocido";
                        role.slug = "desconocido";
                        break;
                }

                // Guardar solo el slug en el almacenamiento local
                setRole(role);
                await localStorage.setItem("userRoleSlug", role.slug); // Guarda el rol en localStorage
            } else {
                setRole(null);
                localStorage.removeItem("userRoleSlug"); // Limpia el rol si no existe
            }
        } else if (user === null) {
            setRole(null);
            localStorage.removeItem("userRoleSlug"); // Limpia el rol si no hay usuario
        }
    }, [user]);

    const getUserData = useCallback(async () => {
        if (user) {
            const userId: string | undefined = user?.uid;
            // Obtiene el documento del usuario desde Firestore
            const userDoc = await getDoc(doc(db, "users", userId));
            userDoc && setUserData(userDoc.data());

            if (userDoc.data()?.companyId) {
                const result = await getDocumentsByIdQuery(
                    "companies",
                    userDoc.data()?.companyId,
                );
                result && setCompanyData(result);
            }
        }
    }, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser, (error: any) => {
            setError(error.toString());
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        getRole();
    }, [getRole]);

    useEffect(() => {
        if (user !== undefined) {
            getUserData();
            setIsLoading(false);
            user?.getIdToken().then((token) => setAccessTokenUser(token));
        }
    }, [user, accessTokenUser, getUserData]);

    return {
        isLoading,
        user,
        error,
        accessTokenUser,
        userData,
        companyData,
    };
};
export default useAuth;
