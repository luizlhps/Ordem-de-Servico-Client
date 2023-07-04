import React, { ElementType } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface FinanceNotificationProps {
  icon: ElementType;
  subTitle: string;
  color: string;
}

export const FeatureFinanceNotificationFooter = ({ icon: Icon, subTitle, color }: FinanceNotificationProps) => {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} marginTop={0.2}>
        <Icon sx={{ color: color }} />
        <Typography color={color} fontSize={11}>
          {subTitle}
        </Typography>
      </Stack>
    </>
  );
};
