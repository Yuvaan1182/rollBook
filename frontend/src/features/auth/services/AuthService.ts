import { api } from "../../../services/api";
import { extractErrorMessage } from "../../../utils/errorHandler";

class AuthService {
  async login(data: { email: string; password: string }) {
    try {
      const response = await api.post("/auth/login/email-password", data);
      console.log(response);

      return response.data;
    } catch (error) {
      throw extractErrorMessage(error);
    }
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    phone: string;
  }) {
    try {
      const response = await api.post("/auth/register/email-password", data);
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error);
    }
  }

  async emailVerify(data: { email: string; otp: string }) {
    try {
      const response = await api.post("/auth/register/verify-email", data);
      return response.data;
    } catch (error) {
      console.warn(error);
      throw extractErrorMessage(error);
    }
  }

  async resendVerificationOtp(data: { email: string }) {
    try {
      const response = await api.post(
        "/auth/register/resend-verification-email",
        data
      );
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error);
    }
  }

  async googleLogin() {
    try {
      const response = await api.post("/auth/google-login");
      return response.data;
    } catch (error) {
      throw extractErrorMessage(error);
    }
  }
}

export const authService = new AuthService();
