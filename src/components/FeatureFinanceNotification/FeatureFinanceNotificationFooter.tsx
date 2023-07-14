import React, { ElementType, ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface FinanceNotificationProps {
  icon?: ReactNode;
  subTitle: string;
  color?: string;
}

export const FeatureFinanceNotificationFooter = ({ icon, subTitle, color }: FinanceNotificationProps) => {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} marginTop={0.2} minHeight={24}>
        {icon}
        <Typography color={color} fontSize={11}>
          {subTitle}
        </Typography>
      </Stack>
    </>
  );
};
