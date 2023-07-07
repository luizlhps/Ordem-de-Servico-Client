import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface FinanceNotificationProps {
  children: ReactNode;
  contentWidthValue: string;
}

export const FeatureFinanceNotificationRoot = ({ children, contentWidthValue }: FinanceNotificationProps) => {
  const theme = useTheme();

  const styleContainer = {
    background: theme.palette.background.default,
    color: "black",
    width: `${contentWidthValue}`,
    minHeight: "165px",
    maxHeight: "165px",
    padding: 3,
    border: ` 1px solid ${theme.palette.custom?.grey}`,
    borderRadius: "14px",
  };

  return (
    <>
      <Box sx={styleContainer}>{children}</Box>
    </>
  );
};
