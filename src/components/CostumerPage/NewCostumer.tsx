import React, { useState, useContext, useEffect } from "react";
import { FormRegisterCostumerContext } from "@/contexts";
import {
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
  Grid,
  Box,
  Button,
  useMediaQuery,
  MenuItem,
  TextField,
} from "@mui/material";
import { HeaderLayout } from "../HeaderLayout";
import { AdressForm, CompletedForm, CreateOs, NameForm } from "../ProgressStepper";

const NewCostumer = () => {
  const [agoravai, setData] = useState();
  const { confirmData, data, test } = useContext(FormRegisterCostumerContext);

  useEffect(() => {
    test("batata");
  }, []);

  const { setFormValues } = useContext(FormRegisterCostumerContext);

  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };
  const prevFormStep = () => {
    setFormStep(formStep - 1);
  };

  //Theme
  const theme = useTheme();

  return (
    <>
      {formStep >= 0 && formStep <= 2 && (
        <>
          <HeaderLayout subTitle="Digite os dados do novo cliente" title="Novo Cliente" />
          <Container
            maxWidth="md"
            sx={{
              paddingTop: 6,
              paddingBottom: 6,
              background: theme.palette.background.paper,
              marginTop: 10,
              borderRadius: "1rem",
            }}
          >
            {formStep >= 0 && (
              <NameForm
                formStep={formStep}
                nextFormStep={nextFormStep}
                data={data}
                setData={setData}
                typeForm="createCostumer"
              />
            )}
            {formStep >= 1 && (
              <AdressForm
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                data={data}
                setData={setData}
                typeForm="createCostumer"
              />
            )}
            {formStep >= 2 && (
              <CreateOs
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                data={data}
                setData={setData}
                typeForm="createCostumer"
              />
            )}
          </Container>
        </>
      )}

      {formStep > 2 && <CompletedForm data={data} confirmData={confirmData} />}
    </>
  );
};
export default NewCostumer;
