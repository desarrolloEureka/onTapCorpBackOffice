import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomModalAlert from "@/components/customModalAlert/CustomModalAlert";
import Image from "next/image";
import Hero from "./hero/Hero";
import TemplateContainer from "./container/Container";
import Footer from "./footer/Footer";
import ModalCookies from "@/components/customModalAlert/ModalCookies";
import Link from "next/link";

const ThemeOne = ({
  params: {
    userData,
    companyData,
    headquarterData,
    areaData,
    handleAceptCookiesPage,
    isCookies,
    background
  },
}: {
  params: {
    userData: any;
    companyData: any;
    headquarterData: any;
    areaData: any;
    handleAceptCookiesPage: () => Promise<void>;
    isCookies: boolean;
    background: any;
  };
}) => {
  const [isDataError, setIsDataError] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleAceptCookies = async () => {
    handleAceptCookiesPage();
  };

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

  useLayoutEffect(() => {
    userData && setIsDataError(false);
  }, [userData]);

  const transformData = (areaData: any, uidUser: any): any => {
    const areaDataUrls: any = {
      urls: [],
    };

    // Iterar sobre las claves de areaData
    Object.keys(areaData).forEach((key) => {
      const urlMatch = key.match(/urlLink(\d*)/);

      if (urlMatch) {
        const index = urlMatch[1] === "" ? "" : urlMatch[1]; // Obtener el índice
        const url = areaData[key];
        const nameKey = `urlName${index}`; // Construir el nombre correspondiente
        const iconNameKey = `iconName${index}`; // Construir el nombre correspondiente
        if (nameKey in areaData) {
          if (uidUser) {
            const [nameOrIcon, isActive, userObjects] = areaData[nameKey];
            const iconName = areaData[iconNameKey];

            if (isActive) {
              Object.keys(userObjects || {}).forEach((userKey) => {
                const userInfo = userObjects[userKey];
                if (userInfo.uid === uidUser && userInfo.isActive === true) {
                  areaDataUrls.urls.push({
                    url,
                    name: nameOrIcon,
                    icon: iconName,
                    checked: isActive,
                    isActiveSwitch: userInfo.isActive, // Agregar isActive del usuario
                    urlName: nameKey
                  });
                }
              });
            }

          } else {
            const [nameOrIcon, checked] = areaData[nameKey];
            const iconName = areaData[iconNameKey];
            areaDataUrls.urls.push({
              url,
              name: nameOrIcon, // Puedes ajustar esto si necesitas diferenciar entre nombre e ícono
              icon: iconName, // Asumiendo que nameOrIcon puede ser un ícono o nombre
              checked,
              urlName: nameKey
            });
          }
        }
      }
    });
    return areaDataUrls;
  };

  const areaDataUrls = transformData(areaData, userData?.uid);
  const companyDataUrls = transformData(companyData, null);
  companyDataUrls.urls.push({
    url: companyData?.webSite[0] || "",
    name: companyData?.tradename[1] ? companyData?.tradename[0] : "",
    //icon: companyData?.icon[0],
    icon: companyData?.iconWebSite || "",
    checked: companyData?.webSite[1],
    urlName: "webSite"
  });

  return userData && companyData && headquarterData && areaData && background ? (
    <div className="tw-flex tw-flex-col tw-relative tw-justify-center tw-items-center tw-h-screen">
      <div ref={containerRef} className="tw-shadow-md tw-rounded-2xl tw-bg-transparent tw-h-full tw-aspect-[9/20] tw-overflow-hidden">
        <Image
          className='tw-rounded-2xl tw-absolute tw-z-0'
          src={background?.imageUrl}
          alt='Card'
          width={windowSize.width}
          height={windowSize.height}
          style={{ display: 'block', position: 'relative', zIndex: 0 }}
        />
        <Hero
          photo={userData.ImageProfile}
          photoCompany={companyData.icon[1] ? companyData.icon[0] : ""}
          socialNetworks={areaDataUrls?.urls}
          userData={userData}
        />
        <TemplateContainer
          userData={userData}
          companyData={companyData}
          headquarterData={headquarterData}
          companyDataUrls={companyDataUrls.urls}
          areaDataUrls={areaDataUrls?.urls}
          color="#030124"
        />
        <Footer socialNetworks={companyDataUrls.urls} userData={userData} />{" "}
        <div
          className={`tw-flex tw-z-30 tw-h-[8%] tw-w-full tw-items-start tw-justify-center`}
        >
          <div className="tw-flex tw-z-30 tw-w-full tw-justify-center">
            {windowSize &&
              <Link
                href="https://onetap.com.co/"
                target="_blank"
                className="tw-font-normal tw-underline"
                style={{ color: "#fff", fontSize: `${Math.min(windowSize.width, windowSize.height) * 0.05}px`, }}
              >
                www.onetap.com.co
              </Link>
            }
          </div>
        </div>
      </div>

      <ModalCookies
        isModalAlert={isCookies}
        handleAceptCookies={handleAceptCookies}
      />
    </div>
  ) : (
    <CustomModalAlert
      isModalAlert={isDataError}
      handleModalAlert={() => setIsDataError(false)}
      title={"One Tap dice!"}
      description={"No se ha encontrado información para mostrar."}
      isClosed={false}
    />
  );
};

export default ThemeOne;
