import { FC } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import { useBasketContext } from "../../../contexts/basket-context";
import { useIsMobile } from "../../../hooks/isMbile";
import { PriceWithSale } from "../../price-with-sale";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export type ProductOrderTableProps = {};

export const ProductOrderTable: FC<ProductOrderTableProps> = ({}) => {
  const isMobile = useIsMobile();
  const { basketState, removeFromBasket, countChange, total } =
    useBasketContext();

  return (
    <>
      {basketState.length ? (
        <Stack
          spacing={1}
          direction="column"
          sx={{ width: "calc(100% - 8px)" }}
          alignItems="center"
        >
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Назва</StyledTableCell>
                  <StyledTableCell align="center">Штрих-код</StyledTableCell>
                  <StyledTableCell align="center">Упаковка</StyledTableCell>
                  <StyledTableCell align="center">
                    Кількість у ящику
                  </StyledTableCell>
                  <StyledTableCell align="center">Кількість</StyledTableCell>
                  <StyledTableCell align="center">Ціна</StyledTableCell>
                  <StyledTableCell align="center">Видалити</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketState.map(({ count, product }) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell component="th" scope="row">
                      {product.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product.barcode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product.package}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product.quantityPerBox}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <ButtonGroup size="small" aria-label="small button group">
                        <Button
                          disabled={count === 1}
                          onClick={() => {
                            countChange(product.id, count - 1);
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        <Button>{count}</Button>
                        <Button
                          disabled={product.availableQuantity === count}
                          onClick={() => {
                            countChange(product.id, count + 1);
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </ButtonGroup>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PriceWithSale
                          price={product.price * count}
                          sale={product.sale}
                        />
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Button
                        color="error"
                        onClick={() => {
                          removeFromBasket(product.id);
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper sx={{ p: 1, width: "100%" }}>
            <Stack spacing={1} direction="row" justifyContent="center">
              <Typography variant="subtitle1">Разом:</Typography>
              <PriceWithSale
                price={total}
                sale={0}
                wrapperProps={{
                  sx: {
                    justifyContent: "center",
                  },
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      ) : (
        <Paper sx={{ p: 1 }}>
          <Typography>Кошик пустий</Typography>
        </Paper>
      )}
    </>
  );
};
