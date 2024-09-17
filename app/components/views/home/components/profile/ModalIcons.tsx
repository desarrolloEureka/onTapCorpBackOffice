import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Button, Typography } from '@mui/material';
import React from 'react';
import { Dictionary } from '@/types/dictionary';
import Image from 'next/image';

const ModalIcons = ({
    isModalIcons,
    setModalIcons,
    dictionary,
    value,
    val,
    keyItem,
    handleDataNetworks,
    dataLogos
}: {
    isModalIcons: boolean;
    dictionary: Dictionary;
    setModalIcons: (e: boolean) => void;
    handleDataNetworks: (e: any) => void;
    value: any;
    val: any;
    keyItem: any;
    dataLogos: any;
}) => {

    return (
        <Modal
            open={isModalIcons}
            onClose={setModalIcons}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            className='tw-flex tw-justify-center tw-items-center'
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#02AF9B',
                    padding: 5,
                    borderRadius: 3,
                    position: 'relative',
                }}
            >
                <IconButton
                    className='tw-absolute tw-right-1 tw-top-1'
                    onClick={() => setModalIcons(false)}
                >
                    <Close className='tw-text-white' />
                </IconButton>

                <div className='tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-p-3'>
                    <div className='tw-grid tw-grid-cols-5 tw-gap-x-0.5 tw-w-full tw-overflow-y-scroll tw-max-h-[550px]'>
                        {dataLogos && dataLogos.map((logo: any, index: any) => (
                            <div key={index} className='tw-h-[90px] tw-w-[70px] tw-flex tw-justify-center tw-items-center'>
                                <div className='tw-h-[90%] tw-w-[50px] tw-flex tw-flex-col tw-justify-center tw-items-center'>
                                    <Typography className='tw-text-white tw-text-xs tw-text-center truncate'>
                                        {logo.name.length > 8 ? logo.name.substring(0, 10) : logo.name}
                                    </Typography>
                                    <Button
                                        onClick={(text: any) =>
                                            handleDataNetworks({
                                                name: value[0],
                                                text: logo.name,
                                                subindex: 'icon',
                                                key: keyItem,
                                            })
                                        }
                                        className={`${val.icon === logo.name ? 'tw-bg-[#b8bcc0]' : 'tw-bg-white'
                                            } tw-p-2 tw-min-w-min`}
                                    >
                                        <div className='tw-flex tw-flex-col tw-items-center tw-w-[35px] tw-h-[35px]'>
                                            <Image src={logo.image} alt={logo.name} width={35} height={35} />
                                        </div>
                                    </Button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalIcons;