import { useState, useMemo } from "react";

import { Autocomplete, Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Typography, useTheme } from "@mui/material";

import { Button, Stack, TextField } from "@mui/material";
import { DataGridLayout, HeaderLayout } from "@/components";
import useModal from "@/hook/useModal";
import { useSearchField } from "@/hook/useSearchField";
import { useGetFetchOrders } from "@/hook/useGetFetchOrders";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { IOrder } from "../../../types/order";
import { FormCrudOrder } from "@/components/OrderLayout/FormCrudOrder";
import TuneIcon from "@mui/icons-material/Tune";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
const Orders = () => {
  const theme = useTheme();
  const limitPorPage = 10;

  //menuFilter
  const [selectItem, setselectItem] = useState<IOrder | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
  };

  //modal
  const { modals, modalActions } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewClose, modalViewHandleOpen } =
    modalActions;

  //Api
  const { currentPage, fetchApi, loading, ordersData, setCurrentPage } = useGetFetchOrders();

  //Search
  const { searchHandle, searchField } = useSearchField({
    limitPorPage: limitPorPage,
    setCurrentPage: setCurrentPage,
    currentPage: currentPage,
    fetchApi: fetchApi,
  });

  //Config Grid
  const columns = columnsDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  const ordersFormattedForDataGrid = useMemo(() => {
    return ordersData?.orders.map((obj: any) => {
      const values: any[] = [];
      if (obj.equipment) values.push(obj.equipment);
      if (obj.brand && !values.includes(obj.brand)) values.push(obj.brand);
      if (obj.model && !values.includes(obj.model)) values.push(obj.model);

      let uniqueValues: any[] = [];
      values.forEach((obj) => {
        if (!uniqueValues.includes(obj)) {
          uniqueValues.push(obj);
        }
        return uniqueValues;
      });

      return (obj.equipmentField = uniqueValues.join(" "));
    });
  }, [ordersData?.orders]);

  return (
    <>
      <FormCrudOrder fetchApi={fetchApi} modalActions={modalActions} modals={modals} selectItem={selectItem} />
      <HeaderLayout title="Ordens de serviço" subTitle="Bem-vindo a área de ordens de serviço" />
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
          <Box position={"relative"}>
            <Button onClick={handleOpenMenu} sx={{ borderRadius: 2, width: 90 }} startIcon={<TuneIcon />}>
              Filtro
            </Button>
            <Menu
              onClose={handleCloseMenu}
              id="account-menu"
              open={openMenu}
              anchorEl={anchorEl}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Typography padding={"6px 14px"}>Filtro</Typography>
              <Divider />
              <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography marginTop={1} padding={"6px 14px"}>
                  Status
                </Typography>
                <Box onClick={() => console.log("teste")} sx={{ cursor: "pointer" }}>
                  <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
                    Resetar
                  </Typography>
                </Box>
              </Stack>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[
                  { label: "fechado", year: 1994 },
                  { label: "aberto", year: 1994 },
                ]}
                size="small"
                sx={{ width: "100%", padding: "6px 14px", marginBottom: 1 }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Divider />

              <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography marginTop={1} padding={"6px 14px"}>
                  Intervalo
                </Typography>
                <Box onClick={() => console.log("teste")} sx={{ cursor: "pointer" }}>
                  <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
                    Resetar
                  </Typography>
                </Box>
              </Stack>

              <Stack padding={"0px 14px"} paddingBottom={"4px"} flexDirection={"row"} gap={1} marginBottom={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack>
                    <Typography color={theme.palette.grey[600]} fontSize={12} marginBottom={1}>
                      De
                    </Typography>
                    <DatePicker
                      sx={{
                        width: 150,
                        "& .MuiInputBase-input": {
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        },
                      }}
                      defaultValue={dayjs("2022-04-17")}
                    />
                  </Stack>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack>
                    <Typography color={theme.palette.grey[600]} fontSize={12} marginBottom={1}>
                      Para
                    </Typography>
                    <DatePicker
                      sx={{
                        width: 150,
                        "& .MuiInputBase-input": {
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        },
                      }}
                      defaultValue={dayjs("2022-04-17")}
                    />
                  </Stack>
                </LocalizationProvider>
              </Stack>

              <Divider />
              <Stack
                padding={2}
                marginTop={1}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Button>Resetar Tudo</Button>
                <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 2 }}>
                  Aplicar
                </Button>
              </Stack>
            </Menu>
          </Box>

          <Button onClick={modalHandleOpen} size="medium" variant="contained" sx={{ borderRadius: 2 }}>
            Novo
          </Button>
        </Stack>
      </Stack>
      <DataGridLayout
        loading={loading}
        rows={ordersData?.orders}
        columns={columns}
        PageSize={limitPorPage}
        page={ordersData?.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={ordersData?.total}
      />
    </>
  );
};

export default Orders;
