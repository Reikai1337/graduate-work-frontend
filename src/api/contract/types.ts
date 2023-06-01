import { ProductTypeResponse } from "../product/types";
import { UserResponse } from "../users/types";

export type CerateContractParams = {
  userId: number;
  count: string;
  phone: string;
  price: number;
  type: string;
};

export type ContractResponse = {
  id: number;
  count: string;
  phone: string;
  price: number;
  accepted: boolean;
  rejected: boolean;
  created_at: string;
  updated_at: string;
  productType: ProductTypeResponse;
  user: UserResponse;
};
