import { useState, useEffect, useMemo, useContext } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";
import { servicesApi } from "@/services/api/servicesApi";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage/columnConfig";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import UpdateServiceModal from "../../Modal/servicesPage/Service/UpdateServiceModal";
import DeleteModal from "../../Modal/deleteModal";
import { ToastSuccess } from "../../Toast/ToastSuccess";
import { ToastError } from "../../Toast/ToastError";
import useModal from "@/hook/useModal";
import useApiRequest from "@/hook/useApiGet";
import DeleteServiceModal from "@/components/Modal/servicesPage/Service/DeleteServiceModal";
import { useSearchField } from "../../../hook/useSearchField";
import { useGetFetchService } from "@/hook/ServicePage/useGetFetchService";

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
  const { currentPage, fetchApi, loading, servicesData, setCurrentPage } = useGetFetchService();

  //Search
  const { searchHandle, searchField } = useSearchField({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
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

      <DeleteServiceModal
        fetchApi={fetchApi}
        selectedItemUpdate={selectedItemUpdate}
        setFormSucessoValue={setFormSuccess}
        setErrorMessageValue={setErrorMessage}
        setMessageForm={setMessageForm}
        modalOpendelete={modalOpendelete}
        modalDeleteHandleClose={modalDeleteHandleClose}
        setModalOpenDelete={setModalOpenDelete}
        modalDeleteHandleOpen={modalDeleteHandleOpen}
      />
      <CreateServiceModal
        fetchApi={fetchApi}
        setOpen={setModalOpen}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
        setMessageForm={setMessageForm}
        setFormSucessoValue={setFormSuccess}
      >
        <UpdateServiceModal
          selectedItemUpdate={selectedItemUpdate}
          fetchApi={fetchApi}
          setOpen={setModalUpdateOpen}
          open={modalUpdateOpen}
          handleClose={modalHandleUpdateClose}
          handleOpen={modalUpdateHandleOpen}
        >
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
            page={servicesData.Page}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={servicesData.Total}
          />
        </UpdateServiceModal>
      </CreateServiceModal>
    </>
  );
};

export default Services;
