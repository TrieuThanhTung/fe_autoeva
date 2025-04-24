import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { CommentPayload, CreatePostType } from "../util/type";

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

  getUserPost = async (postId: number | string) => {
    return await axiosInstance.get(`/api/sale_posts/show_user_post/${postId}`);
  }

  createPost = async (payload: CreatePostType) => {
     return await axiosInstance.post("/api/sale_posts", payload);
  }

  updatePost = async (postId: string, payload: CreatePostType) => {
    return await axiosInstance.put(`/api/sale_posts/${postId}`, payload);
  }

  updateStatusPost = async (postId: number, status: string) => {
    return await axiosInstance.put(`/api/sale_posts/${postId}`, { status });
  }

  deletePost = async (postId: number) => {
    return await axiosInstance.delete(`/api/sale_posts/${postId}`);
  }

  getPostById = async (postId: number | string) => {
    return await axiosInstance.get(`/api/sale_posts/${postId}`);
  }

  getHome = async () => {
    return await axiosInstance.get('/api/sale_posts/home')
  }

  getComments = async (postId: number | string, page?: string | number) => {
    const url = page ? `/api/sale_posts/${postId}/comments?page=${page}` : `/api/sale_posts/${postId}/comments` 
    return await axiosInstance.get(url)
  }

  createComment = async (postId: number | string, payload: CommentPayload) => {
    return await axiosInstance.post(`/api/sale_posts/${postId}/comments`, payload)
  }
}

export default new PostApi();
