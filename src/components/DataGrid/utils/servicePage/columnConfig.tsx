import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";
import { servicesApi } from "@/services/api/servicesApi";
import { useEffect } from "react";

export const columnsDataGrid = (
  theme: any,
  fetchApi: any,
  modalUpdateHandleOpen: () => void,
  setSelectedItemUpdate: React.Dispatch<React.SetStateAction<string>>,
  modalDeleteHandleOpen: () => void
) => {
  const handleRemove = async (data: any) => {
    modalDeleteHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleUpdate = async (data: any) => {
    /* await servicesApi.updateServices(data); */
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "title",
      headerName: "Título",
      flex: 1,
      minWidth: 5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 2,
      minWidth: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: "Valor",
      type: "number",
      flex: 0,
      minWidth: 22,
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
