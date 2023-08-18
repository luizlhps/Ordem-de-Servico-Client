import React, { useCallback, useContext, useEffect, useState } from "react";
import { HeaderLayout } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Box, Button, Container, Grid, Input, TextField, Typography, useTheme } from "@mui/material";
import { AvatarProfile } from "@/components/Profile/AvatarProfile";
import { SwitchButton } from "@/components/SwitchButton/SwitchButton";
import { FormProfile, FormProfilePassword } from "@/components/Profile";
import { RootUser } from "../../../types/users";
import { usersApi } from "@/services/api/users";
import SessionProvider, { SessionContext } from "@/auth/SessionProvider";

const Orders = () => {
  const [profile, setProfile] = useState(false);
  const [data, setData] = useState<RootUser>();

  const { user } = useContext(SessionContext);

  console.log(user);

  const {
    register,
    handleSubmit,

    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleStateButton = () => {
    setProfile((oldState) => !oldState);
  };

  const { handleSubmit: handleSubmitContact } = useForm();
  const { handleSubmit: handleSubmitPassword } = useForm();

  const onSubmitContact = (data: any) => {
    // Lógica para processar informações de contato (email, nome, telefone)
  };

  const onSubmitPassword = (data: any) => {
    // Lógica para processar senha
  };

  return (
    <>
      <HeaderLayout title="Seu Perfil" subTitle="Configure os dados de sua conta." />
      <Box marginTop={5} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Box
          marginTop={"20px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          minWidth={"80%"}
        >
          <SwitchButton firstText="perfil" secondText="senha" onStateChange={handleStateButton} state={profile} />

          {!profile ? (
            <>
              <FormProfile control={control} errors={errors} />
            </>
          ) : (
            <>
              <FormProfilePassword control={control} errors={errors} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
