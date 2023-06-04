import React, { useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { useTheme, Container } from "@mui/material";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";
import { TypeForm } from "../ProgressStepper/Forms/types";

export interface IConfigContext {
  confirmData: any;
  data: ICustomerAndOrderData | undefined;
  setFormValues: any;
  loading: boolean;
}

export interface ILayoutCostumerForm {
  ConfigContext: IConfigContext;
  typeForm: TypeForm;
  handleClose: () => void;
}

export const LayoutCostumerForm: React.FC<ILayoutCostumerForm> = ({ ConfigContext, handleClose, typeForm }) => {
  const { confirmData, data, setFormValues, loading } = ConfigContext;

  const theme = useTheme();

  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };
  const prevFormStep = () => {
    setFormStep(formStep - 1);
  };

  return (
    <>
      {typeForm === "createCostumer" && (
        <>
          {formStep >= 0 && formStep <= 2 && (
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
                    typeForm="createCostumer"
                  />
                )}
                {formStep >= 1 && formStep <= 1 && (
                  <AdressForm
                    formStep={formStep}
                    nextFormStep={nextFormStep}
                    prevFormStep={prevFormStep}
                    data={data}
                    setData={setFormValues}
                    typeForm="createCostumer"
                  />
                )}
                {formStep >= 2 && formStep <= 2 && (
                  <CreateOs
                    formStep={formStep}
                    nextFormStep={nextFormStep}
                    prevFormStep={prevFormStep}
                    data={data}
                    setData={setFormValues}
                    typeForm="createCostumer"
                  />
                )}
              </Container>
            </>
          )}

          {formStep > 2 && (
            <CompletedForm
              loading={loading}
              data={data}
              confirmData={confirmData}
              handleClose={handleClose}
              typeForm={typeForm}
            />
          )}
        </>
      )}

      {typeForm === "updateCostumer" && (
        <>
          {formStep >= 0 && formStep <= 2 && (
            <>
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
                    typeForm="updateCostumer"
                  />
                )}
                {formStep >= 1 && formStep <= 1 && (
                  <AdressForm
                    formStep={formStep}
                    nextFormStep={nextFormStep}
                    prevFormStep={prevFormStep}
                    data={data}
                    setData={setFormValues}
                    typeForm="updateCostumer"
                  />
                )}
                {formStep >= 2 && formStep <= 2 && (
                  <CompletedForm
                    loading={loading}
                    data={data}
                    confirmData={confirmData}
                    handleClose={handleClose}
                    typeForm="updateCostumer"
                  />
                )}
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};
