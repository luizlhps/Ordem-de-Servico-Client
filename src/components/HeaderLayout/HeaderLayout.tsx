"use client";

import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

//interface

interface IpropsLayoutTheme {
  title: string;
  subTitle: string;
}

export const HeaderLayout: React.FC<IpropsLayoutTheme> = ({ title, subTitle }) => {
  //Theme
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        color={theme.palette.primary.main}
      >
        <Box>
          <Typography variant="h1" fontWeight={600}>
            {title}
          </Typography>
          <Typography fontWeight={500} color={theme.palette.secondary.main}>
            {subTitle}
          </Typography>
        </Box>
        <Box></Box>
      </Stack>
    </>
  );
};
