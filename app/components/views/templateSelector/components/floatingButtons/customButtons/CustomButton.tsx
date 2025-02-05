import { GetAllSocialNetworks, SendDataUrlClick, } from "@/firebase/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";

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
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (error) {
    return false;
  }
};

const CustomButton = ({
  userData,
  name,
  link,
  nameLabel,
  styles,
  urlName,
  collectionRef,
  documentId,
  widthSize,
  heightSize,
}: {
  userData: any;
  name: string;
  nameLabel?: string;
  link: string;
  styles?: string;
  urlName: string;
  collectionRef: string;
  documentId: string;
  widthSize: number;
  heightSize: number;
}) => {
  const [data, setData] = useState<any>(null);
  let icon = data?.find((val: any) => val.logoName === name);

  if (!icon) {
    try {
      new URL(name); // Verifica si 'name' es una URL válida
      icon = { imageUrl: name };
    } catch { }
  }

  useEffect(() => {
    const fetchAllSocialNetworks = async () => {
      if (userData?.idCompany) {
        const data2 = await GetAllSocialNetworks(userData?.idCompany);
        setData(data2);
      }
    };
    fetchAllSocialNetworks();
  }, [userData?.idCompany]);

  // Limpia el enlace y asegura que tenga el formato correcto
  const linkAux = link.trim();
  // Asegúrate de que la URL comience con "http://" o "https://"
  const fullUrl = /^https?:\/\//i.test(linkAux)
    ? linkAux
    : `https://${linkAux}`;

  // Verifica si la URL es válida
  const finalUrl = isValidUrl(fullUrl) ? fullUrl : "";

  // Maneja el clic en el enlace y muestra un mensaje de error si la URL es inválida
  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    //console.log("data", userData, urlName)
    if (!isValidUrl(fullUrl)) {
      event.preventDefault();
      alert("La URL proporcionada no es válida."); // Muestra un mensaje de error al usuario

    }
    if (userData && urlName) {
      const dataSend = {
        //prueba: "PruebaUrl"
        timestamp: new Date().toISOString()
      };
      await SendDataUrlClick(documentId, dataSend, urlName, userData?.uid, collectionRef);
    }
  };

  return (
    icon?.imageUrl && (
      <Link
        className={`tw-items-center tw-justify-center tw-rounded-full tw-drop-shadow-xl ${styles}`}
        style={{ textDecoration: "none" }}
        href={finalUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {widthSize && heightSize && <Image
          className="tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)] tw-rounded-full"
          src={icon.imageUrl}
          alt={name}
          width={(widthSize > heightSize ? heightSize : widthSize) * 0.7}
          height={(widthSize > heightSize ? heightSize : widthSize) * 0.7}
        />}

        <Typography
          style={{ 
            width: "100%",
            textDecoration: "none",
            fontSize: `${Math.min(widthSize, heightSize) * 0.15}px`,
            marginTop: `${Math.max(widthSize, heightSize) * 0.03}px`,
          }}
          className="tw-z-10 tw-flex tw-items-center tw-justify-center tw-capitalize"
          color={"white"}
        >
          {nameLabel
            && nameLabel.length > 9
            ? nameLabel.substring(0, 6) + "..."
            : nameLabel
          }
        </Typography>
      </Link>
    )
  );
};

export default CustomButton;
