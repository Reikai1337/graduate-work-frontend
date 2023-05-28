import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { FC } from "react";
import * as yup from "yup";

import { Button, Stack, TextField } from "@mui/material";

import { registerUser } from "../../api/auth";
import { RolesSelect } from "../roles-select";

export type RegisterUserFormProps = {};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(12, "Maximum 12 characters")
    .required("Required"),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(12, "Maximum 12 characters")
    .required("Required"),
  login: yup
    .string()
    .required("Login is required")
    .max(12, "Maximum 12 characters")
    .required("Required"),
  email: yup
    .string()
    .email()
    .required("Email is required")
    .required("Required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters")
    .max(12, "Maximum 12 characters")
    .required("Required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
  role: yup.string().required("Required"),
});

export const CreateUserForm: FC<RegisterUserFormProps> = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      name: "",
      lastName: "",
      role: "User" as const,
      passwordConfirmation: "",
      email: "",
    },
    onSubmit: async ({ login, password, name, role, lastName, email }) => {
      try {
        const res = await registerUser({
          name,
          login,
          initialRole: role,
          password,
          lastName,
          email,
        });
        formik.resetForm();
        console.log(res);
        enqueueSnackbar("Ласкаво просимо", { variant: "success" });
      } catch (error) {
        //@ts-ignore
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log("error");

        // enqueueSnackbar()
      }
    },
    validationSchema,
  });

  return (
    <Stack
      padding={1}
      spacing={1}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: "500px",
      }}
    >
      <TextField
        label="Ім'я"
        name="name"
        variant="outlined"
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        label="Призвище"
        name="lastName"
        variant="outlined"
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.lastName && formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
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
      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
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
        <TextField
          fullWidth
          label="Повнорний пароль"
          name="passwordConfirmation"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
          )}
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
      </Stack>
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <RolesSelect
        disabled={formik.isSubmitting}
        value={formik.values.role}
        onChange={(role) => formik.setFieldValue("role", role)}
        error={Boolean(formik.touched.role && formik.errors.role)}
        helperText={formik.touched.role && formik.errors.role}
      />
      <Button
        disabled={formik.isSubmitting}
        color="success"
        variant="contained"
        type="submit"
      >
        Зареєструватися
      </Button>
    </Stack>
  );
};
