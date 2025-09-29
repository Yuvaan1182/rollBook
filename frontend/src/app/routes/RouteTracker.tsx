import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setLastRoute } from "../store/slices/navigationSlice";

const RouteTracker = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Exclude public routes if desired
    const excluded = ["/login", "/register"];
    if (!excluded.includes(location.pathname)) {
      dispatch(setLastRoute(location.pathname));
    }
  }, [location.pathname, dispatch]);

  return null; // no UI rendered
};

export default RouteTracker;
