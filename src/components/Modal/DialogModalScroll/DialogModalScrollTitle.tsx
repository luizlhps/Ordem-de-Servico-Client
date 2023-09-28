import { DialogTitle } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";

interface IPropsDialog {
  children: ReactNode;
  customStyle?: CSSProperties;
}

export const DialogModalScrollTitle = ({ children, customStyle }: IPropsDialog) => {
  const styleDialog = {
    padding: 3,
  };

  const conbinedStyleWithNewAttributes = customStyle ? { ...styleDialog, ...customStyle } : styleDialog;

  return (
    <>
      <DialogTitle sx={conbinedStyleWithNewAttributes}>{children}</DialogTitle>
    </>
  );
};
