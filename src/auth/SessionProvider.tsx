import { Api } from "@/services/api/axios-config";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IResponseLogin } from "../../types/auth";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { usersApi } from "@/services/api/usersApi";
import { IMyInfoUser, RootUser } from "../../types/users";

interface IPropsContext {
  tokenAuth: IResponseLogin | undefined;
  user: IMyInfoUser | undefined;
  signIn: ({ email, password }: ISignCredentials) => Promise<void>;
  signOut: () => void;
  fetchMyInfo: () => void;
  loading: boolean;
  errorLogin: boolean;
  loadingLogin: boolean
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
  const [user, setUser] = useState<IMyInfoUser>();
  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false)
  const router = useRouter();

  const signOut = () => {
    Cookies.remove("auth");
    router.push("/login");
  };

  const fetchMyInfo = () => {
    setLoading(true);
    usersApi
      .GetMyInfo()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        Cookies.remove("auth");
        Cookies.remove("user");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const RecuperyUser = Cookies.get("user");

    if (RecuperyUser) {
      fetchMyInfo();
    }
  }, [tokenAuth]);

  const signIn = async ({ email, password }: ISignCredentials) => {
    try {
      setErrorLogin(false);
      setLoadingLogin(true)

      const month = 60 * 60 * 24 * 30;

      //login user
      const res = await Api.post<IResponseLogin>("/login", { email, password });
      const { accessToken, permissions, refreshToken, roles } = res.data;
      setTokenAuth({ accessToken, permissions, refreshToken, roles });

      Cookies.set("auth", JSON.stringify({ accessToken, permissions, refreshToken, roles }), {
        expires: month,
        path: "/",
      });

      //get info User
      const getInfoUser = await usersApi.GetMyInfo();
      const userId = getInfoUser.data._id;
      Cookies.set("user", userId, {
        expires: month,
        path: "/",
      });

      router.push("/orders");
    } catch (error) {
      setErrorLogin(true);
      Cookies.remove("auth");
      console.log(error);
    } finally {
      setLoadingLogin(false)
    }
  };

  return (
    <>
      <SessionContext.Provider value={{ signIn, tokenAuth, user, signOut, fetchMyInfo,loadingLogin,loading, errorLogin }}>
        {children}
      </SessionContext.Provider>
    </>
  );
};

export default SessionProvider;
