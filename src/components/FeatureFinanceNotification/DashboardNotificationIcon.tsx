import React, { ElementType } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

interface DashboardNotificationProps {
  icon: ElementType;
}

export const DashboardNotificationIcon = ({ icon: Icon }: DashboardNotificationProps) => {
  const theme = useTheme();
  return (
    <>
      <Box
        border={`1px solid ${theme.palette.custom?.grey}`}
        borderRadius={"8px"}
        display={"flex"}
        alignItems={"center"}
        padding={"5px 10px"}
        marginLeft={5}
      >
        <Icon sx={{ color: theme.palette.primary.dark }} />
      </Box>
    </>
  );
};
