import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";

import { servicesApi } from "@/services/api/servicesApi";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage/columnConfig";
import CreateServiceModal from "@/components/Modal/servicesPage/CreateServiceModal";
import UpdateServiceModal from "@/components/Modal/servicesPage/UpdateServiceModal";

//Criar Toast

export interface IServices {
  _id?: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt?: string;
}

const Estados = () => {
  const { debouse } = useDebouse(5000);
  const [servicesData, setServicesData] = useState<IServices[]>([]);
  const [newItem, setNewService] = useState(false);
  const [newUpdateItem, setNewUpdateService] = useState(false);

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

  const theme = useTheme();

  const search = useMemo(() => {
    return "limpeza";
  }, []);

  const fetchApi = (search = "", limit?: number, page?: number) => {
    servicesApi.getAllServices(search).then((data) => {
      setServicesData(data.data.service);
      console.log(data.data.service);
    });
  };

  const columns = columnsDataGrid(theme, fetchApi, modalUpdateHandleOpen, setSelectedItemUpdate);

  useEffect(() => {
    fetchApi(search);
  }, [search]);

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
          <DataGridLayout rows={servicesData} columns={columns} PageSize={10} />

          <Box>
            <Typography variant="h1" fontWeight={600} marginTop={6}>
              Status
            </Typography>
          </Box>
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
            <Button size="medium" variant="contained" sx={{ borderRadius: 3 }}>
              Novo
            </Button>
          </Stack>
          <DataGridLayout rows={servicesData} columns={columns} PageSize={4} />
        </UpdateServiceModal>
      </CreateServiceModal>
    </>
  );
};

export default Estados;
