import { useContext } from "react";
import { formUpdateCostumerContext } from "@/contexts";
import { useTheme } from "@mui/material";
import { LayoutCostumerForm } from "./LayoutCostumerForm";

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
