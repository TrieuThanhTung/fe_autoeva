/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "./PostDetail.module.scss";
import { PostDetalsType } from "../../../util/type";

interface PostDetailProps {
  post: PostDetalsType;
  handleFavoritesPost: () => Promise<void>;
}

const PostDetail: React.FC<PostDetailProps> = ({post, handleFavoritesPost}) => {

  return (
    <div className={styles.postDetail}>
      <div className={styles.postHeader}>
        <h2 className={styles.title}>{post.title}</h2>
        <button className={`${styles.favoriteButton} ${ post.favorited ? styles.favorited : ''}`} onClick={handleFavoritesPost}>
          <i className="fas fa-heart"></i>
        </button>
      </div>
      <div className={styles.meta}>
        <span className={`${styles.price} ${styles.priceTag}`}>
          <i className={`${styles.iconPostDetail} fa-solid fa-tag`}></i>
          {post.price} đ
          </span>
        <span className={styles.mileage}>
          <i className={`${styles.iconPostDetail} fas fa-road`}></i>  
        {post.mileage} km
        </span>
        <span className={styles.location}>
          <i className={`${styles.iconPostDetail} fas fa-map-marker-alt`}></i> 
          {post.location}
          </span>
        <span className={styles.year}>
          <i className={`${styles.iconPostDetail} fa-solid fa-calendar`}></i>
          <span className={styles.df}>{post.year}</span>
        </span>
      </div>

      <div className={styles.infoSection}>
        <h3>Thông tin chi tiết</h3>
        <div className={styles.infoGrid}>
          <div>
            <strong>Xuất xứ:</strong> {origin}
          </div>
          <div>
            <strong>Nhiên liệu:</strong> {post.fuel}
          </div>
          <div>
            <strong>Hộp số:</strong> {post.transmission}
          </div>
          <div>
            <strong>Số chỗ:</strong> {post.seats}
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <h3>Mô tả</h3>
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
    </div>
  );
};

export default PostDetail;
