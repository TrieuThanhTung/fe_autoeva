import React from 'react'
import './home.scss'
import Hero from '../../components/hero/Hero'
import CarList from '../../components/car/CarList'
import PricingForm from '../../components/pricingForm/PricingForm'

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <CarList />
      <PricingForm />
    </div>
  )
}

export default Home
