import { DataGridLayout, HeaderLayout } from "@/components";
import { Box, Stack, TextField, Button, useTheme } from "@mui/material";
import { FeaturedFinanceSlider } from "@/components/FeaturedFinanceSlider";
import React, { useState } from "react";
import { useSearchField } from "@/hook/useSearchField";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import useModal from "@/hook/useModal";
import { useGetFetchOrders } from "@/hook/Orders/useGetFetchOrders";
import { Order } from "@/hook/CostumOrders/useGetCostumOrders";

const Index = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<Order | undefined>(undefined);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { modalOpen, modalUpdateOpen, modalOpendelete, modalViewOpen } = modals;
  const {
    modalHandleOpen,
    modalHandleClose,
    modalUpdateHandleOpen,
    modalHandleUpdateClose,
    modalDeleteHandleOpen,
    modalDeleteHandleClose,
    modalViewClose,
    modalViewHandleOpen,
  } = modalActions;

  const { setModalOpen, setModalUpdateOpen, setModalOpenDelete } = modalSets;

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

  return (
    <>
      <HeaderLayout title="Finanças" subTitle="Bem-Vindo a Área de Finanças"></HeaderLayout>
      <Box marginTop={4}>
        <FeaturedFinanceSlider />
      </Box>
      <Stack marginTop={4} direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2}>
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
        page={ordersData?.Page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={ordersData?.Total}
      />
    </>
  );
};

export default Index;
