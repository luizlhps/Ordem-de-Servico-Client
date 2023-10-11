import React from "react";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";
import { Container, useTheme } from "@mui/material";
import { useFormStep } from "@/hook/useFormStep";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { ICustomerAndOrder } from "../OrderLayout/UpdateOrder";
import { ICustomer } from "../../../types/customer";
import { ICustomerAndOrderData } from "../../../types/formOrderCustomer";

interface LayoutProps {
  data: ICustomer | ICustomerAndOrderData | undefined;
  setFormValues: (values: any) => void;
  loading: boolean;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
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
      <Container
        maxWidth="md"
        sx={{
          margin: "auto",
          background: theme.palette.background.paper,
          borderRadius: "1rem",
          ":root": {
            paddingBottom: 10,
          },
        }}
      >
        {formStep >= 0 && formStep <= 0 && (
          <NameForm
            formStep={formStep}
            nextFormStep={nextFormStep}
            data={data}
            setData={setFormValues}
            typeForm="createCustomer"
          />
        )}
        {formStep >= 1 && formStep <= 1 && (
          <AdressForm
            formStep={formStep}
            nextFormStep={nextFormStep}
            prevFormStep={prevFormStep}
            data={data}
            setData={setFormValues}
            typeForm="createCustomer"
          />
        )}
        {formStep >= 2 && formStep <= 2 && (
          <CreateOs
            setStatusId={setStatusId}
            formStep={formStep}
            nextFormStep={nextFormStep}
            prevFormStep={prevFormStep}
            data={data}
            setData={setFormValues}
            typeForm="createCustomer"
          />
        )}

        {formStep > 2 && (
          <CompletedForm
            customer={data}
            loading={loading}
            data={data}
            confirmData={confirmData}
            handleClose={handleClose}
            typeForm="updateCustomer"
          />
        )}
      </Container>
    </>
  );
};
