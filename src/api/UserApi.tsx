import axiosInstance from "./AxiosInstance";

class UserApi {
  getProfile = async () => {
    return await axiosInstance.get("/api/users/profile");
  }

  getPosts = async (page?: number) => {
    const url = page ? `/api/users/sale_posts?page=${page}` : "/api/users/sale_posts";
    return await axiosInstance.get(url);
  }
}

export default new UserApi();
