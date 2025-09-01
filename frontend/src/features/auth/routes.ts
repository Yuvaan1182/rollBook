import { lazy } from "react";
import type { AppRoute } from "../../app/types/RouteTypes";
import AuthLayout from "../../components/layouts/AuthLayout";

const Login = lazy(() => import("./pages/LoginPage"));

export const authRoutes: AppRoute[] = [
  {
    path: "/login",
    element: Login,
    layout: AuthLayout,
    isPrivate: false,
    roles: ["public"]
  },
];
