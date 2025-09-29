import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

// Import routes from features
import { authRoutes } from "../../features/auth/routes";
import { homeRoute } from "../../features/home/routes";
// import { invoicesRoutes } from "@/features/invoices/routes";
// import { analyticsRoutes } from "@/features/analytics/routes";
// import { subscriptionsRoutes } from "@/features/subscriptions/routes";

import { renderRoutes } from "./RouteRenderer";
import type { AppRoute } from "../types/RouteTypes";
import RouteTracker from "./RouteTracker";

// Combine all feature routes
const allRoutes: AppRoute[] = [
  ...authRoutes,
  ...homeRoute,
  //   ...invoicesRoutes,
  //   ...analyticsRoutes,
  //   ...subscriptionsRoutes,
];

const AppRouter = () => (
  <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <RouteTracker />
        <Routes>{renderRoutes(allRoutes)}</Routes>
      </Suspense>
    </BrowserRouter>
  </>
);

export default AppRouter;
