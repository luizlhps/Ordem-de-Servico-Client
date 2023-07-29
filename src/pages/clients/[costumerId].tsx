import { DataGridLayout, HeaderLayout } from "@/components";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import useModal from "@/hook/useModal";
import { constumersApi } from "@/services/api/costumersApi";
import { useTheme } from "@emotion/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { TextField, Stack, Button, Icon, IconButton } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useGetCostumOrders } from "@/hook/useGetCostumOrders";
import { useSearchFieldWith_id } from "@/hook/useSearchFieldWith_Id";
import { useRouter } from "next/router";
import { FormCrudOrder } from "@/components/Modal/orderPage/FormCrudOrder";
import { IOrder } from "../../../types/order";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { ICostumer } from "../../../types/costumer";
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

function CostumerPageID({ costumer }: { costumer: ICostumer }) {
  const theme = useTheme();
  const router = useRouter();

  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<IOrder | undefined>(undefined);

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const { setCurrentPage, data, currentPage, fetchApi, loading, setData } = useGetCostumOrders({ costumer });

  //Search
  const { searchHandle, searchField } = useSearchFieldWith_id({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
    id: costumer._id,
  });

  //Config Grid
  const columns = columnsDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  if (!costumer) {
    return <p>Loading...</p>;
  }

  const BackHandle = () => {
    router.push("/clients");
  };

  const { name, id, orders } = costumer;

  return (
    <>
      <HeaderLayout title={`${name} # ${id}`} subTitle="Área de ordens de serviço do cliente" />
      <IconButton onClick={BackHandle} sx={{ marginTop: 2 }}>
        <Icon>arrow_back</Icon>
      </IconButton>
      <FormCrudOrder fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectItem} />

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
    </>
  );
}
export default CostumerPageID;
