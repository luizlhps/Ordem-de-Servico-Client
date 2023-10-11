import React, { useState } from "react";

import { Axios, AxiosError } from "axios";
import { customersApi } from "@/services/api/customersApi";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { ToastError } from "@/components/Toast/ToastError";
import DeleteModal from "../deleteModal";
import { IOrder } from "../../../../types/order";

interface IProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: IOrder | undefined;
  fetchApi: () => void;
}

export const DeleteCustomer = ({ open, handleClose, selectedItem, fetchApi }: IProps) => {
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

    setLoading(true);
    customersApi
      .deleteCustomer(id)
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
        id={selectedItem?._id}
      />
    </>
  );
};
