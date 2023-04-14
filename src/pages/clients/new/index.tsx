import { HeaderLayout } from "@/components";
import { Stack, useTheme } from "@mui/material";

export default function Home() {
  //style custom

  //Theme
  const theme = useTheme();

  return (
    <>
      <HeaderLayout subTitle="Digite os dados do novo cliente" title="Novo Cliente" />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      ></Stack>
    </>
  );
}
