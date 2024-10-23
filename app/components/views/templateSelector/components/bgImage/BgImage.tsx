import React from 'react';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';

interface BackgroundImages {
  name: string;
  image: string;
}

const BgImage = ({ background }: { background: BackgroundImages }) => {
  const isSmallScreenWidth = useMediaQuery('(max-width:440px)');
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  return (
    background && (
      <Image
        className='tw-rounded-2xl tw-absolute tw-z-0'
        src={background.image}
        alt='Card'
        width={isSmallScreenWidth ? windowWidth : 380}
        height={windowHeight}
        style={{ display: 'block', position: 'relative', zIndex: 0 }}
      />
    )
  );
};

export default BgImage;
