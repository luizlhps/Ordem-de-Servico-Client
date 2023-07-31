import React, { useState } from "react";

import { Axios, AxiosError } from "axios";
import { costumersApi } from "@/services/api/costumersApi";
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

export const DeleteCostumer = ({ open, handleClose, selectedItem, fetchApi }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteTransaction = (id: string) => {
    setLoading(true);
    costumersApi
      .deleteCostumer(id)
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
