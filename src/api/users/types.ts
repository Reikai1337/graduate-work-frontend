import { RoleResponse } from "../roles/types";

export type UserResponse = {
  login: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  roles: RoleResponse[];
};
