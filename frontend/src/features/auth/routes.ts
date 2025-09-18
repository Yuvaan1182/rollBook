import { lazy } from "react";
import type { AppRoute } from "../../app/types/RouteTypes";
import AuthLayout from "../../components/layouts/AuthLayout";

const Login = lazy(() => import("./pages/LoginPage"));
const Signup = lazy(() => import("./pages/SignupPage"));
const OTP = lazy(() => import("./pages/OtpVerifyPage"));

export const authRoutes: AppRoute[] = [
  {
    path: "/login",
    element: Login,
    layout: AuthLayout,
    isPrivate: false,
    roles: ["public"],
  },
  {
    path: "/register",
    element: Signup,
    layout: AuthLayout,
    isPrivate: false,
    roles: ["public"],
  },
  {
    path: "/verify-otp",
    element: OTP,
    layout: AuthLayout,
    isPrivate: false,
    roles: ["user", "admin"],
  },
];
