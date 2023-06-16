import { DataGridLayout, HeaderLayout } from "@/components";
import { columnsDataGrid } from "@/components/DataGrid/utils/costumerPage/CostumerOrdersColumnConfig";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import DeleteServiceModal from "@/components/Modal/servicesPage/Service/DeleteServiceModal";
import UpdateServiceModal from "@/components/Modal/servicesPage/Service/UpdateServiceModal";
import { ToastError } from "@/components/Toast/ToastError";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import useModal from "@/hook/useModal";
import { constumersApi } from "@/services/api/costumersApi";
import { useTheme } from "@emotion/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { TextField, Stack, Button, Icon, IconButton } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useGetCostumOrders } from "@/hook/CostumOrders/useGetCostumOrders";
import { useSearchFieldWith_id } from "@/hook/useSearchFieldWith_Id";
import { CreateCostumerModal } from "@/components/Modal/costumerPage/CreateCostumerModal";
import { useRouter } from "next/router";

interface Params extends ParsedUrlQuery {
  costumerId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { costumerId } = context.params as Params;

  try {
    const costumer = await constumersApi.getById(costumerId);
    const data = costumer.data;

    return {
      props: {
        costumer: data,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar os dados do cliente:", error);
    return {
      notFound: true,
    };
  }
};

function CostumerPageID({ costumer }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const theme = useTheme();
  const router = useRouter();

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
  const { setCurrentPage, data, currentPage, fetchApi, loading, setData } = useGetCostumOrders();

  //Search
  const { searchHandle, searchField } = useSearchFieldWith_id({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
    id: costumer._id,
  });

  useEffect(() => {
    setFormSuccess(false);
  }, [formSuccess]);

  //Config Grid
  const columns = columnsDataGrid(theme, modalUpdateHandleOpen, setSelectedItemUpdate, modalDeleteHandleOpen);

  if (!costumer) {
    return <p>Loading...</p>;
  }

  const BackHandle = () => {
    router.push("/clients");
  };

  const { name, id, orders } = costumer;

  return (
    <>
      <ToastError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      <ToastSuccess formSuccess={formSuccess} setFormSuccess={setFormSuccess} alertSuccess={messageForm} />

      <DeleteServiceModal
        fetchApi={fetchApi}
        selectedItem={selectedItemUpdate}
        setFormSucessoValue={setFormSuccess}
        setErrorMessageValue={setErrorMessage}
        setMessageForm={setMessageForm}
        modalOpendelete={modalOpendelete}
        modalDeleteHandleClose={modalDeleteHandleClose}
        setModalOpenDelete={setModalOpenDelete}
        modalDeleteHandleOpen={modalDeleteHandleOpen}
      />
      <CreateCostumerModal
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
          <HeaderLayout title={`${name} # ${id}`} subTitle="Área de ordens de serviço do cliente" />
          <IconButton onClick={BackHandle} sx={{ marginTop: 2 }}>
            <Icon>arrow_back</Icon>
          </IconButton>

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
            rows={data.orders}
            columns={columns}
            PageSize={limitPorPage}
            page={data.page}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={data.total}
          />
        </UpdateServiceModal>
      </CreateCostumerModal>
    </>
  );
}
export default CostumerPageID;
