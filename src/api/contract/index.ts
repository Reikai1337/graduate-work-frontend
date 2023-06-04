import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { CerateContractParams, ContractResponse } from "./types";

export const CONTRACT_URL = "/contract";

// export const getProducts = () => {
//   return client.get<ProductResponse[]>(
//     `${PRODUCT_URL}/all`,
//     getRequestConfig()
//   );
// };

export const createContract = (params: CerateContractParams) => {
  return client.post<ContractResponse>(
    CONTRACT_URL,
    params,
    getRequestConfig()
  );
};

export const getUserContracts = (userId: number) => {
  return client.get<ContractResponse[]>(
    `${CONTRACT_URL}/${userId}`,
    getRequestConfig()
  );
};

export const getContracts = () => {
  return client.get<ContractResponse[]>(CONTRACT_URL, getRequestConfig());
};

export const patchContract = (
  type: "accept" | "reject",
  id: number,
  value: boolean
) => {
  return client.patch<ContractResponse>(
    `${CONTRACT_URL}/${type}`,
    {
      id,
      value,
    },
    getRequestConfig()
  );
};

export const deleteContract = (id: number) => {
  return client.delete<ContractResponse>(
    `${CONTRACT_URL}/${id}`,
    getRequestConfig()
  );
};
