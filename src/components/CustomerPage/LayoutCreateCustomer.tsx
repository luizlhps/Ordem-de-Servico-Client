import { useTheme } from "@mui/material";
import { useFormStep } from "@/hook/useFormStep";
import { ICustomer } from "../../../types/customer";
import { ICustomerAndOrderData } from "../../../types/formOrderCustomer";
import { AdressFormCreate, CompletedFormCreate, OrderFormCreateCostumer } from "../ProgressStepper/Forms/CostumerForm";
import { NameFormCreate } from "../ProgressStepper/Forms/CostumerForm/NameFormCreate";

interface LayoutProps {
  data: ICustomer | ICustomerAndOrderData | undefined;
  setFormValues: (values: any) => void;
  loading: boolean;
  confirmData: () => void | undefined;
  handleClose: () => void;
  setStatusId: any;
}

export const LayoutCreateCustomer = ({
  data,
  setFormValues,
  setStatusId,
  loading,
  confirmData,
  handleClose,
}: LayoutProps) => {
  const theme = useTheme();
  const { nextFormStep, prevFormStep, formStep } = useFormStep();

  return (
    <>
      {formStep >= 0 && formStep <= 0 && (
        <NameFormCreate formStep={formStep} nextFormStep={nextFormStep} data={data} setData={setFormValues} />
      )}
      {formStep >= 1 && formStep <= 1 && (
        <AdressFormCreate
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
        />
      )}
      {formStep >= 2 && formStep <= 2 && (
        <OrderFormCreateCostumer
          setStatusId={setStatusId}
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
        />
      )}

      {formStep > 2 && (
        <CompletedFormCreate
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
