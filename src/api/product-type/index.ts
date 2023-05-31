import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { ProductTypeResponse } from "./types";

export const PRODUCT_TYPE_URL = "/product_type";

export const getProductTypes = () => {
  return client.get<ProductTypeResponse[]>(
    PRODUCT_TYPE_URL,
    getRequestConfig()
  );
};

export const getProductIngredients = () => {
  return client.get<ProductTypeResponse[]>(
    `${PRODUCT_TYPE_URL}/ingredients`,
    getRequestConfig()
  );
};

export const createProductType = (name: string, isIngredient: boolean) => {
  return client.post<ProductTypeResponse>(
    PRODUCT_TYPE_URL,
    { name, isIngredient },
    getRequestConfig()
  );
};
