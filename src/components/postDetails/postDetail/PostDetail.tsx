import React from "react";
import styles from "./PostDetail.module.scss";

interface PostDetailProps {
  title: string;
  price: string;
  location: string;
  mileage: string;
  year: string;
  origin: string;
  fuel: string;
  transmission: string;
  seats: string;
  description: string;
}

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  price,
  location,
  mileage,
  year,
  origin,
  fuel,
  transmission,
  seats,
  description,
}) => {
  return (
    <div className={styles.postDetail}>
      <div className={styles.postHeader}>
        <h2 className={styles.title}>{title}</h2>
        <button className={`${styles.favoriteButton} ${styles.favorited}`}>
          <i className="fas fa-heart"></i>
        </button>
      </div>
      <div className={styles.meta}>
        <span className={`${styles.price} ${styles.priceTag}`}>
          <i className={`${styles.iconPostDetail} fa-solid fa-tag`}></i>
          {price} đ
          </span>
        <span className={styles.mileage}>
          <i className={`${styles.iconPostDetail} fas fa-road`}></i>  
        {mileage} km
        </span>
        <span className={styles.location}>
          <i className={`${styles.iconPostDetail} fas fa-map-marker-alt`}></i> 
          {location}
          </span>
        <span className={styles.year}>
          <i className={`${styles.iconPostDetail} fa-solid fa-calendar`}></i>
          <span className={styles.df}>{year}</span>
        </span>
      </div>

      <div className={styles.infoSection}>
        <h3>Thông tin chi tiết</h3>
        <div className={styles.infoGrid}>
          <div>
            <strong>Xuất xứ:</strong> {origin}
          </div>
          <div>
            <strong>Nhiên liệu:</strong> {fuel}
          </div>
          <div>
            <strong>Hộp số:</strong> {transmission}
          </div>
          <div>
            <strong>Số chỗ:</strong> {seats}
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <h3>Mô tả</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PostDetail;
