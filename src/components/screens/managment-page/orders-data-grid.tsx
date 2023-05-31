import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Checkbox,
  IconButton,
  LinearProgress,
  Modal,
  Paper
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { getActiveOrders, updateOrderAccepted } from "../../../api/order";
import { OrderResponse, ProductOrderResponse } from "../../../api/order/types";

export type OrdersDataGridProps = {};

export type OrdersDataGridInnerProps = {
  orders: OrderResponse[];
  loading: boolean;
};

type OuterRow = {
  id: number;
  orderNumber: number;
  recipient: string;
  total: number;
  phone: string;
  address: string;
  date: string;
  accepted: boolean;
  productOrders: ProductOrderResponse[];
};

export type AcceptOrderCheckBoxProps = {
  checked: boolean;
  orderId: number;
  onChange: (value: boolean) => Promise<void>;
};

export const AcceptOrderCheckBox: FC<AcceptOrderCheckBoxProps> = ({
  checked,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return <Checkbox onChange={handleChange} checked={checked} />;
};

type ProductOrderRow = Omit<ProductOrderResponse, "created_at" | "updated_at">;

export type OpenProductOrdersButtonProps = {
  productOrders: ProductOrderResponse[];
};

export const OpenProductOrdersButton: FC<OpenProductOrdersButtonProps> = ({
  productOrders,
}) => {
  const [open, setOpen] = useState(false);
  const { columns, rows } = useMemo<{
    rows: GridRowsProp<ProductOrderRow>;
    columns: GridColDef<ProductOrderRow>[];
  }>(() => {
    return {
      columns: [
        {
          field: "name",
          headerName: "Назва",
          width: 250,
          valueGetter: (params) =>
            `${params.row.product.type.name} ${params.row.product.name}`,
        },
        {
          field: "count",
          align: "center",
          headerAlign: "center",
          headerName: "Кількість",
        },
        {
          field: "price",
          align: "center",
          headerAlign: "center",
          headerName: "Загалом",
        },
      ],
      rows: productOrders.map<ProductOrderRow>((order) => ({
        count: order.count,
        id: order.id,
        price: order.price,
        product: order.product,
      })),
    };
  }, [productOrders]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton size="small" onClick={openModal}>
        <InfoOutlinedIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={closeModal}
        sx={{
          display: "grid",
          placeItems: "center",
          maxWidth: "100%",
          overflow: "auto",
          padding: 1,
        }}
      >
        <Paper sx={{ height: 400, maxWidth: "100%" }}>
          <DataGrid<ProductOrderRow>
            onCellClick={(params, e) => {
              e.stopPropagation();
            }}
            columns={columns}
            rows={rows}
            rowHeight={30}
          />
        </Paper>
      </Modal>
    </Box>
  );
};

export const OrdersDataGridInner: FC<OrdersDataGridInnerProps> = ({
  orders,
  loading,
}) => {
  const { columns, rows } = useMemo<{
    rows: GridRowsProp<OuterRow>;
    columns: GridColDef<OuterRow>[];
  }>(() => {
    return {
      columns: [
        {
          field: "orderNumber",
          headerName: "Номер",
        },
        {
          field: "date",
          headerName: "Дата",
          width: 300,
        },
        {
          field: "recipient",
          headerName: "Отримувач",
          width: 300,
        },
        {
          field: "address",
          headerName: "Адреса",
          width: 150,
        },
        {
          field: "phone",
          headerName: "Мобільний номер",
          align: "center",
          headerAlign: "center",
          width: 200,
        },
        {
          field: "total",
          headerName: "Загалом",
          headerAlign: "center",
          align: "center",
          width: 150,
        },
        {
          field: "accepted",
          headerName: "Перевірений",
          headerAlign: "center",
          width: 150,
          align: "center",
          renderCell: (params) => (
            <AcceptOrderCheckBox
              checked={params.row.accepted}
              onChange={async (value: boolean) => {
                try {
                  await updateOrderAccepted({ value, orderId: params.row.id });
                  params.api.updateRows([
                    { id: params.row.id, accepted: value },
                  ]);
                } catch (error) {}
              }}
              orderId={params.row.orderNumber}
            />
          ),
        },
        {
          field: "open-modal",
          headerName: "Деталі",
          width: 150,
          align: "center",
          flex: 1,
          headerAlign: "center",
          renderCell: (params) => (
            <OpenProductOrdersButton productOrders={params.row.productOrders} />
          ),
        },
      ],
      rows: orders.map<OuterRow>((order) => ({
        id: order.id,
        orderNumber: order.id,
        recipient: `${order.name} ${order.lastName}`,
        total: order.totalPrice,
        phone: order.phone,
        address: order.address,
        date: order.created_at,
        accepted: order.accepted,
        productOrders: order.productOrders,
      })),
    };
  }, [orders]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={loading}
        columns={columns}
        rows={rows}
        rowHeight={30}
        disableRowSelectionOnClick
        slots={{
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export const OrdersDataGrid: FC<OrdersDataGridProps> = ({}) => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getActiveOrders();
      setOrders(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return <OrdersDataGridInner orders={orders} loading={loading} />;
};
