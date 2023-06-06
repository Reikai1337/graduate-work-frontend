import { FC, ReactNode } from "react";

import { Box, Stack, StackProps } from "@mui/material";

import { useIsMobile } from "../../hooks/isMbile";

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f1f2f4",
      }}
    >
      {children}
    </Box>
  );
};

export const MainWrapper: FC<{ children: ReactNode } & StackProps> = ({
  children,
  ...rest
}) => {
  const isMobile = useIsMobile();

  return (
    <Stack
      height={`calc(100vh - ${isMobile ? "56px" : "68.5px"})`}
      sx={{
        overflow: "auto",
        ...rest.sx,
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
};
