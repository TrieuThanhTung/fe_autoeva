import axiosInstance from "./AxiosInstance";

const api = {
  get: (url: string, params = {}) => axiosInstance.get(url, { params }).then((res) => res.data),
  post: (url: string, body: any) => axiosInstance.post(url, body).then((res) => res.data),
  put: (url: string, body: any) => axiosInstance.put(url, body).then((res) => res.data),
  delete: (url: string) => axiosInstance.delete(url).then((res) => res.data)
}

export default api;
