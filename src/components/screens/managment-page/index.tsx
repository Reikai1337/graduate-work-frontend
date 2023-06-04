import { FC, useState } from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

import { useIsMobile } from "../../../hooks/isMbile";
import { Header } from "../../app-bar";
import { CreateProductForm } from "../../create-product-form";
import { CreateProductTypeForm } from "../../create-product-type-form";
import { TabPanel } from "../../tab-panel";
import { ContractsDataGrid } from "./contracts-data-grid";
import { OrdersDataGrid } from "./orders-data-grid";
import { StatisticsCharts } from "./statistics-charts";

export type ManagementPageProps = {};
export const ManagementPage: FC<ManagementPageProps> = ({}) => {
  const isMobile = useIsMobile();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ width: "100%", bgcolor: "background.secondary" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : undefined}
        >
          <Tab icon={<AddBoxIcon />} label="Створення" />
          <Tab icon={<QueryStatsIcon />} label="Статистика" />
          <Tab icon={<RequestPageIcon />} label="Замовлення та пропозиції" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack spacing={1} sx={{ width: isMobile ? "100%" : "auto" }}>
          <Stack spacing={1} direction="row" justifyContent="center">
            <CreateProductTypeForm />
            <CreateProductTypeForm isIngredient />
          </Stack>
          <Divider color="primary" />
          <CreateProductForm />
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StatisticsCharts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Stack spacing={1} width="100%">
          <Stack spacing={1}>
            <Stack spacing={1}>
              <Typography align="center" variant="h4">
                Замовлення продукції
              </Typography>
              <OrdersDataGrid />
            </Stack>
            <Stack spacing={1}>
              <Typography align="center" variant="h4">
                Пропозиції сировини
              </Typography>
              <ContractsDataGrid />
            </Stack>
          </Stack>
        </Stack>
      </TabPanel>
    </Box>
  );
};
