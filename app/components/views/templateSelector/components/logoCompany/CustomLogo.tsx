import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const CustomLogo = ({
  image,
}: {
  image: string;
}) => {
  return (
    <Box sx={{  height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        className='tw-absolute tw-z-0'
        src={image}
        alt='Card'
        width={165}
        height={50}
        style={{ display: 'block', position: 'relative', zIndex: 0, objectFit: 'cover' }}
      />
    </Box>
  );
};

export default CustomLogo;