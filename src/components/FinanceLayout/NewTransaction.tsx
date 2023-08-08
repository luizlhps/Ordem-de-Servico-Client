import { useContext, useState, CSSProperties } from "react";
import { LayoutTransactionForm } from "./LayoutTransationForm";
import { IFinance } from "../../../types/finance";
import { financeApi } from "@/services/api/financeApi";
import TransitionsModal from "../Modal/Modal";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { ToastError } from "../Toast/ToastError";
import { ToastSuccess } from "../Toast/ToastSuccess";

interface INewTransationProps {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

const NewTransation = ({ handleClose, fetchApi, style, open }: INewTransationProps) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const setFormValue = (form: IFinance) => {
    setLoading(true);
    createTransactionApi(form);
  };

  const createTransactionApi = (data: IFinance) => {
    financeApi
      .create(data, data.order)
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
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <CloseModal handleClose={handleClose} />
        <LayoutTransactionForm title="Novo Serviço" setValueData={setFormValue} loading={loading} />
      </TransitionsModal>
    </>
  );
};
export default NewTransation;
