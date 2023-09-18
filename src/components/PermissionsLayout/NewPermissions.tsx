import { CSSProperties, InputHTMLAttributes, useCallback, useEffect, useState } from "react";
import DialogModalScroll from "../Modal/DialogModalScroll";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CloseModal } from "../Modal/financePage/FormCrudModals";
import { InputsFormUser } from "@/services/installApplicationApi";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CheckBoxindeterminate } from "../CheckBox";
import { authGroupApi } from "@/services/api/authGroupApi";
import { IPermissions } from "../../../types/authGroup";

interface IPropsNewOfficials {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
}

interface TOperation {
  create: boolean;
  update: boolean;
  deleted: boolean;
  view: boolean;
}

interface IAuthGroupFormFields {
  [key: string]: TOperation;
  order: TOperation;
  finance: TOperation;
  dashboard: TOperation;
  customer: TOperation;
  status: TOperation;
  services: TOperation;
  user: TOperation;
  admin: TOperation;
}
interface IAuthGroupFormInput {
  name: string;
  permissions: IAuthGroupFormFields;
}

export const NewPermissions = ({ fetchApi, handleClose, open, style }: IPropsNewOfficials) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const theme = useTheme();
  const matches = useMediaQuery("(max-width:649px)");

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAuthGroupFormInput>({
    defaultValues: {
      permissions: {
        order: { create: false, deleted: false, update: false, view: false },
        finance: { create: false, deleted: false, update: false, view: false },
        dashboard: { create: false, deleted: false, update: false, view: false },
        status: { create: false, deleted: false, update: false, view: false },
        services: { create: false, deleted: false, update: false, view: false },
        user: { create: false, deleted: false, update: false, view: false },
        admin: { create: false, deleted: false, update: false, view: false },
        permissionsGroup: { create: false, deleted: false, update: false, view: false },
        customer: { create: false, deleted: false, update: false, view: false },
      },
    },
  });

  const postDataForApi = (name: string, permissions: IPermissions) => {
    setLoading(true);
    authGroupApi
      .create(name, permissions)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
      })
      .finally(() => {
        fetchApi();
        setLoading(false);

        handleClose();
      });
  };

  const onSubmit: SubmitHandler<IAuthGroupFormInput> = (data) => {
    console.log(data);

    const permissions: IPermissions = {
      create: [],
      deleted: [],
      view: [],
      update: [],
    };
    //interact about the keys exemple (order and finance) of the input
    for (let key in data.permissions) {
      if (data.permissions.hasOwnProperty(key)) {
        const operation = data.permissions[key];

        //interact about the keys exemple(create, delete, etc) of object the operation
        for (let opKey in operation) {
          if (operation.hasOwnProperty(opKey) && operation[opKey as keyof TOperation] === true) {
            console.log(opKey, key);
            permissions[opKey as keyof TOperation].push(key);
          }
        }
      }
    }
    console.log(permissions);

    postDataForApi(data.name, permissions);
  };

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <DialogModalScroll handleClose={handleClose} open={open} style={style}>
            <CloseModal handleClose={handleClose} />

            <DialogTitle variant="h1" fontSize={26} sx={{ padding: 3 }} id="scroll-dialog-title">
              Criar novo Cargo
            </DialogTitle>
            <DialogContent
              dividers={true}
              sx={{ alignItems: "center", display: "flex", flexDirection: "column", minHeight: "120px" }}
            >
              <Box
                sx={{ alignItems: "center", display: "flex", flexDirection: "column", width: "90%", paddingBottom: 1 }}
              >
                <Stack width={"100%"}>
                  <Box>
                    <Typography marginTop={0} marginBottom={1}>
                      Nome do cargo
                    </Typography>
                    <Controller
                      defaultValue=""
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
            </DialogContent>
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
                    <CheckBoxindeterminate
                      control={control}
                      setValue={setValue}
                      watch={watch}
                      name="permissionsGroup"
                    />
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
          </DialogModalScroll>
        </>
      )}
    </>
  );
};
