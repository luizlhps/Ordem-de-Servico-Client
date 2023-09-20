import { useState } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import useModal from "@/hook/useModal";
import { useSearchField } from "@/hook/useSearchField";
import { officialsColumnConfig } from "@/components/DataGrid/utils/officialsColumnConfig";
import { IUser } from "../../../types/users";
import { useGetFetchPermissions } from "@/hook/useGetFetchPermissions";
import { FormCrudPermissions } from "@/components/PermissionsLayout/FormCrudPermissions";
import { AuthGroup } from "../../../types/authGroup";
import { permissionsColumnConfig } from "@/components/DataGrid/utils/permissionsColumnConfig";

const Permissions = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  const [selectItem, setselectItem] = useState<AuthGroup | undefined>(undefined);

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const { currentPage, fetchApi, loading, permissionsData, setCurrentPage } = useGetFetchPermissions();

  //Search
  const { searchHandle, searchField } = useSearchField({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
  });

  //Config Grid
  const columns = permissionsColumnConfig(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  return (
    <>
      <FormCrudPermissions fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectItem} />
      <HeaderLayout title="Cargos e permissões" subTitle="Bem-vindo a área de cargos e permissões" />
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2}>
        <TextField
          value={searchField || ""}
          onChange={searchHandle}
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
        rows={permissionsData?.authGroup}
        columns={columns}
        PageSize={limitPorPage}
        page={permissionsData?.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={permissionsData?.total}
      />
    </>
  );
};

export default Permissions;
