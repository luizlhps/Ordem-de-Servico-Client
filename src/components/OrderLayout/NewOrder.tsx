import { useContext } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutOrderForm } from "./layoutOrderForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const NewOrder = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormRegisterOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutOrderForm
        typeForm="createOs"
        ConfigContext={ConfigContext}
        handleClose={handleClose}
        setCostumerId={setCostumer}
        costumer={costumer}
      />
    </>
  );
};
export default NewOrder;
