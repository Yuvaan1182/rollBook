import { Route } from "react-router-dom";
import type { AppRoute } from "../types/RouteTypes";
import PrivateRoute from "./PrivateRoute";

export const renderRoutes = (routes: AppRoute[]) =>
  routes.map(({ path, element: Element, layout: Layout, isPrivate, roles }) => {
    const content = <Element />;
    const wrappedContent = Layout ? <Layout>{content}</Layout> : content;

    return (
      <Route
        key={path}
        path={path}
        element={
          isPrivate ? (
            <PrivateRoute roles={roles}>{wrappedContent}</PrivateRoute>
          ) : (
            wrappedContent
          )
        }
      />
    );
  });
