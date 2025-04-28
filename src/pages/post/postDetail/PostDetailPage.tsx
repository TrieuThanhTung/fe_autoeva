/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from "./PostDetailPage.module.scss";
import PostImages from '../../../components/postDetails/postImages/PostImages';
import PostDetail from '../../../components/postDetails/postDetail/PostDetail';
import CommentSection from '../../../components/postDetails/CommentSection/CommentSection';
import SellerInfo from '../../../components/postDetails/SellerInfo/SellerInfo';
import RelatedPosts from '../../../components/postDetails/RelatedPosts/RelatedPosts';
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalLoading } from "../../../context/components/globalLoading/GlobalLoadingProvider";
import { useState } from "react";
import avatar_seller from "../../../assets/images/avatar_seller.png";
import PostApi from "../../../api/PostApi";
import { formatCurrency, formatDate } from '../../../util/utils';
import { RelatedPostType } from '../../../util/type';
import DOMPurify from 'dompurify';
import FavoriteApi from '../../../api/FavoriteApi';
import { useAuthContext } from '../../../context/authContext';
import { toast } from 'react-toastify';

const PostDetailPage = () => {
  const { id } = useParams();
  const { showLoading, hideLoading } = useGlobalLoading();
  const { isLoggedIn } = useAuthContext()
  const navigate = useNavigate()

  const [sellerInfo, setSellerInfo] = useState({
    id: 0,
    name: "",
    avatar: avatar_seller,
    joinYear: "",
    phone: "",
  });

  const [relatedPosts, setRelatedPosts] = useState<Array<RelatedPostType>>();

  const [postDetails, setPostDetails] = useState({
    id: 0,
    "title": "",
    "images": Array<string>(),
    "price": "",
    "location": "",
    "mileage": "",
    status: "",
    "year": "",
    "origin": "",
    "fuel": "",
    "transmission": "",
    "seats": "",
    "description": "",
    favorited: false
  });

  const fetchPostDetails = async (postId: string) => {
    showLoading();
    try {
      const response = await PostApi.getPostById(postId);
      if (response.status !== 200) {
        throw new Error("Lấy thông tin bài đăng đang có lỗi");
      }
      const sale_post = response.data.sale_post
      setPostDetails({
        id: sale_post.id,
        title: sale_post.title,
        price: formatCurrency(Number(sale_post.price)),
        location: sale_post.location,
        mileage: sale_post.odo,
        year: sale_post.year,
        status: sale_post.status,
        origin: sale_post.origin,
        fuel: sale_post.fuel,
        transmission: sale_post.transmission,
        seats: sale_post.seats,
        description: DOMPurify.sanitize(sale_post.description),
        images: sale_post.images.map((image: { id: number, url: string }) => image.url),
        favorited: sale_post.favorited
      });

      if (sale_post.sale_post_images.length > 0) {
        setPostDetails((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...sale_post.sale_post_images.map((image: { id: number, image_url: string }) => image.image_url)],
        }));
      }

      setSellerInfo({
        id: sale_post.user.id,
        name: sale_post.user.first_name ? `${sale_post.user.first_name} ${sale_post.user.last_name}` : sale_post.user.email,
        avatar: sale_post.user.avatar || avatar_seller,
        joinYear: sale_post.user.created_at ? formatDate(sale_post.user.created_at) : new Date().getFullYear().toString(),
        phone: sale_post.user.phone_number,
      });

      setRelatedPosts(response.data.related_sale_posts);
    } catch (error) {
      console.error(error);
      navigate("/not_found")
    } finally {
      setTimeout(() => {
        hideLoading();
      }, 1000);
    }
  }

  React.useEffect(() => {
    if (id) {
      fetchPostDetails(id);
    }
  }, [id]);

  const handleFavoritesPost = async () => {
    let res = null
    if (isLoggedIn && postDetails.favorited === true) {
      res = await FavoriteApi.deleteFavoritePost(postDetails.id)
    } else if (isLoggedIn && postDetails.favorited === false) {
      res = await FavoriteApi.createFavoritePost(postDetails.id)
    }
    if (res?.status === 200 || res?.status === 201) {
      setPostDetails((prevPost) => ({
        ...prevPost,
        favorited: !prevPost.favorited
      }))
    }
    if (!res || res.status === 401) {
      toast.error("Vui lòng đăng nhập, để thêm bài đăng vào danh sách yêu thích.")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.postContainer}>
          <PostImages images={postDetails.images} />
          <PostDetail post={postDetails} handleFavoritesPost={handleFavoritesPost} />
        </div>
        <div className={styles.commentContainer}>
          <CommentSection id={postDetails.id}/>
        </div>
      </div>
      <div className={styles.sidebar}>
        <SellerInfo
          id={sellerInfo.id}
          name={sellerInfo.name}
          avatar={sellerInfo.avatar}
          joinYear={sellerInfo.joinYear}
          phone={sellerInfo.phone}
        />
        <RelatedPosts posts={relatedPosts as RelatedPostType[]} />
      </div>
    </div>
  );
}

export default PostDetailPage
