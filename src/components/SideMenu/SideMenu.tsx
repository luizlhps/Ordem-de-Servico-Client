import React from "react";
import {
  Box,
  Drawer,
  useTheme,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  List,
  Divider,
  Typography,
} from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BuildIcon from "@mui/icons-material/Build";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

//inteface
interface SideMenuProps {
  children: React.ReactNode;
}

//Image
import imageProfile from "../../../public/img/profile.svg";
import Image from "next/image";
import { LightTheme } from "../../../public/themes/Light";

export const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
        <Box width={theme.spacing(34)} sx={{ color: theme.palette.primary.main }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            height={theme.spacing(25)}
            marginTop={4}
          >
            <Image unoptimized={true} src={imageProfile} alt="imagem de perfil" />
            <Box display="flex" flexDirection="column" alignItems={"center"}>
              <Typography variant="h1" fontWeight={600} marginTop={4}>
                Roberto
              </Typography>
              <Typography variant="h3">User Teste</Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <List component="nav">
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
                    <Icon>dashboard</Icon>
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      width: "130px",
                      fontWeight: 800,
                      color: theme.palette.secondary.main,
                    }}
                    primary="Dashboard"
                  />
                </Box>
              </ListItemButton>

              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    <AutoAwesomeMosaicIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "130px" }} primary="Ordens de serviço" />
                </Box>
              </ListItemButton>

              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "130px" }} primary="Serviços" />
                </Box>
              </ListItemButton>

              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "130px" }} primary="Clientes" />
                </Box>
              </ListItemButton>

              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "130px" }} primary="Finanças" />
                </Box>
              </ListItemButton>
            </List>
          </Box>

          <Divider
            variant="middle"
            color={LightTheme.palette.secondary.main}
            sx={{ marginTop: "60%" }}
          />
          <List component="nav" sx={{ marginTop: "3%" }}>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <QueryStatsIcon />
                </ListItemIcon>
                <ListItemText sx={{ width: "130px" }} primary="Finanças" />
              </Box>
            </ListItemButton>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  <QueryStatsIcon />
                </ListItemIcon>
                <ListItemText sx={{ width: "130px" }} primary="Finanças" />
              </Box>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(34)}>
        {children}
      </Box>
    </>
  );
};
