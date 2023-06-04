import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";

import { Checkbox, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { getContracts, patchContract } from "../../../api/contract";
import { ContractResponse } from "../../../api/contract/types";
import { DATA_GRID_LOCALE_TEXT } from "../../../constants";
import { formatDateToUkrainian } from "../../../utils/date";

export type ContractsDataGridProps = {
  contracts: ContractResponse[];
  loading: boolean;
};

type Row = {
  id: number;
  user: string;
  created_at: string;
  price: number;
  phone: string;
  count: string;
  accepted: boolean;
  rejected: boolean;
  productName: string;
};

export type CheckBoxCellProps = {
  checked: boolean;
  onChange: (value: boolean) => Promise<void>;
};

export const CheckBoxCell: FC<CheckBoxCellProps> = ({ checked, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return <Checkbox onChange={handleChange} checked={checked} />;
};

const ContractsDataGridInner: FC<ContractsDataGridProps> = ({
  contracts,
  loading,
}) => {
  const { columns, rows } = useMemo<{
    rows: GridRowsProp<Row>;
    columns: GridColDef<Row>[];
  }>(() => {
    return {
      columns: [
        {
          field: "id",
          headerName: "Номер",
        },
        {
          field: "created_at",
          headerName: "Дата",
          width: 220,
        },
        {
          field: "productName",
          headerName: "Сировина",
          width: 300,
        },
        {
          field: "price",
          headerName: "Ціна",
          width: 150,
          renderCell: ({ row }) => `${row.price} грн за ${row.count}`,
        },
        {
          field: "user",
          headerName: "Постачальник",
          width: 300,
        },
        {
          field: "phone",
          headerName: "Мобільний номер",
          align: "center",
          headerAlign: "center",
          width: 200,
        },

        {
          field: "accepted",
          headerName: "Прийнято",
          headerAlign: "center",
          width: 150,
          align: "center",
          renderCell: ({ row, api }) => (
            <CheckBoxCell
              checked={row.accepted}
              onChange={async (value: boolean) => {
                try {
                  await patchContract("accept", row.id, value);
                  api.updateRows([
                    { id: row.id, accepted: value, rejected: !value },
                  ]);
                } catch (error) {}
              }}
            />
          ),
        },
        {
          field: "rejected",
          headerName: "Відхилено",
          headerAlign: "center",
          width: 150,
          align: "center",
          renderCell: ({ api, row }) => (
            <CheckBoxCell
              checked={row.rejected}
              onChange={async (value: boolean) => {
                try {
                  await patchContract("reject", row.id, value);
                  api.updateRows([
                    { id: row.id, accepted: !value, rejected: value },
                  ]);
                } catch (error) {}
              }}
            />
          ),
        },
      ],
      rows: contracts.map<Row>(
        ({
          created_at,
          accepted,
          count,
          phone,
          price,
          productType,
          rejected,
          user,
          id,
        }) => ({
          created_at: formatDateToUkrainian(created_at, true),
          id,
          phone,
          price,
          user: `${user.name} ${user.lastName}`,
          count,
          accepted,
          rejected,
          productName: productType.name,
        })
      ),
    };
  }, [contracts]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={loading}
        columns={columns}
        rows={rows}
        rowHeight={30}
        disableRowSelectionOnClick
        localeText={DATA_GRID_LOCALE_TEXT}
        slots={{
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export const ContractsDataGrid: FC = () => {
  const [contracts, setContracts] = useState<ContractResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getContracts();
      setContracts(res.data);
      setLoading(false);
    };

    fetch();
  }, []);

  return <ContractsDataGridInner contracts={contracts} loading={loading} />;
};
