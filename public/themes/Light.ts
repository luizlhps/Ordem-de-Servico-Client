import { createTheme } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

import { DataGrid, bgBG } from "@mui/x-data-grid";
import { ptBR as ptBRGridToolbar } from "@mui/x-data-grid";
import { ptBR as coreBgBG } from "@mui/material/locale";
import { ptBR } from "@mui/material/locale";

export const LightTheme = createTheme(
  {
    typography: {
      h1: {
        fontSize: "36px", // Tamanho de fonte para h1
        fontWeight: "600",
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
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#06B0AB",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#06B0AB",
            },
          },
        },
      },
    },

    palette: {
      primary: {
        main: "#1E2737",
        light: "#878787",
      },
      secondary: {
        main: "#06B0AB",
      },
      background: {
        default: "#F3F5F7",
        paper: "#fff",
      },
    },
  },
  ptBR,
  ptBRGridToolbar,
  coreBgBG, // core translations]
  DataGrid
);
