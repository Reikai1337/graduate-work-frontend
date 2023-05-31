import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { FC } from "react";
import * as yup from "yup";

import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { uploadImage } from "../../api/image";
import { updateProduct } from "../../api/product";
import { CreateProductParams, ProductResponse } from "../../api/product/types";
import { ImageUploader } from "../image-uploader";
import { ProductTypeSelect } from "../product-type-select";

const validationSchema = yup.object({
  name: yup.string().required("Ім'я обовязкове"),
  description: yup.string().required("Опис обовязковий"),
  price: yup.number().required("Ціна is обовязкова"),
  sale: yup.number().max(100, "Максимальна знижка це 100%"),
  type: yup.string().required("Тип обовязковий"),
  weight: yup.number().required("Вага обовязкова"),
  weightType: yup.string().required("Тип ваги обовязковий"),
  barcode: yup.string().required("Штрих-код обовязковий"),
  boxSize: yup.string().required("Розмір ящика обовязковий"),
  package: yup.string().required("Упаковка обовязкова"),
  // image: yup.string().required("Фото обовязково"),
  quantityPerBox: yup.number().required("Кількість у ящику обовязково"),
  storageConditions: yup
    .string()
    .required("Строк та умови зберігання обовязково"),
});

export type EditProductFormProps = {
  product: ProductResponse;
  imageFile: File;
  onSubmit: (product: ProductResponse) => void;
};

export const EditProductForm: FC<EditProductFormProps> = ({
  product,
  imageFile,
  onSubmit,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik<CreateProductParams & { image: File | null }>({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      sale: product.sale,
      type: product.type.name,
      weight: product.weight,
      weightType: product.weightType,
      imageId: null,
      image: imageFile,
      barcode: product.barcode,
      boxSize: product.boxSize,
      package: product.package,
      quantityPerBox: product.quantityPerBox,
      storageConditions: product.storageConditions,
    },
    onSubmit: async ({
      description,
      name,
      price,
      sale,
      type,
      weight,
      weightType,
      image,
      barcode,
      boxSize,
      package: productPackage,
      quantityPerBox,
      storageConditions,
    }) => {
      try {
        const imageRes = await uploadImage(image);
        const res = await updateProduct(product.id, {
          description,
          name,
          price,
          sale,
          type,
          weight,
          weightType,
          imageId: imageRes?.data ? imageRes.data.id : null,
          barcode,
          boxSize,
          package: productPackage,
          quantityPerBox,
          storageConditions,
        });
        enqueueSnackbar(`Продукт ${name} оновлено`, {
          variant: "success",
        });
        onSubmit(res.data);
      } catch (error) {
        //@ts-ignore
        enqueueSnackbar("Помилка", { variant: "error" });
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
        maxWidth: "500px",
        minWidth: "300px",
      }}
    >
      <Typography textAlign="center" variant="h4">
        Редагування
      </Typography>
      <ProductTypeSelect
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.type}
        onChange={(type) => formik.setFieldValue("type", type)}
        error={Boolean(formik.touched.type && formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
      />
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
        label="Опис"
        name="description"
        variant="outlined"
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.description && formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
          label="Ціна"
          name="price"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.price}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.price && formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">грн</InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Знижка"
          name="sale"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.sale}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.sale && formik.errors.sale)}
          helperText={formik.touched.sale && formik.errors.sale}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </Stack>

      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
          label="Вага"
          name="weight"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.weight}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.weight && formik.errors.weight)}
          helperText={formik.touched.weight && formik.errors.weight}
        />
        <TextField
          fullWidth
          label="Вимірювання ваги"
          name="weightType"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.weightType}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.weightType && formik.errors.weightType)}
          helperText={formik.touched.weightType && formik.errors.weightType}
        />
      </Stack>

      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
          label="Розмір ящика"
          name="boxSize"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.boxSize}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.boxSize && formik.errors.boxSize)}
          helperText={formik.touched.boxSize && formik.errors.boxSize}
        />
        <TextField
          fullWidth
          label="Кількість у ящику"
          name="quantityPerBox"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.quantityPerBox}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.quantityPerBox && formik.errors.quantityPerBox
          )}
          helperText={
            formik.touched.quantityPerBox && formik.errors.quantityPerBox
          }
        />
      </Stack>

      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
          label="Штрих код"
          name="barcode"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.barcode}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.barcode && formik.errors.barcode)}
          helperText={formik.touched.barcode && formik.errors.barcode}
        />
        <TextField
          fullWidth
          label="Упаковка"
          name="package"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting}
          value={formik.values.package}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.package && formik.errors.package)}
          helperText={formik.touched.package && formik.errors.package}
        />
      </Stack>
      <TextField
        fullWidth
        label="Умови зберігання"
        name="storageConditions"
        variant="outlined"
        size="small"
        disabled={formik.isSubmitting}
        value={formik.values.storageConditions}
        onChange={formik.handleChange}
        error={Boolean(
          formik.touched.storageConditions && formik.errors.storageConditions
        )}
        helperText={
          formik.touched.storageConditions && formik.errors.storageConditions
        }
      />

      <ImageUploader
        onChange={(file) => formik.setFieldValue("image", file)}
        file={formik.values.image}
        helperText={formik.errors.image}
      />
      <Button
        disabled={formik.isSubmitting}
        color="success"
        variant="contained"
        type="submit"
      >
        Оновити продукт
      </Button>
    </Stack>
  );
};
