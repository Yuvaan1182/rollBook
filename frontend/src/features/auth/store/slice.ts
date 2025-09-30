import { createSlice } from "@reduxjs/toolkit";
import { login, register, verifyEmail, googleLogin, resendOtp } from "./thunk";

export interface User {
  id: string;
  email: string;
  name?: string;
  token?: string;
  role?: string;
  phone?: string;
  countryCode?: string;
  twoFAmethod?: string;
  calendarIntegration: boolean;
  hasLinkedPaymentDetails: boolean;
  is2FAEnabled: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  services: string[];
  socials: string[];
}

export interface AuthState {
  initialized: boolean;
  user: User | null;
  signup: {
    loading: boolean;
    error: string | null;
    message: string | null;
    success: boolean;
  };
  login: {
    loading: boolean;
    error: string | null;
    message: string | null;
    success: boolean;
  };
  otp: {
    loading: boolean;
    error: string | null;
    message: string | null;
    success: boolean;
  };
  resendOtp: {
    loading: boolean;
    error: string | null;
    message: string | null;
    success: boolean;
  };
  googleLogin: {
    loading: boolean;
    error: string | null;
    message: string | null;
    success: boolean;
  };
}

const initialState: AuthState = {
  initialized: false,
  user: null,
  signup: { loading: false, error: null, message: null, success: false },
  login: { loading: false, error: null, message: null, success: false },
  otp: { loading: false, error: null, message: null, success: false },
  resendOtp: { loading: false, error: null, message: null, success: false },
  googleLogin: { loading: false, error: null, message: null, success: false },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.user = null;
      state.signup = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.login = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.otp = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.resendOtp = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.googleLogin = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
    },
    logout(state) {
      state.user = null;
      state.signup = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.login = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.otp = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.resendOtp = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
      state.googleLogin = {
        loading: false,
        error: null,
        message: null,
        success: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO: handle pending, fulfilled, rejected for login, googleLogin
      .addCase(login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.initialized = true;
        state.login.loading = false;
        state.user = action.payload.user;
        state.login.message = action.payload?.message;
        state.login.success = action.payload?.success;
      })
      .addCase(login.rejected, (state, action) => {
        state.initialized = true;
        state.login.loading = false;
        state.login.error =
          (action.payload as { message: string })?.message || "Error";
      })
      .addCase(register.pending, (state) => {
        state.signup.loading = true;
        state.signup.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.initialized = true;
        state.signup.loading = false;
        console.log(action.payload);

        state.signup.message = action.payload?.message;
        state.signup.success = action.payload?.success;
      })
      .addCase(register.rejected, (state, action) => {
        state.initialized = true;
        state.signup.loading = false;
        state.signup.error =
          (action.payload as { message: string })?.message || "Error";
      })
      .addCase(verifyEmail.pending, (state) => {
        state.otp.loading = true;
        state.otp.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.initialized = true;
        state.otp.loading = false;
        state.otp.message = action.payload?.data?.message;
        state.otp.success = action.payload?.success;
        console.log("verifyEmail:action.payload", action.payload);
        const obj = action.payload?.data?.user;
        const user: User = {
          name: obj.name,
          email: obj.email,
          token: action.payload.data.token,
          role: obj.role,
          phone: obj.phone,
          countryCode: obj.countryCode,
          id: obj._id,
          twoFAmethod: obj.twoFAmethods,
          calendarIntegration: obj.calendarIntegration,
          hasLinkedPaymentDetails: obj.hasLinkedPaymentDetails,
          is2FAEnabled: obj.is2FAEnabled,
          isEmailVerified: obj.isEmailVerified,
          isPhoneVerified: obj.isPhoneVerified,
          services: obj.services,
          socials: obj.socials,
        };
        state.user = user;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.initialized = true;
        state.otp.loading = false;
        state.otp.error =
          (action.payload as { message: string })?.message || "Error";
      })
      .addCase(resendOtp.pending, (state) => {
        state.resendOtp.loading = true;
        state.resendOtp.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.initialized = true;
        state.resendOtp.loading = false;
        state.resendOtp.message = action.payload.data?.message;
        state.resendOtp.success = action.payload?.data?.success;
        console.log("resendOtp:action.payload:", action.payload);

        // TODO: update user state
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.initialized = true;
        state.resendOtp.loading = false;
        state.resendOtp.error =
          (action.payload as { message: string })?.message || "Error";
      })
      .addCase(googleLogin.pending, (state) => {
        state.googleLogin.loading = true;
        state.googleLogin.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.initialized = true;
        state.googleLogin.loading = false;
        state.user = action.payload.user;
        state.googleLogin.success = action.payload?.data?.success;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.initialized = true;
        state.googleLogin.loading = false;
        state.googleLogin.error =
          (action.payload as { message: string })?.message || "Error";
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
