import React, { FC, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Divider, Stack, Typography } from "@mui/material";

import { OrderResponse } from "../../../api/order/types";
import { useIsMobile } from "../../../hooks/isMbile";
import { generateColors } from "../../../utils/colors";
import { TextChart } from "./product-ctarts";

type OrdersChartsProps = {
  orders: OrderResponse[];
};

export const OrdersCharts: FC<OrdersChartsProps> = ({ orders }) => {
  const isMobile = useIsMobile();

  const { height, width } = useMemo(() => {
    return {
      width: isMobile ? 250 : 500,
      height: isMobile ? 200 : 300,
    };
  }, [isMobile]);

  const getTotalPriceByCustomer = () => {
    const colors = generateColors(orders.length);
    const data = orders.map((order, i) => ({
      name: `${order.name} ${order.lastName}`,
      "Сумма замовлення": order.totalPrice,
      fill: colors[i],
    }));
    return (
      <BarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Сумма замовлення" fill="#81c784" />
      </BarChart>
    );
  };

  const topProductCharts = () => {
    const products = {};

    orders.forEach((order) => {
      order.productOrders.forEach((productOrder) => {
        const { product } = productOrder;
        const { id, name } = product;
        //@ts-ignore
        if (products[id]) {
          //@ts-ignore
          products[id].count += productOrder.count;
        } else {
          //@ts-ignore
          products[id] = {
            id,
            name,
            count: productOrder.count,
            type: productOrder.product.type.name,
          };
        }
      });
    });

    // Сортування продуктів за кількістю замовлень
    const sortedProducts = Object.values(products).sort(
      //@ts-ignore
      (a, b) => b.count - a.count
    );

    const colors = generateColors(Object.keys(sortedProducts).length);

    // Побудова даних для графіка
    const chartData = sortedProducts.map((product, i) => ({
      //@ts-ignore
      name: product.name, //@ts-ignore
      Замовлення: product.count,
      fill: colors[i],
    }));

    return (
      <BarChart width={width} height={height} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Замовлення" fill="#8884d8" />
      </BarChart>
    );
  };

  const getProductTypeDistribution = () => {
    const productTypes = {};

    orders.forEach((order) => {
      order.productOrders.forEach((productOrder) => {
        const type = productOrder.product.type.name;
        //@ts-ignore
        if (productTypes[type]) {
          //@ts-ignore
          productTypes[type] += productOrder.count;
        } else {
          //@ts-ignore
          productTypes[type] = productOrder.count;
        }
      });
    });

    const colors = generateColors(Object.keys(productTypes).length);

    const data = Object.keys(productTypes).map((type, i) => ({
      name: type,
      //@ts-ignore
      value: productTypes[type],
      fill: colors[i],
    }));

    return (
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Typography align="center" variant="h4">
        Графік стовпців: загальна сума замовлень для кожного клієнта
      </Typography>
      {getTotalPriceByCustomer()}
      <Divider sx={{ width: "100%" }} />
      <Typography align="center" variant="h4">
        Кругова діаграма: відсоткове співвідношення продуктів за типами сиру
      </Typography>
      {getProductTypeDistribution()}
      <Divider sx={{ width: "100%" }} />

      <Divider sx={{ width: "100%" }} />
      <Typography align="center" variant="h4">
        Найпопулярніші продукти
      </Typography>
      {topProductCharts()}
      <Divider sx={{ width: "100%" }} />
      <Typography align="center" variant="h4">
        Продукти які потребують аналізу
      </Typography>
      <TextChart />

      <Divider sx={{ width: "100%" }} />
    </Stack>
  );
};
