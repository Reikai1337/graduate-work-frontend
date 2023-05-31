import { FC } from "react";

import {
  Divider,
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

import { ProductResponse } from "../../api/product/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

export type ProductInfoProps = {
  product: ProductResponse | null;
};

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  if (!product) return <Typography>Error</Typography>;

  const rows = [
    {
      name: "Упаковка",
      value: product.package,
    },
    {
      name: "Маса нетто",
      value: `${product.weight} ${product.weightType}`,
    },
    {
      name: "Строк та умови зберігання",
      value: product.storageConditions,
    },
    {
      name: "Штрих-код",
      value: product.barcode,
    },
    {
      name: "Розмір ящика",
      value: product.boxSize,
    },
    {
      name: "Кількість у ящику	",
      value: product.quantityPerBox,
    },
  ];

  return (
    <Stack spacing={1}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Характеристика</StyledTableCell>
              <StyledTableCell align="right">Значення</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Paper sx={{ padding: 1 }}>
        <Typography align="center">Про продукт</Typography>
        <Typography variant="subtitle1">{product.description}</Typography>
      </Paper>
    </Stack>
  );
};
