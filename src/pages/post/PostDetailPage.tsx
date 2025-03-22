import React from 'react'
import styles from "./PostDetailPage.module.scss";
import PostImages from '../../components/postDetails/postImages/PostImages';
import PostDetail from '../../components/postDetails/postDetail/PostDetail';
import { data_details, images } from '../../util/data';
import CommentSection from '../../components/postDetails/CommentSection/CommentSection';
import SellerInfo from '../../components/postDetails/SellerInfo/SellerInfo';

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
        <SellerInfo
          name="Nguyễn Văn A"
          avatar="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
          joinYear={2020}
          phone="0912.345.678"
        />
      </div>
    </div>
  );
}

export default PostDetailPage
