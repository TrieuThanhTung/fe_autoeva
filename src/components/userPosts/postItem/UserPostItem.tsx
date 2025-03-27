import React from "react";
import styles from "./UserPostItem.module.scss";

interface Post {
  id: number;
  image?: string;
  name: string;
  year: number;
  km: string;
  price: string;
  status: string;
  date: string;
}

interface PostItemProps {
  post: Post;
}

const UserPostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <tr className={styles.postRow}>
      <td>
        <div className={styles.carInfo}>
          <div className={styles.imagePlaceholder}>
            <img src={post.image} alt="car" />
          </div>
          <div>
            <p className={styles.carName}>{post.name}</p>
            <p className={styles.carDetails}>{post.year} - {post.km}</p>
          </div>
        </div>
      </td>
      <td>{post.price}</td>
      <td>
        <span className={post.status === "Đang hiển thị" ? styles.activeStatus : styles.soldStatus}>
          {post.status}
        </span>
      </td>
      <td>{post.date}</td>
      <td className={styles.actionContainer}>
        <button className={styles.editButton}>Chỉnh sửa</button>
        {post.status === "Đang hiển thị" && <button className={styles.soldButton}>Đánh dấu đã bán</button>}
        <button className={styles.deleteButton}>Xóa</button>
      </td>
    </tr>
  );
};

export default UserPostItem;
