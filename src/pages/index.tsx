import { AccordionList, HeaderLayout } from "@/components";
import { ViewOrderModal } from "@/components/Modal/orderPage/ViewOrderModal";

import { Stack, useTheme } from "@mui/material";
import styled from "styled-components";

//style custom

const TesteSvg = styled.div`
  #Base {
    fill: blue;
  }
`;

export default function Home() {
  //Theme
  const theme = useTheme();

  return (
    <>
      <HeaderLayout subTitle="Bem vindo a area ordem de serviço" title="Clientes" />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}></Stack>

      <TesteSvg></TesteSvg>
      <ViewOrderModal handleClose={() => {}} open={true} />
    </>
  );
}
