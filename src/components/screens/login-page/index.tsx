import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack } from "@mui/material";

import { useIsMobile } from "../../../hooks/isMbile";
import { REGISTER_PAGE_ROUTE } from "../../../routes/dictionary";
import { Header } from "../../app-bar";
import { LoginForm } from "../../login-form";
import { PageWrapper } from "../../page-wrapper";

export type LoginPageProps = {};

export const LoginPage: FC<LoginPageProps> = ({}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header />
      <Stack
        spacing={1}
        height={`calc(100vh - ${isMobile ? "56px" : "68.5px"})`}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <LoginForm />
        <Button
          onClick={() => {
            navigate(REGISTER_PAGE_ROUTE);
          }}
          variant="outlined"
        >
          Зареєструватися
        </Button>
      </Stack>
    </PageWrapper>
  );
};
