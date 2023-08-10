import React, { useCallback, useContext, useEffect, useState } from "react";
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
import imageProfile from "../../../public/img/profile.jpg";
import { SessionContext } from "@/auth/SessionProvider";
import {
  ClientsSVG,
  DashboardSVG,
  FinanceSVG,
  LogoutSVG,
  OrdensSVG,
  ProfileSVG,
  ServicesSVG,
} from "../../../public/icon/SVGS/IconsSVG";

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

  margin-top: ${({ matches }) => (matches ? "50px" : "50px")};
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

  const { signOut } = useContext(SessionContext);

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
          <BoxHeaderContent height={!matches ? theme.spacing(25) : "flex:0.5"} marginTop={5}>
            <Image
              style={{
                clipPath: "circle(50% at 50% 50%)",
              }}
              width={90}
              height={90}
              priority={true} // definir como true para indicar prioridade
              unoptimized={true}
              src={imageProfile}
              alt="imagem de perfil"
            />
            <Box display="flex" flexDirection="column" alignItems={"center"}>
              <Typography variant="h1" fontWeight={600} marginTop={2}>
                Roberto
              </Typography>
              <Divider
                variant="fullWidth"
                color={theme.palette.secondary.main}
                sx={{ height: 3, width: 50, marginTop: 1 }}
              />
            </Box>
          </BoxHeaderContent>
          <Box sx={{ marginTop: 2 }}>
            <List
              component="nav"
              sx={{ display: "flex", flexDirection: "column", span: { fontWeight: 400, fontSize: 15 } }}
            >
              <ButtonLinks.Root onClick={handleMenuOpen} href="/" width={210}>
                <ButtonLinks.Icon icon={DashboardSVG} />
                <ButtonLinks.Content label="Dashboard" />
              </ButtonLinks.Root>

              <ButtonLinks.Root onClick={handleMenuOpen} href="orders" width={210}>
                <ButtonLinks.Icon icon={OrdensSVG} />
                <ButtonLinks.Content label="Settings" />
              </ButtonLinks.Root>

              <Typography
                marginBottom={"1rem"}
                marginTop={"2rem"}
                padding={"0 16px"}
                textTransform={"uppercase"}
                fontSize={15}
              >
                Geral
              </Typography>

              <ButtonLinks.Root onClick={handleMenuOpen} href="orders" width={210}>
                <ButtonLinks.Icon icon={OrdensSVG} />
                <ButtonLinks.Content label="Ordens de Serviço" />
              </ButtonLinks.Root>

              <ButtonLinks.Root onClick={handleMenuOpen} href="services" width={210}>
                <ButtonLinks.Icon icon={ServicesSVG} />
                <ButtonLinks.Content label="Serviços" />
              </ButtonLinks.Root>

              <ButtonLinks.Root onClick={handleMenuOpen} href="customer" width={210}>
                <ButtonLinks.Icon icon={ClientsSVG} />
                <ButtonLinks.Content label="Clientes" />
              </ButtonLinks.Root>

              <ButtonLinks.Root onClick={handleMenuOpen} href="finance" width={210}>
                <ButtonLinks.Icon icon={FinanceSVG} />
                <ButtonLinks.Content label="Finanças" />
              </ButtonLinks.Root>
            </List>
          </Box>
        </Box>
        <FooterBox matches={matches}>
          <List
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: !matches ? 2 : 0,
              marginBottom: !matches ? 4 : 0,
              span: { fontWeight: 400, fontSize: "14px" },
            }}
          >
            <ButtonLinks.Root onClick={handleMenuOpen} href="finance" width={102}>
              <ButtonLinks.Icon icon={ProfileSVG} />
              <ButtonLinks.Content label="Perfil" />
            </ButtonLinks.Root>

            <ButtonLinks.Root onClick={signOut} width={102}>
              <ButtonLinks.Icon icon={LogoutSVG} />
              <ButtonLinks.Content label="Sair" />
            </ButtonLinks.Root>
          </List>
        </FooterBox>
      </Drawer>

      <Box marginLeft={smDown ? 0 : theme.spacing(36)} padding={!smDown ? theme.spacing(7, 4) : theme.spacing(4, 2)}>
        {children}
      </Box>
    </>
  );
};
