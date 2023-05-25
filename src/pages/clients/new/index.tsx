import { useState, useContext, useEffect } from "react";

import { FormRegisterCostumerContext, FormRegisterCostumerProvider } from "@/contexts";

import { HeaderLayout } from "@/components";

import { Container, Divider, Stack, Typography, useTheme, Button } from "@mui/material";
import styled from "styled-components";
import NewCostumer from "@/components/CostumerPage/NewCostumer";

export default function Home() {
  return (
    <FormRegisterCostumerProvider>
      <>
        <NewCostumer />
      </>
    </FormRegisterCostumerProvider>
  );
}
