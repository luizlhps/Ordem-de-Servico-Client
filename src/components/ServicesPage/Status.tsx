import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { DataGridLayout } from "@/components";

import { statusColumnsDataGrid } from "../DataGrid/utils/servicePage/statusColumnConfig";
import { useSearchField } from "@/hook/useSearchField";
import { useGetFetchStatus } from "@/hook/useGetFetchStatus";
import useModal from "@/hook/useModal";
import { FormCrudStatus } from "../StatusLayout/FormCrudStatus";

export interface IStatus {
  _id?: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt?: string;
}

const Status = () => {
  const theme = useTheme();

  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  //modal Create
  const { modalActions, modals } = useModal();
  const { modalDeleteHandleOpen, modalHandleOpen, modalUpdateHandleOpen } = modalActions;

  const {
    currentPage,
    error,
    fetchApi,
    loading,
    setCurrentPage,
    statusData,
    setCustomerFilter,
    setRangeDateFilter,
    setSearchField,
    searchField,
    setStatusData,
    limitPerPage,
    setStatusFilter,
  } = useGetFetchStatus();

  //Config Datagrid
  const columns = statusColumnsDataGrid(
    theme,
    fetchApi,
    modalUpdateHandleOpen,
    setSelectedItemUpdate,
    modalDeleteHandleOpen
  );

  const { searchHandle } = useSearchField({ searchField, setCurrentPage, setSearchField });

  return (
    <>
      <FormCrudStatus fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectedItemUpdate} />
      <Typography variant="h1" marginTop={7}>
        Status
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2}>
        <TextField
          value={searchField || ""}
          onChange={(e) => setSearchField(e.target.value)}
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
        rows={statusData.status}
        columns={columns}
        PageSize={limitPerPage}
        page={statusData.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={statusData.total}
      />
    </>
  );
};
export default Status;
