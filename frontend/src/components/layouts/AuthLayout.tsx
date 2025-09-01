import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-6">
        {/* Logo/Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">InvoxyHub</h1>
          <p className="text-sm text-gray-500">
            
          </p>
        </div>

        {/* Auth Form (child component like LoginForm, SignupForm, etc.) */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
