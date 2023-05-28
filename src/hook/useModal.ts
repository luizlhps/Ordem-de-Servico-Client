import { useState } from "react";

const useModal = () => {
  //modal Create
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalOpendelete, setModalOpenDelete] = useState(false);

  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => setModalOpen(false);

  const modalUpdateHandleOpen = () => setModalUpdateOpen(true);
  const modalHandleUpdateClose = () => setModalUpdateOpen(false);

  const modalDeleteHandleOpen = () => setModalOpenDelete(true);
  const modalDeleteHandleClose = () => setModalOpenDelete(false);

  return {
    modals: {
      modalOpen,
      modalUpdateOpen,
      modalOpendelete,
    },
    modalActions: {
      modalHandleOpen,
      modalHandleClose,
      modalUpdateHandleOpen,
      modalHandleUpdateClose,
      modalDeleteHandleOpen,
      modalDeleteHandleClose,
    },
    modalSets: {
      setModalOpen,
      setModalUpdateOpen,
      setModalOpenDelete,
    },
  };
};

export default useModal;
