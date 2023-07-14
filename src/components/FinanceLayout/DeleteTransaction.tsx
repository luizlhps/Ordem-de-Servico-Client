import React from "react";
import DeleteModal from "../Modal/deleteModal";
import { financeApi } from "@/services/api/financeApi";
import { IFinance } from "../../../types/finance";

interface IModal {
  open: boolean;
  handleClose: () => void;
  selectedItem: IFinance | undefined;
  fetchApi: () => void;
}

export const DeleteTransaction = ({ open, handleClose, selectedItem, fetchApi }: IModal) => {
  const deleteTransaction = (id: string) => {
    console.log("executei");
    financeApi
      .delete(id)
      .then(() => fetchApi())
      .catch((err) => console.log("Ocorreu um Erro"))
      .finally(() => {
        handleClose();
      });
  };

  return (
    <DeleteModal HandleDeleted={deleteTransaction} handleClose={handleClose} open={open} selectedItem={selectedItem} />
  );
};
