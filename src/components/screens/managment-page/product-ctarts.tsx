import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { getProducts } from "../../../api/product";
import { ProductResponse } from "../../../api/product/types";
import { generateColors } from "../../../utils/colors";

export const TextChart: FC<{}> = ({}) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const { chartData } = useMemo(() => {
    const sortedProducts = [...products]
      .sort(
        (a, b) =>
          a.reviews.reduce((sum, review) => sum + review.rating, 0) /
            a.reviews.length -
          b.reviews.reduce((sum, review) => sum + review.rating, 0) /
            b.reviews.length
      )
      .filter((p) => p.reviews.length > 0);

    const worstProducts = sortedProducts.slice(0, 10);
    const colors = generateColors(worstProducts.length);

    const chartData = worstProducts.map((product, i) => ({
      name: product.name,
      Оцінка:
        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length,
      fill: colors[i],
    }));

    return { chartData };
  }, [products]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetch();
  }, []);

  return (
    <BarChart width={600} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Оцінка" fill="#8884d8" />
    </BarChart>
  );
};
