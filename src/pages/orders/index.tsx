import { useState, useEffect, useContext, useMemo, lazy } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout, ViewOrderModal } from "@/components";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import useModal from "@/hook/useModal";
import { useSearchField } from "@/hook/useSearchField";
import { ToastError } from "@/components/Toast/ToastError";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import DeleteServiceModal from "@/components/Modal/servicesPage/Service/DeleteServiceModal";
import { useGetFetchOrders } from "@/hook/useGetFetchOrders";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { IOrder } from "../../../types/order";
import { FormCrudOrder } from "@/components/Modal/orderPage/FormCrudOrder";
import { Api } from "@/services/api/axios-config";

const Orders = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<IOrder | undefined>(undefined);

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const { currentPage, fetchApi, loading, ordersData, setCurrentPage } = useGetFetchOrders();

  //Search
  const { searchHandle, searchField } = useSearchField({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
  });

  //Config Grid
  const columns = columnsDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  const ordersFormattedForDataGrid = useMemo(() => {
    return ordersData?.orders.map((obj: any) => {
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
  }, [ordersData?.orders]);

  return (
    <>
      <FormCrudOrder fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectItem} />
      <HeaderLayout title="Ordens de serviço" subTitle="Bem-vindo a área de ordens de serviço" />
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
        rows={ordersData?.orders}
        columns={columns}
        PageSize={limitPorPage}
        page={ordersData?.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={ordersData?.total}
      />
    </>
  );
};

export default Orders;
