import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";
import { IFinance } from "../../../../types/finance";

export const financeColumnDataGrid = (
  theme: any,
  modalUpdateHandleOpen: () => void,
  setSelectedItemUpdate: React.Dispatch<React.SetStateAction<IFinance | undefined>>,
  modalDeleteHandleOpen: () => void,
  modalViewHandleOpen: () => void
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
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "title",
      headerName: "Título",
      flex: 1,
      minWidth: 200,
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
      flex: 0.5,
      minWidth: 100,
      description: "Contato",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => {
        const value = params.value.toString();
        if (typeof value === "string") {
          const formattedValue = value;
          return Number(formattedValue).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        }
        return value;
      },
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
      field: "actions",
      headerName: "Status",
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
