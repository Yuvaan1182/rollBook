// src/store/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authService.login(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    data: { email: string; password: string; name: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("payload signup", data);

      const res = await authService.register(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await authService.emailVerify(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await authService.twoFAEmailVerification(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const res = await authService.resendVerificationOtp(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.googleLogin();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
