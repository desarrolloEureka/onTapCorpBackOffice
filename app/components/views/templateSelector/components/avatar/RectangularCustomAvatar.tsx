import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const RectangularCustomAvatar = ({
    name,
    image,
    ml,
    size,
    rounded,
    square,
    profession,
}: {
    image: string;
    name: string;
    ml: number;
    size: number;
    rounded?: boolean;
    square?: boolean;
    profession?: string;
}) => {
    const isSmallScreenTwo = useMediaQuery('(max-height:700px)');
    return (
        <div className={`tw-bg-[#396593] tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.3)] tw-relative tw-flex tw-flex-col tw-z-10 tw-items-center tw-w-[80%] ${isSmallScreenTwo ? 'tw-h-[180px]' : 'tw-h-[230px] '}  tw-rounded-xl tw-mt-5`}>

            <Box className=' tw-flex tw-flex-row tw-w-full tw-align-middle tw- tw-justify-center tw-items-center tw-mt-3'>
                <div className='tw-text-[#396593] tw-flex tw-justify-center tw-items-center tw-mr-2 tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-w-[250px] tw-h-[28px] tw-bg-white tw-truncate tw-text-base tw-rounded-bl-2xl tw-rounded-tr-2xl'>
                    <Typography style={{ fontSize: '1.15rem', lineHeight: '1.75rem' }}>
                        {name ? name.length > 20 ? name.substring(0, 20) + '...' : name : ''}
                    </Typography>
                </div>
            </Box>

            <Box
                className='tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.3)] tw-z-10 tw-mt-3 tw-rounded-3xl'
            >
                <Avatar
                    alt={name}
                    src={image}
                    variant={rounded ? 'rounded' : 'square'}
                    sx={{
                        width: size - 20,
                        height: size - 20,
                        borderRadius: rounded ? '100%' : '12%',
                    }}
                    className=''
                />
            </Box>
            <Box className=' tw-flex tw-flex-row tw-w-full tw-align-middle tw- tw-justify-center tw-items-center tw-mt-3'>
                <div className='tw-text-[#396593] tw-flex tw-justify-center tw-items-center tw-ml-2 tw-shadow-[0_0px_10px_10px_rgba(0,0,0,0.1)] tw-w-[250px] tw-h-[28px] tw-bg-white tw-truncate tw-text-base tw-rounded-bl-2xl tw-rounded-tr-2xl'>
                    <Typography style={{ fontSize: '1.15rem', lineHeight: '1.75rem' }}>
                        {profession ? profession.length > 20 ? profession.substring(0, 20) + '...' : profession : ''}
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default RectangularCustomAvatar;
