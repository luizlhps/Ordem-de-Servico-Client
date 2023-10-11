import { Container, useTheme } from "@mui/material";
import React from "react";
import { AdressForm, CompletedForm, NameForm } from "../ProgressStepper";
import { ICustomer } from "../../../types/customer";
import { TypeForm } from "../ProgressStepper/Forms/types";
import { useFormStep } from "@/hook/useFormStep";
import { ICustomerAndOrderData } from "../../../types/formOrderCustomer";

interface LayoutProps {
  data: ICustomer | ICustomerAndOrderData | undefined;
  setFormValues: (values: any) => void;
  loading: boolean;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
}

export const LayoutUpdateCustomer = ({ data, setFormValues, loading, confirmData, handleClose }: LayoutProps) => {
  const theme = useTheme();
  const { nextFormStep, prevFormStep, formStep } = useFormStep();

  return (
    <Container
      maxWidth="md"
      sx={{
        margin: "auto",
        background: theme.palette.background.paper,

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
          typeForm="updateCustomer"
        />
      )}
      {formStep >= 1 && formStep <= 1 && (
        <AdressForm
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
          typeForm="updateCustomer"
        />
      )}
      {formStep > 1 && (
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
  );
};
