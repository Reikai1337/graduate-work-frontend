import { FC } from "react";

import { Stack, StackProps, Typography } from "@mui/material";

export type PriceWithSaleProps = {
  price: number;
  sale: number;
  wrapperProps?: StackProps;
};

export const PriceWithSale: FC<PriceWithSaleProps> = ({
  price,
  sale,
  wrapperProps,
}) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center" {...wrapperProps}>
      {sale > 0 && (
        <Typography
          sx={{
            backgroundColor: "#FFDBDE",
            padding: "3px 4px",
            color: "#FF505F",
            textDecoration: "line-through",
            borderRadius: "5px",
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          ₴{price}
        </Typography>
      )}
      <Typography
        sx={{
          color: "#3399FF",
          fontWeight: "700",
        }}
      >
        ₴{price - (price / 100) * sale}
      </Typography>
    </Stack>
  );
};
