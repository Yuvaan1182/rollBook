import React from "react";

const LoginForm = () => {
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
        <form className="space-y-5">
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
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD93D] focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
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

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-[#4F200D]">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#FF9A00] font-semibold hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
