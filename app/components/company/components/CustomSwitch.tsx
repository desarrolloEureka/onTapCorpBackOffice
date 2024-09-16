"use client";
import { PaletteMode } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { ChangeEvent } from "react";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        inputProps={{ "aria-label": "controlled" }}
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#39393D" : "#39393D",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#8bb8e7",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#396593" : "#8bb8e7",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

const CustomSwitch = ({
    checked,
    onChange,
    modeTheme,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    modeTheme: string;
}) => {
    const theme = createTheme({
        palette: {
            mode: modeTheme as PaletteMode,
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                className="tw-mx-1"
                control={
                    <IOSSwitch
                        sx={{ m: 1 }}
                        checked={checked}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            onChange(e);
                        }}
                    />
                }
                label="On/Off"
                sx={{ color: "#396593" }}
                labelPlacement="bottom"
            />
        </ThemeProvider>
    );
};

export default CustomSwitch;
