import React from "react";
import styles from "./RelatedPosts.module.scss";
import CarCardRelated from "../CarCardRelated/CarCardRelated";

interface RelatedPostsProps {
  posts: {
    image: string;
    title: string;
    price: string;
    location: string;
  }[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <div className={styles.relatedContainer}>
      <h2 className={styles.heading}>Tin đăng tương tự</h2>
      <div className={styles.postList}>
        {posts.map((post, index) => (
          <CarCardRelated key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
