import React from "react";
import styles from "./UserPostItem.module.scss";
import { useNavigate } from "react-router-dom";
import { PostItemType } from "../../../util/type";
import { formatCurrency, formatDate } from "../../../util/utils";

interface PostItemProps {
  post: PostItemType;
}

const UserPostItem: React.FC<PostItemProps> = ({ post }) => {
 const navigate = useNavigate();

 const handleNavigate = (url: string) => {
  navigate(url);
 }

  return (
    <tr className={styles.postRow}>
      <td>
        <div className={styles.carInfo}>
          <div className={styles.imagePlaceholder}>
            <img src={post.image} alt="car" />
          </div>
          <div>
            <p className={styles.carName}>{post.title}</p>
            <p className={styles.carDetails}>{post.year} - {post.odo} km</p>
          </div>
        </div>
      </td>
      <td>{formatCurrency(post.price)} VND</td>
      <td>
        <span className={post.status === "active" ? styles.activeStatus : styles.soldStatus}>
          {post.status === "active" ? "Đang hoạt động" : "Đã bán"}
        </span>
      </td>
      <td>{formatDate(post.created_at)}</td>
      <td className={styles.actionContainer}>
        <button className={styles.editButton} onClick={() => handleNavigate(`/my-posts/${post.id}/edit`)}>Chỉnh sửa</button>
        {post.status === "active" && <button className={styles.soldButton}>Đánh dấu đã bán</button>}
        <button className={styles.deleteButton}>Xóa</button>
      </td>
    </tr>
  );
};

export default UserPostItem;
