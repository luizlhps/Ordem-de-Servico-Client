import React, { createContext, useState } from "react";
import { LightTheme } from "../../public/themes/Light";
import { ThemeProvider, Box, createTheme, CssBaseline } from "@mui/material";

interface IThemeContext {
  themeName: "light";
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContext);

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light">("light");
  return (
    <ThemeContext.Provider value={{ themeName }}>
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
