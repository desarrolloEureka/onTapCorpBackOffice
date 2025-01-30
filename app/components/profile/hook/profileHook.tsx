import { ProfileData } from "@/data/user";
import useAuth from "@/firebase/auth";
import {
    getProfileDataByIdFb,
    saveUserById,
    updateUserPassword,
} from "@/firebase/user";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
    // sendData: (e: any) => void;
};

const ProfileHook = (props?: Props) => {
    const { user, accessTokenUser } = useAuth();

    const router = useRouter();

    const [key, setKey] = useState<any>("first");
    const [data, setData] = useState<any>(ProfileData);
    // const [editData, setEditData] = useState<any>();
    const [isDisabled, setIsDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [errorPass, setErrorPass] = useState(false);

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const ConfirmPasswordAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "La contraseña se guardó correctamente",
            showConfirmButton: false,
            timer: 2000,
        });
    };
    
    const ConfirmProfileAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "La información del perfil se guardó correctamente",
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
            setKey("first");
        });
    };

    const ErrorAlert = () => {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Ocurrió un error al guardar",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const passValidation = data.confirmPassword === data.password;

    const handleUpdateProfile = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    
        const { password, confirmPassword, ...rest } = data;
    
        try {
            if (password && confirmPassword) {
                if (passValidation) {
                    // Guardar la contraseña
                    await updateUserPassword({
                        uid: data.uid,
                        password,
                        accessTokenUser,
                    });
    
                    ConfirmPasswordAlert();
    
                    // Guardar la información del perfil
                    await saveUserById({
                        ...rest,
                        uid: user?.uid,
                        emailVerified: user?.emailVerified,
                    });
    
                    ConfirmProfileAlert();
                } else {
                    setErrorPass(true);
                }
            } else {
                // Solo guardar la información del perfil
                await saveUserById({
                    ...rest,
                    uid: user?.uid,
                    emailVerified: user?.emailVerified,
                });
    
                ConfirmProfileAlert();
            }
        } catch (error) {
            ErrorAlert();
        }
    };

    const getUserProfileData = useCallback(async () => {
        user &&
            (await getProfileDataByIdFb(user?.uid).then((res) => {
                setData(!_.isEmpty(res) ? res : ProfileData);
            }));
        // setEditData(userData);
        // console.log({ ...userData });
    }, [user]);

    //console.log("data", data)
    useEffect(() => {
        getUserProfileData();
    }, [getUserProfileData]);

    // useEffect(() => {
    //     if (editData) {
    //         setIsDisabled(_.isEqual(data, editData));
    //         _.isEqual(data, editData) ? console.log(isDisabled) : console.log("No entro");
    //         console.log(isDisabled);
    //     }
    // }, [data, editData, isDisabled]);

    return {
        data,
        isDisabled,
        key,
        router,
        setKey,
        changeHandler,
        handleUpdateProfile,
        showPassword,
        setShowPassword,
        errorPass,
        setErrorPass,
    };
};

export default ProfileHook;
