import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/firebase/auth";
import { DemoChangerElement, LoginParams } from "@/types/user";
import {
    registerFirebase,
    saveUserById,
    updateProfileFirebase,
} from "@/firebase/user";
import { LoginData, ProfileData } from "@/data/user";


const SingInHook = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");
    const [data, setData] = useState(LoginData);
    const { email, password, fullName } = data;
    const [signOut, setSignOut] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const SwitcherButton = () => {
        let demoChanger: DemoChangerElement | null =
            document.querySelector(".demo_changer");
        if (demoChanger) {
            demoChanger.style.right = "0px";
        }
        document.querySelector(".demo_changer")?.classList?.toggle("active");
    };

    const remove = () => {
        let demoChanger: DemoChangerElement | null =
            document.querySelector(".demo_changer");

        if (demoChanger) {
            demoChanger.style.right = "-270px";
        }
        document.querySelector(".demo_changer")?.classList?.remove("active");
    };

    const handleSignUp = async ({ email, password }: LoginParams) => {
        setSignOut(true);
        const res = await registerFirebase(email, password)
            .then((result) => {
                const newUser = result.user;
                if (newUser !== null) {
                    // console.log(result);
                    saveUserById({
                        ...ProfileData,
                        uid: newUser?.uid,
                        displayName: fullName,
                        email: newUser?.email,
                        emailVerified: newUser?.emailVerified,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const updateUserProfile = useCallback(() => {
        updateProfileFirebase(fullName);
    }, [fullName]);

    useEffect(() => {
        if (user) {
            updateUserProfile();
            router.replace("/components/home");
        }
    }, [router, updateUserProfile, user]);

    return {
        SwitcherButton,
        remove,
        email,
        fullName,
        password,
        isLoading,
        handleSignUp,
        changeHandler,
        error,
        setError,
        signOut,
        showPassword,
        setShowPassword,
    };
};

export default SingInHook;
