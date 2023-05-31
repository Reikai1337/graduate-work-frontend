import { FC } from "react";

import { Box } from "@mui/material";

import { useIsMobile } from "../../../hooks/isMbile";
import { Header } from "../../app-bar";
import { ProductList } from "../../product-list";

export type ProductsPageProps = {};

export const ProductsPage: FC<ProductsPageProps> = ({}) => {
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)",
      }}
    >
      <Header />
      <Box
        height={`calc(100vh - ${isMobile ? "56px" : "68.5px"})`}
        sx={{
          overflow: "auto",
        }}
      >
        <ProductList />
      </Box>
    </Box>
  );
};
