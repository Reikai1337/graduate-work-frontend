import { FC, useEffect, useState } from "react";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { getUserContracts } from "../../../api/contract";
import { ContractResponse } from "../../../api/contract/types";
import { useUserContext } from "../../../contexts/user-context";
import { useIsMobile } from "../../../hooks/isMbile";
import { Header } from "../../app-bar";
import { MainWrapper, PageWrapper } from "../../page-wrapper";
import { PriceWithSale } from "../../price-with-sale";

export type ContractsPageProps = {};

export const ContractsPage: FC<ContractsPageProps> = ({}) => {
  const isMobile = useIsMobile();
  const [contracts, setContracts] = useState<ContractResponse[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const res = await getUserContracts(user.id);
      setContracts(res.data);
    };
    fetch();
  }, [user]);

  return (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <Box
          sx={{
            padding: isMobile ? "8px" : "16px",
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : "repeat(auto-fill, 345px)",
            gap: isMobile ? "8px" : "16px",
            placeItems: "center",
            justifyContent: "center",
          }}
        >
          {contracts.map((contract) => (
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" component="div">
                  {contract.productType.name}
                </Typography>
                <Stack spacing={1} direction="row">
                  <PriceWithSale price={contract.price} sale={0} />
                  <Typography>за {contract.count}</Typography>
                </Stack>
                <Typography
                  sx={{ fontSize: 14 }}
                  color={contract.accepted ? "green" : "orange"}
                  align="center"
                >
                  {contract.accepted && "Підтверджино"}
                  {contract.rejected && "Відхилино"}
                  {!contract.accepted && !contract.rejected && "Очікується"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </MainWrapper>
    </PageWrapper>
  );
};
