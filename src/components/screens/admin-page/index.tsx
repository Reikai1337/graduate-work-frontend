import { FC } from "react";

import { Box, Typography } from "@mui/material";

import { Header } from "../../app-bar";
import { CreateUserForm } from "../../register-form";

export type AdminPageProps = {};

export const AdminPage: FC<AdminPageProps> = ({}) => {
  return (
    <Box>
      <Header />
      <Box
        height={"calc(100vh - 68.5px)"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Створити каристувача</Typography>
        <CreateUserForm hint={"Користувач створений"} />
      </Box>
    </Box>
  );
};
