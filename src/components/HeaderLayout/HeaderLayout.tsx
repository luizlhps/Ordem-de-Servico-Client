import React from "react";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"; // Importa o locale do português do Brasil

//interface

interface IpropsLayoutTheme {
  title: string;
  subTitle: string;
}

export const HeaderLayout: React.FC<IpropsLayoutTheme> = ({ title, subTitle }) => {
  const currentDate = new Date(); // Define o estado para a data atual

  // Formata a data para o formato desejado (exemplo: DD MMM yyyy HH:mm:ss)
  const formattedDate = format(currentDate, "dd MMM yyyy", { locale: ptBR });
  const formattedclock = format(currentDate, " HH:mm", {});

  //Theme
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box>
          <Typography variant="h1" fontWeight={600}>
            {title}
          </Typography>
          <Typography fontWeight={500} color={theme.palette.secondary.main}>
            {subTitle}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.grey[700]}>{formattedDate}</Typography>
          <Typography variant="h1" fontWeight={600}>
            {formattedclock}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
