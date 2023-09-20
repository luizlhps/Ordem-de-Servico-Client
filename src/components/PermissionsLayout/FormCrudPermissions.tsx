import { IModals, ImodalActions } from "@/hook/useModal";
import { UpdatePermissions } from "./UpdatePermissions";
import { memo } from "react";
import { IUser } from "../../../types/users";
import { DeletePermissions } from "./DeletePermissions";
import { NewPermissions } from "./NewPermissions";
import { AuthGroup } from "../../../types/authGroup";

const style = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as "column",

  minHeight: "100%",
};

interface IProps {
  modals: IModals;
  fetchApi: () => void;
  modalActions: ImodalActions;
  selectItem: AuthGroup | undefined;
}

export const FormCrudPermissions: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewPermissions handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={style} />
      <UpdatePermissions
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={style}
        selectItem={selectItem}
      />
      <DeletePermissions
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        id={selectItem?._id}
      />
    </>
  );
});

FormCrudPermissions.displayName = "FormCrudOrder";
