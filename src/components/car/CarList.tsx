import "./CarList.scss";
import React from "react";
import CarCard from "./CarCard";
import { carData } from "../../util/data";

const CarList: React.FC = () => {
  return (
    <section className="container">
      <h2 className="">Bài Đăng Mới Nhất</h2>
      <div className="card-list">
        {carData.map((car, index) => <CarCard key={index} {...car} />)}
      </div>
    </section>
  );
};

export default CarList;
