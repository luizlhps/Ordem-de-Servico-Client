import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
//day
import dayjs from "dayjs";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

//CSS
import GlobaStyles from "../styles/global";
import { AppThemeProvider } from "../contexts";
import styled from "styled-components";
import LayoutDefault from "@/layout/LayoutDefault";
import { FormSucessOrErrorProvider } from "@/contexts/formSuccessOrErrorContext";

//LAYOUT
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  //Layout Get

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <GlobaStyles />
        <AppThemeProvider>
          <SessionProvider session={session}>
            <FormSucessOrErrorProvider>
              <NextNProgress showOnShallow={true} />
              <Component {...pageProps} />
            </FormSucessOrErrorProvider>
          </SessionProvider>
        </AppThemeProvider>
      </>
    );
  }

  return (
    <>
      <GlobaStyles></GlobaStyles>
      <AppThemeProvider>
        <SessionProvider session={session}>
          <LayoutDefault>
            <FormSucessOrErrorProvider>
              <NextNProgress showOnShallow={true} />
              <Component {...pageProps} />
            </FormSucessOrErrorProvider>
          </LayoutDefault>
        </SessionProvider>
      </AppThemeProvider>
    </>
  );
}
