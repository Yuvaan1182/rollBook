// src/router/components/RouteRenderer.tsx
import { Route } from "react-router-dom";
import type { AppRoute } from "../types/RouteTypes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useAppSelector } from "../store/hooks";

export const renderRoutes = (routes: AppRoute[]) =>
  routes.map(
    ({
      path,
      element: Element,
      layout: Layout,
      isPrivate,
      isRestrictedPublic,
      roles,
    }) => {
      const content = <Element />;
      const wrappedContent = Layout ? <Layout>{content}</Layout> : content;
      const { lastRoute } = useAppSelector((state) => state.nav);
      let element = wrappedContent;

      if (isPrivate) {
        element = <PrivateRoute roles={roles}>{wrappedContent}</PrivateRoute>;
      } else if (isRestrictedPublic) {
        element = (
          <PublicRoute redirectTo={lastRoute}>{wrappedContent}</PublicRoute>
        );
      }

      return <Route key={path} path={path} element={element} />;
    }
  );
