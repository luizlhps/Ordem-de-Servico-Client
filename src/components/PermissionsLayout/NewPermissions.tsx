import { CSSProperties, useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { authGroupApi } from "@/services/api/authGroupApi";
import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";

import { IPermissions } from "../../../types/authGroup";
import { FormLayoutPermission } from "./FormLayoutPermission";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

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

// Constants
const initialStateofForm = {
  name: "",
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
};

export const NewPermissions = ({ fetchApi, handleClose, open, style }: IPropsNewOfficials) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Theme and Media Query
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:649px)");

  // Initialize Form Values
  useEffect(() => {
    setValue("name", initialStateofForm.name);
    setValue("permissions", initialStateofForm.permissions);
  }, [handleClose]);

  // Helper function to post data to API
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
        setError(true);
      })
      .finally(() => {
        fetchApi();
        setLoading(false);

        handleClose();
      });
  };

  // Form submission handler
  const onSubmit: SubmitHandler<IAuthGroupFormInput> = (data) => {
    const permissions: IPermissions = {
      create: [],
      deleted: [],
      view: [],
      update: [],
    };
    //interact about the keys exemple (order and finance) of the input
    for (let keyofPermissions in data.permissions) {
      if (data.permissions.hasOwnProperty(keyofPermissions)) {
        const operation = data.permissions[keyofPermissions];

        //interact about the keys exemple(create, delete, etc) of object the operation
        for (let opKey in operation) {
          if (operation.hasOwnProperty(opKey) && operation[opKey as keyof TOperation] === true) {
            permissions[opKey as keyof TOperation].push(keyofPermissions);
          }
        }
      }
    }

    postDataForApi(data.name, permissions);
  };

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAuthGroupFormInput>();

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />
      {open && (
        <>
          <DialogModalScroll.Root fullheight handleClose={handleClose} open={open} style={style}>
            <DialogModalScroll.Close handleClose={handleClose} />

            <FormLayoutPermission
              control={control}
              errors={errors}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              loading={loading}
              onSubmit={onSubmit}
              setValue={setValue}
              watch={watch}
            />
          </DialogModalScroll.Root>
        </>
      )}
    </>
  );
};
