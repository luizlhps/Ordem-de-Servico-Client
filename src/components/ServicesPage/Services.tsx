import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";

import { servicesApi } from "@/services/api/servicesApi";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage/columnConfig";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import UpdateServiceModal from "../Modal/servicesPage/Service/UpdateServiceModal";
import DeleteModal from "../Modal/deleteModal";

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
  service: IService[] | [] | "";
}

const Services = () => {
  const theme = useTheme();

  const { debouse } = useDebouse(300);
  const [searchField, setSearchField] = useState("");
  const [servicesData, setServicesData] = useState<IData>({ Total: 0, Page: 0, limit: 0, service: [] || "" });

  const [newItem, setNewService] = useState(false);
  const [newUpdateItem, setNewUpdateService] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  const [loading, setLoading] = useState(false);

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
  const modalHandleUpdateClose = () => {
    setModaUpdatelOpen(false);
    setNewUpdateService(false);
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
  const fetchApi = (search = "", page?: number, limit?: number) => {
    setLoading(true);
    debouse(() => {
      let currentPage = page;

      if (newUpdateItem === true) {
        currentPage = 1;
      }
      if (page === 0 && currentPage) {
        setCurrentPage(currentPage + 1);
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

  //Delete Api
  const HandleDeleted = async (id: string) => {
    try {
      await servicesApi.deleteServices(id);
      fetchApi();
      modalDeleteHandleClose();
      setDeleteError(false);
    } catch (error) {
      setDeleteError(true);
      console.log(error);
    }
  };

  //Config Grid
  const limitPorPage = 10;
  const columns = columnsDataGrid(theme, fetchApi, modalUpdateHandleOpen, setSelectedItemUpdate, modalDeleteHandleOpen);

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
      </DeleteModal>
    </>
  );
};

export default Services;
