import React from 'react'
import styles from "./PostDetailPage.module.scss";
import PostImages from '../../components/postDetails/postImages/PostImages';
import PostDetail from '../../components/postDetails/postDetail/PostDetail';
import { data_details, images } from '../../util/data';

const PostDetailPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <PostImages images={images} />
        <PostDetail {...data_details} />
        {/* <PostDetails /> */}
        {/* <PostDescription />
        <CommentSection />  */}
      </div>
      <div className={styles.sidebar}>
        
      </div>
    </div>
  );
}

export default PostDetailPage
