import React, { ReactNode, useEffect, memo } from "react";
import TransitionsModal from "../Modal";
import NewCostumer from "../../CostumerPage/NewCostumer";
import { IconButton, Icon, Box } from "@mui/material";
import { FormRegisterCostumerContext } from "@/contexts";
import NewOrder from "@/components/OrderLayout/NewOrder";
import UpdateOrder from "@/components/OrderLayout/UpdateOrder";
import { IModals, ImodalActions } from "@/hook/useModal";
import { IOrder } from "../../../../types/order";

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

const style = {
  padding: "33px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as "column",
  alignContent: "center",
  alignItems: "center",
  minHeight: "100%",

  "@media (max-width:364px)": {
    padding: "23px",
  },
};

interface IProps {
  modals: IModals;
  fetchApi: () => void;
  modalActions: ImodalActions;
  selectItem: IOrder | undefined;
}

export const FormCrudOrder: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewOrder handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={style} />
      <UpdateOrder
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={style}
        selectItem={selectItem}
      />
    </>
  );
});

FormCrudOrder.displayName = "FormCrudOrder";
