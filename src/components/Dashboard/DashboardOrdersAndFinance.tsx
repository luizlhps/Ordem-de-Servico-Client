import { DashboardTransactionsNotification } from "./DashboardTransactionsNotification";
import { DasboardDebitsNotification } from "./DasboardDebitsNotification";
import { CSSProperties, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";

import { Navigation, Pagination } from "swiper/modules";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Skeleton, useTheme } from "@mui/material";
import { IDashboard } from "../../../types/dashboard";
import { DashboardBalanceNotification } from "./DashboardBalanceNotification";
import { DasboardCreditsNotification } from "./DasboardCreditsNotification";
import { DashboardOrdersPendingNotification } from "./DashboardOrdersPendingNotification";
interface featFinanceProps {
  dataDashboard: IDashboard | undefined;
}

export const DashboardOrdersAndFinance = ({ dataDashboard }: featFinanceProps) => {
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

  //percetege and counters

  const transactionsPending = dataDashboard?.pending?.transaction?.totalCount;
  const transactionsPendingPercetege = dataDashboard?.percetege;

  const ordersPending = dataDashboard?.pending.orders.totalCount;
  const ordersPendingPercetege = dataDashboard?.pending.orders.percetege;

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
                  creditAmount={creditAmount}
                  subTitle={`${dataDashboard?.finished.credit.percetege}%`}
                  IconDashBoardColor={IconDashBoardColor(dataDashboard?.finished.credit.percetege)}
                  IconDashBoard={IconDashBoard(dataDashboard?.finished.credit.percetege)}
                />
              ) : (
                <Skeleton width={300} sx={styleSkeletonConfig}></Skeleton>
              )}
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              {dataDashboard ? (
                <DashboardTransactionsNotification
                  contentWidthValue={ContentWidthValue}
                  transactionsPending={transactionsPending}
                  iconDashBoardColor={IconDashBoardColor(transactionsPendingPercetege)}
                  iconDashBoard={IconDashBoard(transactionsPendingPercetege)}
                  subTitle={`${transactionsPendingPercetege}%`}
                />
              ) : (
                <Skeleton width={300} sx={styleSkeletonConfig}></Skeleton>
              )}
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              {dataDashboard ? (
                <DashboardOrdersPendingNotification
                  contentWidthValue={ContentWidthValue}
                  ordersPending={ordersPending}
                  iconDashBoardColor={IconDashBoardColor(ordersPendingPercetege)}
                  iconDashBoard={IconDashBoard(ordersPendingPercetege)}
                  subTitle={`${ordersPendingPercetege}%`}
                />
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
