import { FC, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography
} from "@mui/material";

import { deleteContract, getUserContracts } from "../../../api/contract";
import { ContractResponse } from "../../../api/contract/types";
import { useUserContext } from "../../../contexts/user-context";
import { useIsMobile } from "../../../hooks/isMbile";
import { formatDateToUkrainian } from "../../../utils/date";
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

  const handleDelete = async (id: number) => {
    try {
      await deleteContract(id);
      setContracts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {}
  };

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
            <Card
              sx={{
                position: "relative",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: isMobile ? "8px" : "16px",
                  paddingBottom: "8px !Important",
                }}
              >
                <Typography variant="h5" component="div">
                  {contract.productType.name}
                </Typography>
                <Stack spacing={1} direction="row">
                  <PriceWithSale price={contract.price} sale={0} />
                  <Typography>за {contract.count}</Typography>
                </Stack>

                <Stack spacing={0.5} alignItems="center">
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <Typography variant="subtitle2">Оновлено: </Typography>
                    <Typography
                      textAlign={"center"}
                      variant="subtitle2"
                      fontSize={isMobile ? "10px" : "15px"}
                    >
                      {formatDateToUkrainian(contract.updated_at)}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography>Контракт №: </Typography>
                    <Typography>{contract.id}</Typography>
                  </Stack>
                  <Divider
                    sx={{
                      width: "100%",
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color={contract.accepted ? "green" : "orange"}
                    align="center"
                  >
                    {contract.accepted && "Підтверджино"}
                    {contract.rejected && "Відхилино"}
                    {!contract.accepted && !contract.rejected && "Очікується"}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(contract.id)}
                  >
                    Видалити
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </MainWrapper>
    </PageWrapper>
  );
};
