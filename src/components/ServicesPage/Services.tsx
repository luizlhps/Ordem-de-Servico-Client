import { CustomPagination, DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";

import { servicesApi } from "@/services/api/servicesApi";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage/columnConfig";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import UpdateServiceModal from "../Modal/servicesPage/Service/UpdateServiceModal";

export interface IService {
  deleted: boolean;
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}
export interface IData {
  Total: number;
  Page: number;
  limit: number;
  service: IService[] | [];
}

const Services = () => {
  const theme = useTheme();

  const { debouse } = useDebouse(300);
  const [searchField, setSearchField] = useState("");
  const [servicesData, setServicesData] = useState<IData>({ Total: 0, Page: 0, limit: 0, service: [] });
  const [newItem, setNewService] = useState(false);
  const [newUpdateItem, setNewUpdateService] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log(currentPage);

  const limitPorPage = 10;

  //modal Create
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => {
    setModalOpen(false);
    setNewService(false);
  };

  //modal Update
  const [modalUpdateOpen, setModaUpdatelOpen] = useState(false);
  const modalUpdateHandleOpen = () => setModaUpdatelOpen(true);
  const [selectedItemUpdate, setSelectedItemUpdate] = useState("");
  const modalHandleUpdateClose = () => {
    setModaUpdatelOpen(false);
    setNewUpdateService(false);
  };

  //inputSearch
  const search = useMemo(() => {
    return searchField;
  }, [searchField]);

  const fetchApi = (search = "", page = 1, limit = 5) => {
    setLoading(true);
    debouse(() => {
      let currentPage = page;
      if (page === 0) {
        setCurrentPage(currentPage + 1);
      }
      if (search !== "") {
        currentPage = 1;
      }

      servicesApi
        .getAllServices(search, currentPage, limit)
        .then((data: { data: IData }) => {
          setServicesData(data.data);
        })
        .catch((error) => {
          console.log(error.response);
          setServicesData({ Total: 0, Page: 0, limit: 0, service: [] });
        });
      setLoading(false);
    });
  };

  const columns = columnsDataGrid(theme, fetchApi, modalUpdateHandleOpen, setSelectedItemUpdate);

  useEffect(() => {
    fetchApi(search, currentPage + 1, limitPorPage);
  }, [search, currentPage]);

  return (
    <>
      <CreateServiceModal
        fetchApi={fetchApi}
        newItem={newItem}
        setNewService={setNewService}
        setOpen={setModalOpen}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
      >
        <UpdateServiceModal
          selectedItemUpdate={selectedItemUpdate}
          fetchApi={fetchApi}
          newItem={newUpdateItem}
          setNewService={setNewUpdateService}
          setOpen={setModaUpdatelOpen}
          open={modalUpdateOpen}
          handleClose={modalHandleUpdateClose}
          handleOpen={modalUpdateHandleOpen}
        >
          <HeaderLayout title="Serviços" subTitle="Bem-vindo a área de serviços" />

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
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
