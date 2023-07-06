import { DataGridLayout, HeaderLayout } from "@/components";
import { Box, Stack, TextField, Button, useTheme } from "@mui/material";
import { FeaturedFinanceSlider } from "@/components/FeaturedFinanceSlider";
import React, { useEffect, useState } from "react";
import { useSearchField } from "@/hook/useSearchField";
import useModal from "@/hook/useModal";
import { useGetFetchOrders } from "@/hook/useGetFetchOrders";
import { Order } from "@/hook/useGetCostumOrders";
import { financeColumnDataGrid } from "@/components/DataGrid/utils/FinanceColumnDataGrid";
import { CreateFinanceModal } from "@/components/Modal/financePage/CreateFinanceModal";
import { useGetFetchFinance } from "@/hook/useGetFetchFinances";
import { IFinance } from "../../../types/finance";

const Index = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<IFinance | undefined>(undefined);

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

  //Api
  const { currentPage, fetchApi, loading, financeData, setCurrentPage, balanceValue, fetchBalance } =
    useGetFetchFinance();

  //Search
  const { searchHandle, searchField } = useSearchField({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
  });

  //Config Grid
  const columns = financeColumnDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  console.log(balanceValue);

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <CreateFinanceModal open={modalOpen} handleClose={modalHandleClose} />
      <HeaderLayout title="Finanças" subTitle="Bem-Vindo a Área de Finanças" />
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
        rows={financeData?.transaction}
        columns={columns}
        PageSize={limitPorPage}
        page={financeData?.Page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={financeData?.total}
      />
    </>
  );
};

export default Index;
