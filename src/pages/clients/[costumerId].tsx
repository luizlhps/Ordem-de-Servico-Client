import { constumersApi } from "@/services/api/costumersApi";
import { ParsedUrlQuery } from "querystring";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

interface Params extends ParsedUrlQuery {
  costumerId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { costumerId } = context.params as Params;
  console.log(costumerId);

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
  if (!costumer) {
    return <p>Loading...</p>;
  }

  return <p>{costumer.customer.name}</p>;
}
