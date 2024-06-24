import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "shared/firebase/firebase";
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

    //   const getRole = useCallback(async () => {
    //     if (user) {
    //       const document = await getDoc(doc(db, 'usersData', user.uid));
    //       if (document.exists()) {
    //         const roleDocument = await getDoc(
    //           document.data().roleRef as DocumentReference
    //         );
    //         if (roleDocument.exists()) {
    //           setRole({
    //             ...roleDocument.data(),
    //             id: roleDocument.id,
    //             isAdmin: roleDocument.data().slug === 'admin',
    //           } as Role);
    //         }
    //       }
    //     } else if (user === null) {
    //       setRole(null);
    //     }
    //   }, [user]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser, (error: any) => {
            setError(error.toString());
        });
        return () => {
            unsubscribe();
            // if (user !== undefined) {
            //     setIsLoading(false);
            // }
        };
    }, []);

    //   useEffect(() => {
    //     getRole();
    //   }, [getRole]);

    useEffect(() => {
        console.log("user", user);
        if (user !== undefined) {
            setIsLoading(false);
            user?.getIdToken().then((token) => setAccessTokenUser(token));
            // console.log(accessTokenUser);
        }
    }, [user, accessTokenUser]);

    return {
        isLoading,
        user,
        error,
        accessTokenUser,
    };
};
export default useAuth;
