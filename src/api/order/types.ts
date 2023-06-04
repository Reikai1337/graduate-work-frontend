import { ProductResponse } from "../product/types";

export type CreateOrderParams = {
  address: string;
  lastName: string;
  name: string;
  phone: string;
  totalPrice: number;
  orders: {
    count: number;
    price: number;
    productId: number;
  }[];
};

export type ProductOrderResponse = {
  id: number;
  price: number;
  count: number;
  created_at: string;
  updated_at: string;
  product: ProductResponse;
};

export type OrderResponse = {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  accepted: boolean;
  rejected: boolean;
  address: string;
  totalPrice: number;
  created_at: string;
  updated_at: string;
  productOrders: ProductOrderResponse[];
};
