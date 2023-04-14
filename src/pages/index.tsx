import React, { useState, useEffect } from "react";

import { Box, Slider, Button, Typography, useTheme, TextField, Stack } from "@mui/material";
import styled from "styled-components";
import { SideMenu } from "@/components";
import ptBR from "date-fns/locale/pt-BR"; // Importa o locale do português do Brasil
import { format } from "date-fns";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  GridColDef,
  GridCheckCircleIcon,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function Home() {
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
              borderColor: "red",
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

  const currentDate = new Date(); // Define o estado para a data atual

  // Formata a data para o formato desejado (exemplo: DD MMM yyyy HH:mm:ss)
  const formattedDate = format(currentDate, "dd MMM yyyy", { locale: ptBR });
  const formattedclock = format(currentDate, " HH:mm", {});
  //style custom

  const theme = useTheme();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box>
          <Typography variant="h1" fontWeight={600}>
            Clientes
          </Typography>
          <Typography fontWeight={500} color={theme.palette.secondary.main}>
            Bem vindo a area ordem de serviço
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.grey[700]}>{formattedDate}</Typography>
          <Typography variant="h1" fontWeight={600}>
            {formattedclock}
          </Typography>
        </Box>
      </Stack>
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
        <Button size="medium" variant="contained" sx={{ borderRadius: 3 }}>
          Novo
        </Button>
      </Stack>

      <Box sx={{ height: "67vh", width: "100%", marginTop: 3 }}>
        <DataGrid
          rows={rows}
          slots={{
            pagination: CustomPagination,
          }}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 9 } },
          }}
          pageSizeOptions={[9]}
        />
      </Box>
    </>
  );
}
