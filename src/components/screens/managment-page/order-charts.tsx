import React, { FC, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Stack, Typography } from "@mui/material";

import { OrderResponse } from "../../../api/order/types";
import { useIsMobile } from "../../../hooks/isMbile";

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
    const data = orders.map((order) => ({
      name: `${order.name} ${order.lastName}`,
      totalPrice: order.totalPrice,
    }));
    return (
      <BarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalPrice" fill="#8884d8" />
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

    const data = Object.keys(productTypes).map((type) => ({
      name: type,
      //@ts-ignore
      value: productTypes[type],
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

  const getOrderCountByDate = () => {
    const orderCountByDate = {};
    orders.forEach((order) => {
      const date = order.created_at.split("T")[0];
      //@ts-ignore
      if (orderCountByDate[date]) {
        //@ts-ignore
        orderCountByDate[date] += 1;
      } else {
        //@ts-ignore
        orderCountByDate[date] = 1;
      }
    });

    const data = Object.keys(orderCountByDate).map((date) => ({
      date,
      //@ts-ignore
      acceptedOrders: orderCountByDate[date],
      //@ts-ignore
      rejectedOrders: orders.length - orderCountByDate[date],
    }));

    return (
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="acceptedOrders" stroke="#8884d8" />
        <Line type="monotone" dataKey="rejectedOrders" stroke="#82ca9d" />
      </LineChart>
    );
  };

  const getProductPriceDistribution = () => {
    //@ts-ignore
    const productPrices = [];
    orders.forEach((order) => {
      order.productOrders.forEach((productOrder) => {
        const price = productOrder.product.price;
        productPrices.push(price);
      });
    });

    const data = [
      { range: "0-10", count: 0 }, //0
      { range: "10-20", count: 0 }, //1
      { range: "20-40", count: 0 }, //2
      { range: "40-80", count: 0 }, //3
      { range: "80-160", count: 0 }, //4
      { range: "160-320+", count: 0 }, //5
    ];
    //@ts-ignore
    productPrices.forEach((price) => {
      if (price >= 0 && price < 10) {
        data[0].count += 1;
      } else if (price >= 10 && price < 20) {
        data[1].count += 1;
      } else if (price >= 20 && price < 40) {
        data[2].count += 1;
      } else if (price >= 40 && price < 80) {
        data[3].count += 1;
      } else if (price >= 80 && price < 160) {
        data[4].count += 1;
      } else {
        data[5].count += 1;
      }
    });

    return (
      <BarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    );
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Typography align="center">
        Графік стовпців: загальна сума замовлень для кожного клієнта
      </Typography>
      {getTotalPriceByCustomer()}

      <Typography align="center">
        Кругова діаграма: відсоткове співвідношення продуктів за типами сиру
      </Typography>
      {getProductTypeDistribution()}

      <Typography align="center">
        Лінійний графік: динаміка кількості замовлень за датами
      </Typography>
      {getOrderCountByDate()}

      <Typography align="center">Графік розподілу цін продуктів</Typography>
      {getProductPriceDistribution()}
    </Stack>
  );
};
