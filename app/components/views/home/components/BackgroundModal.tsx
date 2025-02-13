import { ModalParamsMainForm } from "@/types/modals";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import {
    InputAdornment,
    PaletteMode,
    TextField,
    Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Col, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import { Box, Button, Grid } from '@mui/material';
import Image from 'next/image';
import CustomCheckbox from "../../CustomCheckbox";

interface BackgroundFormModalProps {
    isModalOpen: boolean;
    handleClose: any,
    backgroundImages: any;
    data: any;
    modeTheme: any;
    templateSelect: any;
    handleSelectBackground: any;
}

const BackgroundFormModal = ({
    isModalOpen,
    handleClose,
    backgroundImages,
    data,
    modeTheme,
    templateSelect,
    handleSelectBackground
}: BackgroundFormModalProps) => {

    const theme = createTheme({
        palette: {
            mode: modeTheme as PaletteMode,
        },
    });

    return (
        <Modal
            size={"xl"}
            centered
            show={isModalOpen}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
            contentClassName={"modal-admin"}
            backdrop="static"
        >
            <ThemeProvider theme={theme}>
                <Modal.Title
                    className={`modal-title-admin tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                    as="h6"
                >
                    <span>Agregar los datos del fondo</span>
                    <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-center tw-items-center -tw-mt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center"
                            style={{
                                padding: 0,
                                background: "transparent",
                                border: "none",
                            }}
                        >
                            <IoMdClose size={35} color={"white"} />
                        </button>
                    </div>
                </Modal.Title>

                <Modal.Body className="tw-px-8">
                    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                        <div className="tw-flex tw-w-full tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body  tw-bg-[#396593]">
                            <div className="tw-flex tw-flex-col tw-px-3 tw-w-full">
                                <Grid container spacing={2}>
                                    {backgroundImages.map((item: any, index: any) => {
                                        const x = data?.templateData?.find((val: any) => {
                                            return (
                                                val.background_id === item.id
                                            );
                                        });

                                        return (
                                            <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
                                                <div className='max-sm:tw-h-[185px] tw-h-[280px] max-sm:tw-w-[130px] tw-relative tw-rounded-md tw-flex tw-items-center tw-justify-center tw-bg-white'>
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={`Image ${item.id}`}
                                                        width={110}
                                                        height={250}
                                                        className="max-sm:tw-w-[70px] max-sm:tw-h-[170px]"

                                                    />
                                                    <div className='tw-absolute max-sm:tw-w-[125px] tw-w-[275px] tw-h-[100%] tw-flex tw-flex-col tw-items-center tw-justify-center '>
                                                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-start tw-justify-center'>
                                                            <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-end'>
                                                                <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-items-center tw-justify-end'>
                                                                    <div className="tw-w-[45%] tw-h-[100%] tw-flex tw-items-center tw-justify-center max-lg:tw-mr-10 max-sm:tw-mr-1">
                                                                        {data && (
                                                                            <CustomCheckbox
                                                                                uid={data.uid}
                                                                                value={item}
                                                                                templates={data.templateData}
                                                                                checked={x ? x.checked : false}
                                                                                handleCloseModal={handleClose}
                                                                                handleSelectBackground={handleSelectBackground}
                                                                                selectedTemplate={templateSelect}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='tw-w-[100%] tw-h-[50%] tw-flex tw-items-end tw-justify-center '>
                                                            <div className='tw-w-[100%] tw-h-[30%] tw-flex tw-items-center tw-justify-start '>
                                                                <div className='max-sm:tw-w-[45%] tw-w-[25%] tw-h-[100%] tw-flex tw-items-center tw-justify-center tw-pl-3'>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </ThemeProvider>

            <Modal.Footer className="tw-flex tw-flex-row tw-justify-between">
                <Col className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-justify-end">

                </Col>
            </Modal.Footer>
        </Modal>
    );
};

export default BackgroundFormModal;
