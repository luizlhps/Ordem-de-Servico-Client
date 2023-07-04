import React, { ReactNode, useEffect, memo } from "react";
import TransitionsModal from "../Modal";
import NewCostumer from "../../CostumerPage/NewCostumer";
import { IconButton, Icon, Box } from "@mui/material";
import { FormRegisterCostumerContext } from "@/contexts";
import NewOrder from "@/components/OrderLayout/NewOrder";
import UpdateOrder from "@/components/OrderLayout/UpdateOrder";

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
}

const CreateFinanceModalContent: React.FC<{ handleClose: any }> = ({ handleClose }) => {
  console.log("rendered");
  return (
    <>
      <IconButton onClick={handleClose} sx={buttonStyle}>
        <Icon>close</Icon>
      </IconButton>
      <NewOrder handleClose={handleClose} />
    </>
  );
};

export const CreateFinanceModal: React.FC<IProps> = memo(({ open, handleClose, handleOpen, setOpen }) => {
  return (
    <TransitionsModal handleClose={handleClose} open={open} style={style}>
      <CreateFinanceModalContent handleClose={handleClose} />
    </TransitionsModal>
  );
});

CreateFinanceModal.displayName = "CreateFinanceModal";