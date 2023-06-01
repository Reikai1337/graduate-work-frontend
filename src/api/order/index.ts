import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { CreateOrderParams, OrderResponse } from "./types";

export const ORDER_URL = "/order";

export const createOrder = (params: CreateOrderParams) => {
  return client.post<OrderResponse>(ORDER_URL, params, getRequestConfig());
};

export const getActiveOrders = () => {
  return client.get<OrderResponse[]>(`${ORDER_URL}/active`, getRequestConfig());
};

export const updateOrderAccepted = (params: {
  value: boolean;
  orderId: number;
}) => {
  return client.post<OrderResponse>(
    `${ORDER_URL}/accepted`,
    params,
    getRequestConfig()
  );
};

export const getOrdersBetween = (params: { f: Date; s: Date }) => {
  return client.post<OrderResponse[]>(
    `${ORDER_URL}/between`,
    params,
    getRequestConfig()
  );
};
