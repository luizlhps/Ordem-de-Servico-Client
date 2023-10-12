import { Box, Button, Divider, Menu, Stack, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";

import TuneIcon from "@mui/icons-material/Tune";
import { UseFormHandleSubmit, UseFormReset } from "react-hook-form";

interface IProps {
  children: ReactNode;
  reset: UseFormReset<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
}

export interface IRangeDateFilter {
  dateFrom: string | null | undefined;
  dateTo: string | null | undefined;
}

export const FilterRoot = ({ children, reset, handleSubmit, onSubmit }: IProps) => {
  //menuFilter
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box position={"relative"}>
      <Button onClick={handleOpenMenu} sx={{ borderRadius: 2, width: 90 }} startIcon={<TuneIcon />}>
        Filtro
      </Button>
      <Menu
        onClose={handleCloseMenu}
        id="account-menu"
        open={openMenu}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography padding={"6px 14px"}>Filtro</Typography>
        <Divider />
        {children}

        <Stack padding={2} marginTop={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <Button
            onClick={() => {
              reset({
                dateTo: null,
                dateFrom: null,
                customer: null,
                status: null,
              });
            }}
          >
            Resetar Tudo
          </Button>
          <Button
            onClick={() => {
              handleCloseMenu();
              handleSubmit(onSubmit)();
            }}
            size="medium"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Aplicar
          </Button>
        </Stack>
      </Menu>
    </Box>
  );
};
