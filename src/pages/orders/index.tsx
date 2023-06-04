import { useState, useEffect, useMemo, useContext } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";
import { servicesApi } from "@/services/api/servicesApi";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import useModal from "@/hook/useModal";
import { useSearchField } from "@/hook/useSearchField";
import { ToastError } from "@/components/Toast/ToastError";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import DeleteServiceModal from "@/components/Modal/servicesPage/Service/DeleteServiceModal";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import UpdateServiceModal from "@/components/Modal/servicesPage/Service/UpdateServiceModal";
import { useGetFetchOrders } from "@/hook/Orders/useGetFetchOrders";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { CreateOrderModal } from "@/components/Modal/orderPage/CreateOrderModal";
import { FormRegisterCostumerProvider } from "@/contexts";

const Orders = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  //Form Sucess and Error
  const { setFormSuccess, formSuccess, errorMessage, setErrorMessage, messageForm, setMessageForm } =
    useContext(FormSucessOrErrorContext);

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
  const { currentPage, fetchApi, loading, ordersData, setCurrentPage } = useGetFetchOrders();

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
      <FormRegisterCostumerProvider fetchApi={fetchApi}>
        <ToastError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
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
        <CreateOrderModal
          open={modalOpen}
          handleClose={modalHandleClose}
          handleOpen={modalHandleOpen}
          setOpen={modalHandleOpen}
        >
          <UpdateServiceModal
            selectedItemUpdate={selectedItemUpdate}
            fetchApi={fetchApi}
            setOpen={setModalUpdateOpen}
            open={modalUpdateOpen}
            handleClose={modalHandleUpdateClose}
            handleOpen={modalUpdateHandleOpen}
          >
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
              rows={ordersData.orders}
              columns={columns}
              PageSize={limitPorPage}
              page={ordersData.Page}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCount={ordersData.Total}
            />
          </UpdateServiceModal>
        </CreateOrderModal>
      </FormRegisterCostumerProvider>
    </>
  );
};

export default Orders;
