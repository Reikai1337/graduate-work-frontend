import { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { ResponsiveContainer } from "recharts";

import { Stack } from "@mui/material";

import { getOrdersBetween } from "../../../api/order";
import { OrderResponse } from "../../../api/order/types";
import { DatePicker } from "../../date-picker";
import { OrdersCharts } from "./order-charts";

export type StatisticsChartsProps = {};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const StatisticsCharts: FC<StatisticsChartsProps> = ({}) => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const handleSubmit = async (first: Dayjs | null, second: Dayjs | null) => {
    if (!first || !second) return;
    const res = await getOrdersBetween({
      f: new Date(first.format("YYYY-MM-DD HH:mm:ss")),
      s: new Date(second.format("YYYY-MM-DD HH:mm:ss")),
    });
    setOrders(res.data);
  };

  return (
    <Stack spacing={1} height="400px" width="100%" alignItems="center">
      <DatePicker onSubmit={handleSubmit} />
      {orders.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <OrdersCharts orders={orders} />
        </ResponsiveContainer>
      )}
    </Stack>
  );
};
