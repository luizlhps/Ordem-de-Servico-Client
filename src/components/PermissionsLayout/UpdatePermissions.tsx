import { CSSProperties, useEffect, useState } from "react";

import { ToastSuccess } from "../Toast/ToastSuccess";
import { ToastError } from "../Toast/ToastError";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthGroup, IPermissions } from "../../../types/authGroup";
import { FormLayoutPermission } from "./FormLayoutPermission";

import { authGroupApi } from "@/services/api/authGroupApi";
import { DialogModalScroll } from "../Modal/DialogModalScroll";

interface IPropsNewOfficials {
  handleClose: () => void;
  fetchApi: () => void;
  style: CSSProperties;
  open: boolean;
  selectItem: AuthGroup | undefined;
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
export interface IAuthGroupFormInput {
  name: string;
  permissions: IAuthGroupFormFields;
}

const values: IAuthGroupFormFields = {
  order: { create: false, deleted: false, update: false, view: false },
  finance: { create: false, deleted: false, update: false, view: false },
  dashboard: { create: false, deleted: false, update: false, view: false },
  status: { create: false, deleted: false, update: false, view: false },
  services: { create: false, deleted: false, update: false, view: false },
  user: { create: false, deleted: false, update: false, view: false },
  admin: { create: false, deleted: false, update: false, view: false },
  permissionsGroup: { create: false, deleted: false, update: false, view: false },
  customer: { create: false, deleted: false, update: false, view: false },
};

export const UpdatePermissions = ({ fetchApi, handleClose, open, style, selectItem }: IPropsNewOfficials) => {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const interactFields = () => {
    let permissionsObj: { [key: string]: TOperation } = {};

    if (!selectItem) return values;

    const permissionList = [
      "order",
      "finance",
      "dashboard",
      "status",
      "services",
      "user",
      "admin",
      "permissionsGroup",
      "customer",
    ];

    const defaultFields = {
      create: false,
      update: false,
      deleted: false,
      view: false,
    } as TOperation;

    //add default fields
    for (let key of permissionList) {
      permissionsObj[key] = { ...defaultFields };
    }

    const input: IPermissions = selectItem.permissions;

    const keys = Object.keys(input);

    keys.forEach((key) => {
      if (key === "create" || key === "update" || key === "deleted" || key === "view") {
        const permissionValues = input[key];
        if (Array.isArray(permissionValues)) {
          permissionValues.forEach((field) => {
            permissionsObj[field][key as keyof TOperation] = true;
          });
        }
      }
    });
    return permissionsObj as IAuthGroupFormFields;
  };

  // Helper function to post data to API
  const postDataForApi = (name: string, permissions: IPermissions, id: string) => {
    setLoading(true);
    authGroupApi
      .update(name, permissions, id)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setMessageError(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
        setError(true);
        console.log(typeof err.request.response === "string" ? err.request.response : "Ocorreu um erro!!");
      })
      .finally(() => {
        fetchApi();
        setLoading(false);

        handleClose();
      });
  };

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAuthGroupFormInput>();

  useEffect(() => {
    if (selectItem) {
      setValue("name", selectItem?.name);
      setValue("permissions", interactFields());
    }
  }, [selectItem]);

  const onSubmit: SubmitHandler<IAuthGroupFormInput> = (data) => {
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
            permissions[opKey as keyof TOperation].push(key);
          }
        }
      }
    }

    if (selectItem) postDataForApi(data.name, permissions, selectItem._id);
  };

  return (
    <>
      <ToastSuccess alertSuccess="Criado com sucesso!!" formSuccess={success} setFormSuccess={setSuccess} />
      <ToastError errorMessage={messageError} formError={error} setFormError={setError} />

      {open && selectItem && (
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
