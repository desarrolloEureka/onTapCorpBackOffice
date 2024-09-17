import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';
import { Dictionary } from '@/types/dictionary';

const ModalSuccessDelete = ({
  isSuccessDelete,
  handleSuccessDelete,
  dictionary,
}: {
  isSuccessDelete: boolean;
  dictionary: Dictionary;
  handleSuccessDelete: () => void;
}) => {
  return (
    <Modal
      open={isSuccessDelete}
      onClose={handleSuccessDelete}
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
          onClick={handleSuccessDelete}
        >
          <Close className='tw-text-white' />
        </IconButton>

        <Typography className=' tw-text-lg tw-font-bold tw-text-white tw-text-center'>
          {dictionary.generalTitle}
        </Typography>
        <Typography className='tw-text-white tw-my-2'>
          {dictionary?.profileView.labelDeleteProfiledata}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalSuccessDelete;
