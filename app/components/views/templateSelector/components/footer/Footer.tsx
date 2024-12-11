import React from 'react';
import { Box, Container } from '@mui/system';
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

const Footer = ({socialNetworks, userData}: {socialNetworks: any, userData: any}) => {
  const { finalArray } = FooterHook({ socialNetworks });
  const reversedArray = [...finalArray].reverse();
  const shouldCenterItems = reversedArray.length < 4;
  const isSmallScreen = useMediaQuery('(max-height:780px)');

  return (
    <div className={`tw-flex tw-h-[15%] tw-w-[100%] tw-overflow-scroll tw-relative no-scrollbar tw-items-center tw-justify-center ${isSmallScreen ? '-tw-mt-5' : 'tw-mt-0'}`}>
      <div style={{ display: 'flex', height: '70%', width: '94%' }}>
        <CustomHorizontalContainer className="tw-flex tw-p-0 tw-overflow-scroll tw-z-10 tw-overflow-y-hidden" style={{ transform: 'rotateX(180deg)', justifyContent: shouldCenterItems ? 'center' : 'flex-start', }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} style={{ transform: 'rotateX(180deg)' }}>
            {reversedArray.length > 0 && reversedArray.map((val, i) => (
              <CustomButton
                key={i}
                name={val.icon}
                nameLabel={val.name}
                link={val.url}
                styles={'tw-mx-2.5'}
                companyID={userData?.idCompany}
              />
            ))}
          </Box>
        </CustomHorizontalContainer>
      </div>
    </div>
  );
};

export default Footer;