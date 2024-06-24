"use client";
import { main_logo_dark, main_logo_light } from "@/globals/images";
import Logout from "@/hook/Logout";
import { LocalVariable } from "@/types/global";
import useAuth from "@/firebase/auth";
import { getProfileDataByIdFb } from "@/firebase/user";
import { useCallback, useEffect, useState } from "react";
import { ProfileData } from "@/data/user";

function HeaderHook() {
    const { logOut } = Logout();
    const { user } = useAuth();
    const [data, setData] = useState<any>(ProfileData);

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;
    const main_logo = themeParsed
        ? themeParsed.dataThemeMode === "light"
            ? main_logo_dark.src
            : main_logo_light.src
        : main_logo_dark.src;

    const getUserProfileData = useCallback(async () => {
        if (user) {
            const userData: any = await getProfileDataByIdFb(user?.uid);
            setData(userData);
            // console.log({ ...userData });
        }
    }, [user]);

    useEffect(() => {
        getUserProfileData();
    }, [getUserProfileData]);

    return { logOut, main_logo, data };
}

export default HeaderHook;
