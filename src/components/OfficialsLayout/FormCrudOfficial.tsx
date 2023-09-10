import { IModals, ImodalActions } from "@/hook/useModal";
import { DeleteOfficial } from "./DeleteOfficial";
import { NewOfficial } from "./NewOfficial";
import { UpdateOfficial } from "./UpdateOfficial";
import { memo } from "react";
import { IUser } from "../../../types/users";

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
  selectItem: IUser | undefined;
}

export const FormCrudOfficial: React.FC<IProps> = memo(({ modals, fetchApi, modalActions, selectItem }) => {
  const { modalOpen, modalOpendelete, modalUpdateOpen, modalViewOpen } = modals;
  const { modalDeleteHandleClose, modalHandleClose, modalHandleUpdateClose, modalViewClose, modalViewHandleOpen } =
    modalActions;

  return (
    <>
      <NewOfficial handleClose={modalHandleClose} fetchApi={fetchApi} open={modalOpen} style={style} />
      <UpdateOfficial
        handleClose={modalHandleUpdateClose}
        fetchApi={fetchApi}
        open={modalUpdateOpen}
        style={style}
        selectItem={selectItem}
      />
      <DeleteOfficial
        fetchApi={fetchApi}
        handleClose={modalDeleteHandleClose}
        open={modalOpendelete}
        selectedItem={selectItem}
      />
    </>
  );
});

FormCrudOfficial.displayName = "FormCrudOrder";