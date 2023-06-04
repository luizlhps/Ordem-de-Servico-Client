import React, { useContext, useEffect, useMemo, useState } from "react";

import { Alert, Button, Snackbar, SnackbarOrigin, Stack, TextField, useTheme } from "@mui/material";
import { useRouter } from "next/router";

import { DataGridLayout, HeaderLayout } from "@/components";
import { ColumnsDataGrid } from "@/components/DataGrid/utils/costumerPage/costumerColumnConfig";
import { ICostumerData, constumersApi } from "@/services/api/costumersApi";
import DeleteModal from "@/components/Modal/deleteModal";

import { useDebouse } from "@/hook";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import { ToastSuccess } from "@/components/Toast/ToastSuccess";
import { ToastError } from "@/components/Toast/ToastError";
import { OrdensSVG } from "../../../public/icon/SVGS/IconsSVG";
import { CreateCostumerModal } from "@/components/Modal/costumerPage/CreateCostumerModal";
import useModal from "@/hook/useModal";
import { FormRegisterCostumerProvider, FormUpdateCostumerProvider } from "@/contexts";
import { UpdateCostumerModal } from "@/components/Modal/costumerPage/UpdateCostumerModal";

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
  const { debouse } = useDebouse();
  //Theme
  const theme = useTheme();

  const [searchField, setSearchField] = useState("");
  const [selectedItem, setSelectedItem] = useState("" || Object);
  const [costumerData, setCostumersData] = useState<ICostumerData>({ Total: 0, Page: 0, limit: 0, customer: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(false);

  //context
  const { setFormSuccess, formSuccess, errorMessage, setErrorMessage } = useContext(FormSucessOrErrorContext);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { setModalOpen } = modalSets;
  const { modalOpen, modalUpdateOpen, modalOpendelete } = modals;
  const {
    modalHandleOpen,
    modalHandleClose,
    modalUpdateHandleOpen,
    modalHandleUpdateClose,
    modalDeleteHandleOpen,
    modalDeleteHandleClose,
  } = modalActions;

  const limitPorPage = 10;
  const columns = ColumnsDataGrid(theme, setSelectedItem, modalDeleteHandleOpen, modalUpdateHandleOpen);

  function handleClickLink() {
    modalHandleOpen();
  }

  async function fetchApi(filter?: string, page?: number, limit?: number) {
    let currentPage = page;
    if (page === 0 && currentPage) {
      setCurrentPage(currentPage + 1);
    }

    const res = await constumersApi.getAllCostumers(filter, page, limit);
    if (res instanceof Error) {
      return new Error("Ocorreu um Erro na busca");
    }
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
      } catch (error) {
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

  useEffect(() => {
    setFormSuccess(false);
  }, [formSuccess, setFormSuccess]);

  return (
    <>
      <FormRegisterCostumerProvider fetchApi={fetchApi}>
        <FormUpdateCostumerProvider fetchApi={fetchApi} CostumerID={selectedItem._id} CostumerData={selectedItem}>
          <ToastError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
          <ToastSuccess
            formSuccess={formSuccess}
            setFormSuccess={setFormSuccess}
            alertSuccess="Cliente atualizado com sucesso!!"
          />

          <CreateCostumerModal
            open={modalOpen}
            handleClose={modalHandleClose}
            handleOpen={modalHandleOpen}
            setOpen={modalHandleOpen}
          >
            <UpdateCostumerModal
              open={modalUpdateOpen}
              handleClose={modalHandleUpdateClose}
              handleOpen={modalUpdateHandleOpen}
              setOpen={modalHandleOpen}
            >
              <DeleteModal
                fetchApi={fetchApi}
                open={modalOpendelete}
                setOpen={setModalOpen}
                handleClose={modalDeleteHandleClose}
                handleOpen={modalDeleteHandleOpen}
                HandleDeleted={HandleDeleted}
                selectedItemUpdate={selectedItem}
              />
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
            </UpdateCostumerModal>
          </CreateCostumerModal>
        </FormUpdateCostumerProvider>
      </FormRegisterCostumerProvider>
    </>
  );
}
