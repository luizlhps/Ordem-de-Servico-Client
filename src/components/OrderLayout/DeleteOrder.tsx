import React, { useState } from "react";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import DeleteModal from "../Modal/deleteModal";
import { IOrder } from "../../../types/order";
import { orderApi } from "@/services/api/orderApi";
import { Axios, AxiosError } from "axios";

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: IOrder | undefined;
  fetchApi: () => void;
}

export const DeleteOrder = ({ open, handleClose, selectedItem, fetchApi }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteTransaction = (id: string) => {
    setLoading(true);
    orderApi
      .deleteOrder(id)
      .then(() => setSuccess(true))
      .catch((err: unknown) => {
        if (err instanceof AxiosError) {
          if (err.response?.data?.message) {
            setMessageError(err.response?.data?.message);
          } else if (err.response?.data) {
            setMessageError(err.response?.data);
          } else {
            setMessageError("Ocorreu um erro!!");
          }
        }
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        fetchApi();
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
        selectedItem={selectedItem}
      />
    </>
  );
};
