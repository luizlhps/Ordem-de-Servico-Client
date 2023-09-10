import React, { memo, ElementType } from "react";
import TransitionsModal from "../Modal";
import { IconButton, Icon } from "@mui/material";
import { IModals, ImodalActions } from "@/hook/useModal";
import { IFinance } from "../../../../types/finance";
import DeleteModal from "../deleteModal";
import { IOrder, Status } from "../../../../types/order";
import { IStatus } from "@/services/api/statusApi";
import { IService } from "@/hook/useGetFetchService";

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

const buttonStyle = {
  position: "absolute" as "absolute",
  top: "15px",
  right: "20px",
  zIndex: 1,

  "@media (max-width: 768px)": {
    top: "15px",
    right: "20px",
  },
};

interface IProps {
  modals: IModals;
  FormCreate: ElementType;
  FormUpdate: ElementType;
  FormDelete: ElementType;
  fetchApi: () => void;
  modalActions: ImodalActions;
  selectItem: IFinance | IOrder | IStatus | IService | undefined;
}

export const CloseModal: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  return (
    <>
      <IconButton onClick={handleClose} sx={buttonStyle}>
        <Icon>close</Icon>
      </IconButton>
    </>
  );
};

export const FormCrudModals: React.FC<IProps> = memo(
  ({ modals, fetchApi, FormCreate, modalActions, FormUpdate, selectItem, FormDelete }: IProps) => {
    const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
    const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
      modalActions;

    return (
      <>
        <FormCreate handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={style} />
        <FormUpdate
          handleClose={modalHandleUpdateClose}
          fetchApi={fetchApi}
          selectItem={selectItem}
          open={modalUpdateOpen}
          style={style}
        />
        <FormDelete
          fetchApi={fetchApi}
          handleClose={modalDeleteHandleClose}
          open={modalOpendelete}
          selectedItem={selectItem}
        />
      </>
    );
  }
);

FormCrudModals.displayName = "FormCrudModals";
