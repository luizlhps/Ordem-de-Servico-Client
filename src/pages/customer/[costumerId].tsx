import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ICostumer } from "../../../types/costumer";
import { costumersApi } from "@/services/api/costumersApi";
import { Api, setupApiClientSide } from "@/services/api/axios-config";
import { access } from "fs";
import { useEffect } from "react";
import axios from "axios";

import { useState } from "react";

import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import { Button, Icon, IconButton, Stack, TextField } from "@mui/material";

import { IOrder } from "../../../types/order";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { useGetCostumOrders } from "@/hook/useGetCostumOrders";
import { useSearchFieldWith_id } from "@/hook/useSearchFieldWith_Id";

import { DataGridLayout, HeaderLayout } from "@/components";
import { FormCrudOrder } from "@/components/OrderLayout/FormCrudOrder";
import useModal from "@/hook/useModal";
import { AuthSSR } from "@/utils/AuthSSR";

interface Params extends ParsedUrlQuery {
  costumerId: string;
}

export const getServerSideProps: GetServerSideProps = AuthSSR(async (context) => {
  const { costumerId } = context.params as Params;
  let costumer = undefined;

  if (context.req.cookies.auth) {
    const tokenInfo = JSON.parse(context.req.cookies.auth);
    const token = tokenInfo.accessToken;
    console.log(token);
    try {
      const res = await setupApiClientSide(token).get(`costumers/${costumerId}`);
      const customer = res.data;
      return {
        props: { customer },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
});

function CostumerPageID({ customer }: { customer: ICostumer }) {
  console.log(customer);
  const router = useRouter();
  const theme = useTheme();

  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<IOrder | undefined>(undefined);

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const { setCurrentPage, data, currentPage, fetchApi, loading, setData } = useGetCostumOrders({ costumer: customer });

  //Search

  const { searchHandle, searchField } = useSearchFieldWith_id({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
    id: customer._id,
  });

  //Config Grid
  const columns = columnsDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  if (!customer) {
    return <p>Loading...</p>;
  }

  const BackHandle = () => {
    router.push("/clients");
  };

  const { name, id, orders } = customer;

  return (
    <>
      <HeaderLayout title={`${name} # ${id}`} subTitle="Área de ordens de serviço do cliente" />
      <IconButton onClick={BackHandle} sx={{ marginTop: 2 }}>
        <Icon>arrow_back</Icon>
      </IconButton>
      <FormCrudOrder fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectItem} />

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2}>
        <TextField
          value={searchField || ""}
          onChange={searchHandle}
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Search"
          variant="filled"
          size="small"
          sx={{
            marginTop: 3,
            width: 180,
          }}
        />
        <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 3 }}>
          Novo
        </Button>
      </Stack>
      <DataGridLayout
        loading={loading}
        rows={data.orders}
        columns={columns}
        PageSize={limitPorPage}
        page={data.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={data.total}
      />
    </>
  );
}
export default CostumerPageID;
