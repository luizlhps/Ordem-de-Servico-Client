import { constumersApi } from "@/services/api/costumersApi";
import { ParsedUrlQuery } from "querystring";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import { Container, useTheme } from "@mui/material";

import { FormUpdateCostumerProvider } from "@/contexts";
import { TypeForm } from "@/components/ProgressStepper/Forms/types";
import { HeaderLayout } from "@/components";
import { AdressForm, NameForm } from "@/components/ProgressStepper";

interface Params extends ParsedUrlQuery {
  costumerId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { costumerId } = context.params as Params;

  try {
    const res = await constumersApi.getById(costumerId);
    const data = res.data;
    return {
      props: {
        costumer: data,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar os dados do cliente:", error);
    return {
      notFound: true,
    };
  }
};

export default function Page({ costumer }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formStep, setFormStep] = useState(0);
  const [data, setData] = useState<any>();

  const setDataFunction = (value: any) => {
    setData((prevValues: any) => ({
      ...prevValues,
      ...value,
    }));
  };

  console.log("valor", data);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };
  const prevFormStep = () => {
    setFormStep(formStep - 1);
  };

  const theme = useTheme();

  if (!costumer) {
    return <p>Loading...</p>;
  }

  const typeForm: TypeForm = "updateCostumer";

  return (
    <>
      <FormUpdateCostumerProvider>
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
                  typeForm={typeForm}
                  setData={setDataFunction}
                  data={data}
                />
              )}
              {formStep >= 1 && (
                <AdressForm
                  formStep={formStep}
                  nextFormStep={nextFormStep}
                  prevFormStep={prevFormStep}
                  typeForm={typeForm}
                  setData={setDataFunction}
                  data={data}
                />
              )}
            </Container>
          </>
        )}
      </FormUpdateCostumerProvider>
    </>
  );
}
