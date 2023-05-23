import react, { useEffect, useState } from "react";
import { DataGridLayout, HeaderLayout } from "@/components";
import { columnsDataGrid } from "@/components/DataGrid/utils/costumerPage/costumerColumnConfig";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { constumersApi } from "@/services/api/costumersApi";
import DeleteModal from "@/components/Modal/deleteModal";

export interface IData {
  Total: number;
  Page: number;
  limit: number;
  customer: ICustomer[] | [] | "";
}

export interface ICustomer {
  _id: string;
  id: number;
  name: string;
  email: string;
  contact: string;
  phone: string;
  cpfOrCnpj: string;
  telephone: string;
  address: IAddress[];
  orders: any[];
  createdAt: string;
  updatedAt: string;
}

export interface IAddress {
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  complement: string;
  _id: string;
}

export default function Client() {
  const router = useRouter();

  //Theme
  const theme = useTheme();

  const [searchField, setSearchField] = useState("");
  const [selectedItem, setSelectedItem] = useState("" || Object);
  const [costumerData, setCostumersData] = useState<IData>({ Total: 0, Page: 0, limit: 0, customer: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(false);

  //Modal Delete
  const [modalOpendelete, setModalOpendelete] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const modalDeleteHandleOpen = () => setModalOpendelete(true);
  const modalDeleteHandleClose = () => {
    setModalOpendelete(false);
  };

  const limitPorPage = 10;
  const columns = columnsDataGrid(theme, setSelectedItem, modalDeleteHandleOpen);

  console.log(selectedItem);

  //Ao clicar no botton ele vai para a pagina de cadastro de cliente
  function handleClickLink() {
    router.push("/clients/new");
  }

  async function fetchApi(filter?: string, page?: number, limit?: number) {
    const res = await constumersApi.getAllCostumers(filter, page, limit);
    setCostumersData(res.data);
  }

  //Delete Api
  const HandleDeleted = async (id: string) => {
    try {
      await constumersApi.deleteCostumer(id);
      fetchApi();
      modalDeleteHandleClose();
      setDeleteError(false);
    } catch (error) {
      setDeleteError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <DeleteModal
        fetchApi={fetchApi}
        open={modalOpendelete}
        setOpen={setModalOpendelete}
        handleClose={modalDeleteHandleClose}
        handleOpen={modalDeleteHandleOpen}
        HandleDeleted={HandleDeleted}
        selectedItemUpdate={selectedItem}
        deleteError={deleteError}
      >
        <HeaderLayout subTitle="Bem vindo a area ordem de serviço" title="Clientes" />
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <TextField
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
          <Button size="medium" variant="contained" sx={{ borderRadius: 3 }} onClick={handleClickLink}>
            Novo
          </Button>
        </Stack>
        <DataGridLayout
          loading={loading}
          page={costumerData.Page}
          totalCount={costumerData.Total}
          rows={costumerData.customer}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          columns={columns}
          PageSize={limitPorPage}
        />
      </DeleteModal>
    </>
  );
}
