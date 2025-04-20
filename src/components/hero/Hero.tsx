import React from "react";
import './hero.scss';
import heroBackground from '../../assets/images/banner.jpg';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="hero-content">
        <h2>Mua Bán Xe Cũ Dễ Dàng & Nhanh Chóng</h2>
        <p>Nền tảng uy tín với công nghệ định giá AI</p>
        <div className="hero-buttons">
          <Link to="/predict" className="btn primary">
            <CalculateRoundedIcon className="icon"/>
            <Link to="/predict">Định giá ngay</Link>
          </Link>
          <Link to="/posts" className="btn secondary">
            <DirectionsCarRoundedIcon className="icon"/>
            <Link to="/posts">Danh sách xe</Link>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
