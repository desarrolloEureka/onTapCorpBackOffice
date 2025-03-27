import { ModalIcons } from "@/types/modals";
import { Button, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Typography } from "@mui/material";

const IconsUrlModal = ({
    show,
    handleClose,
    dataLogos,
    handleDataNetworks,
    itemKey,
    val,
    modeTheme,
}: ModalIcons) => {
    const uniqueLogos = Array.from(new Map(dataLogos?.map((logo: any) => [logo.imageUrl, logo])).values());
    const globalLogos = uniqueLogos.filter((logo: any) => logo.type === "global");
    const companyLogos = uniqueLogos.filter((logo: any) => logo.type === "company");
    
    return dataLogos && (
        <Modal
            centered
            show={show}
            onHide={handleClose}
            aria-hidden="false"
            aria-modal="true"
            backdrop="static"
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
                <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-p-3">
                    <div className="tw-w-full">
                        {/* Iconos Globales */}
                        <Typography
                            variant="h6"
                            className="tw-text-center tw-mb-3"
                            style={{ color: modeTheme === "light" ? "black" : "white" }}
                        >
                            Íconos Globales
                        </Typography>
                        <div
                            className="tw-grid tw-grid-cols-5 tw-gap-x-0.5 tw-overflow-y-auto tw-max-h-[250px]"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#888 transparent",
                            }}
                        >
                            {globalLogos?.map((logo: any, index: any) => (
                                <IconCard
                                    key={logo.id}
                                    logo={logo}
                                    modeTheme={modeTheme}
                                    val={val}
                                    handleDataNetworks={handleDataNetworks}
                                    itemKey={itemKey}
                                />
                            ))}
                        </div>

                        {/* Iconos de la Compañía */}
                        <Typography
                            variant="h6"
                            className="tw-text-center tw-mt-5 tw-mb-3"
                            style={{ color: modeTheme === "light" ? "black" : "white" }}
                        >
                            Íconos de la Compañía
                        </Typography>
                        {companyLogos && companyLogos.length > 0 ?
                            <div
                                className="tw-grid tw-grid-cols-5 tw-gap-x-0.5 tw-overflow-y-auto tw-max-h-[250px]"
                                style={{
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#888 transparent",
                                }}
                            >
                                {companyLogos.map((logo: any, index: any) => (
                                    <IconCard
                                        key={logo.id}
                                        logo={logo}
                                        modeTheme={modeTheme}
                                        val={val}
                                        handleDataNetworks={handleDataNetworks}
                                        itemKey={itemKey}
                                    />
                                ))}
                            </div>
                            :
                            <div className="tw-grid tw-max-h-[250px] tw-py-2">
                                <Typography className="tw-text-center tw-text-gray-500" style={{ fontSize: 16 }}>
                                    No hay logos de redes sociales disponibles. Por favor, cree algunos primero.
                                </Typography>
                            </div>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const IconCard = ({ logo, modeTheme, val, handleDataNetworks, itemKey }: any) => (
    <div className="tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center">
        <div className="tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center">
            <Typography
                className="tw-text-center truncate"
                style={{
                    fontSize: 14,
                    color: modeTheme === "light" ? "black" : "white",
                    maxWidth: 90,
                }}
            >
                {logo.imageName.length > 8 ? logo.imageName.substring(0, 10) : logo.imageName}
            </Typography>
            <Button
                onClick={() => handleDataNetworks(logo.imageName, itemKey)}
                className={`${val && val?.[6] === logo.imageName ? "tw-bg-[#396593]" : "tw-bg-[#b8bcc0]"} tw-p-2 tw-min-w-min`}
                style={{
                    border: "none",
                }}
            >
                <div className="tw-flex tw-flex-col tw-items-center tw-w-[38px] tw-h-[38px]">
                    <Image
                        src={logo.imageUrl}
                        alt={logo.imageName}
                        width={39}
                        height={39}
                    />
                </div>
            </Button>
        </div>
    </div>
);

export default IconsUrlModal;
