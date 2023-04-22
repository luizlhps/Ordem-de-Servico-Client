import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  typography: {
    h1: {
      fontSize: "36px", // Tamanho de fonte para h1
    },
    h2: {
      fontSize: "24px", // Tamanho de fonte para h2
    },
    h3: {
      fontSize: "16px", // Tamanho de fonte para h3
    },
    fontFamily: [
      "Inter",
      "Poopins",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    allVariants: {
      color: "white",
    },
  },

  palette: {
    mode: "dark",
    primary: {
      main: "#FFF",
      light: "#C8C8C8",
    },
    secondary: {
      main: "#06B0AB",
    },
    background: {
      default: "#1A2027",
      paper: "#1E2737",
    },
  },
});
