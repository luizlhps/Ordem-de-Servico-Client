import { Box, useTheme } from "@mui/material";
import React, { ElementType } from "react";
import { CSSProperties } from "styled-components";

interface IProps {
  icon: ElementType;
  style: CSSProperties;
}

export const ButtonLinksIcon = ({ icon: ICon, style }: IProps) => {
  const theme = useTheme();

  return (
    <Box sx={style}>
      <ICon color={theme.palette.primary.main} />
    </Box>
  );
};
