import React from "react";
import {
  ListItemButton,
  Box,
  Icon,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import dashboardsvg from "../../../../public/icon/dashboard.svg";
import ordens from "../../../../public/icon/ordens.svg";
import services from "../../../../public/icon/services.svg";
import clients from "../../../../public/icon/clients.svg";
import finance from "../../../../public/icon/finance.svg";
import profile from "../../../../public/icon/profile.svg";
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
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 29 }}>
              {icon === "dashboard" && <Image src={dashboardsvg} alt="dashboard"></Image>}
              {icon === "ordens" && <Image src={ordens} alt="dashboard"></Image>}
              {icon === "services" && <Image src={services} alt="dashboard"></Image>}
              {icon === "clients" && <Image src={clients} alt="dashboard"></Image>}
              {icon === "finance" && <Image src={finance} alt="dashboard"></Image>}
              {icon === "profile" && <Image src={profile} alt="profile"></Image>}
              {icon === "logout" && <Image src={logout} alt="logout"></Image>}
            </ListItemIcon>
            <ListItemText sx={{}} primary={label} />
          </Box>
        </ListItemButtonCustom>
      </div>
    </>
  );
};
