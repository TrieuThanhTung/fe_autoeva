import React, { useEffect, useState } from "react";
import "./CarList.scss";
import CarCard from "../car/CarCard";
import { PostItemType } from "../../util/type";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";
import PostApi from "../../api/PostApi";
import FavoriteApi from "../../api/FavoriteApi";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/authContext";

const CarList: React.FC = () => {
  const {isLoggedIn} = useAuthContext()
  const { showLoading, hideLoading } = useGlobalLoading()
  const [homePosts, setHomePosts] = useState<PostItemType[]>()

  const fetchHomePosts = async () => {
    showLoading()
    try {
      const res = await PostApi.getHome()
      if (res.status === 200) {
        setHomePosts(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        hideLoading()
      }, 1000)
    }
  }

  useEffect(() => {
    fetchHomePosts()
  }, [])

  const handleFavoritePost = (index: number, status: boolean) => {
    setHomePosts((prevPosts) => {
      const updatedPosts = prevPosts ? [...prevPosts] : [];
      updatedPosts[index] = {
        ...updatedPosts[index],
        favorited: status
      }
      return updatedPosts;
    })
  }


  const toggleFavorite = async (index: number) => {
    if (homePosts) {
      const favoritePost = homePosts[index]
      let res = null
      if (isLoggedIn && favoritePost.favorited === true) {
        res = await FavoriteApi.deleteFavoritePost(favoritePost.id)
      } else if (isLoggedIn && favoritePost.favorited === false) {
        res = await FavoriteApi.createFavoritePost(favoritePost.id)
      }
      if (res?.status === 200 || res?.status === 201) {
        handleFavoritePost(index, !favoritePost.favorited)
      }
      if (!res || res.status === 401) {
        toast.error("Vui lòng đăng nhập, để thêm bài đăng vào danh sách yêu thích.")
      }
    }
  };

  return (
    <section className="carList container">
      <div className="grid">
        {homePosts?.map((car, index) => (
          <CarCard
            id={car.id}
            key={index}
            status={car.status}
            name={car.title}
            image={car.image}
            price={car.price}
            location={car.location}
            mileage={car.odo}
            isFavorited={car.favorited}
            onToggleFavorite={() => toggleFavorite(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default CarList;
