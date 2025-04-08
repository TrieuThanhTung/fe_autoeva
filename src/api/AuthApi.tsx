import { UserLoginPayload, UserRegistrationPayload } from "../util/types/auth";
import axiosInstance from "./AxiosInstance";

class AuthApi {
  login = async (payload: UserLoginPayload) => {
    return await axiosInstance.post("/api/auth/sign_in", payload);
  }

  register = async (payload: UserRegistrationPayload) => {
    return await axiosInstance.post("/api/auth", payload);
  };
}

export default new AuthApi();
