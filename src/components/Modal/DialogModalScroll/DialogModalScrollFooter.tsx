import { DialogActions } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";

interface IPropsDialog {
  children: ReactNode;
  customStyle?: CSSProperties;
}

export const DialogModalScrollFooter = ({ children, customStyle }: IPropsDialog) => {
  const styleDialog = { padding: 1, justifyContent: "center", alignItems: "center", flexDirection: "column" };

  const conbinedStyleWithNewAttributes = customStyle ? { ...styleDialog, ...customStyle } : styleDialog;
  return (
    <>
      <DialogActions sx={conbinedStyleWithNewAttributes}>{children}</DialogActions>
    </>
  );
};
