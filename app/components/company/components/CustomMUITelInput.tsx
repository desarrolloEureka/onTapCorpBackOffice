"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";

const CustomMUITelInput = (props: any) => {
    const theme = createTheme({
        palette: {
            mode: props.theme,
        },
    });

    return (
        <div className="tw-flex tw-flex-row tw-mt-4 tw-w-1/4">
            <ThemeProvider theme={theme}>
                <MuiTelInput {...props} />
            </ThemeProvider>
        </div>
    );
};

export default CustomMUITelInput;
