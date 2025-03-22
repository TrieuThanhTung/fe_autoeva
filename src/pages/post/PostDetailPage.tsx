import React from 'react'
import styles from "./PostDetailPage.module.scss";
import PostImages from '../../components/postDetails/postImages/PostImages';

const PostDetailPage = () => {
  const images = [
    "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg",
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
    "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg","https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg","https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <PostImages images={images} />
        {/* <PostHeader />
        <PostGallery />
        <PostDetails />
        <PostDescription />
        <CommentSection /> */}
      </div>
      <div className={styles.sidebar}>
        
      </div>
    </div>
  );
}

export default PostDetailPage
