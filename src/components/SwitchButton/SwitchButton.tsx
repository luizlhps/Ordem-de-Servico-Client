import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";

interface IProps {
  firstText: string;
  secondText: string;
  state: boolean;
  onStateChange: any;
}

export const SwitchButton = ({ firstText, secondText, state, onStateChange }: IProps) => {
  const theme = useTheme();

  const handleStateButton = () => {
    onStateChange(!state);
  };

  return (
    <>
      <Box
        display={"flex"}
        padding={1}
        borderRadius={"6px"}
        justifyContent={"center"}
        bgcolor={theme.palette.custom?.grey}
        width={"100%"}
        maxWidth={780}
        gap={1}
      >
        <Button
          disabled={!state}
          onClick={handleStateButton}
          sx={{
            padding: 1,
            color: `${theme.palette.primary.main}!important`,
            textTransform: "capitalize",
            background: state ? "none" : theme.palette.secondary.main,
            flex: 1,
          }}
        >
          {firstText}
        </Button>
        <Button
          disabled={state}
          onClick={handleStateButton}
          sx={{
            padding: 1,
            color: `${theme.palette.primary.main}!important`,
            textTransform: "capitalize",
            background: state ? theme.palette.secondary.main : "none",
            flex: 1,
          }}
        >
          {secondText}
        </Button>
      </Box>
    </>
  );
};
