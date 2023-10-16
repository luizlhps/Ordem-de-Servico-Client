import React, { memo } from "react";
import { IModals, ImodalActions } from "@/hook/useModal";
import { IOrder } from "../../../../types/order";
import { NewCustomer } from "./NewCustomer";
import UpdateCustomer from "./UpdateCustomer";
import { DeleteCustomer } from "./DeleteCustomer";

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

export const FormCrudCustomer: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewCustomer
        handleClose={modalHandleClose}
        fetchApi={fetchApi}
        open={modalOpen}
        styles={styleModalScrollDialog}
      />
      <UpdateCustomer
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        styles={styleModalScrollDialog}
        selectItem={selectItem}
      />
      <DeleteCustomer
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        selectedItem={selectItem}
      />
    </>
  );
});

FormCrudCustomer.displayName = "FormCrudOrder";
