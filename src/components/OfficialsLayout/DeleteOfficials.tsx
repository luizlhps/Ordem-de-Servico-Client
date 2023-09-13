import React, { useState } from "react";
import { IStatus } from "../ServicesPage/Status";
import { IService } from "@/hook/useGetFetchService";
import { IOrder } from "../../../types/order";
import { IFinance } from "../../../types/finance";
import { usersApi } from "@/services/api/usersApi";
import DeleteModal from "../Modal/deleteModal";

export interface IProps {
  open: boolean;
  handleClose: () => void;
  id: string | undefined;
  fetchApi: () => void;
}

export const DeleteOfficials = ({ open, handleClose, id, fetchApi }: IProps) => {
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
    usersApi
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
      <DeleteModal loading={loading} HandleDeleted={deleteTransaction} handleClose={handleClose} open={open} id={id} />
    </>
  );
};
