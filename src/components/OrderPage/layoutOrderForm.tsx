import React, { useState } from "react";
import { ICustomerAndOrderData } from "@/contexts";
import { useTheme, Container } from "@mui/material";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";

export interface IConfigContext {
  confirmData: any;
  data: ICustomerAndOrderData | undefined;
  setFormValues: any;
  loading: boolean;
}

export interface ILayoutCostumerForm {
  ConfigContext: IConfigContext;
  typeForm: "createCostomer" | "updateCostumer";
  handleClose: () => void;
}

export const LayoutOrderForm: React.FC<ILayoutCostumerForm> = ({ ConfigContext, handleClose, typeForm }) => {
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
      {typeForm === "createCostomer" && (
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
                {formStep >= 0 && (
                  <NameForm
                    formStep={formStep}
                    nextFormStep={nextFormStep}
                    data={data}
                    setData={setFormValues}
                    typeForm="createCostumer"
                  />
                )}

                {formStep >= 1 && (
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
    </>
  );
};
