import { DataGridLayout, HeaderLayout } from "@/components";
import { constumersApi } from "@/services/api/costumersApi";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";

const data = constumersApi.getAllCostumers().then((res) => {
  console.log(res);
});

export default function Client() {
  const router = useRouter();
  //style custom

  //Config Columns and Rows
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nome",
      headerName: "Nome Completo",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contato",
      headerName: "Contato",
      type: "number",
      flex: 1,
      description: "Contato",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "endress",
      headerName: "Endereço",
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
  const rows = [
    {
      id: 1,
      nome: "MUI",
      email: 28000,
      contato: "41 44343-4334",
      endress: "um endereço bem gra...",
    },
    {
      id: 2,
      nome: "MUI",
      email: 28000,
      contato: "Ope",
      endress: "O",
    },
    {
      id: 3,
      nome: "MUI",
      email: "emailbemgrande@emailgrande.com",
      contato: "O",
      endress: "Op",
    },
    {
      id: 4,
      nome: "MUI",
      email: 28000,
      contato: "Op",
      endress: "O",
    },
  ];

  //Theme
  const theme = useTheme();

  //Link
  function handleClickLink() {
    router.push("/clients/new");
  }

  return (
    <>
      <HeaderLayout subTitle="Bem vindo a area ordem de serviço" title="Clientes" />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Search"
          variant="filled"
          size="small"
          sx={{
            marginTop: 3,
            width: 180,
          }}
        />
        <Button size="medium" variant="contained" sx={{ borderRadius: 3 }} onClick={handleClickLink}>
          Novo
        </Button>
      </Stack>
      <DataGridLayout rows={rows} columns={columns} PageSize={10} />
    </>
  );
}
