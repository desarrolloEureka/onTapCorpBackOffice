import React from "react";
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

  const Item = ({ item }: { item: any[] }) => (
    <div className="tw-flex tw-flex-col tw-items-center tw-w-full tw-overflow-y-auto">
      {item.map((val, key) =>
        val?.text ? (
          <Button
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: color }}
            className={`tw-rounded-s-2xl tw-rounded-e-2xl tw-drop-shadow-sm tw-w-full ${
              isSmallScreen ? "tw-h-[35px]" : "tw-h-[34px]"
            } tw-px-1 tw-relative tw-my-1.5 tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]`}
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
                    fontSize: "1.4rem",
                    marginLeft: "0.7rem",
                  }}
                />
              ) : val.icon == "ExploreOutlinedIcon" ? (
                <ExploreOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: "1.4rem",
                    marginLeft: "0.7rem",
                  }}
                />
              ) : val.icon === "LocalPhoneOutlinedIcon" ? (
                <LocalPhoneOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: "1.4rem",
                    marginLeft: "0.7rem",
                  }}
                />
              ) : val.icon === "EmailOutlinedIcon" ? (
                <EmailOutlinedIcon
                  style={{
                    color: "white",
                    fontSize: "1.4rem",
                    marginLeft: "0.7rem",
                  }}
                />
              ) : (
                <Typography
                  style={{ marginLeft: "0.9rem" }}
                  className={`tw-w-[90%] tw-pr-9 tw-text-center tw-capitalize`}
                >
                  {val.icon}
                </Typography>
              )
            }
          >
            <Typography
              style={{ fontSize: val.label === "Correo" ? "14px" : undefined }}
              className={`tw-w-[90%] tw-pr-9 tw-text-center tw-truncate`}
            >
              {val.label === "phones"
                ? val?.indicative + " " + val?.text
                : val?.text && val?.text?.length > 20
                ? val?.text.substring(0, 17) + "..."
                : val?.text || ""}
            </Typography>
          </Button>
        ) : null
      )}
    </div>
  );

  return (
    userData &&
    companyData &&
    headquarterData && (
      <Container
        className={`tw-h-[50%] tw-flex tw-flex-col tw-content-center tw-items-center tw-justify-center tw-p-0 ${
          isSmallScreen ? "tw-mt-2" : "tw-mt-0"
        }`}
      >
        <SaveContactButtonColor
          colorButton={color}
          userData={userData}
          companyData={companyData}
          companyDataUrls={companyDataUrls}
          areaData={areaDataUrls}
          second={false}
        />
        <Container
          className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-z-10 tw-h-[90%] tw-p-0`}
        >
          {finalArray.length > 0 && (
            <Carousel
              navButtonsAlwaysVisible
              swipe={false}
              className={`tw-flex tw-flex-col tw-w-full tw-h-full tw-content-center tw-items-center tw-justify-center `}
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
                  height: "12%", // Ajusta la altura del contenedor de indicadores
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
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center", // Esto asegura que todo quede centrado
                    width: "100%", // Asegúrate de que use todo el ancho
                  }}
                >
                  {i === 2 && (
                    <div className="tw-flex tw-pt-6 tw-w-[60%]">
                      <Typography
                        style={{ fontSize: "15px" }}
                        className={`tw-w-[90%] tw-text-start tw-truncate tw-font-bold tw-text-white`}
                      >
                        Horario
                      </Typography>
                    </div>
                  )}
                  <div
                    className={`tw-overflow-y-auto tw-h-full tw-max-h-[230px]`}
                  >
                    <Item item={item} />
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
