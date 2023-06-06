import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { createOrder } from "../../../api/order";
import { CreateOrderParams } from "../../../api/order/types";
import { useBasketContext } from "../../../contexts/basket-context";
import { useUserContext } from "../../../contexts/user-context";
import { useIsMobile } from "../../../hooks/isMbile";
import { PRODUCT_PAGE_ROUTE } from "../../../routes/dictionary";
import { getProductPrice } from "../../../utils/product";
import { Header } from "../../app-bar";
import { NovaPoshtaAddressInput } from "../../nova-poshta-address-input";
import { ProductOrderTable } from "./product-table";

export type ShoppingPageProps = {};

export const ShoppingPage: FC<ShoppingPageProps> = ({}) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { basketState, total, clearBasket } = useBasketContext();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    address: "",
    phone: "",
    name: user?.name || "",
    lastName: user?.lastName || "",
  });

  const handleChange = (field: keyof typeof state, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const orders = basketState.map((bp) => ({
        price: getProductPrice(bp.product) * bp.count,
        productId: bp.product.id,
        count: bp.count,
      }));

      const params: CreateOrderParams = {
        ...state,
        orders,
        totalPrice: total,
      };
      await createOrder(params);
      enqueueSnackbar("Замовлення прийнято", { variant: "success" });
      navigate(PRODUCT_PAGE_ROUTE);
      clearBasket();
    } catch (error) {
      enqueueSnackbar("Помилка", { variant: "error" });
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f1f2f4",
          overflow: "auto",
        }}
      >
        <Header />
        <Stack
          spacing={1}
          height={`calc(100vh - ${isMobile ? "56px" : "68.5px"})`}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingLeft: 1,
            paddingRight: 1,
            overflow: "auto",
          }}
        >
          <Typography variant="h4">Продукти у кошику</Typography>
          <ProductOrderTable />
          {Boolean(basketState.length) && (
            <Paper
              sx={{ padding: 1, width: isMobile ? "calc(100% - 8px)" : "auto" }}
            >
              <Stack spacing={1}>
                <Stack spacing={1} direction="row">
                  <TextField
                    onChange={(e) => handleChange("name", e.target.value)}
                    value={state.name}
                    label="Ім'я"
                    size="small"
                  />
                  <TextField
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    value={state.lastName}
                    label="Призвище"
                    size="small"
                  />
                </Stack>

                <InputMask
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
                </InputMask>

                <NovaPoshtaAddressInput
                  onChange={({ address, city }) => {
                    handleChange(
                      "address",
                      address && city ? `${city} ${address}` : ""
                    );
                  }}
                />

                <Button
                  disabled={
                    !state.address ||
                    state.phone.replace(/\D/g, "").length < 12 ||
                    !state.name ||
                    !state.lastName ||
                    loading
                  }
                  variant="outlined"
                  color="success"
                  onClick={handleSubmit}
                >
                  Підтвердити замовлення
                </Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Box>
    </>
  );
};
