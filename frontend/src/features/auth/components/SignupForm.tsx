import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type SignupFormTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

const SignupForm = () => {
  const [formData, setFormData] = useState<SignupFormTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    const { email, password } = formData;
    // Add validation and API call logic as needed
    const url = "http://localhost:3001/api/v1/auth/login/email-password";
    const payload = { email, password };
    console.log("Payload:", payload);
    const response = await axios.post(url, payload);
    console.log("Response:", response);
    // Handle response (e.g., store token, redirect, show error, etc.)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1E9] relative overflow-hidden">
      {/* Background gradient accents */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#FFD93D] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF9A00] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#4F200D] animate-bounce">
            Welcome Back <span className="animate-bounce">👋</span>
          </h1>
          <p className="mt-3 text-lg text-[#6B4F4F]">
            Log in to continue managing your{" "}
            <span className="text-[#FF9A00] font-semibold">invoices</span> and
            track your{" "}
            <span className="text-[#FFD93D] font-semibold">payments</span>{" "}
            seamlessly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#4F200D] mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              size={30}
              placeholder="User Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9A00] focus:outline-none"
            />
          </div>
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#4F200D] mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD93D] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#4F200D] mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD93D] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9A00] hover:bg-[#e68900] text-white font-semibold py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-[#4F200D]">
            Already have an account?{" "}
            <span className="text-[#FF9A00] font-semibold hover:underline">
              <Link to="/register">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
