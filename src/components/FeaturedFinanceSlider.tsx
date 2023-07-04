import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { FinanceNotification } from "./FeatureFinanceNotification";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useTheme } from "@mui/material";
export const FeaturedFinanceSlider = () => {
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
    const swiperPaginationBullet = document.querySelector(".swiper-pagination-bullet-active") as HTMLElement;

    swiperPaginationBullet.style.background = theme.palette.primary.main;

    swiperPagination.style.position = "unset";

    if (swiperWrapper) swiperWrapper.style.justifyContent = "space-between";
    const lastSlide = swiperSlide[swiperSlide.length - 1] as HTMLElement;
    lastSlide.style.marginRight = "0px";
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
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
                <FinanceNotification.Content content="R$625,600" />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13.00%" />
              </FinanceNotification.Root>
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle="1 jan - 31 dez 2023" title="Dividas">
                  <FinanceNotification.Icon icon={AccountBalanceWalletIcon} />
                </FinanceNotification.Header>
                <FinanceNotification.Content content="R$625,600" />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13" />
              </FinanceNotification.Root>
            </SwiperSlide>

            <SwiperSlide style={stylesConfig}>
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle="1 jan - 31 dez 2023" title="Faturamento">
                  <FinanceNotification.Icon icon={AccountBalanceWalletIcon} />
                </FinanceNotification.Header>
                <FinanceNotification.Content content="R$625,600" />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13" />
              </FinanceNotification.Root>
            </SwiperSlide>
            <SwiperSlide style={stylesConfig}>
              <FinanceNotification.Root contentWidthValue={ContentWidthValue}>
                <FinanceNotification.Header subTitle=" Abertas" title="Transações"></FinanceNotification.Header>
                <FinanceNotification.Content content="34 transações" />
                <FinanceNotification.Footer color={"red"} icon={KeyboardArrowUpOutlinedIcon} subTitle="13" />
              </FinanceNotification.Root>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </>
  );
};
