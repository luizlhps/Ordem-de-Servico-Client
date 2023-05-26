import { constumersApi } from "@/services/api/costumersApi";
import { ParsedUrlQuery } from "querystring";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState } from "react";
import { Container, useTheme } from "@mui/material";

import { FormUpdateCostumerProvider } from "@/contexts";
import { TypeForm } from "@/components/ProgressStepper/Forms/types";
import { HeaderLayout } from "@/components";
import UpdateCostumer from "@/components/CostumerPage/UpdateCostumer";

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
  return (
    <>
      <FormUpdateCostumerProvider>
        <UpdateCostumer costumer={costumer} />
      </FormUpdateCostumerProvider>
    </>
  );
}
