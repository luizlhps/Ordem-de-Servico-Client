import { Box, Stack, useTheme } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { MarketSVG, ReportSVG, UserProcessSVG } from "../../../../public/icon/SVGS/IconsSVG";

type ElementWithColor = {
  color: string;
};

export const Stepper = ({ children, stepCurrent }: { children: ReactNode; stepCurrent: number }) => {
  const theme = useTheme();
  const lengthChildren = React.Children.count(children);

  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"center"} margin={2} alignItems={"center"}>
        {React.Children.map(children, (child, index) => {
          return (
            <>
              {index !== 0 && (
                <Box
                  width={11}
                  margin={2}
                  height={2}
                  alignContent={"center"}
                  bgcolor={index >= stepCurrent + 1 ? theme.palette.primary.main : theme.palette.secondary.main}
                />
              )}
              {React.isValidElement(child) &&
                React.cloneElement(
                  child,
                  {
                    color: index >= stepCurrent + 1 ? theme.palette.primary.main : theme.palette.secondary.main,
                  } as ElementWithColor,
                  null
                )}
            </>
          );
        })}
      </Stack>
    </>
  );
};
