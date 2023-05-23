import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";

import { TStatusData, statusApi } from "@/services/api/statusApi";
import CreateStatusModal from "../Modal/servicesPage/Status/CreateStatusModal";
import UpdateStatusModal from "../Modal/servicesPage/Status/UpdateStatusModal";
import { statusColumnsDataGrid } from "../DataGrid/utils/servicePage/statusColumnConfig";
import DeleteModal from "../Modal/deleteModal";

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

  const { debouse } = useDebouse(300);
  const [searchField, setSearchField] = useState("");
  const [statusData, setStatusData] = useState<TStatusData>({ total: 0, page: 0, limit: 0, status: [] });
  const [newItem, setNewItem] = useState(false);
  const [newUpdateItem, setNewUpdateItem] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  const [loading, setLoading] = useState(false);

  //modal Create
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => {
    setModalOpen(false);
    setNewItem(false);
  };

  //modal Update
  const [modalUpdateOpen, setModaUpdatelOpen] = useState(false);
  const modalUpdateHandleOpen = () => setModaUpdatelOpen(true);
  const modalHandleUpdateClose = () => {
    setModaUpdatelOpen(false);
    setNewUpdateItem(false);
  };

  //Modal Delete
  const [modalOpendelete, setModalOpendelete] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const modalDeleteHandleOpen = () => setModalOpendelete(true);
  const modalDeleteHandleClose = () => {
    setModalOpendelete(false);
  };

  //inputSearch
  const search = useMemo(() => {
    return searchField;
  }, [searchField]);

  //Get Api
  const fetchApi = async (search = "", page?: number, limit?: number) => {
    debouse(async () => {
      setLoading(true);

      try {
        let currentPage = page;

        if (newUpdateItem === true) {
          currentPage = 1;
        }
        if (page === 0 && currentPage) {
          setCurrentPage(currentPage + 1);
        }
        const data = await statusApi.getAllStatus(search, currentPage, limit);

        if (data instanceof Error) {
          return console.error(data.message);
        } else {
          setStatusData(data);
        }
      } catch (error) {
        console.log(error);
        setStatusData({ total: 0, page: 0, limit: 0, status: [] });
      }
      setLoading(false);
    });
  };

  //Delete Api
  const HandleDeleted = async (id: string) => {
    try {
      await statusApi.deleteStatus(id);
      fetchApi();
      modalDeleteHandleClose();
      setDeleteError(false);
    } catch (error) {
      setDeleteError(true);
      console.log(error);
    }
  };

  //Config Datagrid
  const limitPorPage = 5;
  const columns = statusColumnsDataGrid(
    theme,
    fetchApi,
    modalUpdateHandleOpen,
    setSelectedItemUpdate,
    modalDeleteHandleOpen
  );

  useEffect(() => {
    if (search !== "") {
      fetchApi(search, 1, limitPorPage);
      return setCurrentPage(0);
    }
    fetchApi(search, currentPage + 1, limitPorPage);
  }, [search, currentPage]);

  return (
    <>
      <DeleteModal
        fetchApi={fetchApi}
        open={modalOpendelete}
        setOpen={setModalOpendelete}
        handleClose={modalDeleteHandleClose}
        handleOpen={modalDeleteHandleOpen}
        HandleDeleted={HandleDeleted}
        selectedItemUpdate={selectedItemUpdate}
        deleteError={deleteError}
      >
        <CreateStatusModal
          fetchApi={fetchApi}
          newItem={newItem}
          setNewItem={setNewItem}
          setOpen={setModalOpen}
          open={modalOpen}
          handleClose={modalHandleClose}
          handleOpen={modalHandleOpen}
        >
          <UpdateStatusModal
            selectedItemUpdate={selectedItemUpdate}
            fetchApi={fetchApi}
            newItem={newUpdateItem}
            setNewItem={setNewItem}
            setOpen={setModaUpdatelOpen}
            open={modalUpdateOpen}
            handleClose={modalHandleUpdateClose}
            handleOpen={modalUpdateHandleOpen}
          >
            <Typography variant="h1" marginTop={7}>
              Status
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
            <DataGridLayout
              loading={loading}
              rows={statusData.status}
              columns={columns}
              PageSize={limitPorPage}
              page={statusData.page}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCount={statusData.total}
            />
          </UpdateStatusModal>
        </CreateStatusModal>
      </DeleteModal>
    </>
  );
};
export default Status;
