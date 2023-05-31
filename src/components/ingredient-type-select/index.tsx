import { FC, useEffect, useState } from "react";

import {
  Box,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

import { getProductIngredients } from "../../api/product-type";
import { ProductTypeResponse } from "../../api/product-type/types";

export type ProductTypeSelectProps = FormControlProps & {
  onChange: (value: string) => void;
  value: string;
  helperText?: string | boolean;
};

export const IngredientTypeSelect: FC<ProductTypeSelectProps> = ({
  onChange,
  value,
  helperText,
  ...rest
}) => {
  const [productTypes, setProductTypes] = useState<ProductTypeResponse[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getProductIngredients();

      setProductTypes(res.data);
    };

    fetch();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    // @ts-ignore
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        disabled={!productTypes.length || rest.disabled}
        {...rest}
      >
        <InputLabel>Тип продукта</InputLabel>
        <Select value={value} label="Тип продукта" onChange={handleChange}>
          {productTypes.map((pt) => (
            <MenuItem key={pt.id} value={pt.name}>
              {pt.name}
            </MenuItem>
          ))}
        </Select>
        {Boolean(helperText) && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
