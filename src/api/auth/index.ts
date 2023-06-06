import { client } from "../../common";
import { getRequestConfig } from "../helpers";
import { UserResponse } from "../users/types";
import {
  LoginParams,
  LoginResponse,
  RegisterUserParams,
  RegisterUserResponse
} from "./type";

export const AUTH_ULR = "/auth";

const LOGIN_URL = `${AUTH_ULR}/login`;
const VERIFY_URL = `${AUTH_ULR}/verify`;
const REGISTER_URL = `${AUTH_ULR}/register`;

export const loginRequest = (data: LoginParams) => {
  return client.post<LoginResponse>(LOGIN_URL, data);
};

export const verifyUser = () => {
  return client.post<UserResponse | undefined>(
    VERIFY_URL,
    {},
    getRequestConfig()
  );
};

export const registerUser = (params: RegisterUserParams) => {
  return client.post<RegisterUserResponse>(
    REGISTER_URL,
    params,
    getRequestConfig()
  );
};
