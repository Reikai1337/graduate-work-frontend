import { GridLocaleText } from "@mui/x-data-grid";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const BASE_URL = IS_DEVELOPMENT
  ? process.env.REACT_APP_DEVELOPMENT_HOST
  : process.env.REACT_APP_PRODUCTION_HOST;

export const AUTH_TOKEN_KEY = "user-auth-token";

export const DATA_GRID_LOCALE_TEXT: Partial<GridLocaleText> = {
  MuiTablePagination: {
    labelDisplayedRows: ({ from, to, count }) =>
      `Показано з ${from} по ${to} рядкок з ${count} можливих`,
    labelRowsPerPage: "Рядків на сторінці",
  },
};
