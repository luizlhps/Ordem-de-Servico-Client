import React, { memo } from "react";
import { IModals, ImodalActions } from "@/hook/useModal";
import { IOrder } from "../../../../types/order";
import { NewCostumer } from "./NewCostumer";
import UpdateCostumer from "./UpdateCostumer";
import { DeleteCostumer } from "./DeleteCostumer";

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

export const FormCrudCostumer: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewCostumer handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} styles={style} />
      <UpdateCostumer
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        styles={style}
        selectItem={selectItem}
      />
      <DeleteCostumer
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        selectedItem={selectItem}
      />
    </>
  );
});

FormCrudCostumer.displayName = "FormCrudOrder";
