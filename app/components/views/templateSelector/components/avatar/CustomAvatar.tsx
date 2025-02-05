import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const CustomAvatar = ({ image }: { image: string }) => {
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
    <Box ref={containerRef} sx={{ height: '65%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        className='tw-rounded-full tw-rounded-t-lg tw-absolute tw-z-0'
        src={image}
        alt='Card'
        width={windowSize.width}
        height={windowSize.height}
        style={{ display: 'block', position: 'relative', zIndex: 0, border: '8px solid #030124', objectFit: 'cover' }}
      />
    </Box>
  );
};

export default CustomAvatar;
