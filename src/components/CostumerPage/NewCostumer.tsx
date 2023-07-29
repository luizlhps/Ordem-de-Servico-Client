import { useContext, useState } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import { LayoutCostumerForm } from "./a";
import { IStatus } from "@/services/api/statusApi";

interface IPropsNewCostumer {
  handleClose: () => void;
}

const NewCostumer = ({ handleClose }: IPropsNewCostumer) => {
  const { confirmData, data, setFormValues, loading } = useContext(FormRegisterCostumerContext);
  const [statusId, setStatusId] = useState<IStatus | undefined>();
  const ConfigContext = {
    confirmData,
    data,
    setFormValues,
    loading,
  };

  return (
    <>
      <LayoutCostumerForm
        setStatusId={setStatusId}
        typeForm="createCostumer"
        ConfigContext={ConfigContext}
        handleClose={handleClose}
      />
    </>
  );
};
export default NewCostumer;
