import { ProductResponse } from "../../api/product/types";

export type BasketProduct = {
  product: ProductResponse;
  count: number;
};

export type BasketContextValue = {
  addToBasket: (product: ProductResponse) => void;
  countChange: (productID: number, count: number) => void;
  basketState: BasketProduct[];
  removeFromBasket: (productId: number) => void;
  clearBasket: () => void;
  total: number;
};
