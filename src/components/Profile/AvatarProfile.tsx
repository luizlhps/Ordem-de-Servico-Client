import { Avatar, Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import React, { useContext, useRef, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { SessionContext } from "@/auth/SessionProvider";

interface IProps {
  control: Control<FieldValues, any>;
}

export const AvatarProfile = ({ control }: IProps) => {
  const { user } = useContext(SessionContext);

  const containerAvatar = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

  const fileHandler = () => {
    containerAvatar.current?.click();
  };

  const fileChangeHandler = (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    /*     Api.post("aaaaa", formData, {
      headers: [
        'Contet-Type': 'multipart/form-data'
      ]
    }) */
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatar(reader.result);
      };
    }
  };

  return (
    <>
      <Box
        onClick={fileHandler}
        marginTop={5}
        position={"relative"}
        sx={{
          borderRadius: "50%",
          ".icon": {
            display: "none",
          },
          "&:hover": {
            ".icon": {
              display: "flex!important",
              cursor: "pointer",
            },
            ".avatar": {
              filter: "brightness(30%)",
              cursor: "pointer",
            },
          },
        }}
      >
        <Controller
          name="avatar"
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <input
                defaultValue={""}
                accept=".jpge,.png,"
                onChange={(val) => {
                  fileChangeHandler(val.target.files[0]);
                  onChange(val);
                }}
                type="file"
                id="inputao"
                style={{ display: "none" }}
                ref={containerAvatar}
              />
            </>
          )}
        />
        <CameraAltIcon
          className="icon"
          sx={{
            width: 30,
            height: 30,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-20%)",
            zIndex: 1,
          }}
        />
        <Avatar
          className="avatar"
          sx={{
            width: 150,
            height: 150,
          }}
          src={avatar ? avatar : user?.avatar}
        />
      </Box>
      <Typography variant="h1" marginTop={1}>
        Avatar
      </Typography>
      <Typography fontWeight={300} fontSize={14}>
        Min 200x 200 .PNG ou .JPG
      </Typography>
    </>
  );
};
