// import { lazy } from "react";
// import type { AppRoute } from "../../app/types/RouteTypes";
// import AuthLayout from "../../components/layouts/AuthLayout";

// const Login = lazy(() => import("./pages/LoginPage"));
// const Signup = lazy(() => import("./pages/SignupPage"));
// const OTP = lazy(() => import("./pages/OtpVerifyPage"));

// export const authRoutes: AppRoute[] = [
//   {
//     path: "/dashboard",
//     element: Login,
//     layout: AuthLayout,
//     isPrivate: false,
//     isRestrictedPublic: true,
//     roles: ["user"],
//   },
//   {
//     path: "/register",
//     element: Signup,
//     layout: AuthLayout,
//     isPrivate: false,
//     isRestrictedPublic: true,
//     roles: ["user"],
//   },
//   {
//     path: "/verify-otp",
//     element: OTP,
//     layout: AuthLayout,
//     isPrivate: false,
//     roles: ["user", "admin"],
//   },
// ];
