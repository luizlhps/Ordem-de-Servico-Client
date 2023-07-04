import { useContext } from "react";
import { FormUpdateOrderContext } from "@/contexts/formUpdateOrderContext";
import { LayoutTransactionForm } from "./LayoutTransationForm";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const UpdateTransaction = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormUpdateOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutTransactionForm
        costumer={costumer}
        ConfigContext={ConfigContext}
        handleClose={handleClose}
        setCostumerId={setCostumer}
      />
    </>
  );
};
export default UpdateTransaction;
