import { FC, useState } from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { Box, Divider, Stack, Tab, Tabs } from "@mui/material";

import { useIsMobile } from "../../../hooks/isMbile";
import { Header } from "../../app-bar";
import { CreateProductForm } from "../../create-product-form";
import { CreateProductTypeForm } from "../../create-product-type-form";
import { TabPanel } from "../../tab-panel";
import { OrdersDataGrid } from "./orders-data-grid";

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
        <Tabs centered value={value} onChange={handleChange}>
          <Tab icon={<AddBoxIcon />} label="Створити продукт" />
          <Tab icon={<QueryStatsIcon />} label="Статистика" />
          <Tab icon={<RequestPageIcon />} label="Замовлення" />
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
        Item 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrdersDataGrid />
      </TabPanel>
    </Box>
  );
};
