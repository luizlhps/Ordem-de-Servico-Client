import React, { memo } from "react";
import NewOrder from "@/components/OrderLayout/NewOrder";
import UpdateOrder from "@/components/OrderLayout/UpdateOrder";
import { IModals, ImodalActions } from "@/hook/useModal";
import { IOrder } from "../../../types/order";
import { DeleteOrder } from "@/components/OrderLayout/DeleteOrder";
import { ViewOrderModal } from "./ViewOrderModal";
import { ICustomer } from "../../../types/customer";

const styleModalScrollDialog = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as "column",

  minHeight: "100%",
};

interface IProps {
  modals: IModals;
  modalActions: ImodalActions;
  selectItem: IOrder | undefined;
  customer: ICustomer;
  fetchApiWithCustomerID: (id: string) => Promise<void>
}

export const FormCrudGetCustomerOrders: React.FC<IProps> = memo(
  ({ modals, fetchApiWithCustomerID, modalActions, selectItem, customer }) => {
    const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
    const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
      modalActions;

    return (
      <>
        <ViewOrderModal handleClose={modalViewClose} open={modalViewOpen} selectedItem={selectItem} />
        <NewOrder
          customerData={customer}
          handleClose={modalHandleClose}
          fetchApiWithCustomerID={fetchApiWithCustomerID}
          open={modalOpen}
          style={styleModalScrollDialog}
        />
        <UpdateOrder
          handleClose={modalHandleUpdateClose}
          fetchApiWithCustomerID={fetchApiWithCustomerID}
          open={modalUpdateOpen}
          style={styleModalScrollDialog}
          selectItem={selectItem}
        />
        <DeleteOrder
          fetchApiWithCustomerID={fetchApiWithCustomerID}
          handleClose={modalDeleteHandleClose}
          open={modalOpendelete}
          selectedItem={selectItem}
        />
      </>
    );
  }
);

FormCrudGetCustomerOrders.displayName = "FormCrudOrder";
