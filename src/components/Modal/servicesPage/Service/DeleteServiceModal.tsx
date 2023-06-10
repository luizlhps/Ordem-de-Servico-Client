import React from "react";
import DeleteModal from "../../deleteModal";
import { orderApi } from "@/services/api/orderApi";

interface IProps {
  fetchApi: () => void;
  setMessageForm: (message: string) => void;
  setFormSucessoValue: (value: boolean) => void;
  setErrorMessageValue: (value: string) => void;
  selectedItemUpdate: any;
  modalOpendelete: any;
  modalDeleteHandleClose: any;
  setModalOpenDelete: any;
  modalDeleteHandleOpen: any;
}

const DeleteServiceModal: React.FC<IProps> = ({
  fetchApi,
  setMessageForm,
  setFormSucessoValue,
  setErrorMessageValue,
  selectedItemUpdate,
  modalOpendelete,
  modalDeleteHandleClose,
  setModalOpenDelete,
  modalDeleteHandleOpen,
}) => {
  //Delete Api
  const HandleDeleted = async (id: string) => {
    try {
      const res = await orderApi.deleteOrder(id);
      fetchApi();
      modalDeleteHandleClose();

      setMessageForm("O serviço foi apagado com sucesso!!");
      setFormSucessoValue(true);
    } catch (error: any) {
      setFormSucessoValue(false);
      console.error(error);
      setErrorMessageValue(error.response.data.message); //
    }
  };

  return (
    <>
      <DeleteModal
        fetchApi={fetchApi}
        open={modalOpendelete}
        setOpen={setModalOpenDelete}
        handleClose={modalDeleteHandleClose}
        handleOpen={modalDeleteHandleOpen}
        HandleDeleted={HandleDeleted}
        selectedItemUpdate={selectedItemUpdate}
      />
    </>
  );
};

export default DeleteServiceModal;
