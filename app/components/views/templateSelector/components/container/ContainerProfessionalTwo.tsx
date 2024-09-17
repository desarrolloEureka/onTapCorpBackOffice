import React from 'react';
import { DataForm, DataFormValues, SocialDataForm } from '@/types/profile';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Box, Button, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getPrincipalProfileOrderedSocialTwo } from '@/globals/functionsTemplateSocialOne';
import { countries } from '@/globals/constants';

const ContainerProfessionalTwo = ({ profile, color, textColor }: { profile: DataForm; color: string; textColor: string }) => {
    const { finalArray } = getPrincipalProfileOrderedSocialTwo(profile.professional as SocialDataForm, 'social');
    const isSmallScreen = useMediaQuery('(max-height:780px)');

    const getCountryName = (item: any) => {
        const country = countries.find(country => country.id === item);
        return country ? country.code : '';
    };

    const clickType = (type: string, url: string) => {
        switch (type) {
            case 'EmailOutlinedIcon':
                window.open('mailto:' + url);
                break;
            case 'LocalPhoneOutlinedIcon':
                window.open('tel:' + url);
                break;
            case 'ExploreOutlinedIcon':
                let newUrl = url.replace('#', '%23');
                newUrl = encodeURIComponent(url);
                window.open(`https://maps.google.com/maps?q=${newUrl}`);
                break;
        }
    };

    const Item = ({ item }: { item: DataFormValues[] }) => (
        <>
            {item.map((val, key) => (
                <Button
                    variant='contained'
                    sx={{
                        textTransform: 'none', backgroundColor: color, borderTopLeftRadius: '12px', '&:hover': {
                            backgroundColor: 'white',
                        }
                    }}
                    className={`tw-drop-shadow-sm tw-w-[100%] ${isSmallScreen ? 'tw-h-[30px]' : 'tw-h-[35px]'} tw-px-1 tw-relative ${isSmallScreen ? 'tw-my-1' : 'tw-my-2.5'} tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]`}
                    key={key}
                    onClick={() => val.icon && val.text && clickType(val.icon, val.label === "phones" ? getCountryName(val.indicative) + "" + val.text : val.text)}
                    startIcon={
                        val.icon === 'FilePresentOutlinedIcon' ? (
                            <FilePresentOutlinedIcon
                                style={{
                                    color: textColor,
                                    fontSize: '1.4rem',
                                    marginLeft: '0.7rem',
                                }}
                            />
                        ) : val.icon == 'WorkOutlineOutlinedIcon' ? (
                            <WorkOutlineOutlinedIcon
                                style={{
                                    color: textColor,
                                    fontSize: '1.4rem',
                                    marginLeft: '0.7rem',
                                }}
                            />
                        ) : val.icon == 'ExploreOutlinedIcon' ? (
                            <ExploreOutlinedIcon
                                style={{
                                    color: textColor,
                                    fontSize: '1.4rem',
                                    marginLeft: '0.7rem',
                                }}
                            />
                        ) : val.icon === 'LocalPhoneOutlinedIcon' ? (
                            <LocalPhoneOutlinedIcon
                                style={{
                                    color: textColor,
                                    fontSize: '1.4rem',
                                    marginLeft: '0.7rem',
                                }}
                            />
                        ) : (
                            val.icon === 'EmailOutlinedIcon' && (
                                <EmailOutlinedIcon
                                    style={{
                                        color: textColor,
                                        fontSize: '1.4rem',
                                        marginLeft: '0.7rem',
                                    }}
                                />
                            )
                        )
                    }
                >
                    <Typography
                        style={{ fontSize: val.label === 'Correo' ? '14px' : undefined, color: textColor }}
                        className={`tw-w-[90%] tw-text-center tw-truncate ${val.order != 10 && 'tw-capitalize'}`}
                    >
                        {(val.label === "phones" || val.label === "Telefono" || val.label === "Teléfono") ? getCountryName(val.indicative) + "" + val.text : val.text}
                    </Typography>
                </Button>
            ))}
        </>
    );

    return (
        profile.professional && (
            <div className={`tw-h-[100%] tw-w-[100%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center`}>
                {finalArray.length > 0 && finalArray[0].length > 0 && (
                    <Carousel
                        className={`tw-flex tw-flex-col tw-w-[99%] tw-h-[100%] tw-content-center tw-items-center tw-justify-center`}
                        autoPlay={false}
                        activeIndicatorIconButtonProps={{
                            style: {
                                color: textColor
                            }
                        }}
                    >
                        {finalArray.map((item, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: isSmallScreen ? '150px' : '185px',
                                }}
                            >
                                <Item item={item as DataFormValues[]} />
                            </Box>
                        ))}
                    </Carousel>
                )}
            </div>
        )
    );
};

export default ContainerProfessionalTwo;