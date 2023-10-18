import React, { Dispatch, SetStateAction, useState } from "react";
import { CompletedForm, CreateOs } from "../ProgressStepper";
import { DescriptionOS } from "../ProgressStepper/Forms/OrdersTemplate/DescriptionOs";
import { Container, useTheme } from "@mui/material";
import { useFormStep } from "@/hook/useFormStep";
import { ICustomerAndOrder } from "./UpdateOrder";
import { ICustomer } from "../../../types/customer";
import { TypeForm } from "../ProgressStepper/Forms/types";

interface LayoutProps {
  data: ICustomerAndOrder | undefined;
  setFormValues: (values: any) => void;
  setCustomerId: Dispatch<SetStateAction<ICustomer | undefined>>;
  loading: boolean;
  customer: ICustomer | undefined;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
  setStatusId: any;
}

export const LayoutUpdateOrder = ({
  data,
  setFormValues,
  setCustomerId,
  loading,
  customer,
  confirmData,
  handleClose,
  typeForm,
  setStatusId,
}: LayoutProps) => {
  const theme = useTheme();
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

      {formStep >= 1 && formStep <= 1 && (
        <DescriptionOS
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
          typeForm="createOs"
        />
      )}
      {formStep > 1 && (
        <CompletedForm
          loading={loading}
          data={data}
          customer={customer}
          confirmData={confirmData}
          handleClose={handleClose}
          typeForm={typeForm}
        />
      )}
    </>
  );
};
