import React from "react";
import styles from "./RelatedPosts.module.scss";
import CarCardRelated from "../CarCardRelated/CarCardRelated";
import { RelatedPostType } from "../../../util/type";

interface RelatedPostsProps {
  posts: Array<RelatedPostType>
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <div className={styles.relatedContainer}>
      <h2 className={styles.heading}>Tin đăng tương tự</h2>
      <div className={styles.postList}>
        {posts?.map((post, index) => (
          <CarCardRelated key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
