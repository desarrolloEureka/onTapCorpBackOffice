import { GetUser } from "@/firebase/user";
import { getAllTemplates } from "@/firebase/user";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { useState, useEffect } from "react";
import CustomModalAlert from "@/components/customModalAlert/CustomModalAlert";
import CustomCheckbox from "../CustomCheckbox";

interface TemplateType {
    id: string;
    name: string;
    image: string;
}

const HomeContent = () => {
    const [templateSelect, setTemplateSelect] = useState<TemplateType>({
        id: "",
        name: "",
        image: "",
    });
    const [isAlertProfile, setIsAlertProfile] = useState(false);
    const handleAlertProfile = (status: boolean) =>
        setIsAlertProfile(!isAlertProfile);
    const [data, setData] = useState<any>(null);
    const [templates, setTemplates] = useState<any>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await GetUser();
            setData(userData);
        };

        const fetchTemplate = async () => {
            const templateData = await getAllTemplates();
            setTemplates(templateData);
        };

        fetchTemplate();
        fetchUser();
    }, []);

    const handlePreview = async () => {
        const urlSplit = window.location.href.split("/");
        const baseUrl = `http://${urlSplit[2]}/components/views/cardView?&platform=template`;
        if (data) {
            window.open(baseUrl);
        } else {
            setIsAlertProfile(true);
        }
    };

    const screenHeight = useMediaQuery("(max-height: 745px)");

    return (
        <div
            className={`tw-bg-cover tw-bg-center ${
                screenHeight ? "" : "md:tw-min-h-screen"
            }`}
        >
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-w-[1300px] xl:tw-w-[1250px]">
                    {templates.map((value: any, index: any) => {
                        const item = data?.templateData?.find(
                            (val: any) => val.id === value.id,
                        );
                        return (
                            <div
                                key={index}
                                className={`max-sm:tw-h-[520px] tw-h-[600px] tw-flex tw-items-center tw-justify-center`}
                            >
                                <div className="tw-relative tw-rounded-md max-sm:tw-h-[90%] tw-h-[80%] tw-w-[355px] tw-flex tw-items-center tw-justify-center">
                                    <div className="tw-relative tw-rounded-md tw-h-[100%] tw-w-[95%] tw-flex tw-items-center tw-justify-center tw-bg-[#396593]">
                                        <Image
                                            priority
                                            src={value.image}
                                            alt={`Image ${value.image}`}
                                            width={197}
                                            height={425}
                                        />
                                        <div className="tw-absolute tw-w-[350px] tw-h-[460px] tw-flex tw-flex-col tw-items-center tw-justify-start">
                                            <div className="tw-w-[95%] tw-h-[90%] tw-flex tw-items-start tw-justify-center">
                                                <div className="tw-w-[100%] tw-h-[25%] tw-flex tw-items-center tw-justify-center ">
                                                    <div className="tw-w-[50%] tw-h-[100%] tw-flex tw-items-start tw-justify-start">
                                                        <Button
                                                            onClick={() =>
                                                                handlePreview()
                                                            }
                                                            disabled={
                                                                item
                                                                    ? !item.checked
                                                                    : true
                                                            }
                                                        >
                                                            <div className="tw-w-[40%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center">
                                                                <div className="tw-w-[100%] tw-h-[50%] tw-flex tw-items-center tw-justify-center">
                                                                    <VisibilityIcon
                                                                        style={{
                                                                            fontSize:
                                                                                "1.6rem",
                                                                            color: "white",
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center">
                                                                    <span
                                                                        style={{
                                                                            fontSize:
                                                                                "9px",
                                                                        }}
                                                                        className="tw-text-white"
                                                                    >
                                                                        VISTA{" "}
                                                                        <br />
                                                                        PREVIA
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                    <div className="tw-w-[50%] tw-h-[100%] tw-flex tw-items-start tw-justify-end ">
                                                        <div className="tw-w-[35%] tw-h-[80%] tw-flex tw-items-start tw-justify-center">
                                                            {data && (
                                                                <CustomCheckbox
                                                                    uid={
                                                                        data.uid
                                                                    }
                                                                    value={
                                                                        value
                                                                    }
                                                                    setTemplateSelect={
                                                                        setTemplateSelect
                                                                    }
                                                                    templates={
                                                                        data.templateData
                                                                    }
                                                                    checked={
                                                                        item
                                                                            ? item.checked
                                                                            : false
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <CustomModalAlert
                handleModalAlert={handleAlertProfile}
                title={"One Tap dice!"}
                description={"Debes registrar los datos en el perfil"}
                isModalAlert={isAlertProfile}
                isClosed={true}
            />
        </div>
    );
};

export default HomeContent;
