import { IModals, ImodalActions } from "@/hook/useModal";
import { memo } from "react";
import { IUser } from "../../../types/users";
import { NewStatus } from "./NewStatus";

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
  selectItem: IUser | undefined;
}

export const FormCrudStatus: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewStatus handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={style} />
      {/* <UpdateOfficial
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={style}
        selectItem={selectItem}
      />
      <DeleteOfficials
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        id={selectItem?._id}
      /> */}
    </>
  );
});

FormCrudStatus.displayName = "FormCrudOrder";
