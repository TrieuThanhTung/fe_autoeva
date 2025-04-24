import axiosInstance from "./AxiosInstance";

class FavoriteApi {
  getFavoriteList = async (page?: string | number) => {
    const url = page ? `/api/favorites?page=${page}` : '/api/favorites'
    return await axiosInstance.get(url)
  }

  createFavoritePost = async (postId: string | number) => {
    return await axiosInstance.post(`/api/sale_posts/${postId}/favorites`)
  }

  deleteFavoritePost = async (postId: string | number) => {
    return await axiosInstance.delete(`/api/sale_posts/${postId}/favorites/destroy`)
  }
}

export default new FavoriteApi()
