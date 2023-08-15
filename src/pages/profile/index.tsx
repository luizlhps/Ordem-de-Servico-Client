import React, { useState } from "react";
import { HeaderLayout } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Box, Button, Container, Grid, TextField, Typography, useTheme } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const Orders = () => {
  const theme = useTheme();

  const [button, setButton] = useState(false);

  const handleStateButton = () => {
    setButton((oldState) => !oldState);
  };

  const {
    register,
    handleSubmit,

    control,
    setValue,
    formState: { errors },
  } = useForm();

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
          <Box
            display={"flex"}
            padding={1}
            borderRadius={"6px"}
            justifyContent={"center"}
            bgcolor={theme.palette.custom?.grey}
            width={"100%"}
            maxWidth={780}
            gap={1}
          >
            <Button
              disabled={!button}
              onClick={handleStateButton}
              sx={{
                padding: 1,
                color: `${theme.palette.primary.main}!important`,
                textTransform: "capitalize",
                background: button ? "none" : theme.palette.secondary.main,
                flex: 1,
              }}
            >
              Perfil
            </Button>
            <Button
              disabled={button}
              onClick={handleStateButton}
              sx={{
                padding: 1,
                color: `${theme.palette.primary.main}!important`,
                textTransform: "capitalize",
                background: button ? theme.palette.secondary.main : "none",
                flex: 1,
              }}
            >
              Senha
            </Button>
          </Box>

          <Box
            marginTop={5}
            position={"relative"}
            sx={{
              borderRadius: "50%",
              ".icon": {
                display: "none",
              },
              "&:hover": {
                ".icon": {
                  display: "flex!important",
                  cursor: "pointer",
                },
                ".avatar": {
                  filter: "brightness(30%)",
                  cursor: "pointer",
                },
              },
            }}
          >
            <CameraAltIcon
              className="icon"
              sx={{
                width: 30,
                height: 30,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-20%)",
                zIndex: 1,
              }}
            />
            <Avatar
              className="avatar"
              sx={{
                width: 150,
                height: 150,
              }}
              src="https://ovicio.com.br/wp-content/uploads/2019/07/20190731-fusionzamasu.png"
            />
          </Box>
          <Typography variant="h1" marginTop={1}>
            Avatar
          </Typography>
          <Typography fontWeight={300} fontSize={14}>
            Min 200x 200 .PNG ou .JPG
          </Typography>
          <Grid container maxWidth={600} justifyContent={"center"} flexDirection={"column"}>
            <Grid item>
              <Typography marginTop={3} marginBottom={1}>
                Nome
              </Typography>
              <Controller
                defaultValue=""
                name={"equipment"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
                )}
              />
              {errors.equipment?.type === "required" && (
                <Typography color={"error"}>Digite o sobre o equipamento</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography marginTop={3} marginBottom={1}>
                Email
              </Typography>
              <Controller
                defaultValue=""
                name={"model"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} size="small" fullWidth />
                )}
              />

              {errors.model?.type === "required" && <Typography color={"error"}>Digite o modelo</Typography>}
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Celular
                  </Typography>
                  <Controller
                    name={"brand"}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} value={value} size="small" fullWidth />
                    )}
                  />
                  {errors.brand?.type === "required" && <Typography color={"error"}>Digite a marca</Typography>}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography marginTop={3} marginBottom={1}>
                    Cargo
                  </Typography>
                  <Controller
                    name={"brand"}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <TextField onChange={onChange} value={value} size="small" fullWidth />
                    )}
                  />
                  {errors.brand?.type === "required" && <Typography color={"error"}>Digite a marca</Typography>}
                </Box>
              </Grid>
            </Grid>
            <Button
              onClick={handleStateButton}
              fullWidth
              sx={{
                marginTop: 5,
                padding: 1,
                color: `${theme.palette.primary.main}!important`,
                background: theme.palette.secondary.main,
                flex: 1,
              }}
            >
              Salvar
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
