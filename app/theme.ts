"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
// import { LocalVariable } from "./types/global";
// import { PaletteMode } from "@mui/material";
import { blue } from "@mui/material/colors";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

// const themeLocal = localStorage.getItem("@theme");
// const themeParsed = themeLocal
//     ? (JSON.parse(themeLocal) as LocalVariable)
//     : null;

// const modeTheme: PaletteMode = themeParsed?.dataThemeMode as PaletteMode;

const theme = createTheme({
    palette: {
        mode: "light",
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }: any) => ({
                    ...(ownerState.severity === "info" && {
                        backgroundColor: "#60a5fa",
                    }),
                }),
            },
        },
    },
});

export default theme;
