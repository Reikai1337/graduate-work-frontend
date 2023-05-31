import { SnackbarProvider } from "notistack";
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { Box } from "@mui/material";

import { BasketContextProvider } from "./contexts/basket-context";
import { UserContextProvider } from "./contexts/user-context";
import { Pages } from "./pages";

export type AppProps = {};

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
          <BasketContextProvider>
            <Box
              sx={{
                height: "100vh",
                width: "100wv",
              }}
            >
              <Pages />
            </Box>
          </BasketContextProvider>
        </SnackbarProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};
