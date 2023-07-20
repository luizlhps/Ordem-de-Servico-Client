import React from "react";
import { Box, Stack, Typography } from "@mui/material";

interface DashboardNotificationProps {
  content: string | number | undefined;
}

export const DashboardNotificationContent = ({ content }: DashboardNotificationProps) => {
  return (
    <>
      <Typography marginTop={1.5} fontWeight={500} fontSize={26} variant="h1">
        {content}
      </Typography>
    </>
  );
};
