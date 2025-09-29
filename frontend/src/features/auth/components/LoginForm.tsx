import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { login } from "../store/thunk";
import Google from "./Google";

type LoginFormTypes = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    dispatch(login(payload));
  };

  const { loading, success } = useAppSelector((state) => state.auth.login);

  useEffect(() => {
    if (success) {
      navigate("/verify-otp", {
        state: { email: formData.email, from: "login" },
      });
    }
  }, [success, navigate, formData.email]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F1E9] relative overflow-hidden">
          {/* Background gradient accents */}
          <div className="absolute top-0 left-0 w-60 h-60 bg-[#FFD93D] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF9A00] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

          {/* Login Card */}
          <div className="relative z-10 w-full max-w-md p-10 bg-white shadow-2xl rounded-2xl">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-[#4F200D] animate-bounce">
                Welcome Back <span className="animate-bounce">👋</span>
              </h1>
              <p className="mt-3 text-lg text-[#6B4F4F]">
                Log in to continue managing your{" "}
                <span className="text-[#FF9A00] font-semibold">invoices</span>{" "}
                and track your{" "}
                <span className="text-[#FFD93D] font-semibold">payments</span>{" "}
                seamlessly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#4F200D] mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9A00] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#4F200D] mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD93D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-[#4F200D]">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <a href="#" className="text-[#FF9A00] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF9A00] hover:bg-[#e68900] text-white font-semibold py-3 rounded-lg transition"
              >
                Log In
              </button>
            </form>
            <div className="py-4">
              <Google text="Login with Google" />
            </div>
            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#4F200D]">
                Don’t have an account?{" "}
                <span className="text-[#FF9A00] font-semibold hover:underline">
                  <Link to="/register">Sign up here</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
