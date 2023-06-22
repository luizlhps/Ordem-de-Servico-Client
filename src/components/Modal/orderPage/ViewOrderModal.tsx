import React, { ReactNode, useEffect } from "react";
import TransitionsModal from "../Modal";
import { IconButton, Icon, Typography, Stack, Box, Divider, useTheme, Button } from "@mui/material";
import { AccordionList } from "@/components/AccordionList/AccordionList";

const style = {
  padding: "33px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  minHeight: "100%",

  "@media (max-width:364px)": {
    padding: "23px",
  },
};

const obj = [
  {
    service: {
      name: "Formatação",
      amount: "200,00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis quas eum perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni necessitatibus! Eligendi, animi?",
    },
  },
  {
    service: {
      name: "backup",
      amount: "100,00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis quas eum perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni necessitatibus! Eligendi, animi?",
    },
  },
  {
    service: {
      name: "backup",
      amount: "100,00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis quas eum perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni necessitatibus! Eligendi, animi?",
    },
  },
];

interface IProps {
  open: boolean;
  handleClose: () => void;
}

export const ViewOrderModal: React.FC<IProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  return (
    <>
      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <Box>
          <Stack direction={"row"} justifyContent={"space-between"} width={1} alignItems={"center"} flexWrap={"wrap"}>
            <Stack>
              <Typography variant="h2" fontWeight={600}>
                OS #23
              </Typography>
              <Typography fontWeight={300}>Veja os detalhes da O.S</Typography>
            </Stack>
            <Stack direction={"row"} gap={4} marginTop={2}>
              <Box flexDirection={"column"} display={"flex"}>
                <Typography fontSize={14} fontWeight={300}>
                  Data de entrada
                </Typography>
                <Typography fontSize={14} fontWeight={300}>
                  17/04/2023
                </Typography>
              </Box>
              <Box flexDirection={"column"} display={"flex"}>
                <Typography fontSize={14} fontWeight={300}>
                  Valor Total
                </Typography>
                <Typography fontSize={14} fontWeight={300}>
                  R$ 80,00
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Box
            marginTop={2}
            marginBottom={2}
            width={"100%"}
            height={"1px"}
            sx={{ color: theme.palette.custom?.grey, background: theme.palette.custom?.grey }}
          />
          <Stack width={"100%"} marginBottom={2}>
            <Typography>Cliente: Robierto Saltos</Typography>
            <Typography fontSize={14} fontWeight="300" marginBottom={2}>
              12 99239-9823
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <AccordionList dafaultOpen={true} icon="orders" subTitle="Veja sobre o equipamento" title="Equipamento">
              <Stack direction={"row"} spacing={6}>
                <Stack spacing={2}>
                  <Typography fontSize={14}>Equipamento</Typography>
                  <Typography fontSize={14}>Marca</Typography>
                  <Typography fontSize={14}>Modelo</Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography fontSize={14}>GTX 1060</Typography>
                  <Typography fontSize={14}>Galaxy</Typography>
                  <Typography fontSize={14}>Nvidia</Typography>
                </Stack>
              </Stack>
              <Box marginTop={5}>
                <Typography marginBottom={2} fontSize={14}>
                  Defeito
                </Typography>
                <Typography fontSize={14}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis
                  quas eum perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni
                  necessitatibus! Eligendi, animi?
                </Typography>
              </Box>
              <Box marginTop={5}>
                <Typography marginBottom={2} fontSize={14}>
                  Observação
                </Typography>
                <Typography fontSize={14}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis
                  quas eum perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni
                  necessitatibus! Eligendi, animi?
                </Typography>
              </Box>
            </AccordionList>

            <AccordionList
              description={`${obj.length} serviços`}
              icon="services"
              subTitle="Veja os serviços realizados"
              title="Serviços"
            >
              {obj.map((service, index) => {
                console.log(index);
                console.log(obj.length - 1);
                return (
                  <React.Fragment key={index}>
                    <Stack direction={"row"} spacing={6}>
                      <Stack spacing={2}>
                        <Typography fontSize={14}>Serviço</Typography>
                        <Typography fontSize={14}>Valor</Typography>
                      </Stack>
                      <Stack spacing={2}>
                        <Typography fontSize={14}>{service.service.name}</Typography>
                        <Typography fontSize={14}>{service.service.amount}</Typography>
                      </Stack>
                    </Stack>
                    <Box marginTop={5} marginBottom={4}>
                      <Typography marginBottom={2} fontSize={14}>
                        Descrição
                      </Typography>
                      <Typography fontSize={14}>{service.service.description}</Typography>
                    </Box>
                    {index !== obj.length - 1 && (
                      <Box
                        marginTop={2}
                        marginBottom={2}
                        width={"100%"}
                        height={"1px"}
                        sx={{ color: theme.palette.custom?.grey, background: theme.palette.custom?.grey }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </AccordionList>

            <AccordionList icon="technicalOpinion" subTitle="Veja o laudo" title="Laudo Técnico">
              <Box>
                <Typography marginBottom={2} fontSize={14}>
                  Laudo Técnico
                </Typography>
                <Typography fontSize={14}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus dolorem harum blanditiis
                  quas eum perspiciatis molestiae, quisquam culpa nemo, accusantium cumque ea eos fuga quod magni
                  necessitatibus! Eligendi, animi?
                </Typography>
              </Box>
            </AccordionList>
          </Stack>
        </Box>
        <Stack width={"100%"} alignItems={"center"}>
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Stack direction={"row"} gap={4} marginTop={2}>
              <Box flexDirection={"column"} display={"flex"}>
                <Typography fontSize={14} fontWeight={300}>
                  Desconto
                </Typography>
                <Typography fontSize={14} fontWeight={300}>
                  Valor
                </Typography>
              </Box>
              <Box flexDirection={"column"} display={"flex"}>
                <Typography fontSize={14} fontWeight={300}>
                  R$ 80,00
                </Typography>
                <Typography fontSize={14} fontWeight={300}>
                  17/04/2023
                </Typography>
              </Box>
            </Stack>
            <Box display={"flex"} gap={2}>
              <Typography fontSize={14} fontWeight={300}>
                Valor Total
              </Typography>
              <Typography fontSize={14} fontWeight={300}>
                R$ 80,00
              </Typography>
            </Box>
          </Stack>

          <Button onClick={handleClose} sx={{ width: 173, marginTop: 4, height: "100%" }} variant="contained">
            Fechar
          </Button>
        </Stack>
      </TransitionsModal>
    </>
  );
};
