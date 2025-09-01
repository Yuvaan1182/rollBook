import { lazy } from "react";
import type { AppRoute } from "../../app/types/RouteTypes";
import HomeLayout from "../../components/layouts/HomeLayout";

const Home = lazy(() => import("./pages/HomePage"));

export const homeRoute: AppRoute[] = [
  {
    path: "/",
    element: Home,
    layout: HomeLayout,
    isPrivate: false,
    roles: ["public"]
  },
];
