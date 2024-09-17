'use client';
import React from 'react';
import {
    Button,
    Box,
    Modal,
    IconButton,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dictionary } from '@/types/dictionary';
import { Close } from '@mui/icons-material';

const ModalAlertLimit = ({
    isModalAlertLimit,
    handleModalAlertLimit,
    dictionary,
}: {
    isModalAlertLimit: boolean;
    handleModalAlertLimit: () => void;
    dictionary: Dictionary;
}) => {
    return (
        <Modal
            open={isModalAlertLimit}
            onClose={handleModalAlertLimit}
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
                    padding: 7,
                    borderRadius: 3,
                    position: 'relative',
                }}
            >
                <IconButton
                    className='tw-absolute tw-right-1 tw-top-1'
                    onClick={handleModalAlertLimit}
                >
                    <Close className='tw-text-white' />
                </IconButton>

                <Typography className=' tw-text-lg tw-font-bold tw-text-white tw-text-center'>
                    {dictionary?.modalLimit?.labelAlert}
                </Typography>
                <Typography className='tw-text-white tw-my-2'>
                    {dictionary?.modalLimit?.labelMessage}
                </Typography>
            </Box>
        </Modal>
        /*     <Modal
                className='tw-flex tw-justify-center tw-justify-items-center tw-pt-[360px] tw-pb-[360px] tw-pl-60 tw-pr-60'
                open={isModalAlertLimit}
                onClose={() => handleModalAlertLimit(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box className='tw-flex tw-flex-col tw-justify-evenly max-sm:tw-w-[90%]  sm:tw-w-[90%]  md:tw-w-[80%] lg:tw-w-[80%] 2xl:tw-w-[40%] tw-rounded-2xl tw-bg-[#02AF9B] tw-relative'>
                    <div className='tw-absolute tw-right-1 tw-top-2'>
                        <Button
                            color='secondary'
                            className='tw-h-[100%] tw-w-[100%]'
                            startIcon={
                                <CloseIcon
                                    style={{
                                        color: '#ffffff',
                                        fontSize: '1.8rem',
                                        marginLeft: '0.5rem',
                                    }}
                                />
                            }
                            onClick={() => handleModalAlertLimit(false)}
                        />
                    </div>
    
                    <div className='tw-w-[100%] tw-h-[15%] tw-flex tw-justify-center tw-justify-items-center'>
                        <div className='tw-w-[85%] tw-h-[75%]'>
                            <h4>{dictionary?.modalLimit?.labelAlert}</h4>
                        </div>
                    </div>
    
                    <div className='tw-w-[100%] tw-h-[85%] tw-flex tw-justify-center tw-justify-items-center'>
                        <div className='tw-w-[90%] tw-h-[90%] tw-flex tw-justify-center tw-justify-items-center '>
                            <span className='tw-pt-14'>
                                {dictionary?.modalLimit?.labelMessage}
                            </span>
                        </div>
                    </div>
                </Box>
            </Modal> */
    );
};

export default ModalAlertLimit;