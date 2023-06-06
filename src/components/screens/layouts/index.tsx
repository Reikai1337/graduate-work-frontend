import { ChangeEvent, FC, useEffect, useState } from "react";

import { Box, Stack, TextField } from "@mui/material";

import { getProductsByName } from "../../../api/product";
import { ProductResponse } from "../../../api/product/types";
import { useIsMobile } from "../../../hooks/isMbile";
import { useDebounce } from "../../../hooks/useDebounce";
import { Header } from "../../app-bar";
import { ProductList } from "../../product-list";
import { ProductTypeSelect } from "../../product-type-select";

export type ProductsPageProps = {};

export const ProductsPage: FC<ProductsPageProps> = ({}) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const isMobile = useIsMobile();
  const [value, setValue] = useState("");
  const [productType, setProductType] = useState("default");
  const debouncedCityValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const fetch = async () => {
      const res = await getProductsByName(
        debouncedCityValue,
        productType === "default" ? "" : productType
      );
      setProducts(res.data);
    };
    fetch();
  }, [debouncedCityValue, productType]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleProductTypeChange = (value: string) => {
    setProductType(value);
  };

  const handleUpdate = (product: ProductResponse) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f1f2f4",
      }}
    >
      <Header />
      <Box
        height={`calc(100vh - ${isMobile ? "56px" : "68.5px"})`}
        sx={{
          overflow: "auto",
        }}
      >
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Stack
            spacing={1}
            direction="row"
            sx={{
              p: 1,
              borderRadius: 1,
              backgroundColor: "white",
            }}
          >
            <TextField
              fullWidth
              placeholder="Пошук"
              size="small"
              value={value}
              onChange={handleChange}
            />
            <ProductTypeSelect
              withDefaultValue
              size="small"
              onChange={handleProductTypeChange}
              value={productType}
            />
          </Stack>
        </Stack>
        <ProductList products={products} onUpdate={handleUpdate} />
      </Box>
    </Box>
  );
};
