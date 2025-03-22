import React from 'react'
import styles from "./PostDetailPage.module.scss";
import PostImages from '../../components/postDetails/postImages/PostImages';
import PostDetail from '../../components/postDetails/postDetail/PostDetail';
import { data_details, images } from '../../util/data';
import CommentSection from '../../components/postDetails/CommentSection/CommentSection';

const PostDetailPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.postContainer}>
          <PostImages images={images} />
          <PostDetail {...data_details} />
        </div>
        <div className={styles.commentContainer}>
          <CommentSection /> 
        </div>
      </div>
      <div className={styles.sidebar}>
        
      </div>
    </div>
  );
}

export default PostDetailPage
