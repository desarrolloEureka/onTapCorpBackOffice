import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { styled } from '@mui/material';
import Image from 'next/image';
import FooterHook from '../footer/hooks/FooterHook';
import { UrlDataFormValues } from '@/types/profile';
import { GetAllSocialNetworks } from '@/reactQuery/home';
import Link from 'next/link';

//Ajustes front del scroll
const CustomHorizontalContainer = styled(Container)`
    &::-webkit-scrollbar {
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
        border: 3px solid #9d9d9d;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const HorizontalScrolling = ({ socialNetworks, fullSocialIcons, colorText }: { socialNetworks: UrlDataFormValues[] | undefined; fullSocialIcons?: boolean; colorText: string }) => {
    const { data } = GetAllSocialNetworks();
    const { finalArray } = FooterHook({ socialNetworks, fullSocialIcons });
    const isSmallScreenIcons = useMediaQuery('(max-height:780px)');
    const reversedArray = [...finalArray].reverse();
    const RowCenter = finalArray.length <= 4;

    //Retorna la img del icono 
    const getImageSrc = (name: string) => {
        const icon = data && data.find((val: any) => val.name === name);
        return icon && icon.image;
    };

    //const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:?#\[\]@!$&'()*+,;=]*)?(\?[;&a-zA-Z0-9%_.~+=-]*)?(#[a-zA-Z0-9-_]*)?$/i;
    const regex = /^(https?:\/\/)?(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/i;

    // Función para validar si la URL es válida
    const isValidUrl = (url: string) => {
        // Primero valida con regex
        if (!regex.test(url)) {
            return false;
        }

        try {
            // Luego valida con el constructor URL
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch (error) {
            return false;
        }
    };

    // Maneja el clic en el enlace y muestra un mensaje de error si la URL es inválida
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (!isValidUrl(url)) {
            event.preventDefault();
            alert('La URL proporcionada no es válida.');
        }
    };

    return reversedArray && (
        <CustomHorizontalContainer className="tw-flex tw-h-[90%] tw-w-[100%] tw-p-0 tw-overflow-scroll tw-z-10 tw-overflow-y-hidden" style={{ transform: 'rotateX(180deg)', justifyContent: RowCenter ? 'center' : '' }}>
            <div className="tw-flex tw-flex-col tw-pt-1" style={{ transform: 'rotateX(180deg)', justifyContent: 'center' }}>
                <div className={`tw-flex tw-h-[50%] tw-justify-center}`}>
                    {reversedArray.map((val, i) => {
                        const imageSrc = getImageSrc(val.icon);
                        const linkAux = val.url.trim();
                        const fullUrl = /^https?:\/\//i.test(linkAux) ? linkAux : `https://${linkAux}`;
                        const finalUrl = isValidUrl(fullUrl) ? fullUrl : '';
                        return imageSrc ? (
                            <Link
                                key={i}
                                className="tw-flex tw-h-[90%] tw-w-[80px] tw-px-0 tw-m-1 tw-flex-col tw-items-center tw-justify-center"
                                style={{ textDecoration: 'none' }}
                                href={finalUrl || '#'}
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={(event) => handleClick(event, fullUrl)}

                            >
                                <Image className="tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full" src={imageSrc} alt={val.name || 'Social Icon'} width={isSmallScreenIcons ? 50 : 59} height={isSmallScreenIcons ? 50 : 59} />
                                <Typography style={{ textDecoration: 'none', color: colorText }} className=" tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-1" color="white">
                                    {val.name ? (val.name.length > 9 ? `${val.name.substring(0, 6)}...` : val.name) : val.name}
                                </Typography>
                            </Link>
                        ) : null;
                    })}
                </div>
            </div>
        </CustomHorizontalContainer>
    )
};

export default HorizontalScrolling;