"use client";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomSwitch from "./CustomSwitch";

const CustomTextField = (props: any) => {
    const theme = createTheme({
        palette: {
            mode: props.theme,
        },
    });

    return (
        <div className="tw-flex tw-flex-row tw-px-3 tw-mt-4 tw-w-full">
            <ThemeProvider theme={theme}>
                <TextField
                    {...props}
                    variant="standard"
                    color="primary"
                />
                {props.switch && <CustomSwitch {...props} />}
            </ThemeProvider>
        </div>
    );
};

export default CustomTextField;
