import { Box, Container } from "@mui/material";
import React from "react";
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

  return (
    <Container className="tw-h-[100%] tw-w-[100%] tw-overflow-y-scroll no-scrollbar">
      {reversedArray.map((val: any, key: any) => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              marginLeft: -15,
              marginRight: -15,
            }}
            key={key}
          >
            {val.map((value: any, i: any) => {
              return (
                <Box
                  sx={{ width: "100%", height: 74, paddingBottom: 2 }}
                  key={i}
                >
                  <CustomButton
                    name={value?.icon}
                    link={value?.url}
                    nameLabel={value?.name}
                    key={key}
                    styles={`tw-flex tw-flex-col`}
                    userData={userData}
                    urlName={value?.urlName}
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
