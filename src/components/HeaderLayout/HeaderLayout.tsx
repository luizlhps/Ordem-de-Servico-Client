"use client";

import React, { useEffect, useState } from "react";
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
  const [date, setDate] = useState(new Date());

  // Formata a data para o formato desejado (exemplo: DD MMM yyyy HH:mm:ss)
  const formattedDate = format(currentDate, "dd MMM yyyy", { locale: ptBR });

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  //Theme
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        color={theme.palette.primary.main}
      >
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
            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
