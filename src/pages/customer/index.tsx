import { useEffect, useMemo, useState } from "react";

import { Button, Stack, TextField, useTheme } from "@mui/material";

import { DataGridLayout, HeaderLayout } from "@/components";
import { ColumnsDataGrid } from "@/components/DataGrid/utils/costumerPage/costumerColumnConfig";

import useModal from "@/hook/useModal";
import { RootCostumer } from "../../../types/costumer";
import { FormCrudCostumer } from "@/components/Modal/costumerPage/FormCrudCostumer";
import { costumersApi } from "@/services/api/costumersApi";

export default function Client() {
  //Theme
  const theme = useTheme();

  const [searchField, setSearchField] = useState("");
  const [selectedItem, setSelectedItem] = useState("" || Object);
  const [costumerData, setCostumersData] = useState<RootCostumer>({ Total: 0, Page: 0, limit: 0, customer: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(false);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen } = modalActions;

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

    const res = await costumersApi.getAllCostumers(filter, page, limit);
    if (res instanceof Error) {
      return new Error("Ocorreu um Erro na busca");
    }
    setCostumersData(res.data);
  }

  //inputSearch
  const search = useMemo(() => {
    return searchField;
  }, [searchField]);

  useEffect(() => {
    if (search !== "") {
      fetchApi(search, 1, limitPorPage);
      return setCurrentPage(0);
    }
    fetchApi(search, currentPage + 1, limitPorPage);
  }, [search, currentPage]);

  return (
    <>
      <FormCrudCostumer fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectedItem} />

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
        page={costumerData?.Page}
        totalCount={costumerData?.Total}
        rows={costumerData?.customer}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        columns={columns}
        PageSize={limitPorPage}
      />
    </>
  );
}
