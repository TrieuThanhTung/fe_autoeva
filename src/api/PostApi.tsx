import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { CreatePostType } from "../util/type";

class PostApi {
  uploadImageToImgur = async ( 
    imageFile: File,
  ) => {
    const url = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await axios.post(`${url}/api/sale_posts/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status !== 201 && response.status !== 200) {
        throw new Error('Failed to upload image');
      }
      return response.data.id;
    } catch (error) {
      console.log(error)
    }
  }

  createPost = async (payload: CreatePostType) => {
     return await axiosInstance.post("/api/sale_posts", payload);
  }

  
  updatePost = async (postId: number, payload: CreatePostType) => {
    return await axiosInstance.put(`/api/sale_posts/${postId}`, payload);
  }

  updateStatusPost = async (postId: number, status: string) => {
    return await axiosInstance.put(`/api/sale_posts/${postId}`, { status });
  }

  deletePost = async (postId: number) => {
    return await axiosInstance.delete(`/api/sale_posts/${postId}`);
  }
}

export default new PostApi();
