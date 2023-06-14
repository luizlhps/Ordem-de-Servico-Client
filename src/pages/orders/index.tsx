import { useState, useEffect, useContext } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import useModal from "@/hook/useModal";
import { useSearchField } from "@/hook/useSearchField";
import { ToastError } from "@/components/Toast/ToastError";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import DeleteServiceModal from "@/components/Modal/servicesPage/Service/DeleteServiceModal";
import { useGetFetchOrders } from "@/hook/Orders/useGetFetchOrders";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { FormRegisterOrderProvider } from "@/contexts/formRegisterOrderContext";
import { CreateOrderModal } from "@/components/Modal/orderPage/CreateOrderModal";
import { UpdateOrderModal } from "@/components/Modal/orderPage/UpdateOrderModal";
import { FormUpdateOrderContext, FormUpdateOrderProvider } from "@/contexts/formUpdateOrderContext";

const Orders = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState("" || Object);

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
  const columns = columnsDataGrid(theme, modalUpdateHandleOpen, setselectItem, modalDeleteHandleOpen);

  let ordersFormatted = ordersData.orders.map((obj: any) => {
    const values: any[] = [];
    if (obj.equipment) values.push(obj.equipment);
    if (obj.brand && !values.includes(obj.brand)) values.push(obj.brand);
    if (obj.model && !values.includes(obj.model)) values.push(obj.model);

    let uniqueChars: any[] = [];
    values.forEach((obj) => {
      console.log(obj);
      if (!uniqueChars.includes(obj)) {
        uniqueChars.push(obj);
      }
      return uniqueChars;
    });

    return (obj.equipmentField = uniqueChars.join(" "));
  });

  console.log(ordersData.orders);
  return (
    <>
      <FormRegisterOrderProvider fetchApi={fetchApi}>
        <FormUpdateOrderProvider fetchApi={fetchApi} orderID={selectItem._id} orderData={selectItem}>
          <ToastError errorMessage={errorMessage} formError={formError} setFormError={setFormError} />
          <ToastSuccess formSuccess={formSuccess} setFormSuccess={setFormSuccess} alertSuccess={messageForm} />

          <DeleteServiceModal
            fetchApi={fetchApi}
            selectedItem={selectItem}
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
            <UpdateOrderModal
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
            </UpdateOrderModal>
          </CreateOrderModal>
        </FormUpdateOrderProvider>
      </FormRegisterOrderProvider>
    </>
  );
};

export default Orders;
