import { Container, useTheme } from "@mui/material";
import React from "react";
import { CompletedForm, CreateOs } from "../ProgressStepper";
import { useFormStep } from "@/hook/useFormStep";
export function LayoutCreateOs({
  data,
  setFormValues,
  setCostumerId,
  loading,
  confirmData,
  handleClose,
  costumer,
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
      {formStep > 0 && (
        <CompletedForm
          loading={loading}
          data={data}
          confirmData={confirmData}
          handleClose={handleClose}
          costumer={costumer}
          typeForm={typeForm}
        />
      )}
    </Container>
  );
}
