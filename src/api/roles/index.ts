import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { RoleResponse } from "./types";

export const ROLES_URL = "/roles";

export const getRoles = () => {
  return client.get<RoleResponse[]>(ROLES_URL, getRequestConfig());
};
