import React from "react";
import styles from "./UserPostPage.module.scss";
import PostItem from "../../../components/userPosts/postItem/UserPostItem";
import { Link } from "react-router-dom";
import { userPosts } from "../../../util/data";

const UserPostPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Danh Sách Bài Đăng</span>
        <Link to = "/my-posts/create" ><button className={styles.createButton}>Tạo Bài Đăng Mới</button></Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerName}>Xe</th>
            <th className={styles.headerPrice}>Giá</th>
            <th className={styles.headerStatus}>Trạng Thái</th>
            <th className={styles.headerCreatedAt}>Ngày Đăng</th>
            <th className={styles.headerAction}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {userPosts.length !== 0 ? userPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          )) : <tr><td colSpan={5}>Không có bài đăng nào</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default UserPostPage;
