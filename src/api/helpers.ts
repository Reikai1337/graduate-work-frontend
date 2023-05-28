import { AxiosRequestConfig } from "axios";

import { AUTH_TOKEN_KEY } from "../constants";

export const getRequestConfig = (
  config: AxiosRequestConfig = {}
): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: localStorage.getItem(AUTH_TOKEN_KEY)
        ? `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
        : undefined,
    },
  };
};
