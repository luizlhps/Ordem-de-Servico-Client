import React, { useContext, useEffect, useMemo, useState } from "react";

import { Alert, Button, Snackbar, SnackbarOrigin, Stack, TextField, useTheme } from "@mui/material";
import { useRouter } from "next/router";

import { DataGridLayout, HeaderLayout } from "@/components";
import { ColumnsDataGrid } from "@/components/DataGrid/utils/costumerPage/costumerColumnConfig";
import { constumersApi } from "@/services/api/costumersApi";
import DeleteModal from "@/components/Modal/deleteModal";

import { useDebouse } from "@/hook";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import { ToastError } from "@/components/ToastError";

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
  const { debouse } = useDebouse();
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
  const columns = ColumnsDataGrid(theme, setSelectedItem, modalDeleteHandleOpen);

  //Ao clicar no botton ele vai para a pagina de cadastro de cliente
  function handleClickLink() {
    router.push("/clients/new");
  }

  async function fetchApi(filter?: string, page?: number, limit?: number) {
    let currentPage = page;

    if (page === 0 && currentPage) {
      setCurrentPage(currentPage + 1);
    }

    const res = await constumersApi.getAllCostumers(filter, page, limit);
    setCostumersData(res.data);
  }

  //inputSearch
  const search = useMemo(() => {
    return searchField;
  }, [searchField]);

  //Delete Api
  const HandleDeleted = async (id: string) => {
    debouse(async () => {
      try {
        await constumersApi.deleteCostumer(id);
        fetchApi();
        modalDeleteHandleClose();
        setDeleteError(false);
      } catch (error) {
        setDeleteError(true);
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (search !== "") {
      fetchApi(search, 1, limitPorPage);
      return setCurrentPage(0);
    }
    fetchApi(search, currentPage + 1, limitPorPage);
  }, [search, currentPage]);

  /////////

  const { formError, formSuccess, setFormSucessoValue, errorMessage, setErrorMessageValue } =
    useContext(FormSucessOrErrorContext);

  return (
    <>
      <ToastError
        errorMessage={errorMessage}
        formSuccess={formSuccess}
        setErrorMessageValue={setErrorMessageValue}
        setFormSucessoValue={setFormSucessoValue}
      />

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
