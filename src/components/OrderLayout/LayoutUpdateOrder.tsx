import React, { Dispatch, SetStateAction, useState } from "react";
import { CompletedForm, CreateOs } from "../ProgressStepper";
import { DescriptionOS } from "../ProgressStepper/Forms/DescriptionOs";
import { Container, useTheme } from "@mui/material";
import { useFormStep } from "@/hook/useFormStep";
import { ICustomerAndOrder } from "./UpdateOrder";
import { ICostumer } from "../../../types/costumer";
import { TypeForm } from "../ProgressStepper/Forms/types";

interface LayoutProps {
  data: ICustomerAndOrder | undefined;
  setFormValues: (values: any) => void;
  setCostumerId: Dispatch<SetStateAction<ICostumer | undefined>>;
  loading: boolean;
  costumer: ICostumer | undefined;
  confirmData: () => void | undefined;
  handleClose: () => void;
  typeForm: TypeForm;
  setStatusId: any;
}

export const LayoutUpdateOrder = ({
  data,
  setFormValues,
  setCostumerId,
  loading,
  costumer,
  confirmData,
  handleClose,
  typeForm,
  setStatusId,
}: LayoutProps) => {
  const theme = useTheme();
  const { nextFormStep, prevFormStep, formStep } = useFormStep();

  return (
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
        <CreateOs
          formStep={formStep}
          nextFormStep={nextFormStep}
          prevFormStep={prevFormStep}
          data={data}
          setData={setFormValues}
          typeForm="createOs"
          setCostumer={setCostumerId}
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
          costumer={costumer}
          confirmData={confirmData}
          handleClose={handleClose}
          typeForm={typeForm}
        />
      )}
    </Container>
  );
};