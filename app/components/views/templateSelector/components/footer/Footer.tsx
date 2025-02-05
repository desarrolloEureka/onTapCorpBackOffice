import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, width } from '@mui/system';
import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import FooterHook from './hooks/FooterHook';
import CustomButton from '../floatingButtons/customButtons/CustomButton';

const CustomHorizontalContainer = styled(Container)`
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 3px solid #7a7a7a;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Footer = ({ socialNetworks, userData }: { socialNetworks: any, userData: any }) => {
  const { finalArray } = FooterHook({ socialNetworks });
  const reversedArray = [...finalArray].reverse();
  const shouldCenterItems = reversedArray.length < 4;

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


  //console.log("reversedArray",reversedArray)
  return (
    <div className={`tw-flex tw-h-[15%] tw-w-[100%] tw-overflow-scroll tw-relative no-scrollbar tw-items-center tw-justify-center`}>
      <div ref={containerRef} style={{ display: 'flex', height: '70%', width: '94%' }}>
        <CustomHorizontalContainer className="tw-flex tw-overflow-scroll tw-z-10 tw-overflow-y-hidden" style={{ justifyContent: shouldCenterItems ? 'center' : 'flex-start' }}>
          {reversedArray.length > 0 && reversedArray.map((val, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: windowSize.width * 0.25 }} >
              <CustomButton
                documentId={userData?.idCompany}
                collectionRef="companies"
                key={i}
                name={val.icon}
                nameLabel={val.name}
                link={val.url}
                styles={'tw-mx-2.5'}
                userData={userData}
                urlName={val?.urlName}
                widthSize={windowSize.width * 0.4}
                heightSize={windowSize.height * 0.9}
              />
            </Box>
          ))}
        </CustomHorizontalContainer>
      </div>
    </div>
  );
};

export default Footer;