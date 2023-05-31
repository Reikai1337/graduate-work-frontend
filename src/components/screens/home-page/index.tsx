import { FC } from "react";

import { Box } from "@mui/material";

import { Header } from "../../app-bar";

export type HomePageProps = {};

export const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <Box>
      <Header />
      HomePage
    </Box>
  );
};
