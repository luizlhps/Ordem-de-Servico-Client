import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

interface Iprops {
  image: string;
  open: boolean;
  close: () => void;
}

export const CropPhoto = ({ image, open, close }: Iprops) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Dialog
        onClose={close}
        open={open}
        sx={{
          ".MuiDialog-paper": {
            backgroundImage: "none",
            height: smDown ? "100%" : "none",
            width: smDown ? "100%" : "80%",
            maxWidth: smDown ? "100%!important" : "sd",
            margin: smDown ? 0 : "32px",
            borderRadius: smDown ? 0 : "12px",
          },
        }}
      >
        <DialogContent
          dividers
          sx={{
            background: "#333",
            position: "relative",
            height: 400,
            width: "auto",
            minWidth: { sm: 300 },
          }}
        >
          <Cropper image={image} crop={crop} zoom={zoom} aspect={1} onZoomChange={setZoom} onCropChange={setCrop} />
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
          <Box sx={{ width: "100%", mb: 1 }}>
            <Box>
              <Typography>Zoom</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, value) => setZoom(value as number)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Crop</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
