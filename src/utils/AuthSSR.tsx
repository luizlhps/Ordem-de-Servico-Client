import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export function AuthSSR<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookieAuth = context.req.cookies.auth;

    if (!cookieAuth)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };

    return await fn(context);
  };
}
