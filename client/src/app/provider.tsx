"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Provider = ({ children }: any) => {
    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default Provider;
