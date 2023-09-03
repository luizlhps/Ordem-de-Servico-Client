import FormSelect from "@/components/FormSelect";
import { FormAdminCreate } from "@/components/Profile";
import { StoreFormCreate } from "@/components/StoreForm";
import { SwitchButton } from "@/components/SwitchButton/SwitchButton";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

const InstallApplication = () => {
  const [configSystemType, setConfigSystemType] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handle = () => {
    router.push({
      pathname: "/install",
      query: { install: "admin" },
    });
  };

  const data = {};

  useEffect(() => {
    if (router.query && !Array.isArray(router.query.install)) {
      setConfigSystemType(router.query?.install);
    }
  }, [router.query]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
      minHeight={"100vh"}
    >
      <Box
        padding={"60px 0"}
        alignItems={"center"}
        width={"80%"}
        display={"flex"}
        flexDirection={"column"}
        minHeight={"100vh"}
      >
        <SwitchButton
          disabledHover
          firstText="Loja"
          onStateChange={handle}
          secondText="Usuário"
          state={configSystemType === "admin" ? true : false}
        ></SwitchButton>

        {configSystemType === "admin" ? (
          <>
            <FormAdminCreate />
          </>
        ) : (
          <>
            <StoreFormCreate />
          </>
        )}
      </Box>
    </Box>
  );
};

export default InstallApplication;

InstallApplication.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
