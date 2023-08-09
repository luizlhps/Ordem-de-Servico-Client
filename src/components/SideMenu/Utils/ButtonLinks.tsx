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

const styleItem = {
  display: "flex",
  alignItems: "center",
  margin: "4px 0",
};

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
            ".MuiListItemText-root": {
              span: {
                color: theme.palette.grey[300],
              },
            },
            "&:hover": {
              background: "none",
              borderRadius: 2,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 29 }}>
            {icon === "dashboard" && (
              <Box sx={styleItem}>
                <DashboardSVG color={theme.palette.primary.main} />
              </Box>
            )}
            {icon === "ordens" && (
              <Box sx={styleItem}>
                <OrdensSVG color={theme.palette.primary.main} />
              </Box>
            )}
            {icon === "services" && (
              <Box sx={styleItem}>
                <ServicesSVG color={theme.palette.primary.main} />
              </Box>
            )}
            {icon === "clients" && (
              <Box sx={styleItem}>
                <ClientsSVG color={theme.palette.primary.main} />
              </Box>
            )}
            {icon === "finance" && (
              <Box sx={styleItem}>
                <FinanceSVG color={theme.palette.primary.main} />
              </Box>
            )}
            {icon === "profile" && (
              <Box sx={styleItem}>
                <ProfileSVG color={theme.palette.primary.main} />
              </Box>
            )}
            {icon === "logout" && <Image src={logout} alt="logout"></Image>}
          </ListItemIcon>
          <ListItemText sx={{ marginLeft: 0.5 }} primary={label} />
        </ListItemButtonCustom>
      </div>
    </>
  );
};
