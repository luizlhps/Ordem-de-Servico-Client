import React, { useState } from "react";
import DeleteModal from "../Modal/deleteModal";
import { financeApi } from "@/services/api/financeApi";
import { IFinance } from "../../../types/finance";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { IOrder } from "@/hook/useGetFetchOrders";
import { IStatus } from "../ServicesPage/Status";
import { IService } from "@/hook/useGetFetchService";

export interface IModal {
  open: boolean;
  handleClose: () => void;
  selectedItem: IFinance | IOrder | IStatus | IService | undefined;
  fetchApi: () => void;
}

export const DeleteTransaction = ({ open, handleClose, selectedItem, fetchApi }: IModal) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteTransaction = (id: string | undefined) => {
    if (!id) {
      setMessageError("O ID é necessário!!");
      setError(true);
      return;
    }

    financeApi
      .delete(id)
      .then(() => {
        fetchApi();
        setSuccess(true);
      })
      .catch((err) => {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <ToastSuccess alertSuccess="Deletado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      <DeleteModal
        loading={loading}
        HandleDeleted={deleteTransaction}
        handleClose={handleClose}
        open={open}
        id={selectedItem?._id}
      />
    </>
  );
};
