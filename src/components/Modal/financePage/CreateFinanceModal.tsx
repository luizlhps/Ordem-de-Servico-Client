import React, { ReactNode, useEffect, memo } from "react";
import TransitionsModal from "../Modal";
import NewCostumer from "../../CostumerPage/NewCostumer";
import { IconButton, Icon, Box } from "@mui/material";
import { FormRegisterCostumerContext } from "@/contexts";
import NewOrder from "@/components/OrderLayout/NewOrder";
import UpdateOrder from "@/components/OrderLayout/UpdateOrder";
import NewTransation from "@/components/FinanceLayout/NewTransaction";

const style = {
  padding: "33px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  minHeight: "100%",

  "@media (max-width:364px)": {
    padding: "23px",
  },
};

const buttonStyle = {
  position: "absolute" as "absolute",
  top: "3%",
  left: "93%",
  zIndex: 1,

  "@media (max-width: 768px)": {
    top: "1%",
    left: "92%",
  },
};

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const CreateFinanceModalContent: React.FC<{ handleClose: any }> = ({ handleClose }) => {
  console.log("rendered");
  return (
    <>
      <IconButton onClick={handleClose} sx={buttonStyle}>
        <Icon>close</Icon>
      </IconButton>
      <NewTransation handleClose={handleClose} />
    </>
  );
};

export const CreateFinanceModal: React.FC<IProps> = memo(({ open, handleClose }) => {
  return (
    <TransitionsModal handleClose={handleClose} open={open} style={style}>
      <CreateFinanceModalContent handleClose={handleClose} />
    </TransitionsModal>
  );
});

CreateFinanceModal.displayName = "CreateFinanceModal";
