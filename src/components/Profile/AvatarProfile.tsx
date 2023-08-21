import { Avatar, Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import React, { useContext, useRef, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { SessionContext } from "@/auth/SessionProvider";
import { usersApi } from "@/services/api/users";
import { CropPhoto } from "../CropPhoto";

interface IProps {}

export const AvatarProfile = () => {
  const { user, loading } = useContext(SessionContext);

  const containerAvatar = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [selectImg, setSelectImg] = useState<string | ArrayBuffer | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const fileHandler = () => {
    containerAvatar.current?.click();
  };

  const fileChangeHandler = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setSelectImg(reader.result);

        if (containerAvatar.current) {
          containerAvatar.current.value = "";
        }
      };
    }
  };

  return (
    <>
      <CropPhoto setAvatar={setAvatar} image={selectImg as string} open={modalOpen} close={handleCloseModal} />
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
        <input
          defaultValue={""}
          accept=".jpge,.png,"
          onChange={(val) => {
            if (val.target && val.target.files && val.target.files[0]) fileChangeHandler(val.target.files[0]);
            handleOpenModal();
          }}
          type="file"
          id="inputao"
          style={{ display: "none" }}
          ref={containerAvatar}
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
        {!loading && (
          <>
            <Avatar
              className="avatar"
              sx={{
                width: 150,
                height: 150,
              }}
              rel="stylesheet"
              src={avatar ? (avatar as string) : user?.avatar}
            />
          </>
        )}
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
