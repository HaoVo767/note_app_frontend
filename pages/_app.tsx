import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AppWrapper } from "@/context/state";
// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../global/index.css";
import Axios from "axios";
import React from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  React.useEffect(() => {
    Axios.defaults.baseURL = "https://note-app-backend-sandy.vercel.app/";
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
