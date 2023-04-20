import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import NextNProgress from "nextjs-progressbar";
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobaStyles></GlobaStyles>
      <AppThemeProvider>
        <LayoutDefault>
          <NextNProgress showOnShallow={true} />
          <Component {...pageProps} />
        </LayoutDefault>
      </AppThemeProvider>
    </>
  );
}
