import { useState } from "react";

import { useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import useModal from "@/hook/useModal";
import { useSearchField } from "@/hook/useSearchField";
import { useGetFetchOfficials } from "@/hook/useGetFetchOfficials";
import { officialsColumnConfig } from "@/components/DataGrid/utils/officialsColumnConfig";
import { IUser } from "../../../types/users";
import { FormCrudOfficial } from "@/components/OfficialsLayout/FormCrudOfficial";
import { MenuSelectFilterDefault } from "@/components/MenuSelectFilter";

const Officials = () => {
  const theme = useTheme();

  const [selectItem, setselectItem] = useState<IUser | undefined>(undefined);

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const {
    currentPage,
    fetchApi,
    loading,
    officialsData,
    setCurrentPage,
    searchField,
    setRangeDateFilter,
    setSearchField,
    limitPerPage,
  } = useGetFetchOfficials();

  //Search
  const { searchHandle } = useSearchField({ searchField, setCurrentPage, setSearchField });

  //Config Grid
  const columns = officialsColumnConfig(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  return (
    <>
      <FormCrudOfficial fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectItem} />
      <HeaderLayout title="Funcionários" subTitle="Bem-vindo a área de funcionários" />
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
        <Stack flexDirection={"row"} gap={2}>
          <MenuSelectFilterDefault setRangeDateFilter={setRangeDateFilter} />
          <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 2 }}>
            Novo
          </Button>
        </Stack>
      </Stack>
      <DataGridLayout
        loading={loading}
        rows={officialsData?.user}
        columns={columns}
        PageSize={limitPerPage}
        page={officialsData?.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={officialsData?.total}
      />
    </>
  );
};

export default Officials;
