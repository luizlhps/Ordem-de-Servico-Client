import { useContext } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutOrderForm } from "./layoutOrderForm";
import { FormRegisterOrderContext } from "@/contexts/formRegisterOrderContext";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const UpdateOrder = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading, setCostumerId } = useContext(FormRegisterOrderContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutOrderForm
        typeForm="updateOs"
        ConfigContext={ConfigContext}
        handleClose={handleClose}
        setCostumerId={setCostumerId}
      />
    </>
  );
};
export default UpdateOrder;
