import React from "react";
import { Box, Stack, Typography } from "@mui/material";

interface FeatureFinanceNotificationProps {
  content: string | number | undefined;
}

export const FeatureFinanceNotificationContent = ({ content }: FeatureFinanceNotificationProps) => {
  return (
    <>
      <Typography marginTop={1.5} fontWeight={500} fontSize={26} variant="h1">
        {content}
      </Typography>
    </>
  );
};
