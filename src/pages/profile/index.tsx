import React, { useCallback, useContext, useEffect, useState } from "react";
import { HeaderLayout } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Box, Button, Container, Grid, Input, TextField, Typography, useTheme } from "@mui/material";
import { AvatarProfile } from "@/components/Profile/AvatarProfile";
import { SwitchButton } from "@/components/SwitchButton/SwitchButton";
import { RootUser } from "../../../types/users";
import { usersApi } from "@/services/api/usersApi";
import SessionProvider, { SessionContext } from "@/auth/SessionProvider";
import { FormProfilePassword, FormProfileUpdate } from "@/components/Profile";

const Orders = () => {
  const [profile, setProfile] = useState(false);
  const { user } = useContext(SessionContext);
  const [data, setData] = useState<RootUser>();

  console.log(user);

  const handleStateButton = () => {
    setProfile((oldState) => !oldState);
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
              <FormProfileUpdate data={user} />
            </>
          ) : (
            <>
              <FormProfilePassword />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
