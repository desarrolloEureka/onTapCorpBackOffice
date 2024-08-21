import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import './globals.css';
import { globalConfig } from "@/config/globalConfig";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "../public/assets/css/icons.css";
import "../styles/globals.scss";
import "./input.css";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: globalConfig.name,
    description: globalConfig.description,
    icons: {
        icon: globalConfig.icon, // /public path
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className} style={{ margin: 0 }}>
                <ThemeProvider theme={theme}>
                    {/* <CssBaseline /> */}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
