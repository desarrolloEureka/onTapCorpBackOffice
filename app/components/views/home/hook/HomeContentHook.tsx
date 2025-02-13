import { useState, useEffect } from "react";
import { getAllBackgrounds, getAllTemplates } from "@/firebase/user";
import useAuth from "@/firebase/auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LocalVariable } from "@/types/global";

interface TemplateType {
    id: string;
    name: string;
    image: string;
}

const HomeContentHook = () => {
    const { userData: data, getUserData } = useAuth();
    const [templateSelect, setTemplateSelect] = useState<any>();
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

    useEffect(() => {
        const fetchTemplate = async () => {
            const templateData = await getAllTemplates();
            setTemplates(templateData);
        };

        const fetchBackground = async () => {
            const backgroundData = await getAllBackgrounds();
            setBackgroundImages(backgroundData);
        };

        fetchTemplate();
        fetchBackground();
    }, [isModalOpen]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleOpenModal = (item: any) => {
        setTemplateSelect(item.id);
        setIsModalOpen(true);
    }

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
        getUserData
    }
};

export default HomeContentHook;
