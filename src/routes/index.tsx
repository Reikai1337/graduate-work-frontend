import { FC } from "react";

import { AdminPage } from "../components/screens/admin-page";
import { ShoppingPage } from "../components/screens/bas";
import { HomePage } from "../components/screens/home-page";
import { ProductsPage } from "../components/screens/layouts";
import { LoginPage } from "../components/screens/login-page";
import { ManagementPage } from "../components/screens/managment-page";
import { OfferPage } from "../components/screens/offer-page";
import { RegisterPage } from "../components/screens/register-page";
import {
  ADMIN_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  lOGIN_PAGE_ROUTE,
  MANAGEMENT_PAGE_ROUTE,
  OFFER_PAGE_ROUTE,
  PRODUCT_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  SHOPPING_PAGE_ROUTE
} from "./dictionary";

export enum PAGES {
  ProductsPage = "ProductsPage",
  LoginPage = "LoginPage",
  RegisterPage = "RegisterPage",
  HomePage = "HomePage",
  ManagementPage = "ManagementPage",
  AdminPage = "AdminPage",
  ShoppingPage = "ShoppingPage",
  OfferPage = "OfferPage",
}

type Route = {
  name: string;
  path: string;
  exact: boolean;
  Component: FC;
  icon: string;
  withAuth?: boolean;
};

export const routes: Route[] = [
  {
    name: PAGES.ProductsPage,
    path: PRODUCT_PAGE_ROUTE,
    exact: true,
    Component: ProductsPage,
    icon: "products-page",
  },
  {
    name: PAGES.ProductsPage,
    path: lOGIN_PAGE_ROUTE,
    exact: true,
    Component: LoginPage,
    icon: "login-page",
  },
  {
    name: PAGES.RegisterPage,
    path: REGISTER_PAGE_ROUTE,
    exact: true,
    Component: RegisterPage,
    icon: "register-page",
  },
  {
    name: PAGES.ManagementPage,
    path: MANAGEMENT_PAGE_ROUTE,
    exact: true,
    Component: ManagementPage,
    icon: "management-page",
  },
  {
    name: PAGES.HomePage,
    path: HOME_PAGE_ROUTE,
    exact: true,
    Component: HomePage,
    icon: "home-page",
  },
  {
    name: PAGES.AdminPage,
    path: ADMIN_PAGE_ROUTE,
    exact: true,
    Component: AdminPage,
    icon: "admin-page",
  },
  {
    name: PAGES.ShoppingPage,
    path: SHOPPING_PAGE_ROUTE,
    exact: true,
    Component: ShoppingPage,
    icon: "basket-page",
  },
  {
    name: PAGES.OfferPage,
    path: OFFER_PAGE_ROUTE,
    exact: true,
    Component: OfferPage,
    icon: "offer-page",
  },
];

export const getRoute = (name: PAGES) =>
  routes.find((item) => item.name === name) || routes[0];
