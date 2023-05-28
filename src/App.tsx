import { SnackbarProvider } from "notistack";
import { FC } from "react";

import { Box } from "@mui/material";

import { ImageUploader } from "./components/image-uploader";

export type AppProps = {};

export const App: FC<AppProps> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100wv",
      }}
    >
      <SnackbarProvider maxSnack={3} preventDuplicate>
        {/* <CreateUserForm /> */}
        <ImageUploader onUpload={(file) => console.log({ file })} />
      </SnackbarProvider>
    </Box>
  );
};
