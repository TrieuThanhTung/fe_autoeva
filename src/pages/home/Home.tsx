import React, { useEffect, useState } from "react";
import "./home.scss";
import Hero from "../../components/hero/Hero";
import CarList from "../../components/car/CarList";
import PricingForm from "../../components/pricingForm/PricingForm";
import PostApi from "../../api/PostApi";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";
import { PostItemType } from "../../util/type";

const Home: React.FC = () => {
    const { showLoading, hideLoading } = useGlobalLoading()
    const [homePosts, setHomePosts] = useState<PostItemType[]>()
  
    const fetchHomePosts = async () => {
      showLoading()
      try {
        const res = await PostApi.getHome()
        if (res.status === 200) {
          setHomePosts(res.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          hideLoading()
        }, 1000)
      }
    }
  
    useEffect(() => {
      fetchHomePosts()
    }, [])

  return (
    <main className="home">
      <Hero />
      <section className="latest-cars">
        <h2 className="title-section">Tin đăng mới nhất</h2>
        <CarList salePosts={homePosts} setSalePosts={setHomePosts}/>
      </section>
      <section className="pricing-form">
        <PricingForm />
      </section>
    </main>
  );
};

export default Home;
