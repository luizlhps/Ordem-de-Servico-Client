import { Dispatch, SetStateAction } from "react";
import { CompletedForm, CreateOs } from "../ProgressStepper";
import { useFormStep } from "@/hook/useFormStep";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { ICustomer } from "../../../types/customer";
import { IOrder } from "../../../types/order";

interface LayoutProps {
  data: IOrder | undefined;
  setFormValues: (values: any) => void;
  setCustomerId: Dispatch<SetStateAction<ICustomer | undefined>>;
  loading: boolean;
  customer: ICustomer | undefined;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
  setStatusId: any;
}

export function LayoutCreateOs({
  data,
  setFormValues,
  setCustomerId,
  loading,
  confirmData,
  handleClose,
  customer,
  typeForm,
  setStatusId,
}: LayoutProps) {
  const { nextFormStep, prevFormStep, formStep } = useFormStep();

  return (
    <>
      {formStep >= 0 && formStep <= 0 && (
        <CreateOs
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
          typeForm="createOs"
          setCustomer={setCustomerId}
          setStatusId={setStatusId}
        />
      )}
      {formStep > 0 && (
        <CompletedForm
          loading={loading}
          data={data}
          confirmData={confirmData}
          handleClose={handleClose}
          customer={customer}
          typeForm={typeForm}
        />
      )}
    </>
  );
}
