import React from "react";
import './hero.scss';
import heroBackground from '../../assets/images/hero-background.jpg';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';

const Hero: React.FC = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="hero-content">
        <h2>Mua Bán Xe Cũ Dễ Dàng & Nhanh Chóng</h2>
        <p>Nền tảng uy tín với công nghệ định giá AI</p>
        <div className="hero-buttons">
          <button className="btn primary">
            <CalculateRoundedIcon className="icon"/>
            Định giá ngay
          </button>
          <button className="btn secondary">
            <DirectionsCarRoundedIcon className="icon"/>
            <span>Danh sách xe</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
