'use client';
import React from 'react';
import { Button, Box, Modal } from '@mui/material';
import { Dictionary } from '@/types/dictionary';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const ModalAlert = ({
  isModalAlert,
  handleModalAlert,
  dictionary,
  handleDeleteData,
  noDeleted,
}: {
  isModalAlert: boolean;
  dictionary: Dictionary;
  handleModalAlert: () => void;
  handleDeleteData: () => void;
  noDeleted: boolean;
}) => {
  return (
    <Modal
      open={isModalAlert}
      onClose={handleModalAlert}
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
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 5,
          borderRadius: 3,
          position: 'relative',
        }}
      >
        <IconButton
          className='tw-absolute tw-right-1 tw-top-1'
          onClick={handleModalAlert}
        >
          <Close className='tw-text-white' />
        </IconButton>

        <div className='tw-w-[100%] tw-h-[70%] tw-flex tw-justify-center tw-justify-items-center  tw-pl-7 tw-pr-7 '>
          <div className='tw-w-[90%] tw-h-[90%] tw-flex tw-justify-center tw-justify-items-center tw-pb-8 '>
            <span>
              {noDeleted
                ? 'No puedes dejar este espacio vacío'
                : dictionary?.modalDelete?.labelMessage}
            </span>
          </div>
        </div>

        <div className='tw-w-[100%] tw-h-[30%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center tw-pl-8 tw-pr-8'>
          <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-border-r-black tw-border-r-[1px] tw-border-l-0 tw-border-b-0 tw-border-t-0 tw-border-solid tw-p-2'>
            <Button
              className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom'
              type='submit'
              style={{ textTransform: 'none' }}
              onClick={handleModalAlert}
            >
              {dictionary?.modalDelete?.buttonCancel}
            </Button>
          </div>
          <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-p-2'>
            <Button
              onClick={handleDeleteData}
              className='tw-w-[100%] tw-h-[100%] tw-text-white'
              type='submit'
              style={{ textTransform: 'none' }}
            >
              {dictionary?.modalDelete?.buttonConfirm}
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalAlert;
