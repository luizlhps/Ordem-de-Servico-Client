import { Api } from "@/services/api/axios-config";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IResponseLogin } from "../../types/auth";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { usersApi } from "@/services/api/users";
import { RootUser } from "../../types/users";

interface IPropsContext {
  tokenAuth: IResponseLogin | undefined;
  user: RootUser | undefined;
  signIn: ({ email, password }: ISignCredentials) => Promise<void>;
  signOut: () => void;
}
interface ISignCredentials {
  email: string;
  password: string;
}

interface IProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as IPropsContext);

export const SessionProvider = ({ children }: IProps) => {
  const [tokenAuth, setTokenAuth] = useState<IResponseLogin>();
  const [user, setUser] = useState<RootUser>();
  const router = useRouter();

  const signOut = () => {
    Cookies.remove("auth");
    router.push("/register");
  };

  useEffect(() => {
    const RecuperyUser = Cookies.get("user");

    if (RecuperyUser) {
      usersApi
        .GetMyInfo()
        .then((res) => setUser(res.data))
        .catch((err) => {
          Cookies.remove("auth");
          Cookies.remove("user");
          console.log(err);
        });
    }
  }, [tokenAuth]);

  const signIn = async ({ email, password }: ISignCredentials) => {
    try {
      const month = 60 * 60 * 24 * 30;

      const res = await Api.post<IResponseLogin>("/login", { email, password });
      const { accessToken, permissions, refreshToken, roles } = res.data;
      setTokenAuth({ accessToken, permissions, refreshToken, roles });

      Cookies.set("auth", JSON.stringify({ accessToken, permissions, refreshToken, roles }), {
        expires: month,
        path: "/",
      });

      usersApi
        .GetMyInfo()
        .then((res) => {
          const userId = res.data._id;
          Cookies.set("user", userId, {
            expires: month,
            path: "/",
          });
        })
        .catch((err) => {
          Cookies.remove("auth");
          console.log(err);
        });

      router.push("/orders");
    } catch (error) {
      console.log(error);
      console.log("Houve um erro ao logar");
    }
  };

  return (
    <>
      <SessionContext.Provider value={{ signIn, tokenAuth, user, signOut }}>{children}</SessionContext.Provider>
    </>
  );
};

export default SessionProvider;
