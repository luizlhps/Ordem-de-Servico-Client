import { DasboardDebitsNotification } from "./DasboardDebitsNotification";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";

import { Navigation, Pagination } from "swiper/modules";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";

import { Skeleton, useTheme } from "@mui/material";
import { IBalance, IFinance, RootFinance } from "../../types/finance";
import { dashboardApi } from "@/services/api/dashboardApi";
import { IDashboard } from "../../types/dashboard";
import { DashboardNotification } from "./FeatureFinanceNotification";
import { DashboardBalanceNotification } from "./DashboardBalanceNotification";
interface featFinanceProps {
  dataDashboard: IDashboard | undefined;
}

export const DashboardFinance = ({ dataDashboard }: featFinanceProps) => {
  useEffect(() => {
    const swiperWrapper = document.querySelector(".swiper-wrapper") as HTMLElement;
    const swiperSlide = document.querySelectorAll(".swiper-slide");
    const swiperPagination = document.querySelector(".swiper-pagination") as HTMLElement;

    swiperPagination.style.position = "unset";

    if (swiperWrapper) swiperWrapper.style.justifyContent = "space-between";
    const lastSlide = swiperSlide[swiperSlide.length - 1] as HTMLElement;
    lastSlide.style.marginRight = "0px";
  }, []);

  const balanceTotalAmount = dataDashboard?.balance?.totalAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const debitAmount = dataDashboard?.balance.totalAmountDebit.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const creditAmount = dataDashboard?.balance?.totalAmountCredit.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const transactionsPending = dataDashboard?.totalCount;
  const transactionsPendingPending = dataDashboard?.percetege;

  const theme = useTheme();
  const ContentWidthValue = "300px";

  const stylesConfig: CSSProperties = {
    boxSizing: "border-box",
    maxWidth: ContentWidthValue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const styleSkeletonConfig: CSSProperties = {
    borderRadius: 3,
    height: "165px!important",
    transform: "none",
  };

  function IconDashBoard(reference: number | undefined) {
    if (reference)
      if (reference > 0) {
        return <KeyboardArrowUpOutlinedIcon color="success" />;
      } else if (reference < 0) {
        return <KeyboardArrowDownIcon color="error" />;
      }
    return undefined;
  }

  function IconDashBoardColor(reference: number | undefined) {
    if (reference)
      if (reference > 0) {
        return theme.palette.success.main;
      } else if (reference < 0) {
        return theme.palette.error.main;
      }
    return undefined;
  }
  const date = dayjs();
  const month = date.format("MMM");
  const year = date.format("YYYY");
  const prevMonth = date.subtract(1, "month").format("MMM");
  const daysCurrent = date.daysInMonth();

  return (
    <>
      <div
        style={
          {
            width: "100%",
            height: "100%",
            "--swiper-pagination-color": theme.palette.secondary.light,
          } as any
        }
      >
        <Swiper
          style={{
            width: "100%",
            height: "100%",
          }}
          pagination={{
            clickable: true,
          }}
          slidesPerView={"auto"}
          spaceBetween={10}
          modules={[Navigation, Pagination]}
        >
          <div className="swiper-wrapper" style={{ justifyContent: "center!important" }}>
            <SwiperSlide style={stylesConfig}>
              {dataDashboard ? (
                <DashboardBalanceNotification
                  ContentWidthValue={ContentWidthValue}
                  prevMonth={prevMonth}
                  daysCurrent={daysCurrent}
                  month={month}
                  year={year}
                  AccountBalanceWalletOutlinedIcon={AccountBalanceWalletOutlinedIcon}
                  balanceTotalAmount={balanceTotalAmount}
                  IconDashBoardColor={IconDashBoardColor(dataDashboard?.balance.percetege)}
                  subTitle={`${dataDashboard?.balance.percetege}%`}
                  IconDashBoard={IconDashBoard(dataDashboard?.balance.percetege)}
                />
              ) : (
                <Skeleton width={300} sx={styleSkeletonConfig}></Skeleton>
              )}
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              {dataDashboard ? (
                <DasboardDebitsNotification
                  ContentWidthValue={ContentWidthValue}
                  prevMonth={prevMonth}
                  daysCurrent={daysCurrent}
                  month={month}
                  year={year}
                  debitAmount={debitAmount}
                  subTitle={`${dataDashboard?.finished.debit.percetege}%`}
                  IconDashBoardColor={IconDashBoardColor(dataDashboard?.finished.debit.percetege)}
                  IconDashBoard={IconDashBoard(dataDashboard?.finished.debit.percetege)}
                />
              ) : (
                <Skeleton width={300} sx={styleSkeletonConfig}></Skeleton>
              )}
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              {dataDashboard ? (
                <DasboardCreditsNotification
                  ContentWidthValue={ContentWidthValue}
                  prevMonth={prevMonth}
                  daysCurrent={daysCurrent}
                  month={month}
                  year={year}
                  KeyboardDoubleArrowUpOutlinedIcon={KeyboardDoubleArrowUpOutlinedIcon}
                  creditAmount={creditAmount}
                  IconDashBoardColor={IconDashBoardColor}
                  dataDashboard={dataDashboard}
                  finished={finished}
                  credit={credit}
                  percetege={percetege}
                  IconDashBoard={IconDashBoard}
                />
              ) : (
                <Skeleton width={300} sx={styleSkeletonConfig}></Skeleton>
              )}
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              {dataDashboard ? (
                <DashboardNotification.Root contentWidthValue={ContentWidthValue}>
                  <DashboardNotification.Header subTitle="Abertas" title="Transações"></DashboardNotification.Header>
                  <DashboardNotification.Content content={`${transactionsPending} Transações`} />
                  <DashboardNotification.Footer
                    color={IconDashBoardColor(transactionsPendingPending)}
                    icon={IconDashBoard(transactionsPendingPending)}
                    subTitle={`${transactionsPendingPending}%`}
                  />
                </DashboardNotification.Root>
              ) : (
                <Skeleton width={300} sx={styleSkeletonConfig}></Skeleton>
              )}
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </>
  );
};
