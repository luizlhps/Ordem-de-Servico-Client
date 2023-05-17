import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";

import { statusApi } from "@/services/api/statusApi";
import CreateStatusModal from "../Modal/servicesPage/Status/CreateStatusModal";
import UpdateStatusModal from "../Modal/servicesPage/Status/UpdateStatusModal";
import { statusColumnsDataGrid } from "../DataGrid/utils/servicePage/statusColumnConfig";

export interface IStatus {
  _id?: string;
  id: number;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt?: string;
}

const Status = () => {
  const theme = useTheme();

  const { debouse } = useDebouse(1000);
  const [searchField, setSearchField] = useState("");
  const [StatusData, setStatusData] = useState<IStatus[]>([]);
  const [newItem, setNewstatus] = useState(false);
  const [newUpdateItem, setNewUpdateService] = useState(false);

  //modal Create
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => {
    setModalOpen(false);
    setNewstatus(false);
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

  const fetchApi = (search = "", limit?: number, page?: number) => {
    debouse(() => {
      statusApi.getAllStatus(search).then((data) => {
        setStatusData(data.data);
      });
    });
  };

  const columns = statusColumnsDataGrid(theme, fetchApi, modalUpdateHandleOpen, setSelectedItemUpdate);

  useEffect(() => {
    fetchApi(search);
  }, [search]);

  return (
    <>
      <CreateStatusModal
        fetchApi={fetchApi}
        newItem={newItem}
        setNewstatus={setNewstatus}
        setOpen={setModalOpen}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
      >
        <UpdateStatusModal
          selectedItemUpdate={selectedItemUpdate}
          fetchApi={fetchApi}
          newItem={newUpdateItem}
          setNewService={setNewstatus}
          setOpen={setModaUpdatelOpen}
          open={modalUpdateOpen}
          handleClose={modalHandleUpdateClose}
          handleOpen={modalUpdateHandleOpen}
        >
          <Typography variant="h1" marginTop={7}>
            Serviços
          </Typography>

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
          {/*     <DataGridLayout rows={StatusData} columns={columns} PageSize={10} /> */}
        </UpdateStatusModal>
      </CreateStatusModal>
    </>
  );
};

export default Status;
