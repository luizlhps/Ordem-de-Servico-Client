import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";
import { servicesApi } from "@/services/api/servicesApi";
import { useEffect } from "react";
import { constumersApi } from "@/services/api/costumersApi";
import { useRouter } from "next/router";

export const ColumnsDataGrid = (
  theme: any,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  modalDeleteHandleOpen: () => void
) => {
  const router = useRouter();

  const handleRemove = async (data: any) => {
    modalDeleteHandleOpen();
    setSelectedItem(data);
  };

  const handleUpdate = async (data: any) => {
    router.push(`/clients/update/${data._id}`);
    setSelectedItem(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Contato",
      flex: 2,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "cpfOrCnpj",
      headerName: "CPF/CNPJ",
      flex: 1.2,
      minWidth: 150,
      description: "Contato",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "createdAt",
      headerName: "Criado em",
      type: "number",
      flex: 1,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "status",
      headerName: "Status",
      description: "Status",
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
                handleUpdate(params.row);
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
