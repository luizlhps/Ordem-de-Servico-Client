import { useState } from "react";
import { Box, Stack, TextField, Button, useTheme } from "@mui/material";

import { DataGridLayout, HeaderLayout } from "@/components";
import { useSearchField } from "@/hook/useSearchField";
import useModal from "@/hook/useModal";
import { financeColumnDataGrid } from "@/components/DataGrid/utils/FinanceColumnDataGrid";
import { FormCrudModals } from "@/components/Modal/financePage/FormCrudModals";
import { useGetFetchFinance } from "@/hook/useGetFetchFinances";
import { IFinance } from "../../../types/finance";
import NewTransation from "@/components/FinanceLayout/NewTransaction";
import UpdateTransaction from "@/components/FinanceLayout/UpdateTransaction";
import { DashboardFinance } from "@/components/Dashboard/DashboardFinance";
import { DeleteTransaction } from "@/components/FinanceLayout/DeleteTransaction";

import { useRouter } from "next/router";
import { MenuSelectFilterDefault } from "@/components/MenuSelectFilter";

const Index = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<IFinance | undefined>(undefined);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewHandleOpen } = modalActions;

  //Api
  const {
    currentPage,
    fetchApi,
    loading,
    financeData,
    setCurrentPage,
    dataDashboard,
    dashboardFetchApi,
    error,
    limitPerPage,
    searchField,
    setCustomerFilter,
    setFinanceData,
    setRangeDateFilter,
    setSearchField,
    setStatusFilter,
  } = useGetFetchFinance();

  //Search
  const { searchHandle } = useSearchField({
    searchField,
    setCurrentPage,
    setSearchField,
  });

  //Config Grid
  const columns = financeColumnDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  return (
    <>
      <FormCrudModals
        modalActions={modalActions}
        modals={modals}
        fetchApi={fetchApi}
        FormCreate={NewTransation}
        FormUpdate={UpdateTransaction}
        selectItem={selectItem}
        FormDelete={DeleteTransaction}
      />
      <HeaderLayout title="Finanças" subTitle="Bem-Vindo a Área de Finanças" />
      {loading && <div>loading.....</div>}

      <Box marginTop={4}>
        <DashboardFinance dataDashboard={dataDashboard} />
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
        <Stack flexDirection={"row"} gap={2}>
          <MenuSelectFilterDefault setRangeDateFilter={setRangeDateFilter} />
          <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 2 }}>
            Novo
          </Button>
        </Stack>
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
