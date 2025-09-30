import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLastRoute } from "../store/navigationSlice";

const RouteTracker = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const path = location.pathname;

    // ❌ Do NOT track public auth routes if user is logged in
    const NO_TRACK_FOR_AUTHED = ["/login", "/signup", "/forgot-password"];
    if (user && NO_TRACK_FOR_AUTHED.includes(path)) return;

    // ✅ Track everything else
    dispatch(setLastRoute(path));
  }, [location, dispatch, user]);

  return null;
};

export default RouteTracker;
