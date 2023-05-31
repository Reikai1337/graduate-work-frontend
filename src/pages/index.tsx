import { lazy, Suspense } from "react";

import { Box, CircularProgress } from "@mui/material";

const DynamicPages = lazy(() => import("./dynamic"));

export const Pages = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <DynamicPages />
    </Suspense>
  );
};
