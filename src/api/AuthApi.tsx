import { UserLoginPayload, UserRegistrationPayload } from "../util/types/auth";
import axiosInstance from "./AxiosInstance";

class AuthApi {
  login = async (payload: UserLoginPayload) => {
    return await axiosInstance.post("/api/auth/sign_in", payload);
  }

  register = async (payload: UserRegistrationPayload) => {
    return await axiosInstance.post("/api/auth", payload);
  };

  verifyEmail = async (token: string ) => {
    return await axiosInstance.get(`/api/auth/confirmation?confirmation_token=${token}`);
  }

  resendVerifyEmail = async (email: string) => {
    return await axiosInstance.post("/api/auth/confirmation", { email });
  }

  logout = async () => {
    return await axiosInstance.delete("/api/auth/sign_out");
  }

  forgotPassword = async (email: string) => {
    return await axiosInstance.post("/api/auth/password", { email });
  }

  resetPassword = async (password: string, confirmPassword: string, token: string) => {
    return await axiosInstance.put("/api/auth/password", { password, password_confirmation: confirmPassword, reset_password_token: token });
  }
}

export default new AuthApi();
