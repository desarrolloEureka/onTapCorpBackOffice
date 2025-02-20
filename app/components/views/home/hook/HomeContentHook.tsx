import { useState, useEffect, useCallback } from "react";
import { getAllTemplates } from "@/firebase/user";
import useAuth from "@/firebase/auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LocalVariable } from "@/types/global";
import { getCompanyByIdQuery, getLogosByCompanyIdQuery } from "@/queries/documentsQueries";

const HomeContentHook = () => {
    const { userData: data, getUserData } = useAuth();
    const [templateSelect, setTemplateSelect] = useState<any>();
    const [dataCompanyByUser, setDataCompanyByUser] = useState<any>();
    const [isAlertProfile, setIsAlertProfile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAlertProfile = (status: boolean) => setIsAlertProfile(!isAlertProfile);
    const [templates, setTemplates] = useState<any>([]);
    const [backgroundImages, setBackgroundImages] = useState<any>([]);
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;
    const [backgroundSelect, setBackgroundSelect] = useState<{ id: string }>();

    const handleSelectBackground = (item: any) => {
        const data = {
            id: item.id,
        };
        setBackgroundSelect(data);
    };

    const getCompanyData = useCallback(async () => {
        if (!data?.companyId) return;
        const dataCompany = await getCompanyByIdQuery(data.companyId, "companies");
        setDataCompanyByUser(dataCompany);
    }, [data?.companyId]);

    useEffect(() => {
        const fetchTemplate = async () => {
            const templateData = await getAllTemplates();
            setTemplates(templateData);
        };

        const fetchBackground = async () => {
            const backgroundData = await getLogosByCompanyIdQuery(data?.companyId, "backgroundImages");
            setBackgroundImages(backgroundData);
        };

        fetchTemplate();
        fetchBackground();
        getCompanyData();

    }, [data?.companyId, isModalOpen, getCompanyData]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (item: any) => {
        setTemplateSelect(item.id);
        setIsModalOpen(true);
    };

    const screenHeight = useMediaQuery("(max-height: 745px)");

    return {
        modeTheme: themeParsed?.dataThemeMode,
        templateSelect,
        setTemplateSelect,
        isAlertProfile,
        setIsAlertProfile,
        handleAlertProfile,
        templates,
        setTemplates,
        backgroundImages,
        setBackgroundImages,
        data,
        screenHeight,
        isModalOpen,
        setIsModalOpen,
        handleCloseModal,
        handleOpenModal,
        backgroundSelect,
        setBackgroundSelect,
        handleSelectBackground,
        getUserData,
        dataCompanyByUser,
        getCompanyData
    };
};

export default HomeContentHook;
