import React from "react";
import "./home.scss";
import Hero from "../../components/hero/Hero";
import CarList from "../../components/car/CarList";
import PricingForm from "../../components/pricingForm/PricingForm";

const Home: React.FC = () => {
  return (
    <main className="home">
      <Hero />
      <section className="latest-cars">
        <h2 className="title-section">Tin đăng mới nhất</h2>
        <CarList />
      </section>
      <section className="pricing-form">
        <PricingForm />
      </section>
    </main>
  );
};

export default Home;
