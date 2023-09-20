import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface IProps {
  control: Control<any, any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;

  name:
    | "dashboard"
    | "customer"
    | "finance"
    | "order"
    | "status"
    | "services"
    | "user"
    | "admin"
    | "visitor"
    | "permissionsGroup";
}

interface ICheckboxContent {
  create: boolean;
  view: boolean;
  update: boolean;
  deleted: boolean;
}

export const CheckBoxindeterminate = ({ control, watch, setValue, name }: IProps) => {
  const [checkboxValues, setCheckboxValues] = useState({
    create: false,
    view: false,
    update: false,
    deleted: false,
  });

  const [checkAll, setCheclAll] = useState(false);

  const handleCheckFieldCheckbox = (field: string, value: boolean) => {
    setCheckboxValues((oldValue: any) => ({
      ...oldValue,
      [field]: value,
    }));
  };

  const isChecked = () => {
    const permissions = watch(`permissions.${name}`);
    if (!permissions) return false;

    const permissionsArray = Object.values(permissions);

    const checkedCount = permissionsArray.filter((value) => {
      return value;
    }).length;
    /*     console.log(checkedCount); */
    return checkedCount === 4;
  };

  const isIndeterminate = useCallback(
    (field: any) => {
      const permissions = watch(`permissions.${field}`);
      if (!permissions) return false;

      if (permissions) {
        const permissionsArray = Object.values(permissions);
        const checkedCount = permissionsArray.filter((value) => value).length;
        return checkedCount > 0 && checkedCount < 4;
      }
    },
    [watch]
  );
  const permissions = watch(`permissions.${name}`);

  useEffect(() => {
    setCheckboxValues(permissions);
  }, [permissions]);

  const handleCheckboxChange = (field: string, value: boolean) => {
    const updatedPermissions: ICheckboxContent = {
      create: value,
      view: value,
      update: value,
      deleted: value,
    };

    setCheckboxValues(updatedPermissions);
    setValue(`permissions.${name}`, updatedPermissions);
  };

  return (
    <>
      <FormGroup sx={{ textAlign: "start" }}>
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={isIndeterminate(name)}
              checked={isChecked()}
              onChange={(e) => {
                handleCheckboxChange(name, e.target.checked);
              }}
            />
          }
          label="Permitir todas as permissões"
        />

        <Controller
          name={`permissions.${name}.create`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    handleCheckFieldCheckbox("create", e.target.checked);
                  }}
                  checked={checkboxValues.create}
                />
              }
              label="Permitir criar as O.S"
            />
          )}
        />

        <Controller
          name={`permissions.${name}.view`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    handleCheckFieldCheckbox("view", e.target.checked);
                  }}
                  checked={checkboxValues.view}
                />
              }
              label="Permitir visualizar as O.S"
            />
          )}
        />

        <Controller
          name={`permissions.${name}.update`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    handleCheckFieldCheckbox("update", e.target.checked);
                  }}
                  checked={checkboxValues.update}
                />
              }
              label="Permitir editar as O.S"
            />
          )}
        />

        <Controller
          name={`permissions.${name}.deleted`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    handleCheckFieldCheckbox("deleted", e.target.checked);
                  }}
                  checked={checkboxValues.deleted}
                />
              }
              label="Permitir apagar as O.S"
            />
          )}
        />
      </FormGroup>
    </>
  );
};
