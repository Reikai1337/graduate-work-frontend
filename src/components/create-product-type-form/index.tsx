import { useSnackbar } from "notistack";
import { ChangeEvent, FC, useState } from "react";

import { Button, Stack, TextField } from "@mui/material";

import { createProductType } from "../../api/product-type";

export type CreateProductTypeFormProps = {
  isIngredient?: boolean;
};

export const CreateProductTypeForm: FC<CreateProductTypeFormProps> = ({
  isIngredient = false,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await createProductType(name, isIngredient);
      enqueueSnackbar(
        `${isIngredient ? "Сировина" : "Тип продукта"} ${
          res.data.name
        } був створений`,
        {
          variant: "success",
        }
      );
      setName("");
    } catch (error) {
      enqueueSnackbar(`Помилка при створенні ${name}`, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Stack spacing={1}>
      <TextField
        label={isIngredient ? "Сировина" : "Тип продукта"}
        size="small"
        onChange={handleChange}
        value={name}
      />
      <Button
        onClick={handleSave}
        color="success"
        variant="outlined"
        disabled={!name || loading}
      >
        Створити
      </Button>
    </Stack>
  );
};
