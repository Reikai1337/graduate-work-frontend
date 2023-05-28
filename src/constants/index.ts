const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const BASE_URL = IS_DEVELOPMENT
  ? process.env.REACT_APP_DEVELOPMENT_HOST
  : process.env.REACT_APP_PRODUCTION_HOST;

export const AUTH_TOKEN_KEY = "user-auth-token";
