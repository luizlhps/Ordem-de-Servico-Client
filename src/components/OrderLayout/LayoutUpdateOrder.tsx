import React from "react";
import { CompletedForm, CreateOs } from "../ProgressStepper";
import { DescriptionOS } from "../ProgressStepper/Forms/DescriptionOs";
import { Container, useTheme } from "@mui/material";
import { useFormStep } from "@/hook/useFormStep";
export function LayoutUpdateOrder({
  data,
  setFormValues,
  setCostumerId,
  loading,
  costumer,
  confirmData,
  handleClose,
  typeForm,
}: any) {
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
          setCostumerId={setCostumerId}
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
}
