import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const CustomLogo = ({ image}: {image: string;}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWindowSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box ref={containerRef} sx={{  height: '25%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        className='tw-absolute tw-z-0'
        src={image}
        alt='Card'
        width={windowSize.width}
        height={windowSize.height}
        style={{ display: 'block', position: 'relative', zIndex: 0, objectFit: 'contain' }}
      />
    </Box>
  );
};

export default CustomLogo;