import React, { ReactNode } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

interface DashboardNotificationProps {
  title: string;
  subTitle: string;
  children?: ReactNode;
}

export const DashboardNotificationHeader = ({ title, subTitle, children }: DashboardNotificationProps) => {
  const theme = useTheme();
  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Stack>
          <Typography fontWeight={500} variant="h2" fontSize={18}>
            {title}
          </Typography>
          <Typography fontWeight={500} color={theme.palette.secondary.light} fontSize={12}>
            {subTitle}
          </Typography>
        </Stack>
        {children}
      </Stack>
    </>
  );
};
