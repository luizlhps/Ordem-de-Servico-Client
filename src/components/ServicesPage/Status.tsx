import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState, useContext } from "react";
import { DataGridLayout } from "@/components";
import { useDebouse } from "@/hook";

import { statusColumnsDataGrid } from "../DataGrid/utils/servicePage/statusColumnConfig";
import DeleteModal from "../Modal/deleteModal";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import { servicesApi } from "@/services/api/servicesApi";
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

  const { debouse } = useDebouse(300);
  const [newItem, setNewItem] = useState(false);
  const [newUpdateItem, setNewUpdateItem] = useState(false);
  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  const [loadingDel, setLoadingDel] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const { formSuccess, setFormSuccess, errorMessage, setFormError, setErrorMessage, formError } =
    useContext(FormSucessOrErrorContext);

  //modal Create
  const { modalActions, modalSets, modals } = useModal();
  const { modalOpen, modalOpendelete, modalUpdateOpen } = modals;
  const { setModalOpen } = modalSets;
  const {
    modalDeleteHandleClose,
    modalDeleteHandleOpen,
    modalHandleClose,
    modalHandleOpen,
    modalHandleUpdateClose,
    modalUpdateHandleOpen,
  } = modalActions;

  const { currentPage, error, fetchApi, loading, setCurrentPage, setStatusData, statusData } = useGetFetchStatus();

  //Delete Api
  const HandleDeleted = async (id: string | undefined) => {
    setLoadingDel(true);
    servicesApi
      .deleteServices(id)
      .then(() => {
        fetchApi();
        setSuccess(true);
      })
      .catch((err) => {
        console.error(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!"),
          setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
      })
      .finally(() => {
        modalDeleteHandleClose();
        setLoadingDel(false);
      });
  };

  //Config Datagrid
  const limitPorPage = 5;
  const columns = statusColumnsDataGrid(
    theme,
    fetchApi,
    modalUpdateHandleOpen,
    setSelectedItemUpdate,
    modalDeleteHandleOpen
  );

  const { searchField, searchHandle, setCustomerFilter, setRangeDateFilter, setSearchField, setStatusFilter } =
    useSearchField({ limitPorPage, setCurrentPage, currentPage, fetchApi });

  return (
    <>
      {/*       <DeleteModal
        HandleDeleted={HandleDeleted}
        open={modalOpendelete}
        handleClose={modalDeleteHandleClose}
        id={selectedItemUpdate?.id}
        loading={loadingDel}
      />
      <CreateStatusModal
        fetchApi={fetchApi}
        newItem={newItem}
        setNewItem={setNewItem}
        setOpen={setModalOpen}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
        setFormSuccess={setFormSuccess}
      />
      <UpdateStatusModal
        selectedItemUpdate={selectedItemUpdate}
        fetchApi={fetchApi}
        newItem={newUpdateItem}
        setNewItem={setNewItem}
        setOpen={modalUpdateHandleOpen}
        open={modalUpdateOpen}
        handleClose={modalHandleUpdateClose}
        handleOpen={modalUpdateHandleOpen}
      > */}

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
        PageSize={limitPorPage}
        page={statusData.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={statusData.total}
      />
      {/*       </UpdateStatusModal> */}
    </>
  );
};
export default Status;
