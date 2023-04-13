import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "36px", // Tamanho de fonte para h1
    },
    h2: {
      fontSize: "24px", // Tamanho de fonte para h2
    },
    h3: {
      fontSize: "18px", // Tamanho de fonte para h3
    },
    fontFamily: [
      "Poopins",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  palette: {
    primary: {
      main: "#1E2737",
    },
    secondary: {
      main: "#06B0AB",
    },
    background: {
      paper: "#ffffff",
      default: "#F3F5F7",
    },
  },
});
