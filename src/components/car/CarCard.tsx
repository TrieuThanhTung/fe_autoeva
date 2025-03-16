import "./CarCard.scss";
import React from "react";

interface CarCardProps {
  name: string;
  image: string;
  price: string;
  location: string;
  mileage: string;
}

const CarCard: React.FC<CarCardProps> = ({ name, image, price, location, mileage }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content">
        <h3 className="font-bold mt-5">{name}</h3>
        <p className="basic-info">
          📍 {location} • 🚗 {mileage}
        </p>
        <div className="card-content-footer">
          <span className="price">{price} đ</span>
          <button className="mt-2 bg-black text-white px-4 py-2 rounded-md">Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
