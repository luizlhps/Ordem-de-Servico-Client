import { DataGridLayout, HeaderLayout } from "@/components";
import { Box, Stack, TextField, Button, useTheme } from "@mui/material";
import { FeaturedFinanceSlider } from "@/components/FeaturedFinanceSlider";
import React, { useEffect, useState } from "react";
import { useSearchField } from "@/hook/useSearchField";
import useModal from "@/hook/useModal";
import { useGetFetchOrders } from "@/hook/useGetFetchOrders";
import { Order } from "@/hook/useGetCostumOrders";
import { financeColumnDataGrid } from "@/components/DataGrid/utils/FinanceColumnDataGrid";
import { FormCrudModals } from "@/components/Modal/financePage/FinanceModals";
import { useGetFetchFinance } from "@/hook/useGetFetchFinances";
import { IFinance } from "../../../types/finance";
import NewTransation from "@/components/FinanceLayout/NewTransaction";
import UpdateTransaction from "@/components/FinanceLayout/UpdateTransaction";

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

  console.log(financeData);

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

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <FormCrudModals
        modalActions={modalActions}
        modals={modals}
        fetchApi={fetchApi}
        FormCreate={NewTransation}
        FormUpdate={UpdateTransaction}
        selectItem={selectItem}
      />
      <HeaderLayout title="Finanças" subTitle="Bem-Vindo a Área de Finanças" />
      <Box marginTop={4}>
        <FeaturedFinanceSlider financeData={financeData} balance={balanceValue} />
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
        page={financeData?.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={financeData?.total}
      />
    </>
  );
};

export default Index;
