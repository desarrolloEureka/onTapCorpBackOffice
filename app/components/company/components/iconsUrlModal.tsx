import { ModalIcons } from "@/types/modals";
import { Button, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import { Typography } from "@mui/material";

const IconsUrlModal = ({
    show,
    handleClose,
    dataLogos,
    handleDataNetworks,
    itemKey,
    val,
    modeTheme
}: ModalIcons) => {
    return dataLogos && (
        <Modal
            centered
            show={show}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
        >
            <Modal.Title
                className={`modal-title tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between`}
                as="h6"
            >
                <span>Seleccionar icono</span>
                <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-center tw-items-center -tw-mt-2">
                    <Button
                        onClick={handleClose}
                        className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center"
                        style={{
                            padding: 0,
                            background: "transparent",
                            border: "none",
                        }}
                    >
                        <IoMdClose size={35} color={"gray"} />
                    </Button>
                </div>
            </Modal.Title>

            <Modal.Body
                className="tw-px-8"
                style={{ borderTop: "2px solid #396593", marginTop: 6 }}
            >
                <div className='tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-p-3'>
                    <div className='tw-grid tw-grid-cols-5 tw-gap-x-0.5 tw-w-full tw-overflow-y-scroll tw-max-h-[550px]'>
                        {dataLogos && dataLogos.map((logo: any, index: any) => (
                            <div key={index} className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                                <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                    <Typography className='tw-text-center truncate' style={{ fontSize: 14, color: modeTheme === 'light' ? 'black' : 'white' }}>
                                        {logo.imageName.length > 8 ? logo.imageName.substring(0, 10) : logo.imageName}
                                    </Typography>
                                    <Button
                                        onClick={() => handleDataNetworks(logo.imageName, itemKey)}
                                        className={`${val && val?.[6] === logo.imageName ? 'tw-bg-[#396593]' : 'tw-bg-[#b8bcc0]'} tw-p-2 tw-min-w-min`}
                                        style={{
                                            border: "none"
                                        }}
                                    >
                                        <div className='tw-flex tw-flex-col tw-items-center tw-w-[38px] tw-h-[38px]'>
                                            <Image src={logo.imageUrl} alt={logo.imageName} width={39} height={39} />
                                        </div>
                                    </Button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    );
};

export default IconsUrlModal;
