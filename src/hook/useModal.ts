import { useState } from "react";

export interface ImodalActions {
  modalHandleOpen: () => void;
  modalHandleClose: () => void;
  modalUpdateHandleOpen: () => void;
  modalHandleUpdateClose: () => void;
  modalDeleteHandleOpen: () => void;
  modalDeleteHandleClose: () => void;
  modalViewHandleOpen: () => void;
  modalViewClose: () => void;
}

export interface IModals {
  modalOpen: boolean;
  modalUpdateOpen: boolean;
  modalOpendelete: boolean;
  modalViewOpen: boolean;
}

const useModal = () => {
  //modal Create
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalOpendelete, setModalOpenDelete] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => setModalOpen(false);

  const modalUpdateHandleOpen = () => setModalUpdateOpen(true);
  const modalHandleUpdateClose = () => setModalUpdateOpen(false);

  const modalViewHandleOpen = () => setModalViewOpen(true);
  const modalViewClose = () => setModalViewOpen(false);

  const modalDeleteHandleOpen = () => setModalOpenDelete(true);
  const modalDeleteHandleClose = () => setModalOpenDelete(false);

  return {
    modals: {
      modalOpen,
      modalUpdateOpen,
      modalOpendelete,
      modalViewOpen,
    },
    modalActions: {
      modalHandleOpen,
      modalHandleClose,
      modalUpdateHandleOpen,
      modalHandleUpdateClose,
      modalDeleteHandleOpen,
      modalDeleteHandleClose,
      modalViewHandleOpen,
      modalViewClose,
    },
    modalSets: {
      setModalOpen,
      setModalUpdateOpen,
      setModalOpenDelete,
      setModalViewOpen,
    },
  };
};

export default useModal;
