import { useContext, useState } from "react";
import { LayoutTransactionForm } from "./LayoutTransationForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";
import { IFinance } from "../../../types/finance";
import { financeApi } from "@/services/api/financeApi";

interface INewTransationProps {
  handleClose: () => void;
  fetchApi: () => void;
}

const NewTransation = ({ handleClose, fetchApi }: INewTransationProps) => {
  const [dataValue, setDataValue] = useState<IFinance | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const setFormValue = (form: IFinance) => {
    setDataValue((prevValue) => ({
      ...form,
    }));
    setLoading(true);
    createTransactionApi(form);
  };

  const createTransactionApi = (data: IFinance) => {
    console.log("executei");
    financeApi
      .create(data, data.order)
      .then(() => fetchApi())
      .catch((err) => console.log("Ocorreu um Erro"))
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <LayoutTransactionForm ConfigContext={setFormValue} loading={loading} transaction={"costumer"} />
    </>
  );
};
export default NewTransation;
