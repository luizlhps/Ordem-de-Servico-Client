import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Dialog, { DialogProps } from "@mui/material/Dialog";

interface IModal {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  style: any;
}

export default function TransitionsModal({ open, handleClose, children, style }: IModal) {
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"body"}
        maxWidth={"md"}
        sx={{
          ".MuiDialog-paper": {
            backgroundImage: "none",
            height: smDown ? "100%" : "none",
            width: smDown ? "100%" : "80%",
            maxWidth: smDown ? "100%!important" : "md",
            margin: smDown ? 0 : "32px",
          },
        }}
      >
        <Box sx={style}>{children}</Box>
      </Dialog>
    </div>
  );
}
