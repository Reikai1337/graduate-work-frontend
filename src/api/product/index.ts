import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import {
  CreateProductParams,
  ProductResponse,
  UpdateProductParams
} from "./types";

export const PRODUCT_URL = "/product";

export const getProducts = () => {
  return client.get<ProductResponse[]>(
    `${PRODUCT_URL}/all`,
    getRequestConfig()
  );
};

export const createProduct = (params: CreateProductParams) => {
  return client.post<ProductResponse>(PRODUCT_URL, params, getRequestConfig());
};

export const getProduct = (id: number) => {
  return client.get<ProductResponse>(
    `${PRODUCT_URL}/${id}`,
    getRequestConfig()
  );
};

export const updateProduct = (id: number, data: UpdateProductParams) => {
  return client.patch<ProductResponse>(
    `${PRODUCT_URL}/${id}`,
    data,
    getRequestConfig()
  );
};
