import { useEffect, useState } from "react";

import { HeaderLayout } from "@/components";
import { ViewOrderModal } from "@/components/Modal/orderPage/ViewOrderModal";
import { Stack, useTheme } from "@mui/material";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useGetFetchFinance } from "@/hook/useGetFetchFinances";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

import dayjs from "dayjs";

//style custom

const TesteSvg = styled.div`
  #Base {
    fill: blue;
  }
`;

export default function Home() {
  //api
  const { dataDashboard, dashboardFetchApi } = useGetFetchFinance();

  useEffect(() => {
    dashboardFetchApi();
  }, []);

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
    console.log(_, index);
    const day = index + 1;
    const dayFormatted = day < 10 ? `0${day}` : day;
    return `${dayFormatted}/${monthFormatted}`;
  });

  const options = {
    options: {
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
        dataLabels: {
          enabled: false,
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

      title: {
        text: "Caixa",
        align: "left" as "left",
        margin: 10,
        offsetX: 0,
        offsetY: 10,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },

      subtitle: {
        text: `Mês de ${dataAtualSaoPaulo.format("MMMM")}`,
        floating: true,
        align: "right" as "right",
        offsetY: 10,
        style: {
          fontSize: "22px",
        },
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
  const theme = useTheme();

  return (
    <>
      <HeaderLayout subTitle="Bem vindo a area ordem de serviço" title="Clientes" />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}></Stack>
      {dataDashboard && (
        <div id="chart">
          <ApexCharts options={options.options} series={options.series} width={"100%"} height={340} />
        </div>
      )}

      <TesteSvg></TesteSvg>
    </>
  );
}
