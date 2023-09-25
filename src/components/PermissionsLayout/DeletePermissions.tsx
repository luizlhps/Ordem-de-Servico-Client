import React, { useState } from "react";
import { IStatus } from "../ServicesPage/Status";
import { IService } from "@/hook/useGetFetchService";
import { IOrder } from "../../../types/order";
import { IFinance } from "../../../types/finance";
import { usersApi } from "@/services/api/usersApi";
import DeleteModal from "../Modal/deleteModal";
import { authGroupApi } from "@/services/api/authGroupApi";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

export interface IProps {
  open: boolean;
  handleClose: () => void;
  id: string | undefined;
  fetchApi: () => void;
}

export const DeletePermissions = ({ open, handleClose, id, fetchApi }: IProps) => {
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
    authGroupApi
      .delete(id)
      .then(() => {
        fetchApi();
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response.config.message),
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
      <DeleteModal loading={loading} HandleDeleted={deleteTransaction} handleClose={handleClose} open={open} id={id} />
    </>
  );
};
