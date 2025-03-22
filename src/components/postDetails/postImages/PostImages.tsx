import React from "react";
import Slider from "react-slick";
import styles from "./PostImages.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PostImagesProps {
  images: string[];
}

const PostImages: React.FC<PostImagesProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image} alt={`Car ${index + 1}`} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PostImages;
