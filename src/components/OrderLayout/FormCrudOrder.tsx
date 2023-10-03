import React, { memo } from "react";
import NewOrder from "@/components/OrderLayout/NewOrder";
import UpdateOrder from "@/components/OrderLayout/UpdateOrder";
import { IModals, ImodalActions } from "@/hook/useModal";
import { IOrder } from "../../../types/order";
import { DeleteOrder } from "@/components/OrderLayout/DeleteOrder";
import { ViewOrderModal } from "./ViewOrderModal";

const styleModalScrollDialog = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as "column",

  minHeight: "100%",
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
      <ViewOrderModal handleClose={modalViewClose} open={modalViewOpen} selectedItem={selectItem} />
      <NewOrder handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={styleModalScrollDialog} />
      <UpdateOrder
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={styleModalScrollDialog}
        selectItem={selectItem}
      />
      <DeleteOrder
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        selectedItem={selectItem}
      />
    </>
  );
});

FormCrudOrder.displayName = "FormCrudOrder";
