import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState
} from "react";

import { verifyUser as verifyUserRequest } from "../../api/auth";
import { UserResponse } from "../../api/users/types";
import { AUTH_TOKEN_KEY } from "../../constants";
import { UserContextValue } from "./types";

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export const UserContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResponse | undefined>(undefined);

  const setUserData = (user: UserResponse | undefined) => {
    setUser(user);
    if (!user) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  };

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        const res = await verifyUserRequest();
        if (res.data) setUser(res.data);
      }
    } catch (error) {}
  };

  const value = {
    user,
    setUserData,
  };

  useLayoutEffect(() => {
    verifyUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const value = useContext(UserContext);
  return {
    ...value,
  };
};
