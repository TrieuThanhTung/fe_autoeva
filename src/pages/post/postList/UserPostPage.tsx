import React from "react";
import styles from "./UserPostPage.module.scss";
import PostItem from "../../../components/userPosts/postItem/UserPostItem";
import { Link } from "react-router-dom";
import { images } from "../../../util/data";

const posts = [
  {
    id: 1,
    image: images[0],
    name: "Toyota Camry 2.5Q",
    year: 2023,
    km: "15,000 km",
    price: "850,000,000đ",
    status: "Đang hiển thị",
    date: "20/02/2024",
  },
  {
    id: 2,
    name: "Honda Civic RS",
    image: images[0],
    year: 2022,
    km: "25,000 km",
    price: "720,000,000đ",
    status: "Đã bán",
    date: "15/02/2024",
  },
];

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
            <th>Xe</th>
            <th>Giá</th>
            <th>Trạng Thái</th>
            <th>Ngày Đăng</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPostPage;
