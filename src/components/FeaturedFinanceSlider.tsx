import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { FinanceNotification } from "./FeatureFinanceNotification";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useTheme } from "@mui/material";
import { IBalance, IFinance, RootFinance } from "../../types/finance";

interface featFinanceProps {
  balance: IBalance | undefined;
  financeData: RootFinance;
}

export const FeaturedFinanceSlider = ({ balance, financeData }: featFinanceProps) => {
  console.log(financeData);

  const transactiosOpens = financeData.transaction.reduce((acc, item) => {
    if (item.status === "open") acc += 1;
    return acc;
  }, 0);

  const invoicing = financeData.transaction.reduce((acc, item) => {
    if (item.type === "credit" && item.status === "finished") acc += item.amount;
    return acc;
  }, 0);

  const debts = financeData.transaction.reduce((acc, item) => {
    if (item.type === "debit" && item.status === "finished") acc += item.amount;
    return acc;
  }, 0);

  console.log(transactiosOpens);

  const theme = useTheme();
  const ContentWidthValue = "300px";

  const stylesConfig: CSSProperties = {
    boxSizing: "border-box",
    maxWidth: ContentWidthValue,
    display: "flex",
    justifyContent: "center",
  };

  useEffect(() => {
    const swiperWrapper = document.querySelector(".swiper-wrapper") as HTMLElement;
    const swiperSlide = document.querySelectorAll(".swiper-slide");
    const swiperPagination = document.querySelector(".swiper-pagination") as HTMLElement;

    swiperPagination.style.position = "unset";

    if (swiperWrapper) swiperWrapper.style.justifyContent = "space-between";
    const lastSlide = swiperSlide[swiperSlide.length - 1] as HTMLElement;
    lastSlide.style.marginRight = "0px";
  }, []);

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
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle="1 jan - 31 dez 2023" title="Caixa Total">
                  <FinanceNotification.Icon icon={AccountBalanceWalletIcon} />
                </FinanceNotification.Header>
                <FinanceNotification.Content
                  content={balance?.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13.00%" />
              </FinanceNotification.Root>
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle="1 jan - 31 dez 2023" title="Dividas">
                  <FinanceNotification.Icon icon={AccountBalanceWalletIcon} />
                </FinanceNotification.Header>
                <FinanceNotification.Content
                  content={debts.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13" />
              </FinanceNotification.Root>
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle="1 jan - 31 dez 2023" title="Faturamento">
                  <FinanceNotification.Icon icon={AccountBalanceWalletIcon} />
                </FinanceNotification.Header>
                <FinanceNotification.Content
                  content={invoicing.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13" />
              </FinanceNotification.Root>
            </SwiperSlide>
            <SwiperSlide style={stylesConfig}>
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle=" Abertas" title="Transações"></FinanceNotification.Header>
                <FinanceNotification.Content content={`${transactiosOpens} Transações`} />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13" />
              </FinanceNotification.Root>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </>
  );
};
