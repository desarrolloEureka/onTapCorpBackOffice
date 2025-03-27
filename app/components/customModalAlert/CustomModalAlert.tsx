import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';

function CustomModalAlert({
  isModalAlert,
  handleModalAlert,
  title,
  description,
  isClosed,
}: {
  isModalAlert: boolean;
  handleModalAlert: (e: boolean) => void;
  description: string;
  title: string;
  isClosed?: boolean;
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
          bgcolor: '#030124',
          padding: 5,
          borderRadius: 3,
          position: 'relative',
          maxWidth: 500,
          width: '90%',
          margin: 'auto',
          boxShadow: 24,
        }}
      >
        {isClosed && (
          <IconButton
            className='tw-absolute tw-right-1 tw-top-1'
            onClick={() => handleModalAlert(false)}
          >
            <Close className='tw-text-white' />
          </IconButton>
        )}
        <Typography className=' tw-text-lg tw-font-bold tw-text-white tw-text-center'>
          {title}
        </Typography>
        <Typography className='tw-text-white tw-my-2  tw-text-center'>{description}</Typography>
      </Box>
    </Modal>
  );
}

export default CustomModalAlert;
