import { UserResponse } from "../users/types";

export type RegisterUserParams = {
  login: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  initialRole: string;
};

export type RegisterUserResponse = {
  user: UserResponse;
  token: string;
};
