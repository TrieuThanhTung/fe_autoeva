import React from "react";
import styles from "./CarCardRelated.module.scss";
import useHandleNagivate from "../../../hooks/useHandleNagivate";
import { formatCurrency } from "../../../util/utils";

interface CarCardRelatedProps {
  id: string | number;
  image: string;
  title: string;
  price: string;
  location: string;
}

const CarCardRelated: React.FC<CarCardRelatedProps> = ({id, image, title, price, location }) => {
  const handleNavigate = useHandleNagivate()

  return (
    <div className={styles.carCard} onClick={() => handleNavigate(`/post/${id}`)} >
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{formatCurrency(Number(price))} đ</p>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
  );
};

export default CarCardRelated;
