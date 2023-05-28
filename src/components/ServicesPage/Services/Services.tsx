import { useState, useEffect, useMemo, useContext } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import { useDebouse } from "@/hook";
import { servicesApi } from "@/services/api/servicesApi";
import { FormSucessOrErrorContext } from "@/contexts/formSuccessOrErrorContext";
import { columnsDataGrid } from "@/components/DataGrid/utils/servicePage/columnConfig";
import CreateServiceModal from "@/components/Modal/servicesPage/Service/CreateServiceModal";
import UpdateServiceModal from "../../Modal/servicesPage/Service/UpdateServiceModal";
import DeleteModal from "../../Modal/deleteModal";
import { ToastSuccess } from "../../Toast/ToastSuccess";
import { ToastError } from "../../Toast/ToastError";
import useModal from "@/hook/useModal";
import useApiRequest from "@/hook/useApiGet";
import DeleteServiceModal from "@/components/Modal/servicesPage/Service/DeleteServiceModal";

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

  const [newUpdateItem, setNewUpdateService] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItemUpdate, setSelectedItemUpdate] = useState("" || Object);

  const { setFormSuccess, formSuccess, setFormSucessoValue, errorMessage, setErrorMessageValue, setErrorMessage } =
    useContext(FormSucessOrErrorContext);
  const [messageForm, setMessageForm] = useState<string | undefined>(undefined);

  //inputSearch
  const search = useMemo(() => {
    return searchField;
  }, [searchField]);

  const { modals, modalActions, modalSets } = useModal();
  const { modalOpen, modalUpdateOpen, modalOpendelete } = modals;
  const {
    modalHandleOpen,
    modalHandleClose,
    modalUpdateHandleOpen,
    modalHandleUpdateClose,
    modalDeleteHandleOpen,
    modalDeleteHandleClose,
  } = modalActions;

  const { setModalOpen, setModalUpdateOpen, setModalOpenDelete } = modalSets;

  //Get Api
  const { loading, error, request } = useApiRequest();
  const fetchApi = async (search = "", page?: number, limit?: number) => {
    debouse(async () => {
      let currentPage = page;

      if (newUpdateItem === true) {
        currentPage = 1;
      }
      if (page === 0 && currentPage) {
        setCurrentPage(currentPage + 1);
      }
      try {
        const data = await request(servicesApi.getAllServices, search, page, limit);
        setServicesData(data);

        console.log(data);
      } catch (error: any) {
        console.log(error.response);
        setServicesData({ Total: 0, Page: 0, limit: 0, service: [] });
      }
    });
  };

  //Config Grid
  const limitPorPage = 10;
  const columns = columnsDataGrid(theme, modalUpdateHandleOpen, setSelectedItemUpdate, modalDeleteHandleOpen);

  useEffect(() => {
    if (search !== "") {
      fetchApi(search, 1, limitPorPage);
      return setCurrentPage(0);
    }
    fetchApi(search, currentPage + 1, limitPorPage);
  }, [search, currentPage]);

  useEffect(() => {
    setFormSuccess(false);
  }, [formSuccess, setFormSucessoValue]);

  return (
    <>
      <ToastError
        errorMessage={errorMessage}
        setErrorMessageValue={setErrorMessageValue}
        setErrorMessage={setErrorMessage}
      />
      <ToastSuccess formSuccess={formSuccess} setFormSucessoValue={setFormSucessoValue} alertSuccess={messageForm} />

      <DeleteServiceModal
        fetchApi={fetchApi}
        selectedItemUpdate={selectedItemUpdate}
        setFormSucessoValue={setFormSucessoValue}
        setErrorMessageValue={setErrorMessageValue}
        setMessageForm={setMessageForm}
        modalOpendelete={modalOpendelete}
        modalDeleteHandleClose={modalDeleteHandleClose}
        setModalOpenDelete={setModalOpenDelete}
        modalDeleteHandleOpen={modalDeleteHandleOpen}
      />
      <CreateServiceModal
        fetchApi={fetchApi}
        setOpen={setModalOpen}
        open={modalOpen}
        handleClose={modalHandleClose}
        handleOpen={modalHandleOpen}
        setMessageForm={setMessageForm}
        setFormSucessoValue={setFormSucessoValue}
      >
        <UpdateServiceModal
          selectedItemUpdate={selectedItemUpdate}
          fetchApi={fetchApi}
          newItem={newUpdateItem}
          setNewService={setNewUpdateService}
          setOpen={setModalUpdateOpen}
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
    </>
  );
};

export default Services;
