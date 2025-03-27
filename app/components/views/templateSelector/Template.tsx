import TemplateSelectorHook from "./hooks/TemplateSelectorHook";
import { Box, CircularProgress } from "@mui/material";
import CustomModalAlert from "@/components/customModalAlert/CustomModalAlert";
import { useState } from "react";
import ThemeOne from "./components/ThemeOne";

const Template = ({
  userData,
  companyData,
  headquarterData,
  areaData,
  handleAceptCookies,
  isCookies,
}: {
  userData: any;
  companyData: any;
  headquarterData: any;
  areaData: any;
  isCookies: boolean;
  handleAceptCookies: () => Promise<void>;
}) => {
  const [isDataError, setIsDataError] = useState(true);
  const { currentBackground, currentTemplate } = TemplateSelectorHook(userData, companyData);

  if (!userData && currentTemplate === undefined && currentBackground === undefined) {
    return (
      <Box className="tw-flex tw-justify-center tw-items-center tw-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (userData) {
    if (currentTemplate && currentBackground) {
      switch (currentTemplate?.name) {
        case "themeOne":
          return (
            <ThemeOne
              params={{
                userData: userData,
                companyData: companyData,
                headquarterData: headquarterData,
                areaData: areaData,
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies,
                background: currentBackground
              }}
            />
          );
        default:
          return (
            <ThemeOne
              params={{
                userData: userData,
                companyData: companyData,
                headquarterData: headquarterData,
                areaData: areaData,
                handleAceptCookiesPage: handleAceptCookies,
                isCookies: isCookies,
                background: currentBackground
              }}
            />
          );
      }
    } else {
      return (
        <CustomModalAlert
          isModalAlert={isDataError}
          handleModalAlert={() => setIsDataError(false)}
          title={"Configuración Pendiente"}
          description={
            "El administrador de la empresa aún no ha seleccionado una plantilla o un fondo. Por favor, contacta con él para poder visualizar la tarjeta."
          }
          isClosed={false}
        />
      );
    }
  } else {
    return (
      <CustomModalAlert
        isModalAlert={isDataError}
        handleModalAlert={() => setIsDataError(false)}
        title={"One Tap dice!"}
        description={
          "Completa tu perfil para que puedas compartir tu información"
        }
        isClosed={false}
      />
    );
  }
};

export default Template;
