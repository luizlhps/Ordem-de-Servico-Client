import React, { ReactNode, useEffect } from "react";
import TransitionsModal from "../Modal";
import { IconButton, Icon, Typography, Stack, Box, Divider, useTheme, Button, useMediaQuery } from "@mui/material";
import { AccordionList } from "@/components/AccordionList/AccordionList";
import { Order } from "../../../../types/order";
import dayjs, { Dayjs } from "dayjs";
import { normalizePhoneNumber } from "@/utils/Masks";

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
  selectedItem: Order | undefined;
}

export const ViewOrderModal: React.FC<IProps> = ({ open, handleClose, selectedItem }) => {
  const smallphoneMedia = useMediaQuery("(max-width:364px)");
  console.log(selectedItem);

  const theme = useTheme();
  return (
    <>
      <TransitionsModal handleClose={handleClose} open={open} style={style}>
        <Box width={"100%"}>
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
                  {dayjs(selectedItem?.dateEntry).locale("pt-br").format("YYYY/MM/DD HH:mm:ss")}
                </Typography>
              </Box>
              <Box flexDirection={"column"} display={"flex"}>
                <Typography fontSize={14} fontWeight={300}>
                  Valor Total
                </Typography>
                <Typography fontSize={14} fontWeight={300}>
                  R$ {selectedItem?.totalAmount.toFixed(2)}
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
            <Typography textTransform={"capitalize"}>Cliente: {selectedItem?.customer.name}</Typography>
            <Typography fontSize={14} fontWeight="300" marginBottom={2}>
              {normalizePhoneNumber(selectedItem?.customer.phone)}
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
                  <Typography textTransform={"capitalize"} fontSize={14}>
                    {selectedItem?.equipment}
                  </Typography>
                  <Typography textTransform={"capitalize"} fontSize={14}>
                    {selectedItem?.brand}
                  </Typography>
                  <Typography textTransform={"capitalize"} fontSize={14}>
                    {selectedItem?.model}
                  </Typography>
                </Stack>
              </Stack>
              <Box marginTop={5}>
                <Typography marginBottom={2} fontSize={14}>
                  Defeito
                </Typography>
                <Typography fontSize={14}>{selectedItem?.defect}</Typography>
              </Box>
              <Box marginTop={5}>
                <Typography marginBottom={2} fontSize={14}>
                  Observação
                </Typography>
                <Typography fontSize={14}>{selectedItem?.observation}</Typography>
              </Box>
            </AccordionList>

            <AccordionList
              description={`${selectedItem?.services.length} serviços`}
              icon="services"
              subTitle="Veja os serviços realizados"
              title="Serviços"
            >
              {selectedItem?.services.map((service, index) => {
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
                        <Typography fontSize={14}>{service.title}</Typography>
                        <Typography fontSize={14}>R$ {service.amount.toFixed(2)}</Typography>
                      </Stack>
                    </Stack>
                    <Box marginTop={5} marginBottom={4}>
                      <Typography marginBottom={2} fontSize={14}>
                        Descrição
                      </Typography>
                      <Typography fontSize={14}>{service.description}</Typography>
                    </Box>
                    {index !== selectedItem?.services.length - 1 && (
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
                <Typography fontSize={14}>{selectedItem?.technicalOpinion}</Typography>
              </Box>
            </AccordionList>
          </Stack>
        </Box>
        <Stack width={"100%"} alignItems={"center"}>
          <Stack
            gap={1}
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
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
                  R$ {selectedItem?.discount.toFixed(2)}
                </Typography>
                <Typography fontSize={14} fontWeight={300}>
                  17/04/2023
                </Typography>
              </Box>
            </Stack>
            <Stack>
              <Typography fontSize={14} fontWeight={300}>
                Data de saída
              </Typography>
              <Typography fontSize={14} fontWeight={300}>
                {selectedItem?.exitDate ? selectedItem?.exitDate : "DD/MM/YYYY"}
              </Typography>
            </Stack>
          </Stack>

          <Button onClick={handleClose} sx={{ width: 173, marginTop: 4, height: "100%" }} variant="contained">
            Fechar
          </Button>
        </Stack>
      </TransitionsModal>
    </>
  );
};
