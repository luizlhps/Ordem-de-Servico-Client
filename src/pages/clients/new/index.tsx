import { HeaderLayout } from "@/components";
import AdressForm from "@/components/ProgressStepper/Forms/AdressForm";
import CompletedForm from "@/components/ProgressStepper/Forms/CompletedForm";
import CreateOs from "@/components/ProgressStepper/Forms/CreateOs";
import NameForm from "@/components/ProgressStepper/Forms/NameForm";
import { FormProvider } from "@/contexts";
import { Container, Divider, Stack, Typography, useTheme, Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };
  const prevFormStep = () => {
    setFormStep(formStep - 1);
  };

  //Theme
  const theme = useTheme();

  const tiers = [
    {
      title: "Free",
      price: "0",
      description: [
        "10 users included",
        "2 GB of storage",
        "Help center access",
        "Email support",
      ],
      buttonText: "Sign up for free",
      buttonVariant: "outlined",
    },
    {
      title: "Pro",
      subheader: "Most popular",
      price: "15",
      description: [
        "20 users included",
        "10 GB of storage",
        "Help center access",
        "Priority email support",
      ],
      buttonText: "Get started",
      buttonVariant: "contained",
    },
    {
      title: "Enterprise",
      price: "30",
      description: [
        "50 users included",
        "30 GB of storage",
        "Help center access",
        "Phone & email support",
      ],
      buttonText: "Contact us",
      buttonVariant: "outlined",
    },
  ];

  return (
    <>
      <FormProvider>
        {formStep >= 0 && formStep <= 2 && (
          <>
            <HeaderLayout subTitle="Digite os dados do novo cliente" title="Novo Cliente" />
            <Container
              sx={{
                paddingTop: 6,
                paddingBottom: 6,
                background: theme.palette.background.paper,
                marginTop: 10,
                borderRadius: "1rem",
              }}
            >
              {formStep >= 0 && <NameForm formStep={formStep} nextFormStep={nextFormStep} />}
              {formStep >= 1 && (
                <AdressForm
                  formStep={formStep}
                  nextFormStep={nextFormStep}
                  prevFormStep={prevFormStep}
                />
              )}
              {formStep >= 2 && (
                <CreateOs
                  formStep={formStep}
                  nextFormStep={nextFormStep}
                  prevFormStep={prevFormStep}
                />
              )}
            </Container>
          </>
        )}

        {formStep > 2 && <CompletedForm />}
      </FormProvider>
    </>
  );
}
