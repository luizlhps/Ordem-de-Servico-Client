import { SessionContext } from "@/auth/SessionProvider";
import { useRouter } from "next/router";
import React, { useContext } from "react";
interface IAuthorize {
  permissions: string;
}

export const useAuthorize = ({ permissions }: IAuthorize) => {
  const { isAuthenticated, signIn } = useContext(SessionContext);
  const router = useRouter();
  if (!isAuthenticated) return false;
  return {};
};
