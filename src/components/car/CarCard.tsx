import React from "react";
import "./CarCard.scss";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../util/utils";

interface CarCardProps {
  id: string | number;
  name: string;
  image: string;
  status: string;
  price: string;
  location: string;
  mileage: number | string;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const CarCard: React.FC<CarCardProps> = ({id, name, image, price, status, location, mileage, isFavorited, onToggleFavorite }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content">
        <div className="car-card-info">
          <div className="wrapper-title">
            <h3 className="title-car-card-item truncate-location">{name}</h3>
            {status === "sold" && <div className="status-sold"> Đã bán </div>}
          </div>
          <p className="basic-info truncate-location">
            <i className="fas fa-map-marker-alt"></i> {location}
          </p>
          <p className="basic-info">
            <i className="fas fa-road"></i> {mileage} km
          </p>
        </div>
        <div className="card-content-footer">
          <span className="price">{formatCurrency(Number(price))} ₫</span>
          <div className="actions">
            <Link to={`/post/${id}`}><button className="detailButton">Xem chi tiết</button></Link>
            <button className={`favoriteButton ${isFavorited ? "favorited" : ""}`} onClick={onToggleFavorite}>
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
