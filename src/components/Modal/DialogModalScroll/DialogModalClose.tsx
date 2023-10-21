import { Icon, IconButton, SxProps, Theme } from "@mui/material";
import React from "react";

interface IProps {
  handleClose: () => void;
}

const buttonStyle = {
  position: "absolute" as "absolute",
  top: "15px",
  right: "20px",
  zIndex: 1,

  "@media (max-width: 768px)": {
    top: "15px",
    right: "20px",
  },
};

export const DialogModalClose = ({ handleClose }: IProps) => {
  return (
    <>
      <IconButton onClick={handleClose} sx={buttonStyle}>
        <Icon>close</Icon>
      </IconButton>
    </>
  );
};
