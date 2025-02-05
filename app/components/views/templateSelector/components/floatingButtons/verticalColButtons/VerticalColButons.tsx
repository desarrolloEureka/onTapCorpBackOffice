import { Box, Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../customButtons/CustomButton";

const getSocialNetworksOrderedByObject = (urls: any[], columns: number) => {
  let count = 2;
  const finalArray: any[][][] = [];
  let data2: any[][] = [];
  let data: any[] = [];
  if (columns) {
    const urlsFiltered = urls.filter((val) => val.checked);
    const reversedArray = urlsFiltered.slice().reverse();
    reversedArray.forEach((val, key) => {
      //array into two arrays
      data.push(val);
      if (reversedArray.length >= count) {
        if (count == key + 1) {
          data2.push(data);
          data = [];
          count = count + 2;
        }
      } else {
        data2.push(data);
        data = [];
        count = 2;
      }
    });
  }

  return { finalArray: finalArray.reverse(), data: data2.reverse() };
};

const VerticalColButtons = ({ socialNetworks, userData }: { socialNetworks: any[], userData: any }) => {
  const { data } = getSocialNetworksOrderedByObject(socialNetworks, 2);
  const reversedArray = data.slice().reverse();
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

  return (
    <Container ref={containerRef} className="tw-h-[85%] tw-w-[100%] tw-overflow-y-scroll tw-p-0">
      {reversedArray.map((val: any, key: any) => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              height: windowSize.height * 0.4,
              marginBottom: 10
            }}
            key={key}
          >
            {val.map((value: any, i: any) => {
              return (
                <Box key={i}>
                  <CustomButton
                    documentId={userData?.selectedArea}
                    collectionRef="workAreas"
                    name={value?.icon}
                    link={value?.url}
                    nameLabel={value?.name}
                    key={key}
                    styles={`tw-flex tw-flex-col`}
                    userData={userData}
                    urlName={value?.urlName}
                    widthSize={windowSize.width * 0.5}
                    heightSize={windowSize.height * 0.4}
                  />
                </Box>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};
export default VerticalColButtons;
