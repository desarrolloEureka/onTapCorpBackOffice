import { Button } from "@mui/material";
import { MdDynamicFeed } from "react-icons/md";
import CustomCheckbox from "../CustomCheckbox";
import CustomModalAlert from "@/components/customModalAlert/CustomModalAlert";
import Image from "next/image";
import HomeContentHook from "./hook/HomeContentHook";
import BackgroundFormModal from "./components/BackgroundModal";

const TempladeContent = () => {
    const {
        modeTheme,
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
    } = HomeContentHook();

    return (
        <div
            className={`tw-bg-cover tw-bg-center ${screenHeight ? "" : "md:tw-min-h-screen"
                }`}
        >
            <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-w-[1300px] xl:tw-w-[1250px]">
                    {templates && templates.map((value: any, index: any) => {

                        const item = data?.templateData?.find((val: any) => {
                            return val.id === value.id;
                        });

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
                                                        {/* <Button
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
                                                        </Button> */}
                                                    </div>
                                                    <div className="tw-w-[50%] tw-h-[100%] tw-flex tw-items-start tw-justify-end ">
                                                        <div className="tw-w-[35%] tw-h-[80%] tw-flex tw-items-start tw-justify-center">
                                                            {data && (
                                                                <CustomCheckbox
                                                                    uid={data.uid}
                                                                    value={value}
                                                                    setTemplateSelect={setTemplateSelect}
                                                                    templates={data.templateData}
                                                                    checked={item ? item.checked : false}
                                                                    getUserData={getUserData}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center'>
                                                <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-center '>
                                                    <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-start'>
                                                        <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-center'>
                                                            {/*  <span
                                                            style={{ fontSize: '13px' }}
                                                            className='tw-text-white'
                                                        >
                                                            {dictionary?.homeView?.labelTemplate}{' '}
                                                            {index + 1}
                                                        </span> */}
                                                        </div>
                                                    </div>
                                                    <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end tw-pl-12 tw-mb-8'>
                                                        <Button
                                                            disabled={item ? !item.checked : true}
                                                            style={{ borderRadius: 0 }}
                                                            onClick={() => handleOpenModal(value)}
                                                            className='tw-w-[60%] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center'
                                                        >
                                                            <div className='tw-w-[100%] tw-h-[60%] tw-flex tw-items-center tw-justify-center'>
                                                                <MdDynamicFeed
                                                                    style={{
                                                                        fontSize: '2rem',
                                                                        color: 'white',
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    textTransform: 'none',
                                                                    borderRadius: 0,
                                                                }}
                                                                className='tw-w-[100%] tw-h-[40%] tw-flex tw-items-center tw-justify-center tw-mt-4'
                                                            >
                                                                <span
                                                                    style={{ fontSize: '9px' }}
                                                                    className='tw-text-white'
                                                                >
                                                                    Cambiar <br /> Fondo
                                                                </span>
                                                            </div>
                                                        </Button>
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

            <BackgroundFormModal
                isModalOpen={isModalOpen}
                handleClose={handleCloseModal}
                backgroundImages={backgroundImages}
                data={data}
                modeTheme={modeTheme}
                templateSelect={templateSelect}
                handleSelectBackground={handleSelectBackground}
            >
            </BackgroundFormModal>
        </div>
    );
};

export default TempladeContent;
