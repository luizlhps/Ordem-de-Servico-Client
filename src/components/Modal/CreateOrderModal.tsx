import React, { ReactNode } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TransitionsModal from "./Modal";
import useModal from "@/hook/useModal";
import NewCostumer from "../CostumerPage/NewCostumer";

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

  "@media (max-width: 768px)": {
    overflow: "auto",

    width: "90%",
    justifyContent: "center",
    p: 4,
  },
};

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  fetchApi: () => any;

  selectedItemUpdate: any;
  children: ReactNode;
}

export const CreateOrderModal: React.FC<IProps> = ({ open, handleClose, fetchApi, selectedItemUpdate, children }) => {
  return (
    <>
      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <NewCostumer />
      </TransitionsModal>

      {children}
    </>
  );
};
