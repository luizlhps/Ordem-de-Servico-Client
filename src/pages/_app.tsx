import "@/styles/globals.css";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";

//CSS
import GlobaStyles from "../styles/global";
import { AppThemeProvider, FormProvider } from "../contexts";
import styled from "styled-components";
import LayoutDefault from "@/layout/LayoutDefault";

//LAYOUT
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <GlobaStyles />
        <AppThemeProvider>
          <NextNProgress showOnShallow={true} />
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </AppThemeProvider>
      </>
    );
  }

  return (
    <>
      <GlobaStyles></GlobaStyles>
      <AppThemeProvider>
        <LayoutDefault>
          <NextNProgress showOnShallow={true} />
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </LayoutDefault>
      </AppThemeProvider>
    </>
  );
}
