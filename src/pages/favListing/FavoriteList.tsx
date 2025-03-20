import React, { useState, useEffect } from "react";
import CarCard from "../../components/car/CarCard";
import "./FavoriteList.scss";
import { carData } from "../../util/data";

const FavoriteList: React.FC = () => {
  // ban đầu tất cả xe trong danh sách yêu thích có trạng thái favorited
  const initialFavorites = carData.reduce((acc, _, index) => {
    acc[index] = true;
    return acc;
  }, {} as { [key: number]: boolean });

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>(initialFavorites);

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <main className="favoriteList">
      <div className="container">
        <h1 className="title">Tin đăng yêu thích</h1>
        <div className="grid">
          {carData.map((car, index) => (
            <CarCard
              key={index}
              name={car.name}
              image={car.image}
              price={car.price}
              location={car.location}
              mileage={car.mileage}
              isFavorited={favorites[index] || false}
              onToggleFavorite={() => toggleFavorite(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FavoriteList;