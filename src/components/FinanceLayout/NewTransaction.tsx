import { useContext, useState, CSSProperties } from "react";
import { LayoutTransactionForm } from "./LayoutTransationForm";
import { IFinance, InputTransactionOrderData } from "../../../types/finance";
import { financeApi } from "@/services/api/financeApi";
import TransitionsModal from "../Modal/Modal";
import { ToastError } from "../Toast/ToastError";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

interface INewTransationProps {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  dataValue?: IFinance | InputTransactionOrderData;
}

const NewTransation = ({ handleClose, fetchApi, style, open, dataValue }: INewTransationProps) => {
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
        <DialogModalScroll.Close handleClose={handleClose} />
        <LayoutTransactionForm
          dataValue={dataValue}
          title="Novo Serviço"
          setValueData={setFormValue}
          loading={loading}
        />
      </TransitionsModal>
    </>
  );
};
export default NewTransation;
