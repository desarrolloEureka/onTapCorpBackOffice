import { GetAllSocialNetworks } from "@/firebase/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import { countClicksSocialNetworkQuery } from "@/queries/documentsQueries";

const regex = /^(https?:\/\/)?(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/i;

const isValidUrl = (url: string): boolean => {
  if (!regex.test(url)) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return ["http:", "https:"].includes(urlObj.protocol);
  } catch (error) {
    return false;
  }
};

const CustomButton = ({
  name,
  link,
  nameLabel,
  styles,
  uid,
}: {
  name: string;
  nameLabel?: string;
  link: string;
  styles?: string;
  uid: string;
}) => {
  const [data, setData] = useState<any[]>([]);
  const isSmallScreen = useMediaQuery("(max-height:780px)");
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    const fetchAllSocialNetworks = async () => {
      try {
        const networks = await GetAllSocialNetworks();
        setData(networks);
        const foundIcon = networks.find((val: any) => val.logoName === name);
        setIcon(foundIcon || { imageUrl: name });
      } catch (error) {
        console.error("Error fetching social networks:", error);
      }
    };
    fetchAllSocialNetworks();
  }, [name]);

  const linkAux = link.trim();
  const fullUrl = /^https?:\/\//i.test(linkAux) ? linkAux : `https://${linkAux}`;

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isValidUrl(fullUrl)) {
      event.preventDefault();
      alert("La URL proporcionada no es válida.");
      return;
    }

    try {
      const response = await countClicksSocialNetworkQuery(uid, name);
      if (response.success) {
        console.log("Clic registrado correctamente");
      } else {
        console.error("Error al registrar el clic:", response.message);
      }
    } catch (error) {
      console.error("Error durante el registro del clic:", error);
    }
  };

  if (!icon?.imageUrl) return null; 

  return (
    <Link
      className={`tw-rounded-full tw-mt-1 tw-drop-shadow-xl ${styles}`}
      style={{ textDecoration: "none" }}
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <div className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-mx-2">
        <Image
          className="tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full"
          src={icon.imageUrl}
          alt={name}
          width={isSmallScreen ? 45 : 54}
          height={isSmallScreen ? 45 : 54}
        />
        <Typography
          style={{ width: "100%", textDecoration: "none" }}
          className="tw-text-white tw-z-10 tw-text-xs tw-flex tw-items-center tw-justify-center tw-capitalize tw-pt-1"
          color={"white"}
        >
          {nameLabel && nameLabel.length > 9
            ? nameLabel.substring(0, 6) + "..."
            : nameLabel}
        </Typography>
      </div>
    </Link>
  );
};

export default CustomButton;
