import "./index.css";

import { FC } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

import { useIsMobile } from "../../../hooks/isMbile";
import { Header } from "../../app-bar";
import { MainWrapper } from "../../page-wrapper";
import img from "./home-logo.jpg";

export type HomePageProps = {};

export const HomePage: FC<HomePageProps> = ({}) => {
  const isMobile = useIsMobile();

  return (
    <Box>
      <Header />
      <MainWrapper>
        <Stack
          sx={{
            padding: isMobile ? "24px" : "48px",
            height: "100%",
          }}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Stack spacing={isMobile ? "25px" : "55px"}>
            <Typography className="home-title">
              Ласкаво просимо до Пирятинського сирзаводу - де найсмачніший сир
              знаходить свій шлях до Вас!
            </Typography>
            <Typography className="home-description">
              Пирятинський сирзавод пропонує вам відкрити справжній світ сирних
              насолод. З нами ви отримаєте можливість насолодитися
              неперевершеними смаками і найвищою якістю сиру, виготовленого з
              любов'ю і досвідом. Наші майстри сироварі ретельно дбають про
              кожну деталь, починаючи від вибору натуральних інгредієнтів до
              самого остаточного продукту.
            </Typography>
            <Button variant="outlined">Продивитися продукцію</Button>
          </Stack>
          {!isMobile && (
            <img src={img} height={"556px"} width={"833px"} alt="" />
          )}
        </Stack>
      </MainWrapper>
    </Box>
  );
};
