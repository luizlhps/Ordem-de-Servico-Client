import { useContext, useState, useEffect } from "react";
import { FormUpdateOrderContext } from "@/contexts/formUpdateOrderContext";
import { LayoutTransactionForm } from "./LayoutTransationForm";
import { IFinance } from "../../../types/finance";
import { financeApi } from "@/services/api/financeApi";

interface IPropsUpdateTransaction {
  handleClose: () => void;
  fetchApi: () => void;
  selectItem: IFinance | undefined;
}

const UpdateTransaction = ({ handleClose, fetchApi, selectItem }: IPropsUpdateTransaction) => {
  const [dataValue, setDataValue] = useState<IFinance | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const setFormValue = (form: IFinance) => {
    setDataValue((prevValue) => ({
      ...form,
    }));
    updateTransactionApi(form);
  };

  const updateTransactionApi = (data: IFinance) => {
    console.log("executei");

    if (!selectItem) return new Error("Ocorreu um erro ao achar a transação");
    financeApi
      .update(data, selectItem?._id, data.order)
      .then(() => fetchApi())
      .catch((err) => console.log("Ocorreu um Erro"))
      .finally(() => {
        setLoading((item: any) => {
          console.log("test");
          return false;
        });
        handleClose();
      });
  };

  console.log(selectItem);

  return (
    <>
      <LayoutTransactionForm setValueData={setFormValue} dataValue={selectItem} loading={loading} />
    </>
  );
};
export default UpdateTransaction;
