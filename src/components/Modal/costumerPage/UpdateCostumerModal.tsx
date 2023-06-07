import React, { ReactNode } from "react";
import { IconButton, Icon } from "@mui/material";
import TransitionsModal from "../Modal";
import UpdateCostumer from "@/components/CostumerPage/UpdateCostumer";

const style = {
  padding: "23px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
};

const buttonStyle = {
  position: "absolute" as "absolute",
  top: "8%",
  left: "90%",
  zIndex: 1,

  "@media (max-width: 768px)": {
    top: "4.5%",
    left: "80%",
  },
};

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  children: ReactNode;
}

export const UpdateCostumerModal: React.FC<IProps> = ({ open, handleClose, children }) => {
  return (
    <>
      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <IconButton onClick={handleClose} sx={buttonStyle}>
          <Icon>close</Icon>
        </IconButton>
        <UpdateCostumer handleClose={handleClose} />
      </TransitionsModal>
      {children}
    </>
  );
};
