import React, { useState } from "react";
import "./CarList.scss";
import CarCard from "../car/CarCard";
import { carData } from "../../util/data";

const CarList: React.FC = () => {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="carList container">
      <div className="grid">
        {carData.slice(0, 3).map((car, index) => (
          <CarCard
            id={car.id}
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
    </section>
  );
};

export default CarList;
