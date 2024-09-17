import { LoginData } from "@/data/user";
import useAuth from "@/firebase/auth";
import { loginFirebase, getProfileDataByIdFb } from "@/firebase/user";
import { LoginParams } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ErrorAlert = () => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "Las credenciales son incorrectas, intenta de nuevo.",
        showConfirmButton: false,
        timer: 2000,
    });
};

const SignUpHook = () => {
    const { user, isLoading } = useAuth();
    const [error, setError] = useState("");
    const [data, setData] = useState(LoginData);
    const router = useRouter();
    const { email, password } = data;
    const [sigIn, setSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async ({ email, password }: LoginParams) => {
        setError("");
        try {
            const result = await loginFirebase(email, password);
            setError("");
            setSignIn(true);
    
            if (result && result.user) {
                const user = await getProfileDataByIdFb(result.user.uid);
                await localStorage.setItem('@user', JSON.stringify(user));
            }
        } catch (error) {
            setError("Las credenciales son incorrectas, intenta de nuevo.");
            setSignIn(false);
        }
    };

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (user) {
            router.replace("/components/home");
        }
    }, [router, user]);

    return {
        handleSignIn,
        isLoading,
        email,
        password,
        error,
        setError,
        changeHandler,
        sigIn,
        setShowPassword,
        showPassword,
    };
};

export default SignUpHook;
