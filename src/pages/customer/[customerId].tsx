import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ICustomer } from "../../../types/customer";
import { customersApi } from "@/services/api/customersApi";
import { Api, setupApiClientSide } from "@/services/api/axios-config";
import { access } from "fs";
import { useEffect, useMemo } from "react";
import axios from "axios";

import { useState } from "react";

import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import { Button, Icon, IconButton, Stack, TextField } from "@mui/material";

import { IOrder } from "../../../types/order";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { useSearchFieldWith_id } from "@/hook/useSearchFieldWith_Id";

import { DataGridLayout, HeaderLayout } from "@/components";
import { FormCrudOrder } from "@/components/OrderLayout/FormCrudOrder";
import useModal from "@/hook/useModal";
import { AuthSSR } from "@/utils/AuthSSR";
import { useGetCostumersOrders } from "@/hook/useGetCustomerOrders";
import { MenuSelectFilterDefault, MenuSelectFilterOrderPending } from "@/components/MenuSelectFilter";
import { FormCrudOrderPending } from "@/components/OrderLayout/FormCrudOrderPending";

interface Params extends ParsedUrlQuery {
  customerId: string;
}

export const getServerSideProps: GetServerSideProps = AuthSSR(async (context) => {
  const { customerId } = context.params as Params;
  try {
    if (context.req.cookies.auth) {
      const tokenInfo = JSON.parse(context.req.cookies.auth);

      const token = tokenInfo.accessToken;

      const res = await setupApiClientSide(token).get(`customers/${customerId}`);

      const customer = res.data;

      return {
        props: { customer },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
  return {
    notFound: true,
  };
});

function CustomerPageID({ customer }: { customer: ICustomer }) {
  const router = useRouter();
  const theme = useTheme();

  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<IOrder | undefined>(undefined);

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const {
    setCurrentPage,
    data,
    currentPage,
    fetchApi,
    loading,
    limitPerPage,
    searchField,
    setStatusFilter,
    setSearchField,
    setRangeDateFilter,
  } = useGetCostumersOrders({ customer: customer });

  //Search
  const { searchHandle } = useSearchFieldWith_id({
    searchField,
    setCurrentPage,
    setSearchField,
  });

  //Config Grid
  const columns = columnsDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  //Config EquipmentField
  const ordersFormattedForDataGrid = useMemo(() => {
    return data?.orders.map((obj: any) => {
      const values: any[] = [];
      if (obj.equipment) values.push(obj.equipment);
      if (obj.brand && !values.includes(obj.brand)) values.push(obj.brand);
      if (obj.model && !values.includes(obj.model)) values.push(obj.model);

      let uniqueValues: any[] = [];
      values.forEach((obj) => {
        if (!uniqueValues.includes(obj)) {
          uniqueValues.push(obj);
        }
        return uniqueValues;
      });

      return (obj.equipmentField = uniqueValues.join(" "));
    });
  }, [data?.orders]);

  if (!customer) {
    return <p>Loading...</p>;
  }

  const BackHandle = () => {
    router.push("/customer");
  };

  const { name, id, orders } = customer;

  return (
    <>
      <HeaderLayout title={`${name} # ${id}`} subTitle="Área de ordens de serviço do cliente" />
      <IconButton onClick={BackHandle} sx={{ marginTop: 2 }}>
        <Icon>arrow_back</Icon>
      </IconButton>
      <FormCrudOrderPending
        customer={customer}
        fetchApi={fetchApi}
        modalActions={modalActions}
        modals={modals}
        selectItem={selectItem}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2} marginTop={1}>
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
        <Stack flexDirection={"row"} gap={2}>
          <MenuSelectFilterOrderPending setRangeDateFilter={setRangeDateFilter} setStatusFilter={setStatusFilter} />
          <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 2 }}>
            Novo
          </Button>
        </Stack>
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
export default CustomerPageID;
