import type { ReactNode } from "react";
import { useAppDispatch } from "../../app/store/hooks";
import { logout } from "../../features/auth/store/slice";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("handle logout called");

    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="">
      {/* Auth Form (child component like LoginForm, SignupForm, etc.) */}
      {children}
      <div
        className="absolute px-6 py-3 text-white rounded-md cursor-pointer top-2 right-2 bg-black/60"
        onClick={handleLogout}
      >
        Reset Auth State
      </div>
    </div>
  );
};

export default AuthLayout;
