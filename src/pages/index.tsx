import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { DataGridLayout, HeaderLayout } from "@/components";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useGetFetchFinance } from "@/hook/useGetFetchFinances";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

import dayjs from "dayjs";
import { DashboardFinance } from "@/components/Dashboard/DashboardFinance";
import { orderApi } from "@/services/api/orderApi";
import { useSearchField } from "@/hook/useSearchField";
import { IOrder, RootOrder } from "../../types/order";
import useModal from "@/hook/useModal";
import { columnsDataGrid } from "@/components/DataGrid/utils/orderPage/orderColumnConfig";
import { DashboardOrdersAndFinance } from "@/components/Dashboard/DashboardOrdersAndFinance";
import { FormCrudOrder } from "@/components/OrderLayout/FormCrudOrder";
import { useAuthorize } from "@/hook/useAuthorize";
import { AxiosError } from "axios";

//style custom

const TesteSvg = styled.div`
  #Base {
    fill: blue;
  }
`;

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const handleAuthorize = useAuthorize({ permissions: "dashboard" });

  useEffect(() => {
    if (!handleAuthorize) router.push("/register");
  }, []);

  //api
  const { dataDashboard, dashboardFetchApi } = useGetFetchFinance();

  const [ordersData, setOrdersData] = useState<RootOrder>({ total: 0, page: 0, limit: 0, orders: [] || "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>();
  const [messageError, setMessageError] = useState("");

  const [selectItem, setselectItem] = useState<IOrder | undefined>(undefined);

  const orderPendingFetchApi = () => {
    setLoading(true);
    orderApi
      .getPendingOrder()
      .then((res) => {
        setOrdersData(res.data);
      })
      .catch((err: unknown) => {
        if (err instanceof AxiosError) {
          if (err.response?.data?.message) {
            setMessageError(err.response?.data?.message);
          } else if (err.response?.data) {
            setMessageError(err.response?.data);
          } else {
            setMessageError("Ocorreu um erro!!");
          }
        }
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const ordersFormatted = useMemo(() => {
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

  useEffect(() => {
    dashboardFetchApi();
  }, []);

  //modal
  const { modals, modalActions, modalSets } = useModal();
  const { modalHandleOpen, modalUpdateHandleOpen, modalDeleteHandleOpen, modalViewHandleOpen } = modalActions;

  const limitPorPage = 10;
  const { searchField, searchHandle, setSearchField } = useSearchField({
    limitPorPage,
    setCurrentPage,
    currentPage,
    fetchApi: orderPendingFetchApi,
  });

  const columns = columnsDataGrid(
    theme,
    modalUpdateHandleOpen,
    setselectItem,
    modalDeleteHandleOpen,
    modalViewHandleOpen
  );

  //date
  const dataAtualSaoPaulo = dayjs().tz("America/Sao_Paulo");
  const maxDay = dataAtualSaoPaulo.daysInMonth();
  const month = dataAtualSaoPaulo.get("month") + 1; //initial 0
  const monthFormatted = month < 10 ? `0${month}` : month;

  const arrayDataValueCredit = new Array(maxDay).fill(0);
  const arrayDataValueDebit = new Array(maxDay).fill(0);

  //fatura
  if (dataDashboard?.transactions && dataDashboard?.transactions.length > 0) {
    for (const transaction of dataDashboard?.transactions) {
      if (transaction.entryDate && transaction.type === "credit") {
        const entryDateFormatted = dayjs(transaction.entryDate);
        const dateTransaction = entryDateFormatted.get("date");
        arrayDataValueCredit[dateTransaction] += transaction.amount;
      }
    }
  }

  //divida
  if (dataDashboard?.transactions && dataDashboard?.transactions.length > 0) {
    for (const transaction of dataDashboard?.transactions) {
      if (transaction.entryDate && transaction.type === "debit") {
        const entryDateFormatted = dayjs(transaction.entryDate);
        const dateTransaction = entryDateFormatted.get("date");
        arrayDataValueDebit[dateTransaction] += transaction.amount;
      }
    }
  }

  const arrayDate = Array.from({ length: maxDay }, (_, index) => {
    const day = index + 1;
    const dayFormatted = day < 10 ? `0${day}` : day;
    return `${dayFormatted}/${monthFormatted}`;
  });

  const options = {
    options: {
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
        },
      },

      chart: {
        id: "salesChart",
        foreColor: "#fff",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#FCCF31", "#17ead9", "#f02fc2"],
      stroke: {
        width: 3,
      },

      grid: {
        borderColor: "#40475D",
      },

      xaxis: {
        categories: arrayDate,
        labels: {
          show: false,
        },
        axisTicks: {
          color: "#333",
        },
        axisBorder: {
          color: "#333",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
        },
      },
      tooltip: {
        theme: "dark",
      },

      legend: {
        show: true,
        position: "bottom" as "bottom",
        horizontalAlign: "left" as "left",

        onItemClick: {
          toggleDataSeries: false,
        },
        offsetY: 5,
        offsetX: 20,
      },
    },

    series: [
      {
        name: "Faturamento",
        data: arrayDataValueCredit,
      },
      {
        name: "Dividas",
        data: arrayDataValueDebit,
      },
    ],
  };

  return (
    <>
      <HeaderLayout subTitle="Bem vindo a area de dashboard" title="Dashboard" />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} marginBottom={3}></Stack>
      <FormCrudOrder
        fetchApi={orderPendingFetchApi}
        modalActions={modalActions}
        modals={modals}
        selectItem={selectItem}
      />
      <DashboardOrdersAndFinance dataDashboard={dataDashboard} />
      {dataDashboard ? (
        <Box
          marginTop={2}
          sx={{
            background: theme.palette.background.default,
            color: "black",
            padding: 3,
            border: ` 1px solid ${theme.palette.custom?.grey}`,
            borderRadius: "14px",
          }}
        >
          <Stack flexDirection={"row"} justifyContent={"space-between"} marginBottom={1} padding={2}>
            <Typography fontSize={18}>Dividas e Faturamento</Typography>
            <Typography fontSize={14}>Mês de {dataAtualSaoPaulo.format("MMMM")}</Typography>
          </Stack>
          <ApexCharts options={options.options} series={options.series} width={"100%"} height={300} />
        </Box>
      ) : (
        <></>
      )}
      <Box
        id="divider"
        marginTop={2}
        marginBottom={2}
        width={"100%"}
        height={"1px"}
        sx={{ background: theme.palette.custom?.grey }}
      />
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
        rows={ordersData?.orders}
        columns={columns}
        PageSize={limitPorPage}
        page={ordersData?.page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={ordersData?.total}
      />

      <TesteSvg></TesteSvg>
    </>
  );
}
