import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import ReactInputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

import { createContract } from "../../../api/contract";
import { useUserContext } from "../../../contexts/user-context";
import { CONTRACTS_PAGE_ROUTE } from "../../../routes/dictionary";
import { Header } from "../../app-bar";
import { IngredientTypeSelect } from "../../ingredient-type-select";
import { MainWrapper, PageWrapper } from "../../page-wrapper";

export type OfferPageProps = {};

export const OfferPage: FC<OfferPageProps> = ({}) => {
  const { user } = useUserContext();
  const navogate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    type: "",
    price: 0,
    phone: "",
    count: "",
  });

  const handleChange = (field: keyof typeof state, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await createContract({
        ...state,
        price: Number(state.price),
        userId: user.id,
      });
      enqueueSnackbar("Контракт відправлено на обробку", {
        variant: "success",
      });
      navogate(CONTRACTS_PAGE_ROUTE);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <PageWrapper>
      <Header />
      <MainWrapper sx={{ display: "grid", placeItems: "center" }}>
        <Paper sx={{ padding: 2 }}>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              Запропонувати продукцію
            </Typography>
            <IngredientTypeSelect
              size="small"
              onChange={(value) => {
                handleChange("type", value as string);
              }}
              value={state.type}
            />
            <Stack spacing={1} direction="row">
              <TextField
                label="Ціна"
                onChange={(e) => {
                  const v = e.target.value.match(/\d+/g);
                  handleChange("price", v ? v[0] : "");
                }}
                size="small"
                value={state.price}
              />
              <TextField
                label="Кількість"
                onChange={(e) => {
                  handleChange("count", e.target.value);
                }}
                size="small"
                value={state.count}
              />
            </Stack>
            <ReactInputMask
              mask="+380-999-999-999"
              value={state.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            >
              {/* @ts-ignore */}
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  label="Мобільний номер"
                  size="small"
                />
              )}
            </ReactInputMask>
            <Button
              onClick={handleSubmit}
              disabled={
                loading ||
                !state.price ||
                !state.type ||
                !state.count ||
                state.phone.replace(/\D/g, "").length < 12
              }
              variant="contained"
            >
              Запропонувати
            </Button>
          </Stack>
        </Paper>
      </MainWrapper>
    </PageWrapper>
  );
};
