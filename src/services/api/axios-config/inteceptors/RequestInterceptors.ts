import axios from "axios";
import { getSession } from "next-auth/react";

import { AxiosRequestConfig } from "axios";
export const requestInteceptor = async (config: any) => {
  const session: any = await getSession();
  console.log(session);

  if (session && session.accessToken !== null) {
    config.headers!.Authorization = session.accessToken ? `${session.accessToken}` : "";
    return config;
  }
  return config;
};
