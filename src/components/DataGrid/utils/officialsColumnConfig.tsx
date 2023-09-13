import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";

import { format } from "date-fns";
import { IUser } from "../../../../types/users";
import { normalizePhoneNumber } from "@/utils/Masks";

export const officialsColumnConfig = (
  theme: any,
  modalUpdateHandleOpen: () => void,
  setSelectedItemUpdate: React.Dispatch<React.SetStateAction<IUser | undefined>>,
  modalDeleteHandleOpen: () => void,
  modalViewHandleOpen: () => void
) => {
  const handleRemove = async (data: IUser) => {
    modalDeleteHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleUpdate = async (data: IUser) => {
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleView = (data: IUser) => {
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "OS", width: 100 },

    {
      field: "name",
      headerName: "Home",
      flex: 1,
      minWidth: 250,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
      minWidth: 300,
      description: "Contato",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Celular",
      flex: 3,
      minWidth: 150,
      description: "Contato",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params?.value) {
          const phoneFormatted = normalizePhoneNumber(params.value);
          return phoneFormatted;
        }
      },
    },
    {
      field: "group",
      headerName: "Cargo",
      flex: 3,
      minWidth: 300,
      description: "Contato",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        return params.value?.name;
      },
    },

    {
      field: "createdAt",
      headerName: "Criado em",
      type: "number",
      flex: 0.5,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        if (params?.value) {
          const dataFormatada = format(new Date(params.value), "dd/MM/yyyy HH:mm:ss");
          return dataFormatada;
        }
      },
    },

    {
      field: "actions",
      headerName: "Ações",
      description: "Ações",
      flex: 1,
      minWidth: 150,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            style={{
              color: theme.palette.primary.main,
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "right",
            }}
          >
            <IconButton
              onClick={() => {
                handleView(params.row);
              }}
            >
              <RemoveRedEyeOutlinedIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                handleUpdate(params.row);
              }}
            >
              <ModeOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => handleRemove(params.row)}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return columnConfig;
};
