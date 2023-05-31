import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Paper, Typography } from "@mui/material";

import { AUTH_TOKEN_KEY } from "../../../constants";
import { useUserContext } from "../../../contexts/user-context";
import { PRODUCT_PAGE_ROUTE } from "../../../routes/dictionary";
import { Header } from "../../app-bar";
import { MainWrapper, PageWrapper } from "../../page-wrapper";
import { CreateUserForm } from "../../register-form";

export type RegisterPageProps = {};

export const RegisterPage: FC<RegisterPageProps> = ({}) => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header />
      <MainWrapper
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Paper sx={{ padding: 1 }}>
          <Typography variant="h5" align="center">
            Зареєструватися
          </Typography>
          <CreateUserForm
            withRoleSelect={false}
            onSuccess={(res) => {
              localStorage.setItem(AUTH_TOKEN_KEY, res.token);
              setUserData(res.user);
              navigate(PRODUCT_PAGE_ROUTE);
            }}
          />
        </Paper>
      </MainWrapper>
    </PageWrapper>
  );
};
