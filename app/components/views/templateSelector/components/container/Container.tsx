import React, { useEffect, useRef, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Box, Button, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Carousel from "react-material-ui-carousel";
import SaveContactButtonColor from "../saveContactButton/SaveContactButtonColor";

const orderArray = (profile: any, headquarterData: any) => {
  const finalArray: any = [
    [
      {
        icon: "WorkOutlineOutlinedIcon",
        text: `${profile.firstName[1] ? profile.firstName[0] + " " : ""}${
          profile.lastName[1] ? profile.lastName[0] : ""
        }`,
      },
      {
        icon: "WorkOutlineOutlinedIcon",
        text: profile.position[1] ? profile.position[0] : "",
      },
      {
        icon: "EmailOutlinedIcon",
        text: profile?.emails[0]?.checked ? profile.emails[0].text : "",
        label: "Correo",
      },
      {
        icon: "LocalPhoneOutlinedIcon",
        text: profile?.phones[0]?.checked ? profile?.phones[0]?.text : "",
        label: "phones",
        indicative: profile?.phones[0]?.checked
          ? profile?.phones[0]?.indicative
          : "",
      },
    ],
    [
      {
        icon: "WorkOutlineOutlinedIcon",
        text: headquarterData.name[1] ? headquarterData.name[0] : "",
      },
      {
        icon: "ExploreOutlinedIcon",
        text: headquarterData.address[1] ? headquarterData.address[0] : "",
      },
      {
        icon: "LocalPhoneOutlinedIcon",
        text: headquarterData.phones[0].checked
          ? headquarterData.phones[0].text
          : "",
        label: "phones",
        indicative: headquarterData.phones[0].checked
          ? headquarterData.phones[0].indicative
          : "",
      },
      {
        icon: "LocalPhoneOutlinedIcon",
        text: headquarterData.phones[0].checked
          ? headquarterData.phones[0].ext
          : "",
      },
    ],
    [
      {
        icon: "L",
        text: `${
          headquarterData?.schedule?.monday?.openTime !== "N/A" &&
          headquarterData?.schedule?.monday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.monday?.openTime +
              " - " +
              headquarterData?.schedule?.monday?.closeTime
            : ""
        }`,
      },
      {
        icon: "M",
        text: `${
          headquarterData?.schedule?.tuesday?.openTime !== "N/A" &&
          headquarterData?.schedule?.tuesday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.tuesday?.openTime +
              " - " +
              headquarterData?.schedule?.tuesday?.closeTime
            : ""
        }`,
      },
      {
        icon: "M",
        text: `${
          headquarterData?.schedule?.wednesday?.openTime !== "N/A" &&
          headquarterData?.schedule?.wednesday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.wednesday?.openTime +
              " - " +
              headquarterData?.schedule?.wednesday?.closeTime
            : ""
        }`,
      },
      {
        icon: "J",
        text: `${
          headquarterData?.schedule?.thursday?.openTime !== "N/A" &&
          headquarterData?.schedule?.thursday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.thursday?.openTime +
              " - " +
              headquarterData?.schedule?.thursday?.closeTime
            : ""
        }`,
      },
      {
        icon: "V",
        text: `${
          headquarterData?.schedule?.friday?.openTime !== "N/A" &&
          headquarterData?.schedule?.friday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.friday?.openTime +
              " - " +
              headquarterData?.schedule?.friday?.closeTime
            : ""
        }`,
      },
      {
        icon: "S",
        text: `${
          headquarterData?.schedule?.saturday?.openTime !== "N/A" &&
          headquarterData?.schedule?.saturday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.saturday?.openTime +
              " - " +
              headquarterData?.schedule?.saturday?.closeTime
            : ""
        }`,
      },
      {
        icon: "D",
        text: `${
          headquarterData?.schedule?.sunday?.openTime !== "N/A" &&
          headquarterData?.schedule?.sunday?.closeTime !== "N/A"
            ? headquarterData?.schedule?.sunday?.openTime +
              " - " +
              headquarterData?.schedule?.sunday?.closeTime
            : ""
        }`,
      },
    ],
  ];
  return finalArray;
};

const TemplateContainer = ({
  userData,
  companyData,
  headquarterData,
  companyDataUrls,
  areaDataUrls,
  color,
}: {
  userData: any;
  companyData: any;
  headquarterData: any;
  companyDataUrls: any;
  areaDataUrls: any;
  color: string;
}) => {
  const finalArray = orderArray(userData, headquarterData);
  const isSmallScreen = useMediaQuery("(max-height:780px)");
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

  const clickType = (type: string, url: string) => {
    switch (type) {
      case "EmailOutlinedIcon":
        window.open("mailto:" + url);
        break;
      case "LocalPhoneOutlinedIcon":
        window.open("tel:" + url);
        break;
      case "ExploreOutlinedIcon":
        let newUrl = url.replace("#", "%23");
        newUrl = encodeURIComponent(url);
        window.open(`https://maps.google.com/maps?q=${newUrl}`);
        break;
    }
  };

  const Item = ({ item, isPadding }: { item: any[]; isPadding: boolean }) => (
    <>
      {item.map((val, key) =>
        val?.text ? (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: color,
              marginBottom: isPadding
                ? `${Math.min(windowSize.height, windowSize.width) * 0.06}px`
                : 0,
              paddingY: !isPadding
                ? `${Math.min(windowSize.height, windowSize.width) * 0.02}px`
                : 0,
            }}
            className={`tw-rounded-full tw-w-full tw-drop-shadow-sm tw-relative tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]`}
            key={key}
            onClick={() =>
              val.icon &&
              val.text &&
              clickType(
                val.icon,
                val.label === "phones" ? val?.indicative + val?.text : val.text
              )
            }
            startIcon={
              val.icon == "WorkOutlineOutlinedIcon" ? (
                <WorkOutlineOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: `${
                      Math.min(windowSize.height, windowSize.width) * 0.08
                    }px`,
                    marginLeft: `${
                      Math.min(windowSize.height, windowSize.width) * 0.04
                    }px`,
                  }}
                />
              ) : val.icon == "ExploreOutlinedIcon" ? (
                <ExploreOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: `${
                      Math.min(windowSize.height, windowSize.width) * 0.08
                    }px`,
                    marginLeft: `${
                      Math.min(windowSize.height, windowSize.width) * 0.04
                    }px`,
                  }}
                />
              ) : val.icon === "LocalPhoneOutlinedIcon" ? (
                <LocalPhoneOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: `${
                      Math.min(windowSize.height, windowSize.width) * 0.08
                    }px`,
                    marginLeft: `${
                      Math.min(windowSize.height, windowSize.width) * 0.04
                    }px`,
                  }}
                />
              ) : val.icon === "EmailOutlinedIcon" ? (
                <EmailOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: `${
                      Math.min(windowSize.height, windowSize.width) * 0.08
                    }px`,
                    marginLeft: `${
                      Math.min(windowSize.height, windowSize.width) * 0.04
                    }px`,
                  }}
                />
              ) : (
                <Typography
                  style={{
                    fontSize: `${
                      Math.min(windowSize.height, windowSize.width) * 0.07
                    }px`,
                    marginLeft: `${
                      Math.min(windowSize.height, windowSize.width) * 0.04
                    }px`,
                    paddingRight: `${
                      Math.min(windowSize.height, windowSize.width) * 0.04
                    }px`,
                  }}
                  className={`tw-w-[90%] tw-text-center tw-capitalize`}
                >
                  {val.icon}
                </Typography>
              )
            }
          >
            <Typography
              style={{
                fontSize: `${
                  Math.min(windowSize.height, windowSize.width) * 0.05
                }px`,
                paddingRight: `${
                  Math.min(windowSize.height, windowSize.width) * 0.04
                }px`,
              }}
              className={`tw-w-[90%] tw-text-center tw-truncate`}
            >
              {val.label === "phones"
                ? val?.indicative + " " + val?.text
                : val?.text && val?.text?.length > 21
                ? val?.text.substring(0, 18) + "..."
                : val?.text || ""}
            </Typography>
          </Button>
        ) : null
      )}
    </>
  );

  return (
    userData &&
    companyData &&
    headquarterData && (
      <Container
        className={`tw-h-[50%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center tw-p-0`}
      >
        <SaveContactButtonColor
          colorButton={color}
          userData={userData}
          companyData={companyData}
          companyDataUrls={companyDataUrls}
          areaData={areaDataUrls}
        />
        <Container
          ref={containerRef}
          className={`tw-flex tw-z-10 tw-h-[90%] tw-p-0`}
        >
          {finalArray.length > 0 && (
            <Carousel
              navButtonsAlwaysVisible
              swipe={false}
              className={`tw-flex tw-flex-col tw-w-full tw-h-full tw-justify-end `}
              autoPlay={false}
              activeIndicatorIconButtonProps={{
                style: {
                  color: "#030124",
                },
              }}
              indicatorContainerProps={{
                style: {
                  position: "absolute",
                  top: 0, // Posiciona los indicadores en la parte superior
                  margin: 0,
                  width: "100%",
                  height: "10%", // Ajusta la altura del contenedor de indicadores
                  textAlign: "center",
                  alignContent: "center",
                  zIndex: 1,
                },
              }}
              navButtonsProps={{
                style: {
                  margin: "0 10px",
                },
              }}
            >
              {finalArray.map((item: any, i: number) => (
                <Box
                  key={`carousel-item-${i}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: windowSize.height * 0.9,
                  }}
                >
                  {i === 2 && (
                    <div className="tw-flex tw-w-[60%]">
                      <Typography
                        style={{
                          fontSize: `${
                            Math.min(windowSize.height, windowSize.width) * 0.04
                          }px`,
                        }}
                        className={`tw-w-[90%] tw-text-start tw-truncate tw-font-bold tw-text-white`}
                      >
                        Horario
                      </Typography>
                    </div>
                  )}
                  <div
                    className={`tw-flex tw-flex-col tw-h-full tw-w-[80%] tw-justify-around tw-overflow-y-auto`}
                  >
                    <Item item={item} isPadding={i === 2} />
                  </div>
                </Box>
              ))}
            </Carousel>
          )}
        </Container>
      </Container>
    )
  );
};

export default TemplateContainer;
