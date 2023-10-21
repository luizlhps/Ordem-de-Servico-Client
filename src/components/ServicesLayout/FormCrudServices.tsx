import { IModals, ImodalActions } from "@/hook/useModal";
import { memo } from "react";
import { NewServices } from "./NewServices";
import { UpdateServices } from "./UpdateServices";
import { IServices } from "../../../types/services";

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
  selectItem: IServices;
}

export const FormCrudServices: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewServices handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={styleModalScrollDialog} />
      <UpdateServices
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={styleModalScrollDialog}
        selectItem={selectItem}
      />
      {/*       <DeleteServices
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        id={selectItem?._id}
      /> */}
    </>
  );
});

FormCrudServices.displayName = "FormCrudOrder";
