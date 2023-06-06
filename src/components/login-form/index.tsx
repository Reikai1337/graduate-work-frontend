import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

import { loginRequest } from "../../api/auth";
import { AUTH_TOKEN_KEY } from "../../constants";
import { useUserContext } from "../../contexts/user-context";
import { PRODUCT_PAGE_ROUTE } from "../../routes/dictionary";

export type LoginFormProps = {};

const validationSchema = yup.object({
  login: yup.string().required("Login is required").required("Required"),

  password: yup.string().required("Password is required").required("Required"),
});

export const LoginForm: FC<LoginFormProps> = ({}) => {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async ({ login, password }) => {
      try {
        const res = await loginRequest({ login, password });
        localStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
        setUserData(res.data.user);
        navigate(PRODUCT_PAGE_ROUTE);
        enqueueSnackbar("Ласкаво просимо", { variant: "success" });
      } catch (error) {
        //@ts-ignore
        enqueueSnackbar("Невірний логін або пароль", { variant: "error" });
      }
    },
    validationSchema,
  });

  return (
    <Paper
      sx={{
        padding: 1,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Авторизація
      </Typography>
      <Stack
        padding={1}
        spacing={1}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          label="Логін"
          name="login"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.login}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.login && formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <TextField
          label="Пароль"
          name="password"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          disabled={
            formik.isSubmitting ||
            !formik.values.login ||
            !formik.values.password
          }
          color="success"
          variant="contained"
          type="submit"
        >
          Увійти
        </Button>
      </Stack>
    </Paper>
  );
};
