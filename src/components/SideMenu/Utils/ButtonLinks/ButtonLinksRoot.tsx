import React, { ReactNode } from "react";
import { ListItemButton, ListItemIcon, useTheme } from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/navigation";

//interface
interface IButtomLinks {
  href?: string;
  children: ReactNode;
  width: number | "auto";
  justifyContent?: "center" | "flex-end" | "flex-start";
  onClick?: () => void;
}
//Styles
const ListItemButtonCustom = styled(ListItemButton)``;

export const ButtonLinksRoot: React.FC<IButtomLinks> = ({ href, children, onClick, width, justifyContent }) => {
  const router = useRouter();
  const theme = useTheme();
  const handleClick = () => {
    if (href) {
      router.replace(`/${href}`);
    }

    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <div style={{ width }}>
        <ListItemButtonCustom
          onClick={handleClick}
          sx={{
            justifyContent: justifyContent ? justifyContent : "flex-start",
            ".MuiListItemText-root": {
              span: {
                color: theme.palette.grey[300],
              },
            },
            "&:hover": {
              background: "none",
              borderRadius: 2,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 29 }}>{children}</ListItemIcon>
        </ListItemButtonCustom>
      </div>
    </>
  );
};
