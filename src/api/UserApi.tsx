import axiosInstance from "./AxiosInstance";
import {AuthHeaders, UpdateUserPayload, ChangePasswordPayload, ReportPayload} from "../util/type"
class UserApi {

  getProfile = async (authHeaders: AuthHeaders) => {
    return await axiosInstance.get("api/users/profile", { headers: authHeaders });
  };

  getUserById = async (id: number, authHeaders: AuthHeaders) => {
    return await axiosInstance.get(`/api/users/${id}`, { headers: authHeaders });
  };

  updateUserById = async (id: number, user: UpdateUserPayload, authHeaders: AuthHeaders) => {
    return await axiosInstance.put(`/api/users/${id}`, { user }, { headers: authHeaders });
  };

  changePassword = async (data: ChangePasswordPayload, authHeaders: AuthHeaders) => {
    return await axiosInstance.post("/api/users/change_password", data, { headers: authHeaders });
  };

  // getPosts = async (page?: number, authHeaders?: AuthHeaders) => {
  //   const url = page ? `/api/users/sale_posts?page=${page}` : "/api/users/sale_posts";
  //   return await axiosInstance.get(url, authHeaders ? { headers: authHeaders } : {});
  // };

  getPosts = async (page?: number) => {
    const url = page ? `/api/users/sale_posts?page=${page}` : "/api/users/sale_posts";
    return await axiosInstance.get(url);
  }

  createReport = async (payload: ReportPayload) => {
    return await axiosInstance.post("/api/reports", payload);
  }
}

export default new UserApi();
