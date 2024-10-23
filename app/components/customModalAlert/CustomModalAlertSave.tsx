import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';

function CustomModalAlertSave({
  isModalAlert,
  handleModalAlert,
  title,
  description,
  isClosed,
  handleAccept,
  handleCancel,
  isProUser,
  handleCloseXModal
}: {
  isModalAlert: boolean;
  handleModalAlert: (e: boolean) => void;
  handleAccept: (e: boolean) => void;
  handleCancel: () => void;
  handleCloseXModal: () => void;
  description: string;
  title: string;
  isClosed?: boolean;
  isProUser: boolean;
}) {
  return (
    <Modal
      open={isModalAlert}
      onClose={() => (isClosed ? handleModalAlert(false) : null)}
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
        {isClosed && (
          <IconButton
            className='tw-absolute tw-right-1 tw-top-1'
            //onClick={() => handleModalAlert(false)}
            onClick={() => handleCloseXModal()}
          >
            <Close className='tw-text-white' />
          </IconButton>
        )}
        <Typography className=' tw-text-lg tw-font-bold tw-text-white tw-text-center'>
          {title}
        </Typography>
        <Typography className='tw-text-white tw-my-2'>{description}</Typography>

        <div className='tw-w-[100%] tw-h-[30%] tw-border-t-white tw-border-t-[0.5px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center tw-pl-8 tw-pr-8 tw-mt-3'>
          <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-border-r-white tw-border-r-[0.5px] tw-border-l-0 tw-border-b-0 tw-border-t-0 tw-border-solid tw-p-2'>
            <Button
              className='tw-w-[100%] tw-h-[100%] tw-text-white tw-text-custom'
              type='submit'
              style={{ textTransform: 'none' }}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
          <div className='tw-w-[50%] tw-h-[100%] tw-flex tw-justify-center tw-justify-items-center tw-p-2'>
            <Button
              onClick={() => handleAccept(isProUser)}
              className='tw-w-[100%] tw-h-[100%] tw-text-white'
              type='submit'
              style={{ textTransform: 'none' }}
            >
              Aceptar
            </Button>
          </div>
        </div>

      </Box>
    </Modal>
  );
}

export default CustomModalAlertSave;
