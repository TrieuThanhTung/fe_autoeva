import React from "react";
import "./home.scss";
import Hero from "../../components/hero/Hero";
import CarList from "../../components/car/CarList";
import PricingForm from "../../components/pricingForm/PricingForm";

const Home: React.FC = () => {
  return (
    <main className="home theme-light">
      <Hero />
      <section className="latest-cars">
        <CarList />
      </section>
      <section className="pricing-form">
        <PricingForm />
      </section>
    </main>
  );
};

export default Home;
