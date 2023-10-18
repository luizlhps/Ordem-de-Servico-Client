import { Box, Stack, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  stepCurrent: number;
  margin: number;
}

interface ElementWithColor {
  color: string;
}

export const Stepper = ({ children, stepCurrent, margin }: IProps) => {
  const theme = useTheme();
  const lengthChildren = React.Children.count(children);

  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"center"} margin={margin} alignItems={"center"}>
        {React.Children.map(children, (child, index) => {
          return (
            <>
              {index !== 0 && (
                <Box
                  width={11}
                  margin={2}
                  height={2}
                  alignContent={"center"}
                  bgcolor={index >= stepCurrent + 1 ? theme.palette.primary.light : theme.palette.secondary.light}
                />
              )}
              {React.isValidElement(child) &&
                React.cloneElement(
                  child,
                  {
                    color: index >= stepCurrent + 1 ? theme.palette.primary.light : theme.palette.secondary.light,
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
