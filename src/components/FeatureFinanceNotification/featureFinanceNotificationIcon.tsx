import React, { ElementType } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

interface FinanceNotificationProps {
  icon: ElementType;
}

export const FeatureFinanceNotificationIcon = ({ icon: Icon }: FinanceNotificationProps) => {
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
