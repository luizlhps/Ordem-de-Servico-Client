import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";

import { format } from "date-fns";

export const columnsDataGrid = (
  theme: any,
  modalUpdateHandleOpen: () => void,
  setSelectedItemUpdate: React.Dispatch<React.SetStateAction<string>>,
  modalDeleteHandleOpen: () => void
) => {
  const handleRemove = async (data: any) => {
    modalDeleteHandleOpen();
    setSelectedItemUpdate(data);
  };

  const handleUpdate = async (data: any) => {
    modalUpdateHandleOpen();
    setSelectedItemUpdate(data);
  };

  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "OS", width: 100 },

    {
      field: "brand",
      headerName: "Marca",
      flex: 0.5,
      minWidth: 100,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "model",
      headerName: "Modelo",
      type: "number",
      flex: 0.5,
      minWidth: 100,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "equipment",
      headerName: "Equipamento",
      flex: 1,
      minWidth: 250,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "defect",
      headerName: "Defeito",
      flex: 3,
      minWidth: 300,
      description: "Contato",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "dateEntry",
      headerName: "Criado em",
      type: "number",
      flex: 0.5,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
      valueFormatter(params: any) {
        const dataFormatada = format(new Date(params.value), "dd/MM/yyyy HH:mm:ss");
        return dataFormatada;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      flex: 1,
      minWidth: 200,
      description: "Endereço",
      headerAlign: "left",
      align: "left",

      valueFormatter(params) {
        return params.value.name;
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
