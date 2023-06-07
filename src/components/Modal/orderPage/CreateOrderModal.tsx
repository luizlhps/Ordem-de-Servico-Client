import React, { ReactNode, useEffect } from "react";
import TransitionsModal from "../Modal";
import NewCostumer from "../../CostumerPage/NewCostumer";
import { IconButton, Icon, Box } from "@mui/material";
import { FormRegisterCostumerContext } from "@/contexts";
import NewOrder from "@/components/OrderPage/NewOrder";
import UpdateOrder from "@/components/OrderPage/UpdateOrder";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "94%",
  maxWidth: 1100,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  overflow: "auto",
  borderRadius: "2rem",
  display: "flex",
  alignItems: "center",
  outline: "none",

  "@media (max-height: 1200px)": {
    justifyContent: "center",
  },

  "@media (max-width: 768px)": {
    overflow: "auto",
    display: "block",
    alignItems: "none",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: "0",
    p: 4,
  },
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

export const CreateOrderModal: React.FC<IProps> = ({ open, handleClose, children }) => {
  return (
    <>
      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <IconButton onClick={handleClose} sx={buttonStyle}>
          <Icon>close</Icon>
        </IconButton>
        <NewOrder handleClose={handleClose} />
      </TransitionsModal>
      {children}
    </>
  );
};
