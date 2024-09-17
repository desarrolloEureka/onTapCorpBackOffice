'use client';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { GetUser, SendDataImage } from '@/reactQuery/users';
import { Dictionary } from '@/types/dictionary';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const PhotoUser = ({
  dictionary,
  isProUser,
  handleSendProfile,
  handleSwitchAll,
  name,
  isAlertSave
}: {
  dictionary: Dictionary;
  isProUser: boolean;
  handleSendProfile: (isProUser: boolean) => Promise<void>;
  handleSwitchAll: (val: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  isAlertSave: boolean
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImagePro, setSelectedImagePro] = useState<string | null>(null);
  const { data, error } = GetUser();
  const [copied, setCopied] = useState(false);

  function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx && ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(blob => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: blob.type || 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(resizedFile); // Aquí aseguramos que estamos devolviendo un File
          } else {
            reject(new Error("Failed to create Blob"));
          }
        }, file.type || 'image/jpeg', 0.35);
      };
      image.onerror = () => {
        reject(new Error('Could not load image'));
      };
    });
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && file instanceof File) {
      try {
        const resizedImage = await resizeImage(file, 750, 750);
        const base64String = await convertFileToBase64(resizedImage);
        if (isProUser) {
          setSelectedImagePro(base64String);
        } else {
          setSelectedImage(base64String);
        }

        const userId = data?.uid;
        if (userId) {
          await SendDataImage(isProUser, userId, base64String);
        }
      } catch (error) {
        console.error("Error handling the image:", error);
      }
    }
  };


  const convertFileToBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64 string.'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file.'));
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='tw-h-[300px] tw-flex tw-items-center tw-justify-center tw-flex-col tw-mb-[-20px] tw-pb-6'>

      <div className={`${isAlertSave === true ? 'tw-h-[50%]' : 'tw-h-[55%]'}  tw-flex tw-items-end tw-justify-center`}>
        <Stack direction='row' spacing={2} className='tw-relative'>
          <label htmlFor='photoInput'>
            <Avatar
              alt='Photo User'
              src={
                !isProUser && selectedImage ?
                  selectedImage
                  : isProUser && selectedImagePro ?
                    selectedImagePro
                    : !isProUser && data?.image ?
                      data.image
                      : isProUser && data?.imagePro ?
                        data?.imagePro
                        : '/images/profilePhoto.png'
              }
              sx={{
                width: 125,
                height: 125,
                borderRadius: '50%',
                border: '10px solid #02AF9B',
                cursor: 'pointer',
              }}
            />
          </label>
          <input
            type='file'
            id='photoInput'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <IconButton
            style={{
              position: 'absolute',
              top: 30,
              right: -15,
              background: 'transparent',
              color: '#396593',
            }}
            onClick={() => document.getElementById('photoInput')?.click()}
          >
            <DriveFileRenameOutlineIcon />
          </IconButton>
        </Stack>
      </div>

      <div className=' tw-h-[20%] tw-w-[100%] tw-flex  tw-items-center tw-justify-center tw-flex-row'>
        <div className='tw-h-[35px] tw-w-[120px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#02AF9B] tw-rounded-tr-xl tw-rounded-bl-xl'>
          <Typography
            className={`tw-w-[90%] tw-text-center tw-truncate tw-capitalize`}
          >
            {dictionary?.profileView?.labelHello}{' '}
            {name}
          </Typography>
        </div>

      </div>

     {/*  {isAlertSave === true && (
        <div className=' tw-h-[10%] tw-w-[100%] tw-flex  tw-items-center tw-justify-center tw-flex-row'>
          <div className='tw-h-[35px] tw-w-[240px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-[#f48c42] tw-rounded-xl'>
            <Typography
              className={`tw-w-[90%] tw-text-center tw-truncate`}
            >
              Recuerde guardar los datos
            </Typography>
          </div>
        </div>
      )} */}

      <div className=' tw-h-[20%] tw-w-[100%] tw-flex  tw-items-center tw-justify-center tw-flex-row'>
        <Container className='tw-h-[98%] tw-w-[85%] tw-flex tw-items-start tw-justify-end'>
          <div className=' tw-h-[100%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
            <div className=' tw-h-[100%] tw-w-[80%] tw-flex tw-flex-row tw-items-center tw-justify-center'>
              <div className=' tw-h-[100%] max-sm:tw-w-[50%] tw-w-[20%] tw-flex tw-items-center tw-justify-center tw-pt-3 max-md:tw-mr-2'>
                <CustomSwitchGeneral
                  name='all_true'
                  handleSwitch={(e: any) => handleSwitchAll(e)}
                />
              </div>

              <div className=' tw-h-[100%] max-sm:tw-w-[70%] tw-w-[80%] tw-flex tw-items-center tw-justify-start'>
                <span
                  style={{
                    color: '#030124',
                    fontSize: '1rem',
                    textTransform: 'none',
                  }}
                >
                  {dictionary.profileView.labelSwitchMain}
                </span>
              </div>
            </div>
          </div>
          <div className='tw-flex tw-flex-row tw-mt-4'>
            <div className='tw-w-[100px] tw-align-middle tw-items-center tw-flex tw-flex-col'>
              <Typography className='tw-text-[#02af9b] tw-text-sm'>
                {dictionary.homeView.openUrlButtonLabel}
              </Typography>
              <Link href={data?.preview || ''}>
                <LinkIcon
                  sx={{
                    color: '#02AF9B',

                  }}
                />
              </Link>
            </div>
            <div className='tw-w-[100px] tw-align-middle tw-items-center tw-flex tw-flex-col' onClick={() => { setCopied(true); navigator.clipboard.writeText(data?.preview || '') }}>
              <Typography className='tw-text-[#02af9b] tw-text-sm'>
                {dictionary.homeView.copyUrlButtonLabel}
              </Typography>
              <ContentCopyIcon
                sx={{
                  color: '#02AF9B',
                }}
              />

              <div>
                <Typography
                  className='tw-text-[#02af9b] tw-text-xs'
                  sx={{
                    display: copied ? 'block' : 'none'
                  }}
                >
                  {dictionary.homeView.copyUrlMessageLabel}
                </Typography>
              </div>
            </div>
          </div>
          <div className=' tw-h-[100%] tw-w-[50%] tw-flex  tw-items-end tw-justify-end '>
            <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
              <Button
                className='tw-w-[90%] tw-h-[45px]'
                onClick={() => handleSendProfile(isProUser)}
                color='secondary'
                size='medium'
                startIcon={
                  <SaveOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginLeft: '0rem',
                    }}
                  />
                }
              >
                <span
                  style={{
                    color: '#030124 ',
                    fontSize: '1.09rem',
                    textTransform: 'none',
                  }}
                >
                  {dictionary.homeView.saveButtonLabel}
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PhotoUser;
