import { Api } from "@/services/api/axios-config";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IResponseLogin } from "../../types/auth";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { usersApi } from "@/services/api/users";
import { RootUser } from "../../types/users";

interface IPropsContext {
  isAuthenticated: boolean;
  tokenAuth: IResponseLogin | undefined;
  user: RootUser | undefined;
  signIn: ({ email, password }: ISignCredentials) => Promise<void>;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const RecuperyUser = Cookies.get("auth");
    const month = 60 * 60 * 24 * 30;

    if (tokenAuth) {
      router.push("/orders");
      Cookies.set("auth", JSON.stringify(tokenAuth), { expires: month, path: "/" });
    }
    if (RecuperyUser) {
      usersApi
        .getById()
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tokenAuth]);

  const router = useRouter();
  console.log(user);

  const signIn = async ({ email, password }: ISignCredentials) => {
    try {
      const res = await Api.post<IResponseLogin>("/login", { email, password });
      const { accessToken, permissions, refreshToken, roles } = res.data;
      setTokenAuth({ accessToken, permissions, refreshToken, roles });
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      console.log("Houve um erro ao logar");
    }
  };

  return (
    <>
      <SessionContext.Provider value={{ signIn, isAuthenticated, tokenAuth, user }}>{children}</SessionContext.Provider>
    </>
  );
};

export default SessionProvider;
