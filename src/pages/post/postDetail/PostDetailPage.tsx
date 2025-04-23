/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from "./PostDetailPage.module.scss";
import PostImages from '../../../components/postDetails/postImages/PostImages';
import PostDetail from '../../../components/postDetails/postDetail/PostDetail';
import { relatedCars } from '../../../util/data';
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

const PostDetailPage = () => {
  const { id } = useParams();
  const {showLoading, hideLoading} = useGlobalLoading();
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)

  const [sellerInfo, setSellerInfo] = useState({
    name: "",
    avatar: avatar_seller,
    joinYear: "",
    phone: "",
  });

  const [relatedPosts, setRelatedPosts] = useState<Array<RelatedPostType>>();

  const [postDetails, setPostDetails] = useState({
  "title": "",
  "images": Array<string>(),
  "price": "",
  "location": "",
  "mileage": "",
  "year": "",
  "origin": "",
  "fuel": "",
  "transmission": "",
  "seats": "",
  "description": ""
});

  const fetchPostDetails = async (postId: string) => {
    showLoading();
    setLoading(true)
    try {
      const response = await PostApi.getPostById(postId);
      if (response.status !== 200) {
        throw new Error("Lấy thông tin bài đăng đang có lỗi");
      }
      const sale_post = response.data.sale_post
      setPostDetails({
        title: sale_post.title,
        price: formatCurrency(Number(sale_post.price)),
        location: sale_post.location,
        mileage: sale_post.odo,
        year: sale_post.year,
        origin: sale_post.origin,
        fuel: sale_post.fuel,
        transmission: sale_post.transmission,
        seats: sale_post.seats,
        description: sale_post.description,
        images: sale_post.images.map((image: {id: number, url: string}) => image.url),
      });

      if (sale_post.sale_post_images.length > 0) {
        setPostDetails((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...sale_post.sale_post_images.map((image: {id: number, image_url: string}) => image.image_url)],
        }));
      }

      setSellerInfo({
        name: sale_post.user.first_name ? `${sale_post.user.first_name} ${sale_post.user.last_name}` : sale_post.user.email,
        avatar: sale_post.user.avatar || avatar_seller,
        joinYear: sale_post.user.created_at ? formatDate(sale_post.user.created_at) : new Date().getFullYear().toString(),
        phone: sale_post.user.phone_number,
      });

      setRelatedPosts(response.data.related_sale_posts);
      // console.log(response.data.related_sale_posts)
    } catch (error) {
      console.error(error);
      navigate("/not_found")
    } finally {
      setTimeout(() => {
        hideLoading();
        setLoading(false)
      }
      , 1000);
    }
  }

  React.useEffect(() => {
    if (id) {
      fetchPostDetails(id);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.postContainer}>
          <PostImages images={postDetails.images} />
          <PostDetail {...postDetails} />
        </div>
        <div className={styles.commentContainer}>
          <CommentSection />
        </div>
      </div>
      <div className={styles.sidebar}>
        <SellerInfo
          name={sellerInfo.name}
          avatar={sellerInfo.avatar}
          joinYear={sellerInfo.joinYear}
          phone={sellerInfo.phone}
        />
        <RelatedPosts posts={relatedPosts as RelatedPostType[]}/>
      </div>
    </div>
  );
}

export default PostDetailPage
