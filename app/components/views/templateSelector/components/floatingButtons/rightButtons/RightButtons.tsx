import { Box } from '@mui/material';
import React from 'react';
import CustomButton from '../customButtons/CustomButton';
import { UrlDataFormValues } from '@/types/profile';
import useMediaQuery from '@mui/material/useMediaQuery';

const RightButtons = ({
  socialNetworks,
}: {
  socialNetworks: UrlDataFormValues[];
}) => {
  const social = socialNetworks.filter(
    (val) =>
      (val.icon == 'facebook' && val.checked) ||
      (val.icon == 'tiktok' && val.checked) ||
      (val.icon == 'messenger' && val.checked)
  );

  const isSmallScreen = useMediaQuery('(max-height:668px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 90,
      }}
    >
      {social.map((val, key) => {
        /* const my = (key === 1 || key === 2) && 'tw-mt-5'; */
        const my = (isSmallScreen && (key === 1 || key === 2)) ? 'tw-mt-2' : 'tw-mt-4';
        const mx = (key === 0 || key === 2) && '-tw-ml-5';
        return (
          <CustomButton
            name={val.icon}
            nameLabel={val.name}
            link={val.url}
            key={key}
            styles={`${mx} ${my} tw-w-[90px] tw-flex tw-justify-center`}
          />
        );
      })}
    </Box>
  );
};

export default RightButtons;
