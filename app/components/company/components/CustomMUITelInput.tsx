"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { useEffect, useState } from "react";

const CustomMUITelInput = (props: any) => {
    const [value, setValue] = useState<string>("");

    const theme = createTheme({
        palette: {
            mode: props.theme,
        },
    });

    useEffect(() => {
        props.value && setValue(props.value);
    }, [props.value]);

    return (
        <ThemeProvider theme={theme}>
            <MuiTelInput
                {...props}
                value={value}
                onChange={(value) => {
                    props.onChange(value, props.name);
                    setValue(value);
                }}
                InputLabelProps={{
                    style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                        color:
                            props.theme === "light" ? "#396593" : "#8bb8e7",
                        // paddingLeft: "16px"
                    },
                }}
            />
        </ThemeProvider>
    );
};

export default CustomMUITelInput;
