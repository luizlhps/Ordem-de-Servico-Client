import { useContext } from "react";
import { FormUpdateOrderContext } from "@/contexts/formUpdateOrderContext";
import { LayoutTransactionForm } from "./LayoutTransationForm";

interface IPropsUpdateTransaction {
  handleClose: () => void;
  fetchApi: () => void;
}

const UpdateTransaction = ({ handleClose, fetchApi }: IPropsUpdateTransaction) => {
  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormUpdateOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutTransactionForm ConfigContext={setFormValue} loading={loading} transaction={"costumer"} />
    </>
  );
};
export default UpdateTransaction;
