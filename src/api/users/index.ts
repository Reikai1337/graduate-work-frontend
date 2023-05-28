import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { UserResponse } from "./types";

export const USERS_URL = "/users";

export const getUsers = () => {
  return client.get<UserResponse>(USERS_URL, getRequestConfig());
};
