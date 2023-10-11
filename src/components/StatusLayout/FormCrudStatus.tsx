import { IModals, ImodalActions } from "@/hook/useModal";
import { memo } from "react";
import { NewStatus } from "./NewStatus";
import { UpdateStatus } from "./UpdateStatus";
import { IDetailsStatus } from "@/services/api/statusApi";
import { DeleteStatus } from "./DeleteStatus";

const style = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column" as "column",

  padding: "10px",
};

interface IProps {
  modals: IModals;
  fetchApi: () => void;
  modalActions: ImodalActions;
  selectItem: IDetailsStatus;
}

export const FormCrudStatus: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewStatus handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={style} />
      <UpdateStatus
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={style}
        selectItem={selectItem}
      />
      <DeleteStatus
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        id={selectItem?._id}
      />
    </>
  );
});

FormCrudStatus.displayName = "FormCrudOrder";
