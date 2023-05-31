import { useSnackbar } from "notistack";
import { createContext, FC, ReactNode, useContext, useState } from "react";

import { ProductResponse } from "../../api/product/types";
import { BasketContextValue, BasketProduct } from "./types";

const BasketContext = createContext<BasketContextValue>(
  {} as BasketContextValue
);

export const BasketContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [basketState, setBasketState] = useState<BasketProduct[]>([]);

  const addToBasket = (product: ProductResponse) => {
    const candidate = basketState.find((p) => p.product.id === product.id);
    if (candidate) {
      enqueueSnackbar("Данний продукт вже у кошику");
      return;
    }
    setBasketState((prev) => [...prev, { product, count: 1 }]);
    enqueueSnackbar("Продукт доданий до кошика", { variant: "success" });
  };

  const countChange = (productID: number, count: number) => {
    setBasketState((prev) =>
      prev.map((bp) => (bp.product.id === productID ? { ...bp, count } : bp))
    );
  };

  const removeFromBasket = (productId: number) => {
    setBasketState((prev) => prev.filter((bp) => bp.product.id !== productId));
  };

  const clearBasket = () => {
    setBasketState([]);
  };

  const value = {
    addToBasket,
    countChange,
    basketState,
    removeFromBasket,
    clearBasket,
    total: Number(
      basketState
        .reduce((acc, { product: { price, sale }, count }) => {
          const priceWithSale = price - (price / 100) * sale;

          return acc + priceWithSale * count;
        }, 0)
        .toFixed(2)
    ),
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};

export const useBasketContext = () => {
  const value = useContext(BasketContext);
  return {
    ...value,
  } as typeof value;
};
