import { useContext } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutOrderForm } from "./layoutOrderForm";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const NewOrder = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading } = useContext(FormRegisterCostumerContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutOrderForm typeForm="createCostomer" ConfigContext={ConfigContext} handleClose={handleClose} />
    </>
  );
};
export default NewOrder;
