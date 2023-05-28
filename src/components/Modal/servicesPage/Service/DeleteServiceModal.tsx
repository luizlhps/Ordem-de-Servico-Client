import React from "react";
import DeleteModal from "../../deleteModal";
import { servicesApi } from "@/services/api/servicesApi";
import useModal from "@/hook/useModal";

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
      const res = await servicesApi.deleteServices(id);
      fetchApi();
      modalDeleteHandleClose();

      if (res instanceof Error) {
        throw new Error("Ocorreu um erro");
      }
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
