import React from "react";
import styles from "./CarCardRelated.module.scss";

interface CarCardRelatedProps {
  image: string;
  title: string;
  price: string;
  location: string;
}

const CarCardRelated: React.FC<CarCardRelatedProps> = ({ image, title, price, location }) => {
  return (
    <div className={styles.carCard}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price} đ</p>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
  );
};

export default CarCardRelated;
