import axiosInstance from "./AxiosInstance";

class CarInforApi {
  getBrands = async () => {
    return await axiosInstance.get("/api/brands");
  }

  getModels = async (brandId: number) => {
    return await axiosInstance.get(`/api/models?brand_id=${brandId}`);
  }

  getVersions = async (modelId: number) => {
    return await axiosInstance.get(`/api/versions?model_id=${modelId}`);
  }
}

export default new CarInforApi();
