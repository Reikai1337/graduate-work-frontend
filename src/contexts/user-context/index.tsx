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

  const signIn = async (params: any, config: any) => {
    // try {
    //   const res = await baseLogin(params);
    //   if (res.status === 201) {
    //     setUser({ ...res.data.user });
    //     localStorage.setItem(TOKEN_KEY, res.data.token);
    //     config?.onSuccess?.(res.data.user);
    //   }
    // } catch (error) {
    //   config?.onFailed?.();
    // }
  };

  const setUserData = (user: UserResponse | undefined) => {
    setUser(user);
    if (!user) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  };

  const sighOut = () => {
    // localStorage.removeItem(TOKEN_KEY);
    // setUser(undefined);
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
    // signIn,
    user,
    setUserData,
    // hasUser: Boolean(user),
    // sighOut,
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
