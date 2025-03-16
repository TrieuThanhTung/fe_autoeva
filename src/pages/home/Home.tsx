import React from 'react'
import './home.scss'
import Hero from '../../components/hero/Hero'
import CarList from '../../components/car/CarList'

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <CarList />
    </div>
  )
}

export default Home
