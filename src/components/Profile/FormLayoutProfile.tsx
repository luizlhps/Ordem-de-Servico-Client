import { TransformForbackEndPhoneNumber, normalizePhoneNumber } from "@/utils/Masks";
import { Box, Button, CircularProgress, Grid, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormSelect from "../FormSelect";
import { authGroupApi } from "@/services/api/authGroupApi";
import { RootAuthGroup } from "../../../types/authGroup";
import { IUser } from "../../../types/users";
import { InputsFormUser } from "@/services/installApplicationApi";

interface IProps {
  data?: IUser;
  loading: boolean;
  handleContinueForm: () => void;
  setValueForm: (valueToUpdate: InputsFormUser) => void;
}

export const FormLayoutProfile = ({ data, loading, handleContinueForm, setValueForm }: IProps) => {
  const theme = useTheme();
  const [display, setDisplay] = useState(normalizePhoneNumber(data?.phone));
  const [groupApi, setGroupApi] = useState<RootAuthGroup>();

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<InputsFormUser>({});

  const onSubmit: SubmitHandler<InputsFormUser> = (data) => {
    handleContinueForm();
    setValueForm(data);
  };

  const fetchAuthGroup = () => {
    authGroupApi
      .getAll("", 0, 0)
      .then((res) => {
        setGroupApi(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAuthGroup();
  }, []);

  return (
    <>
      <Grid container maxWidth={600} justifyContent={"center"} flexDirection={"column"}>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Nome
          </Typography>
          <Controller
            defaultValue={data?.name ? data?.name : ""}
            name={"name"}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField sx={{ fontWeight: 300 }} onChange={onChange} value={value} size="small" fullWidth />
            )}
          />
          {errors.name?.type === "required" && <Typography color={"error"}>Digite o sobre o equipamento</Typography>}
        </Grid>
        <Grid item>
          <Typography marginTop={3} marginBottom={1}>
            Email
          </Typography>
          <Controller
            defaultValue={data?.email ? data?.email : ""}
            name={"email"}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} size="small" fullWidth />
            )}
          />

          {errors.email?.type === "required" && <Typography color={"error"}>Digite o modelo</Typography>}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box>
              <Typography marginTop={3} marginBottom={1}>
                Celular
              </Typography>
              <Controller
                name={"phone"}
                control={control}
                rules={{ required: true, minLength: 11 }}
                defaultValue={data?.phone ? data?.phone : ""}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    inputProps={{ maxLength: 15 }}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      onChange(TransformForbackEndPhoneNumber(newValue));
                      setDisplay(normalizePhoneNumber(newValue));
                    }}
                    value={display}
                    size="small"
                    fullWidth
                  />
                )}
              />
              {errors.phone?.type === "required" && <Typography color={"error"}>Digite o celular</Typography>}
              {errors.phone?.type === "validate" && <Typography color={"error"}>Digite um numero correto</Typography>}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography marginTop={3} marginBottom={1}>
                Cargo
              </Typography>
              {groupApi && (
                <>
                  <FormSelect
                    name={"group"}
                    defaultValue={data && groupApi ? data.group._id : ""}
                    rules={{ required: true }}
                    control={control}
                    width={"100%"}
                  >
                    {groupApi?.authGroup.map((item) => {
                      return (
                        <MenuItem
                          key={item._id}
                          value={item._id}
                          onClick={() => {
                            console.log();
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </FormSelect>
                </>
              )}
              {errors.group?.type === "required" && <Typography color={"error"}>Selecione o cargo</Typography>}
            </Box>
          </Grid>
        </Grid>
        <Button
          onClick={handleSubmit(onSubmit)}
          fullWidth
          sx={{
            marginTop: 5,
            padding: 1,
            color: `${theme.palette.primary.main}!important`,
            background: theme.palette.secondary.main,
            flex: 1,
          }}
        >
          {loading ? <CircularProgress size={25} /> : <>Salvar</>}
        </Button>
      </Grid>
    </>
  );
};
