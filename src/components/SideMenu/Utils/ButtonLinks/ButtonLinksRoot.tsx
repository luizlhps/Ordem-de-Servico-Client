import React, { ReactNode } from "react";
import { ListItemButton, useTheme } from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/navigation";

//interface
interface IButtomLinks {
  href?: string;
  children: ReactNode;
  label: string;
  width: number | "auto";
  onClick?: () => void;
}
//Styles
const ListItemButtonCustom = styled(ListItemButton)``;

export const ButtonLinks: React.FC<IButtomLinks> = ({ href, children, onClick, width }) => {
  const router = useRouter();
  const theme = useTheme();

  const handleClick = () => {
    if (href) {
      router.push(href);
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
          {children}
        </ListItemButtonCustom>
      </div>
    </>
  );
};
