import { useContext } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutCostumerForm } from "./LayoutCostumerForm";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const NewCostumer = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading } = useContext(FormRegisterCostumerContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutCostumerForm typeForm="createCostumer" ConfigContext={ConfigContext} handleClose={handleClose} />
    </>
  );
};
export default NewCostumer;
