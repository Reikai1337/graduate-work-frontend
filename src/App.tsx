import { FC, useEffect } from "react";

import { Button } from "@mui/material";

import { getUsers } from "./api/users";

export type AppProps = {};

export const App: FC<AppProps> = ({}) => {
  useEffect(() => {
    const fetch = async () => {
      const res = await getUsers();
      console.log(res);
    };
    fetch();
  }, []);

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
};
