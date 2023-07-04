import { useContext } from "react";
import { LayoutTransactionForm } from "./LayoutTransationForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";

interface INewTransationProps {
  handleClose: () => void;
}

const NewTransation = ({ handleClose }: INewTransationProps) => {
  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormRegisterOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutTransactionForm
        ConfigContext={ConfigContext}
        handleClose={handleClose}
        setCostumerId={setCostumer}
        costumer={costumer}
      />
    </>
  );
};
export default NewTransation;
