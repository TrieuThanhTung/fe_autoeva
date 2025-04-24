import axiosInstance from "./AxiosInstance";
import {Brand, Model, Version, PredictionResponse,} from "../util/type"
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

  fetchBrands = async (): Promise<Brand[]> => {
    const response = await axiosInstance.get("/api/brands");
    return response.data;
  };

  fetchModels = async (brandId: number): Promise<Model[]> => {
    const response = await axiosInstance.get(`/api/models?brand_id=${brandId}`);
    return response.data;
  };

  fetchVersions = async (modelId: number): Promise<Version[]> => {
    const response = await axiosInstance.get(`/api/versions?model_id=${modelId}`);
    return response.data;
  };

  fetchPrediction = async (
    brandId: number,
    modelId: number,
    versionId: number,
    year: number,
    mileage: number
  ): Promise<PredictionResponse> => {
    const response = await axiosInstance.post("/api/predicts", {
      brand_id: brandId,
      model_id: modelId,
      version_id: versionId,
      year_of_manufacture: year,
      mileage: mileage,
    });
    return response.data;
  };
}

export default new CarInforApi();
