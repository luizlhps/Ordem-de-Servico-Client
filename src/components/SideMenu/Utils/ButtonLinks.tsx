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

//svg
import {
  ClientsSVG,
  DasboardSVG,
  FinanceSVG,
  OrdensSVG,
  ProfileSVG,
  ServicesSVG,
} from "../../../../public/icon/SVGS/IconsSVG";
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
            color={theme.palette.primary.main}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 29 }}>
              {icon === "dashboard" && (
                <Box>
                  <DasboardSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "ordens" && (
                <Box>
                  <OrdensSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "services" && (
                <Box>
                  <ServicesSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "clients" && (
                <Box>
                  <ClientsSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "finance" && (
                <Box>
                  <FinanceSVG color={theme.palette.primary.main} />
                </Box>
              )}
              {icon === "profile" && (
                <Box>
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
