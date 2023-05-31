import { UserResponse } from "../../api/users/types";

export type UserContextValue = {
  user: UserResponse | undefined;
  setUserData: (user: UserResponse | undefined) => void;
};
