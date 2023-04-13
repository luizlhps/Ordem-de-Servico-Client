import React, { createContext, useState } from "react";
import { LightTheme } from "../themes/Light";
import { ThemeProvider, Box } from "@mui/material";

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
        <Box
          width="100vw"
          height="100vh"
          bgcolor={LightTheme.palette.background.default}
          color={LightTheme.palette.primary.main}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
