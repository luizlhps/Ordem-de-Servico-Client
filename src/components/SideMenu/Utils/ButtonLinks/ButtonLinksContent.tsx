import { ListItemText } from "@mui/material";
import React from "react";

export const ButtonLinksContent = ({ label }: { label: string }) => {
  return <ListItemText sx={{ marginLeft: 0.5 }} primary={label} />;
};
