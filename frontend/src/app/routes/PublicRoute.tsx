import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  redirectTo?: string; // where to send logged-in users
}

const PublicRoute: React.FC<Props> = ({
  children,
  redirectTo = "/dashboard",
}) => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Navigate to={redirectTo} /> : children;
};

export default PublicRoute;
