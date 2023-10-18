import { useTheme } from "@mui/material";
import { ICustomer } from "../../../types/customer";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { useFormStep } from "@/hook/useFormStep";
import { ICustomerAndOrderData } from "../../../types/formOrderCustomer";
import { AdressFormUpdate, CompletedFormUpdate } from "../ProgressStepper/Forms/CostumerTemplate";
import { NameFormUpdate } from "../ProgressStepper/Forms/CostumerTemplate/NameFormUpdate";

interface LayoutProps {
  data: ICustomer | ICustomerAndOrderData | undefined;
  setFormValues: (values: any) => void;
  loading: boolean;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
}

export const LayoutUpdateCustomer = ({ data, setFormValues, loading, confirmData, handleClose }: LayoutProps) => {
  const { nextFormStep, prevFormStep, formStep } = useFormStep();

  return (
    <>
      {formStep >= 0 && formStep <= 0 && (
        <NameFormUpdate formStep={formStep} nextFormStep={nextFormStep} data={data} setData={setFormValues} />
      )}
      {formStep >= 1 && formStep <= 1 && (
        <AdressFormUpdate
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
        />
      )}
      {formStep > 1 && (
        <CompletedFormUpdate
          customer={data}
          loading={loading}
          data={data}
          confirmData={confirmData}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
