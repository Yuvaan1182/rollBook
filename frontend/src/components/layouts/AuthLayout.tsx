import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="">
      {/* Auth Form (child component like LoginForm, SignupForm, etc.) */}
      {children}
    </div>
  );
};

export default AuthLayout;
