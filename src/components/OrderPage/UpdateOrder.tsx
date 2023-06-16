import { useContext } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutOrderForm } from "./layoutOrderForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";
import { FormUpdateOrderContext } from "@/contexts/formUpdateOrderContext";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const UpdateOrder = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading, setCostumer, costumer } = useContext(FormUpdateOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutOrderForm
        costumer={costumer}
        typeForm="updateOs"
        ConfigContext={ConfigContext}
        handleClose={handleClose}
        setCostumerId={setCostumer}
      />
    </>
  );
};
export default UpdateOrder;
