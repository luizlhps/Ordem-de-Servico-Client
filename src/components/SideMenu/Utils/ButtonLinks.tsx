import React from "react";
import { ListItemButton, Box, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/navigation";

//svg
import {
  ClientsSVG,
  DashboardSVG,
  FinanceSVG,
  OrdensSVG,
  ProfileSVG,
  ServicesSVG,
} from "../../../../public/icon/SVGS/IconsSVG";
import logout from "../../../../public/icon/logout.svg";
import Image from "next/image";

//interface
interface IButtomLinks {
  href: string;
  icon: string;
  label: string;
  width: number | "auto";
  onclick: () => void;
}
//Styles
const ListItemButtonCustom = styled(ListItemButton)``;

export const ButtonLinks: React.FC<IButtomLinks> = ({ href, icon, label, onclick, width }) => {
  const router = useRouter();
  const theme = useTheme();

  const handleClick = () => {
    router.push(href);
    onclick;
  };
  return (
    <>
      <div style={{ width }}>
        <ListItemButtonCustom
          onClick={handleClick}
          sx={{
            "&:hover": {
              color: theme.palette.secondary.main,
              background: "none",
            },
          }}
        >
          <Box
            color={theme.palette.primary.main}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 29 }}>
              {icon === "dashboard" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DashboardSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "ordens" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <OrdensSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "services" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ServicesSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "clients" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ClientsSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "finance" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FinanceSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "profile" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ProfileSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "logout" && <Image src={logout} alt="logout"></Image>}
            </ListItemIcon>
            <ListItemText sx={{}} primary={label} />
          </Box>
        </ListItemButtonCustom>
      </div>
    </>
  );
};
