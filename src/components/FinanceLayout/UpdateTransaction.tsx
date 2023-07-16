import { useContext, useState, useEffect, CSSProperties } from "react";
import { FormUpdateOrderContext } from "@/contexts/formUpdateOrderContext";
import { LayoutTransactionForm } from "./LayoutTransationForm";
import { IFinance } from "../../../types/finance";
import { financeApi } from "@/services/api/financeApi";
import { ToastError } from "../Toast/ToastError";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { ToastSuccess } from "../Toast/ToastSuccess";

interface IPropsUpdateTransaction {
  handleClose: () => void;
  fetchApi: () => void;
  selectItem: IFinance | undefined;
  style: CSSProperties;
  open: boolean;
}

const UpdateTransaction = ({ handleClose, fetchApi, selectItem, style, open }: IPropsUpdateTransaction) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const setFormValue = (form: IFinance) => {
    updateTransactionApi(form);
  };

  const updateTransactionApi = (data: IFinance) => {
    if (!selectItem) return new Error("Ocorreu um erro ao achar a transação");
    financeApi
      .update(data, selectItem?._id, data.order)
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

  console.log(selectItem);

  return (
    <>
      <ToastSuccess alertSuccess="Atualizado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <LayoutTransactionForm setValueData={setFormValue} dataValue={selectItem} loading={loading} />
      </TransitionsModal>
    </>
  );
};
export default UpdateTransaction;
