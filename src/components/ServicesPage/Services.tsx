import { useState, useEffect, useContext } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage/columnConfig";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import useModal from "@/hook/useModal";
import { useSearchField } from "../../hook/useSearchField";
import { useGetFetchService } from "@/hook/useGetFetchService";
import { FormCrudServices } from "../ServicesLayout/FormCrudServices";

const Services = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  //Form Sucess and Error
  const {
    setFormSuccess,
    formSuccess,
    errorMessage,
    setErrorMessage,
    messageForm,
    setMessageForm,
    formError,
    setFormError,
  } = useContext(FormSucessOrErrorContext);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { modalOpen, modalUpdateOpen, modalOpendelete } = modals;
  const {
    modalHandleOpen,
    modalHandleClose,
    modalUpdateHandleOpen,
    modalHandleUpdateClose,
    modalDeleteHandleOpen,
    modalDeleteHandleClose,
  } = modalActions;

  const { setModalOpen, setModalUpdateOpen, setModalOpenDelete } = modalSets;

  //Api
  const { currentPage, fetchApi, loading, servicesData, setCurrentPage, searchField, setSearchField } =
    useGetFetchService();

  //Search
  const { searchHandle } = useSearchField({
    setCurrentPage,
    searchField,
    setSearchField,
  });

  useEffect(() => {
    setFormSuccess(false);
  }, [formSuccess]);

  //Config Grid
  const columns = columnsDataGrid(theme, modalUpdateHandleOpen, setSelectedItemUpdate, modalDeleteHandleOpen);

  return (
    <>
      <ToastError errorMessage={errorMessage} formError={formError} setFormError={setFormError} />
      <ToastSuccess formSuccess={formSuccess} setFormSuccess={setFormSuccess} alertSuccess={messageForm} />

      <FormCrudServices
        fetchApi={fetchApi}
        modalActions={modalActions}
        modals={modals}
        selectItem={selectedItemUpdate}
      />

      <HeaderLayout title="Serviços" subTitle="Bem-vindo a área de serviços" />

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
        rows={servicesData.service}
        columns={columns}
        PageSize={limitPorPage}
        page={servicesData.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={servicesData.total}
      />
    </>
  );
};

export default Services;
