"use client";
import { Box, PaletteMode } from "@mui/material";
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
    width: 73, // Ajusta el ancho
    height: 41, // Ajusta la altura
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 4, // Ajusta el margen según el tamaño
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(30px)", // Ajusta el movimiento al tamaño nuevo
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "light" ? "#396593" : "#8bb8e7",
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
        width: 34, // Ajusta el tamaño del thumb
        height: 34, // Ajusta el tamaño del thumb
    },
    "& .MuiSwitch-track": {
        borderRadius: 38 / 2,
        backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

const SwitchForm = ({
    checked,
    onChange,
    modeTheme,
    text,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    modeTheme: string;
    text: string;
}) => {
    const theme = createTheme({
        palette: {
            mode: modeTheme as PaletteMode,
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                control={
                    <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <IOSSwitch
                            sx={{ m: 1, marginLeft: 3 }}
                            checked={checked}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                onChange(e);
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                left: 4,
                                right: 4,
                                display: "flex",
                                justifyContent: "space-between",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "100%",
                                fontSize: "0.875rem",
                            }}
                        >
                            <span style={{ color: checked ? "#fff" : "#000", marginLeft: 30 }}>Off</span>
                            <span style={{ color: checked ? "#000" : "#fff", marginRight: 24 }}>On</span>
                        </Box>
                    </Box>
                }
                label=""
                sx={{ color: "#000" }}
                labelPlacement="bottom"
            />
            <p className="tw-text-left">{text}</p>
        </ThemeProvider>
    );
};

export default SwitchForm;
