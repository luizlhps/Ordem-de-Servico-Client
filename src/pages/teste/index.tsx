import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";
import { adminPanel } from "@/services/api/admin";
import { constumersApi } from "@/services/api/costumersApi";
import { servicesApi } from "@/services/api/servicesApi";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage";
import TransitionsModal from "@/components/Modal";

export interface IServices {
  _id: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

const Estados = () => {
  const { debouse } = useDebouse(5000);
  const [servicesData, setServicesData] = useState<IServices[]>([]);

  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => setModalOpen(false);

  const theme = useTheme();

  const columns = columnsDataGrid(theme);

  useEffect(() => {
    servicesApi.getAllServices().then((data) => {
      setServicesData(data.data);
    });
    constumersApi.getAllCostumers().then((data) => {
      console.log(data.data);
    });

    adminPanel.getAdmin();
  }, []);

  return (
    <>
      <TransitionsModal
        setOpen={setModalOpen}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
      />
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
        <Button size="medium" variant="contained" sx={{ borderRadius: 3 }}>
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
        <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 3 }}>
          Novo
        </Button>
      </Stack>
      <DataGridLayout rows={servicesData} columns={columns} PageSize={4} />
    </>
  );
};

export default Estados;
