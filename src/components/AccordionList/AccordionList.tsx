import React, { useState } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { ServicesSVG } from "../../../public/icon/SVGS/IconsSVG";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const AccordionList = ({ children }: any) => {
  const theme = useTheme();

  const AccodionOpen = false;
  const [open, setOpen] = useState<boolean>(AccodionOpen);

  const handleButton = () => {
    setOpen((old) => !old);
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexWrap={"wrap"}>
        <Box display={"flex"} alignItems={"center"}>
          <Box
            width={45}
            height={45}
            sx={{
              border: "solid 1px",
              borderColor: theme.palette.custom?.grey,
              borderRadius: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              marginRight: 3,
            }}
          >
            <ServicesSVG color={theme.palette.primary.main} />
          </Box>

          <Box maxWidth={280}>
            <Typography fontWeight={600}>Equipamento</Typography>
            <Typography fontSize={14} fontWeight={300}>
              Informações sobre o equipamento
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} gap={2}>
          <Box
            height={40}
            alignItems={"center"}
            border={1}
            borderRadius={10}
            minWidth={170}
            borderColor={theme.palette.custom?.grey}
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography fontSize={14}>2 serviços</Typography>
          </Box>
          <Box
            onClick={handleButton}
            sx={{ cursor: "pointer" }}
            border={1}
            borderRadius={10}
            width={40}
            height={40}
            borderColor={theme.palette.custom?.grey}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {open === true && <KeyboardArrowDownIcon />}
            {open === false && <KeyboardArrowRightIcon />}
          </Box>
        </Box>
      </Box>

      <Box
        marginTop={3}
        sx={{
          border: open ? "solid 1px" : 0,
          borderColor: theme.palette.custom?.grey,
          borderRadius: "20px",
          maxHeight: open ? "500px" : "0px",
          transition: open ? "max-height 1s" : "all 0.4s",
          overflow: "hidden",
        }}
      >
        <Box padding={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis quas eum
          perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni necessitatibus!
          Eligendi, animi?
        </Box>
      </Box>
    </>
  );
};
