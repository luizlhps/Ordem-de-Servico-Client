import { GridColDef } from "@mui/x-data-grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export const columnsDataGrid = (theme: any) => {
  const columnConfig: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "title",
      headerName: "Título",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 2,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "amount",
      headerName: "Valor",
      type: "number",
      flex: 0,
      description: "Contato",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "createdAt",
      headerName: "Criado em",
      type: "number",
      flex: 1,
      description: "Endereço",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "status",
      headerName: "Status",
      description: "Status",
      flex: 1,
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
            <RemoveRedEyeOutlinedIcon />
            <ModeOutlinedIcon />
            <CloseRoundedIcon />
          </div>
        );
      },
    },
  ];
  return columnConfig;
};
