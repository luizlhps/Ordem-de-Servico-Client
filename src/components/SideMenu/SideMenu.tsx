import React, { useCallback, useEffect, useState } from "react";
import { LightTheme } from "../../../public/themes/Light";
import { ButtonLinks } from "./Utils/ButtonLinks";

//Styled Components
import styled from "styled-components";
//material UI
import {
  Box,
  Button,
  Divider,
  Drawer,
  Icon,
  List,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

//inteface
interface SideMenuProps {
  children: React.ReactNode;
}

interface propsStyled {
  smDown?: any;
  matches?: any;
}

//Image
import Image from "next/image";
import imageProfile from "../../../public/img/profile.svg";

//Custom Styled

const BoxHeaderContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const FooterBox = styled.div<propsStyled>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  margin-top: ${({ matches }) => (matches ? "50px" : "200px")};
`;
const DrawerHeader = styled.div<propsStyled>`
  position: relative;
  display: ${({ smDown }) => (smDown ? "flex" : "none")};
  div {
    position: fixed;
    width: 30px;
    height: 30px;
    top: 10px;
    left: 10px;
    right: 0;
    z-index: 2000;
  }
`;

export const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down("md"));
  const matches = useMediaQuery("(max-height:860px)");

  //menu
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenuOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (smDown === false) {
      setIsOpen(false);
    }
  }, [smDown]);

  return (
    <>
      <DrawerHeader smDown={smDown}>
        <div>
          <Button onClick={handleMenuOpen}>
            <Icon>menu</Icon>
          </Button>
        </div>
      </DrawerHeader>
      <Drawer
        onClose={handleMenuOpen}
        open={isOpen}
        variant={smDown ? "temporary" : "permanent"}
      >
        <Box
          flex={1}
          width={theme.spacing(34)}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          sx={{ color: theme.palette.primary.main }}
        >
          <BoxHeaderContent height={theme.spacing(25)} marginTop={4}>
            <Image
              priority={true} // definir como true para indicar prioridade
              unoptimized={true}
              src={imageProfile}
              alt="imagem de perfil"
            />
            <Box display="flex" flexDirection="column" alignItems={"center"}>
              <Typography variant="h1" fontWeight={600} marginTop={2}>
                Roberto
              </Typography>
              <Typography variant="h3" fontWeight={400}>
                User Teste
              </Typography>
            </Box>
          </BoxHeaderContent>
          <Box sx={{ marginTop: 3 }}>
            <List
              component="nav"
              sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
            >
              <ButtonLinks
                width={200}
                href="/"
                icon="dashboard"
                label={"Dashboard"}
                onclick={handleMenuOpen}
              ></ButtonLinks>
              <ButtonLinks
                width={200}
                href="/teste"
                icon="ordens"
                label={"Ordens de Serviço"}
                onclick={handleMenuOpen}
              ></ButtonLinks>

              <ButtonLinks
                width={200}
                href="/teste"
                icon="services"
                label={"Serviços"}
                onclick={handleMenuOpen}
              ></ButtonLinks>

              <ButtonLinks
                width={200}
                href="/clients"
                icon="clients"
                label={"Clientes"}
                onclick={handleMenuOpen}
              ></ButtonLinks>

              <ButtonLinks
                width={200}
                href="/teste"
                icon="finance"
                label={"Finanças"}
                onclick={handleMenuOpen}
              ></ButtonLinks>
            </List>
          </Box>
        </Box>
        <FooterBox matches={matches} color={theme.palette.primary.main}>
          <Divider
            variant="middle"
            color={LightTheme.palette.secondary.main}
            sx={{ height: 2, width: 200 }}
          />
          <List
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 5,
            }}
          >
            <ButtonLinks
              width={100}
              href="/teste"
              icon="profile"
              label={"Perfil"}
              onclick={handleMenuOpen}
            ></ButtonLinks>
            <ButtonLinks
              width={100}
              href="/teste"
              icon="logout"
              label={"Sair"}
              onclick={handleMenuOpen}
            ></ButtonLinks>
          </List>
        </FooterBox>
      </Drawer>

      <Box marginLeft={smDown ? 0 : theme.spacing(34)} padding={theme.spacing(8, 2)}>
        {children}
      </Box>
    </>
  );
};
