import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const CustomAvatar = ({
  image,
  size,
}: {
  image: string;
  size: number;
}) => {
  return (
    <Box sx={{  height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        className='tw-rounded-full tw-rounded-t-lg tw-absolute tw-z-0'
        src={image}
        alt='Card'
        width={size}
        height={size - 19}
        style={{ display: 'block', position: 'relative', zIndex: 0, border: '8px solid #030124', objectFit: 'cover' }}
      />
    </Box>
  );
};

export default CustomAvatar;
