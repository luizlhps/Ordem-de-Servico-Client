import React, { useState } from "react";
import DeleteModal from "../../deleteModal";
import { servicesApi } from "@/services/api/servicesApi";

interface IProps {
  fetchApi: () => void;
  setMessageForm: (message: string) => void;
  setFormSucessoValue: (value: boolean) => void;
  setErrorMessageValue: (value: string) => void;
  selectedItem: any;
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
  selectedItem,
  modalOpendelete,
  modalDeleteHandleClose,
  setModalOpenDelete,
  modalDeleteHandleOpen,
}) => {
  const [loading, setLoading] = useState(false);

  //Delete Api
  const HandleDeleted = (id: string | undefined) => {
    setLoading(true);
    servicesApi
      .deleteServices(id)
      .then(() => {
        setMessageForm("O serviço foi apagado com sucesso!!");
        setFormSucessoValue(true);
      })
      .catch((error) => {
        setFormSucessoValue(false);
        console.error(error);
        setErrorMessageValue(error.response.data.message); //
      })
      .finally(() => {
        setLoading(false);
        fetchApi();
        modalDeleteHandleClose();
      });
  };

  return (
    <>
      <DeleteModal
        open={modalOpendelete}
        handleClose={modalDeleteHandleClose}
        HandleDeleted={HandleDeleted}
        id={selectedItem?._id}
        loading={loading}
      />
    </>
  );
};

export default DeleteServiceModal;
