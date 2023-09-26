import React, { useState } from "react";
import { Box, useTheme, Typography, Stack } from "@mui/material";
import { DashboardSVG, OrdensSVG, ServicesSVG } from "../../../public/icon/SVGS/IconsSVG";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface IProps {
  children: React.ReactNode;
  icon: "services" | "orders" | "technicalOpinion";
  title: string;
  subTitle: string;
  dafaultOpen?: boolean;
  description?: string;
}

export const AccordionList = ({ children, icon, title, subTitle, dafaultOpen, description }: IProps) => {
  const theme = useTheme();

  const phoneMedia = useMediaQuery("(max-width:575px)");
  const smallphoneMedia = useMediaQuery("(max-width:364px)");

  const AccodionOpen = dafaultOpen ? dafaultOpen : false;
  const [open, setOpen] = useState<boolean>(AccodionOpen);

  const handleButton = () => {
    setOpen((old) => !old);
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexWrap={"wrap"} width={1}>
        <Box display={"flex"} alignItems={"center"}>
          <Box
            width={40}
            height={40}
            sx={{
              border: "solid 1px",
              borderColor: theme.palette.custom?.grey,
              borderRadius: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              marginRight: smallphoneMedia ? 1 : 3,
            }}
          >
            {icon === "orders" && <OrdensSVG color={theme.palette.primary.main} />}
            {icon === "services" && <ServicesSVG color={theme.palette.primary.main} />}
            {icon === "technicalOpinion" && <DashboardSVG color={theme.palette.primary.main} />}
          </Box>

          <Box maxWidth={280}>
            <Typography fontWeight={600}>{title}</Typography>
            <Typography fontSize={14} fontWeight={300}>
              {subTitle}
            </Typography>
          </Box>
        </Box>

        <Box display={"flex"} gap={2} marginTop={smallphoneMedia ? 1 : "none"}>
          {description && phoneMedia === false && (
            <Box
              height={40}
              alignItems={"center"}
              border={1}
              borderRadius={10}
              minWidth={100}
              borderColor={theme.palette.custom?.grey}
              display={"flex"}
              justifyContent={"center"}
            >
              {<Typography fontSize={14}>{description}</Typography>}
            </Box>
          )}

          <Box
            data-testid="arrow-icon-container"
            onClick={handleButton}
            sx={{ cursor: "pointer" }}
            border={1}
            borderRadius={10}
            width={smallphoneMedia ? 25 : 40}
            height={smallphoneMedia ? 25 : 40}
            borderColor={theme.palette.custom?.grey}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {open === true && <KeyboardArrowDownIcon />}
            {open === false && <KeyboardArrowRightIcon />}
          </Box>
        </Box>
      </Box>
      <Box
        data-testid="content-container"
        marginTop={3}
        sx={{
          border: open ? "solid 1px" : "0 solid",
          borderColor: theme.palette.custom?.grey,
          borderRadius: "20px",
          maxHeight: open ? "9999px" : "0px",
          transition: open ? "max-height 1s" : "all 0.1s",
          overflow: "hidden",
        }}
      >
        <Box padding={4} overflow={"auto"}>
          {children}
        </Box>
      </Box>
    </>
  );
};
