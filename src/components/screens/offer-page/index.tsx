import { FC } from "react";

import { Header } from "../../app-bar";
import { IngredientTypeSelect } from "../../ingredient-type-select";
import { MainWrapper, PageWrapper } from "../../page-wrapper";

export type OfferPageProps = {};

export const OfferPage: FC<OfferPageProps> = ({}) => {
  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <IngredientTypeSelect onChange={() => {}} value="" />
      </MainWrapper>
    </PageWrapper>
  );
};
