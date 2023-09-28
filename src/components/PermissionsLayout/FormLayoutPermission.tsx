import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CheckBoxindeterminate } from "../CheckBox";
import { IAuthGroupFormInput } from "./UpdatePermissions";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

interface IProps {
  handleClose: () => void;
  loading: boolean;
  watch: UseFormWatch<IAuthGroupFormInput>;
  onSubmit: SubmitHandler<IAuthGroupFormInput>;
  handleSubmit: UseFormHandleSubmit<IAuthGroupFormInput>;
  setValue: UseFormSetValue<IAuthGroupFormInput>;
  errors: FieldErrors<IAuthGroupFormInput>;
  control: Control<IAuthGroupFormInput, any>;
}

export const FormLayoutPermission = ({ control, errors, setValue, watch, loading, handleSubmit, onSubmit }: IProps) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:649px)");

  return (
    <>
      <DialogModalScroll.Title>Criar novo Cargo</DialogModalScroll.Title>
      <DialogModalScroll.Content dividers={true}>
        <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", width: "90%", paddingBottom: 1 }}>
          <Stack width={"100%"}>
            <Box>
              <Typography marginTop={0} marginBottom={1}>
                Nome do cargo
              </Typography>
              <Controller
                defaultValue={""}
                name={"name"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ fontWeight: 300 }}
                    onChange={onChange}
                    value={value}
                    size="small"
                    fullWidth
                    placeholder="Digite o nome do cargo"
                  />
                )}
              />
              {errors.name?.type === "required" && <Typography color={"error"}>Digite o cargo</Typography>}
            </Box>
          </Stack>
        </Box>
      </DialogModalScroll.Content>
      <DialogContent
        dividers={true}
        sx={{ alignItems: "center", display: "flex", flexDirection: "column", borderTop: "none" }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "90%",
            textAlign: matches ? "center" : "none",
          }}
        >
          <Stack width={"100%"} flexDirection={"row"} flexWrap={"wrap"} gap={5} justifyContent={"center"}>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Ordem de Serviço
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="order" />
            </Stack>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Finanças
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="finance" />
            </Stack>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Clientes
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="customer" />
            </Stack>

            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Dashboard
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="dashboard" />
            </Stack>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Status
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="status" />
            </Stack>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Serviços
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="services" />
            </Stack>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Funcionários
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="admin" />
            </Stack>
            <Box width={140}>
              <Typography fontSize={16} fontWeight={700}>
                Cargos
              </Typography>
            </Box>
            <Stack>
              <CheckBoxindeterminate control={control} setValue={setValue} watch={watch} name="permissionsGroup" />
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
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
      </DialogActions>
    </>
  );
};
