import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="">
      <div className="">
        {/* Logo/Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">InvoxyHub</h1>
          <p className="text-sm text-gray-500"></p>
        </div>

        {/* Auth Form (child component like LoginForm, SignupForm, etc.) */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
