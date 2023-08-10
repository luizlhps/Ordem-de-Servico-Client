import { Box, useTheme } from "@mui/material";
import React, { ElementType } from "react";
import { CSSProperties } from "styled-components";

interface IProps {
  icon: ElementType;
}

const styleItem = {
  display: "flex",
  alignItems: "center",
  margin: "4px 0",
  minWidth: "29px",
};

export const ButtonLinksIcon = ({ icon: ICon }: IProps) => {
  const theme = useTheme();

  return (
    <Box sx={styleItem}>
      <ICon color={theme.palette.primary.main} />
    </Box>
  );
};
