import React, { useEffect, useState } from "react";
import CarCard from "../../components/car/CarCard";
import "./favoriteList.scss";
import { PostItemType } from "../../util/type";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";
import FavoriteApi from "../../api/FavoriteApi";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

type favoriteItem = {
  id: number,
  created_at: string,
  sale_post: PostItemType
}

const FavoriteList: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  const initialCurrentPage = queryParams.get("page") || "";
  const { showLoading, hideLoading } = useGlobalLoading()

  const [favoritePosts, setFavoritePosts] = useState<PostItemType[]>()

  const [currentPage, setCurrentPage] = React.useState(initialCurrentPage ? parseInt(initialCurrentPage) : 1);
  const [totalPages, setTotalPages] = React.useState(1);

  const navigate = useNavigate()

  const fetchFavoritePosts = async (page?: string | number) => {
    showLoading()
    try {
      const res = await FavoriteApi.getFavoriteList(page)
      if (res.status === 200) {
        const favorite_list: favoriteItem[] = res.data.favorites;
        setFavoritePosts(favorite_list.map((post) => post.sale_post))
        setCurrentPage(res.data.current_page)
        setTotalPages(res.data.total_pages)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => { hideLoading() }, 1000)
    }
  }

  useEffect(() => {
    fetchFavoritePosts(currentPage)
  }, [currentPage])

  const handleFavoritePost = (index: number, status: boolean) => {
    setFavoritePosts((prevPosts) => {
      const updatedPosts = prevPosts ? [...prevPosts] : [];
      updatedPosts[index] = {
        ...updatedPosts[index],
        favorited: status
      }
      return updatedPosts;
    })
  }


  const toggleFavorite = async (index: number) => {
    if (favoritePosts) {
      const favoritePost = favoritePosts[index]
      if (favoritePost.favorited === true) {
        await FavoriteApi.deleteFavoritePost(favoritePost.id)
      } else {
        await FavoriteApi.createFavoritePost(favoritePost.id)
      }
      handleFavoritePost(index, !favoritePost.favorited)
    }
  };

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    navigate(`/favorites?page=${value}`);
  };

  return (
    <main className="favoriteList">
      <div className="container">
        <h1 className="title">Tin đăng yêu thích</h1>
        {favoritePosts?.length !== 0 ? <div className="grid">
          {favoritePosts?.map((car, index) => (
            <CarCard
              id={car.id}
              key={index}
              name={car.title}
              status={car.status}
              image={car.image}
              price={car.price}
              location={car.location}
              mileage={car.odo}
              isFavorited={car.favorited}
              onToggleFavorite={() => toggleFavorite(index)}
            />
          ))}
        </div> :
          <p>Không có danh sách</p>
        }
        {totalPages > 1 && (
          <div className='' style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoriteList;
