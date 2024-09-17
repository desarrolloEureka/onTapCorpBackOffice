'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Input,
  Box,
  Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Dictionary } from '@/types/dictionary';
import IconTikTok from './IconTikTok';

const ModalProfile = ({
  isModalOpen,
  handleModal,
  dictionary,
}: {
  isModalOpen: boolean;
  handleModal: () => void;
  dictionary: Dictionary;
}) => {
  const [showUrls, setShowUrls] = useState(false);

  const handleOpenUrl = () => {
    setShowUrls(!showUrls);
  };

  return (
    <Modal
      className='tw-flex tw-justify-center tw-justify-items-center tw-pt-40 tw-pb-40'
      open={isModalOpen}
      onClose={handleModal}
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
            onClick={handleModal}
          />
        </div>

        <div className='tw-w-[100%] tw-h-[15%]  tw-flex tw-justify-center tw-justify-items-center'>
          <div className='tw-w-[85%] tw-h-[75%]'>
            <h4>{dictionary?.profileView.titleNewData}</h4>
          </div>
        </div>

        <div className='tw-w-[100%] tw-h-[75%] tw-flex tw-justify-center tw-justify-items-center'>
          <div className='tw-w-[85%] tw-h-[95%]'>
            <div className='tw-h-1/3 tw-w-[100%] tw-flex'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 5, width: '75ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelDataName}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-1/3 tw-w-[100%] tw-flex'>
              <FormControl
                variant='standard'
                sx={{ m: 1, mt: 1, width: '75ch' }}
              >
                <Input
                  id='standard-adornment-weight'
                  aria-describedby='standard-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
                <FormHelperText id='standard-weight-helper-text'>
                  {dictionary?.profileView.labelOptionalUrl}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='tw-h-1/3 tw-w-[100%] tw-flex '>
              <div className='tw-h-[100%] tw-w-[70px] tw-flex  tw-justify-center tw-items-center'>
                <Button onClick={handleOpenUrl}>
                  <Avatar
                    sx={{
                      backgroundColor: '#ffffff', // Fondo circular blanco
                      width: 45,
                      height: 45,
                    }}
                  >
                    <LocalGroceryStoreOutlinedIcon sx={{ color: '#396593' }} />
                  </Avatar>
                </Button>
              </div>
              <div className='tw-h-[100%] tw-w-[630px] tw-flex tw-justify-start tw-items-center'>
                {showUrls ? (
                  <div className='tw-h-[40%]  max-sm:tw-w-[37%] tw-w-[70%] tw-flex tw-bg-white tw-justify-center tw-items-center tw-rounded-2xl tw-ml-5'>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <FacebookOutlinedIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <TwitterIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <FacebookOutlinedIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <InstagramIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <LinkedInIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <IconTikTok
                          color={'#02AF9B'}
                        />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <MailOutlinedIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <LanguageOutlinedIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                    <div className='tw-h-[100%] tw-w-[11%] tw-flex tw-justify-center tw-items-center'>
                      <Button>
                        <SendIcon sx={{ color: '#02AF9B' }} />
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className='tw-w-[100%] tw-h-[10%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid  tw-flex tw-justify-center tw-justify-items-center'>
          <div className='tw-w-[85%] tw-h-[100%] tw-flex tw-justify-start tw-justify-items-center'>
            <Button
              color='secondary'
              size='medium'
              startIcon={
                <AddCircleIcon
                  style={{
                    color: '#ffffff',
                    fontSize: '1.8rem',
                    marginLeft: '0.5rem',
                  }}
                />
              }
            >
              <span
                style={{
                  color: '#000000 ',
                  fontSize: '1rem',
                  textTransform: 'none',
                }}
              >
                {dictionary?.profileView.buttonAddData}
              </span>
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalProfile;