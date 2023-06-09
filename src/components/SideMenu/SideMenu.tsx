import React, { useCallback, useEffect, useState } from "react";
import { ButtonLinks } from "./Utils/ButtonLinks";

//Styled Components
import styled from "styled-components";
//material UI
import { Box, Button, Divider, Drawer, Icon, List, Typography, useMediaQuery, useTheme } from "@mui/material";

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
import zIndex from "@mui/material/styles/zIndex";

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
  height: 60px;

  .menu {
    position: fixed;
    width: 70px;
    height: 40px;
    top: 10px;
    left: 10px;
    right: 0;
    z-index: 1201;
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
        <Box
          width={"100%"}
          height={60}
          sx={{ background: theme.palette.background.paper, position: "fixed", zIndex: 2 }}
        ></Box>

        <div className="menu">
          <Button onClick={handleMenuOpen}>
            <Icon>menu</Icon>
          </Button>
        </div>
      </DrawerHeader>
      <Drawer
        onClose={handleMenuOpen}
        open={isOpen}
        variant={smDown ? "temporary" : "permanent"}
        sx={{ "& .MuiDrawer-paper": { backgroundImage: "none", border: "none" } }}
      >
        <Box
          flex={1}
          width={!matches ? theme.spacing(36) : theme.spacing(34)}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          sx={{ color: theme.palette.primary.main }}
        >
          <BoxHeaderContent height={!matches ? theme.spacing(25) : "flex:0.5"} marginTop={4}>
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
              sx={{ display: "flex", alignItems: "center", flexDirection: "column", span: { fontWeight: 400 } }}
            >
              <ButtonLinks
                width={202}
                href="/"
                icon="dashboard"
                label={"Dashboard"}
                onclick={handleMenuOpen}
              ></ButtonLinks>
              <ButtonLinks
                width={202}
                href="/orders"
                icon="ordens"
                label={"Ordens de Serviço"}
                onclick={handleMenuOpen}
              ></ButtonLinks>

              <ButtonLinks
                width={202}
                href="/services"
                icon="services"
                label={"Serviços"}
                onclick={handleMenuOpen}
              ></ButtonLinks>

              <ButtonLinks
                width={202}
                href="/clients"
                icon="clients"
                label={"Clientes"}
                onclick={handleMenuOpen}
              ></ButtonLinks>

              <ButtonLinks
                width={202}
                href="/teste"
                icon="finance"
                label={"Finanças"}
                onclick={handleMenuOpen}
              ></ButtonLinks>
            </List>
          </Box>
        </Box>
        <FooterBox matches={matches} color={theme.palette.primary.main}>
          <Divider variant="middle" color={theme.palette.secondary.main} sx={{ height: 2, width: 200 }} />
          <List
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: !matches ? 3 : 0,
              span: { fontWeight: 300 },
            }}
          >
            <ButtonLinks
              width={100}
              href="/teste"
              icon="profile"
              label={"Perfil"}
              onclick={handleMenuOpen}
            ></ButtonLinks>
            <ButtonLinks width={100} href="/teste" icon="logout" label={"Sair"} onclick={handleMenuOpen}></ButtonLinks>
          </List>
        </FooterBox>
      </Drawer>

      <Box marginLeft={smDown ? 0 : theme.spacing(36)} padding={!smDown ? theme.spacing(8, 4) : theme.spacing(4, 2)}>
        {children}
      </Box>
    </>
  );
};
