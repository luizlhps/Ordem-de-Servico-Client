import { DataGridLayout, HeaderLayout } from "@/components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export default function Home() {
  //style custom

  //Theme
  const theme = useTheme();

  return (
    <>
      <HeaderLayout subTitle="Bem vindo a area ordem de serviço" title="Clientes" />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      ></Stack>
    </>
  );
}
