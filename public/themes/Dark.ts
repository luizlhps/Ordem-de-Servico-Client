import { createTheme, Theme, PaletteOptions } from "@mui/material";
import { DataGrid, bgBG } from "@mui/x-data-grid";
import { ptBR as ptBRGridToolbar } from "@mui/x-data-grid";
import { ptBR as coreBgBG } from "@mui/material/locale";
import { ptBR as pickersBgBG } from "@mui/x-date-pickers/locales";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { ptBR } from "@mui/material/locale";

import { ptBR as dataGridptBR } from "@mui/x-data-grid";

interface PaletteCustomColors {
  custom?: {
    grey: string;
  };
}
declare module "@mui/material/styles" {
  interface Palette extends PaletteCustomColors {}
  interface PaletteOptions extends PaletteCustomColors {}
}

export const DarkTheme = createTheme(
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

      allVariants: {
        color: "white",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#719ECE",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              outline: "none",
              borderColor: "#719ECE",
            },
          },
        },
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
      custom: {
        grey: "#323C4C",
      },
    },
  },
  ptBR,
  pickersBgBG,
  ptBRGridToolbar,
  dataGridptBR,
  coreBgBG, // core translations]
  DataGrid
);
