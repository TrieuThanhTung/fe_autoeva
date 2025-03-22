import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./PostImages.module.scss";

interface PostImagesProps {
  images: string[];
}

const PostImages: React.FC<PostImagesProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.carousel}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {images.map((src, index) => (
            <div className={styles.emblaSlide} key={index}>
              <img src={src} alt={`Slide ${index + 1}`} className={styles.image} />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.prevButton} onClick={scrollPrev}>‹</button>
      <button className={styles.nextButton} onClick={scrollNext}>›</button>
    </div>
  );
};

export default PostImages;
