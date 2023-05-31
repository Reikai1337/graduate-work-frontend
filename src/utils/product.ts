import { ProductResponse } from "../api/product/types";

export const getProductPrice = ({ price, sale }: ProductResponse) => {
  return Number((price - (price / 100) * sale).toFixed(2));
};
