import { Box, Button, IconButton, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { countries } from "@/data/constants";
import { useEffect, useRef, useState } from "react";

const SaveContactButtonColor = ({
  colorButton,
  userData,
  companyData,
  companyDataUrls,
  areaData,
}: {
  colorButton?: string;
  userData: any;
  companyData: any;
  companyDataUrls: any;
  areaData: any;
}) => {
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

  const downloadTxtFile = (vcfText: string) => {
    const element = document.createElement("a");
    const file = new Blob([vcfText], { type: "text/vcard;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "contact.vcf";
    document.body.appendChild(element);
    element.click();
  };

  const getCountryName = (item: any) => {
    const country = countries.find((country) => country.id === item);
    return country ? country.code : "";
  };

  const saveVCard = () => {
    if (userData) {
      var vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${
        userData.firstName[1] && userData.firstName[0]
          ? userData.firstName[0]
          : ""
      } ${
        userData.lastName[1] && userData.lastName[0] ? userData.lastName[0] : ""
      }
      \nN:${
        userData.lastName[1] && userData.lastName[0] ? userData.lastName[0] : ""
      };${
        userData.firstName[1] && userData.firstName[0]
          ? userData.firstName[0]
          : ""
      };;;\n`;
      // Agregar cada dirección de correo electrónico
      userData.emails?.forEach((email: any) => {
        if (email.checked) {
          vCardData += `EMAIL;TYPE=INTERNET:${email.text}\n`;
        }
      });

      // Agregar cada número de teléfono
      userData.phones?.forEach((phone: any) => {
        if (phone.checked) {
          vCardData += `TEL;TYPE=CELL:${
            phone.indicative ? getCountryName(phone.indicative) : ""
          }${phone.text}\n`;
        }
      });

      if (userData.position[1]) {
        vCardData += `ROLE:${userData.position[0] ?? ""}\n`;
      }
      // vCardData += `ORG:${userData.company?.text ?? ''}\n`;
      // vCardData += `ROLE:${userData.position?.text ?? ''}\n`;
      // vCardData += `NOTE:${userData.professional_profile?.text ?? ''}\n`;

      if (companyData?.tradename[1]) {
        vCardData += `ORG:${companyData?.tradename[0]}\n`;
      }

      if (companyData?.address[1]) {
        vCardData += `ADR;TYPE=ADDRESS:${companyData?.address[0]}\n`;
      }
      // Agregar cada URL social si están disponibles

      companyDataUrls?.forEach((url: any, index: any) => {
        if (url.checked) {
          vCardData += `item${index}.URL:${url.url}\n`;
          vCardData += `item${index}.X-ABLabel:${url.name}\n`;
        }
      });

      areaData?.forEach((url: any, index: any) => {
        if (url.isActiveSwitch) {
          vCardData += `item${index}.URL:${url.url}\n`;
          vCardData += `item${index}.X-ABLabel:${url.name}\n`;
        }
      });

      // Agregar la imagen en formato base64
      // vCardData += `PHOTO;ENCODING=b;TYPE=JPEG:${imageData}\n`;

      // Cerrar la vCard
      vCardData += `END:VCARD`;

      downloadTxtFile(vCardData);
    }
  };

  return (
    <Box
      ref={containerRef} 
      sx={{ position: "relative" }}
      className={`tw-flex tw-rounded-3xl tw-h-[10%] tw-w-full tw-content-center tw-items-center tw-justify-center`}
    >
      <Button
        onClick={saveVCard}
        sx={{ textTransform: "none" }}
        className={`tw-drop-shadow-xl tw-rounded-full tw-bg-white`}
        variant="contained"
        startIcon={
          <SaveOutlinedIcon
            style={{
              color: colorButton ?? undefined,
              fontSize: `${Math.min(windowSize.height, windowSize.width) * 0.6}px`,
            }}
          />
        }
      >
        <Typography
          className="tw-capitalize"
          color={colorButton}
          style={{ 
            fontWeight: 500,
            width: "100%",
            textDecoration: "none",
            fontSize: `${Math.min(windowSize.height, windowSize.width) * 0.35}px`,
          }}
        >
          guardar Contacto
        </Typography>
      </Button>
    </Box>
  );
};

export default SaveContactButtonColor;
