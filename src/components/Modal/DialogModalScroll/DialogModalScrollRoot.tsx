import { Box, Dialog, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface IModal {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  style: any;
}

export const DialogModalScrollRoot = ({ open, handleClose, children, style }: IModal) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down(650));

  const styleDialog = {
    ".MuiDialog-paper": {
      backgroundImage: "none",
      width: smDown ? "100%" : "80%",
      maxWidth: smDown ? "98%!important" : "700px",
      margin: smDown ? 0 : "32px",
      borderRadius: smDown ? 0 : "12px",
    },
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} scroll={"paper"} maxWidth={"md"} sx={styleDialog}>
        <Box sx={style}>{children}</Box>
      </Dialog>
    </>
  );
};
