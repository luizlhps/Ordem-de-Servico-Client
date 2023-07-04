import { Box, Stack, Typography } from "@mui/material";
import React, { ElementType } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface FinanceNotificationProps {
  icon: ElementType;
  title: string;
  hasChange?: boolean;
}

export const FeatureFinanceNotification = ({ title, icon: Icon, hasChange = false }: FinanceNotificationProps) => {
  const styleContainer = {
    background: "white",
    color: "black",
    maxWidth: "240px",
    maxHeight: "180px",
    padding: 3,
    border: "1px solid #F3F5F7",
    borderRadius: "14px",
  };

  return (
    <>
      <Box sx={styleContainer}>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Stack>
            <Typography fontWeight={600} variant="h2" fontSize={18}>
              Caixa Total
            </Typography>
            <Typography fontSize={12}>1 jan - 31 dez 2023</Typography>
          </Stack>
          <Box
            border={"1px solid #F3F5F7"}
            borderRadius={"8px"}
            display={"flex"}
            alignItems={"center"}
            padding={"5px 10px"}
            marginLeft={5}
          >
            <Icon sx={{ color: "#2785AE" }} />
          </Box>
        </Stack>

        <Typography marginTop={2} fontWeight={600} fontSize={26} variant="h1">
          R$625,600
        </Typography>
        {hasChange && (
          <Stack direction={"row"} alignItems={"center"}>
            <ExpandLessIcon color="success" />
            <Typography color="green" fontSize={11}>
              1,37%
            </Typography>
          </Stack>
        )}
      </Box>
    </>
  );
};
