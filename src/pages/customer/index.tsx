import { useState } from "react";

import { Button, Stack, TextField, useTheme } from "@mui/material";

import { DataGridLayout, HeaderLayout } from "@/components";

import useModal from "@/hook/useModal";
import { ColumnsDataGrid } from "@/components/DataGrid/utils/customerPage/customerColumnConfig";
import { FormCrudCustomer } from "@/components/Modal/customerPage/FormCrudCustomer";
import { useGetFetchCustomers } from "@/hook/useGetFetchCustomers";
import { useSearchField } from "@/hook/useSearchField";
import { MenuSelectFilterDefault } from "@/components/MenuSelectFilter";

export default function Customers() {
  //Theme
  const theme = useTheme();

  const [selectedItem, setSelectedItem] = useState("" || Object);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen } = modalActions;

  const limitPorPage = 10;
  const columns = ColumnsDataGrid(theme, setSelectedItem, modalDeleteHandleOpen, modalUpdateHandleOpen);

  const {
    currentPage,
    customerData,
    error,
    fetchApi,
    limitPerPage,
    loading,
    searchField,

    setRangeDateFilter,
    setCurrentPage,
    setSearchField,
  } = useGetFetchCustomers();
  const { searchHandle } = useSearchField({ searchField, setCurrentPage, setSearchField });

  return (
    <>
      <FormCrudCustomer fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectedItem} />

      <HeaderLayout subTitle="Bem vindo a area ordem de serviço" title="Clientes" />
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
        <Stack flexDirection={"row"} gap={2}>
          <MenuSelectFilterDefault setRangeDateFilter={setRangeDateFilter} />
          <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 2 }}>
            Novo
          </Button>
        </Stack>
      </Stack>
      <DataGridLayout
        loading={loading}
        page={customerData?.page}
        totalCount={customerData?.total}
        rows={customerData?.customer}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        columns={columns}
        PageSize={limitPorPage}
      />
    </>
  );
}
