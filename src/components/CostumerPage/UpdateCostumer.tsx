import { useContext } from "react";
import { useTheme } from "@mui/material";
import { LayoutCostumerForm } from "./a";
import { formUpdateCostumerContext } from "@/contexts/formUpdateCostumerContext";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const UpdateCostumer = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading } = useContext(formUpdateCostumerContext);
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutCostumerForm typeForm={"updateCostumer"} ConfigContext={ConfigContext} handleClose={handleClose} />
    </>
  );
};
export default UpdateCostumer;
