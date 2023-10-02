import { DialogContent } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";

interface IPropsDialog {
  children: ReactNode;
  customStyle?: CSSProperties;
  dividers?: boolean;
}

export const DialogModalScrollContent = ({ children, customStyle, dividers }: IPropsDialog) => {
  const styleDialog: CSSProperties = {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "120px",
  };

  const conbinedStyleWithNewAttributes = customStyle ? { ...styleDialog, ...customStyle } : styleDialog;

  return (
    <>
      <DialogContent dividers={dividers ? dividers : false} sx={conbinedStyleWithNewAttributes}>
        {children}
      </DialogContent>
    </>
  );
};
