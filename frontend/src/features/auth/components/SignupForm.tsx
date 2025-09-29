import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Google from "./Google";
import InfoButton from "../../../components/ui/InfoButton";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { register } from "../store/thunk";

type SignupFormTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  countryCode?: string;
};

const SignupForm = () => {
  const [formData, setFormData] = useState<SignupFormTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "91",
  });
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Password strength checker
  const checkStrength = (value: string) => {
    let score = 0;

    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    if (value.length >= 12) score++;

    setStrength(score);
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength >= 4) return "Strong";
  };

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    if (strength >= 4) return "bg-green-500";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "password") {
      checkStrength(value);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      countryCode: formData.countryCode,
    };
    dispatch(register(payload));
  };

  const { loading, success } = useAppSelector((state) => state.auth.signup);

  useEffect(() => {
    if (success) {
      navigate("/verify-otp", {
        state: { email: formData.email, from: "signup" },
      });
    }
  }, [success, navigate, formData.email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1E9] relative overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen animate-pulse">
          Loading...{" "}
        </div>
      ) : (
        <>
          {/* Background gradient accents */}
          <div className="absolute top-0 left-0 w-60 h-60 bg-[#FFD93D] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF9A00] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

          {/* Login Card */}
          <div className="relative z-10 flex flex-col w-full max-w-md gap-6 p-10 bg-white shadow-2xl rounded-2xl">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-extrabold text-[#4F200D] animate-bounce">
                Join <span className="animate-bounce">Invoxyhub</span> Today
              </h1>
              <p className="mt-3 text-lg text-[#6B4F4F]">
                Manage your{" "}
                <span className="text-[#FF9A00] font-semibold">invoices</span>,
                clients and{" "}
                <span className="text-[#FFD93D] font-semibold">payments</span>{" "}
                all in one place.
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
                  className="flex gap-2 items-center justify-between text-sm font-medium text-[#4F200D] mb-1"
                >
                  Password
                  <InfoButton text="Password should be at least 6 characters long and include uppercase letters, numbers, and special characters for a strong password." />
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD93D] focus:outline-none"
                />
                {formData.password && (
                  <div className="mb-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${getStrengthColor()}`}
                        style={{ width: `${(strength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Strength:{" "}
                      <span className="font-medium">{getStrengthLabel()}</span>
                    </p>
                  </div>
                )}
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

                {formData.confirmPassword && (
                  <p
                    className={`text-sm ${
                      formData.confirmPassword === formData.password
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formData.confirmPassword === formData.password
                      ? "✅ Passwords match"
                      : "❌ Passwords do not match"}
                  </p>
                )}
              </div>

              <div>
                <PhoneInput
                  country={"in"}
                  value={formData.countryCode}
                  onChange={(countryCode) =>
                    setFormData((prev) => ({ ...prev, countryCode }))
                  }
                />
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
                disabled={getStrengthLabel() !== "Strong" ? true : false}
                className="disabled:bg-gray-500 disabled:cursor-not-allowed w-full bg-[#FF9A00] hover:bg-[#e68900] text-white font-semibold py-3 rounded-lg transition"
              >
                Sign Up
              </button>
            </form>
            {/* // other option to signup */}
            <div>
              <Google text="Sign up with Google" />
            </div>
            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#4F200D]">
                Already have an account?{" "}
                <span className="text-[#FF9A00] font-semibold hover:underline">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
