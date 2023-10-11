import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Menu,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IOrder } from "../../../types/order";

import TuneIcon from "@mui/icons-material/Tune";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useGetFetchService } from "@/hook/useGetFetchService";
import { ComboBox } from "../ComboBox";
import { useForm } from "react-hook-form";
import { useGetFetchStatus } from "@/hook/useGetFetchStatus";
import { RootCostumer } from "../../../types/costumer";
import { costumersApi } from "@/services/api/costumersApi";
import { DateTimePickerControlled } from "../DataTime/DateTimePicker";
import { DatePickerControlled } from "../DataTime";

interface InputProps {
  status: string | undefined | null;
  customer: string | undefined | null;
  dateFrom: string | undefined | null;
  dateTo: string | undefined | null;
}

export interface IRangeDateFilter {
  dateFrom: string | null | undefined;
  dateTo: string | null | undefined;
}

interface IProps {
  setCustomerFilter: Dispatch<SetStateAction<string | null | undefined>>;
  setStatusFilter: Dispatch<SetStateAction<string | null | undefined>>;
  setRangeDateFilter: Dispatch<SetStateAction<IRangeDateFilter | null>>;
}

export const MenuSelectFilter = ({ setCustomerFilter, setStatusFilter, setRangeDateFilter }: IProps) => {
  const theme = useTheme();

  //menuFilter
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({});
  const { fetchApi, loading, statusData } = useGetFetchStatus();

  const [costumerData, setCostumersData] = useState<RootCostumer>({ Total: 0, Page: 0, limit: 0, customer: [] || "" });
  const [loadingCostumer, setloadingCostumer] = useState(false);

  const smallphoneMedia = useMediaQuery("(max-width:370px)");

  async function fetchApiCustomer(filter?: string, page?: number, limit?: number) {
    try {
      setloadingCostumer(true);
      const res = await costumersApi.getAllCostumers(filter, page, limit);
      if (res instanceof Error) {
        return new Error("Ocorreu um Erro na busca");
      }
      setCostumersData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingCostumer(false);
    }
  }

  useEffect(() => {
    fetchApi();
    fetchApiCustomer();
  }, []);

  const onSubmit = (data: InputProps) => {
    console.log(data);

    setStatusFilter(data.status);
    setCustomerFilter(data.customer);
    setRangeDateFilter({
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    });
  };

  return (
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
          <Box onClick={() => setValue("status", "")} sx={{ cursor: "pointer" }}>
            <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
              Resetar
            </Typography>
          </Box>
        </Stack>

        <ComboBox
          defaultValue={""}
          control={control}
          customStyle={{ padding: "6px 14px", marginBottom: 1 }}
          data={statusData.status}
          name="status"
          property="name"
        />

        <Divider />
        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography marginTop={1} padding={"6px 14px"}>
            Cliente
          </Typography>
          <Box onClick={() => setValue("customer", "")} sx={{ cursor: "pointer" }}>
            <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
              Resetar
            </Typography>
          </Box>
        </Stack>

        <ComboBox
          defaultValue={""}
          control={control}
          customStyle={{ padding: "6px 14px", marginBottom: 1 }}
          data={costumerData.customer}
          name="customer"
          property="name"
        />
        <Divider />

        <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography marginTop={1} padding={"6px 14px"}>
            Intervalo
          </Typography>
          <Box
            onClick={() => {
              setValue("dateFrom", undefined);
              setValue("dateTo", undefined);
            }}
            sx={{ cursor: "pointer" }}
          >
            <Typography fontSize={12} marginTop={1} padding={"6px 14px"} color={theme.palette.secondary.main}>
              Resetar
            </Typography>
          </Box>
        </Stack>

        <Stack
          padding={"0px 14px"}
          paddingBottom={"4px"}
          flexDirection={"row"}
          gap={1}
          marginBottom={1}
          flexWrap={smallphoneMedia ? "wrap" : "nowrap"}
        >
          <Stack>
            <Typography color={theme.palette.grey[600]} fontSize={12} marginBottom={1}>
              De
            </Typography>
            <DatePickerControlled
              customStyle={{
                width: smallphoneMedia ? "100%" : 150,
                "& .MuiInputBase-input": {
                  paddingTop: "10px",
                  paddingBottom: "10px",
                },
              }}
              control={control}
              nameField="dateFrom"
              errors={errors}
            />
          </Stack>
          <Stack>
            <Typography color={theme.palette.grey[600]} fontSize={12} marginBottom={1}>
              Para
            </Typography>
            <DatePickerControlled
              customStyle={{
                width: smallphoneMedia ? "100%" : 150,
                "& .MuiInputBase-input": {
                  paddingTop: "10px",
                  paddingBottom: "10px",
                },
              }}
              control={control}
              nameField="dateTo"
              errors={errors}
            />
          </Stack>
        </Stack>

        <Divider />
        <Stack padding={2} marginTop={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Button
            onClick={() => {
              reset({
                dateTo: null,
                dateFrom: null,
                customer: null,
                status: null,
              });
            }}
          >
            Resetar Tudo
          </Button>
          <Button
            onClick={() => {
              handleCloseMenu();
              handleSubmit(onSubmit)();
            }}
            size="medium"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Aplicar
          </Button>
        </Stack>
      </Menu>
    </Box>
  );
};
