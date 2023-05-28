import { useState, useContext } from "react";
import { formUpdateCostumerContext } from "@/contexts";
import { Container, useTheme } from "@mui/material";
import { HeaderLayout } from "../HeaderLayout";
import { AdressForm, CompletedForm, NameForm } from "../ProgressStepper";

const UpdateCostumer = ({ costumer }: any) => {
  const { confirmData, data, setFormValues, loading } = useContext(formUpdateCostumerContext);

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
      {formStep >= 0 && formStep <= 1 && (
        <>
          <HeaderLayout subTitle="Digite os dados do novo cliente" title="Novo Cliente" />
          <Container
            maxWidth={"md"}
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
                typeForm={"updateCostumer"}
                setData={setFormValues}
                data={data}
              />
            )}
            {formStep >= 1 && (
              <AdressForm
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                typeForm={"updateCostumer"}
                setData={setFormValues}
                data={data}
              />
            )}
          </Container>
        </>
      )}
      {formStep > 1 && <CompletedForm loading={loading} data={data} confirmData={confirmData} />}
    </>
  );
};
export default UpdateCostumer;
