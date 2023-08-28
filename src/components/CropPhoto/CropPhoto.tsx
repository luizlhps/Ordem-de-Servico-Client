import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import CropIcon from "@mui/icons-material/Crop";
import getCroppedImg from "./CroppedImage";
import { SessionContext } from "@/auth/SessionProvider";
interface Iprops {
  rect?: boolean;
  image: string;
  open: boolean;
  close: () => void;
  setAvatar: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  uploudAvatar: (formData: FormData, closeModal: () => void) => Promise<void>;
}

export const CropPhoto = ({ image, open, close, setAvatar, uploudAvatar, rect }: Iprops) => {
  const { fetchMyInfo } = useContext(SessionContext);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("md"));

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const cropImage = async () => {
    try {
      if (croppedArea) {
        const blob = await getCroppedImg(image, croppedArea);
        console.log(blob);
        if (blob) {
          const ext = blob.type.split("/")[1];

          const reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onload = (event) => {
            setAvatar(reader.result);
          };

          const formData = new FormData();
          formData.append("avatar", blob, `avatar.${ext}`);
          await uploudAvatar(formData, close);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

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
          <Cropper
            cropShape={rect ? "rect" : "round"}
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
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
            <Button variant="outlined" onClick={close}>
              Cancel
            </Button>
            <Button startIcon={!loading ? <CropIcon /> : ""} onClick={cropImage} variant="contained" disabled={loading}>
              {loading ? (
                <>
                  <CircularProgress size={25} />
                </>
              ) : (
                <> Crop</>
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
