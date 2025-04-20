import React from "react";
import styles from "./UserPostItem.module.scss";
import { PostItemType } from "../../../util/type";
import { formatCurrency, formatDate } from "../../../util/utils";
import useHandleNagivate from "../../../hooks/useHandleNagivate";
import { useGlobalLoading } from "../../../context/components/globalLoading/GlobalLoadingProvider";
import PostApi from "../../../api/PostApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";

interface PostItemProps {
  post: PostItemType;
  handleRemovePost: (postId: number) => void;
}

const UserPostItem: React.FC<PostItemProps> = ({ post, handleRemovePost }) => {
  const {showLoading, hideLoading} = useGlobalLoading();
  const handleNavigate = useHandleNagivate();

  const [showModal, setShowModal] = React.useState(false);


  const handleAsyncRemovePost = async () => {
    setShowModal(false);
    showLoading();
    try {
      const res = await PostApi.deletePost(post.id);
      if (res.status === 200) {
        setTimeout(() => {
          toast.success("Xóa bài đăng thành công");
          handleRemovePost(post.id);
          hideLoading();
        }, 500);
      } else {
        toast.error("Xóa bài đăng thất bại");
        hideLoading();
      }
    } catch (error) {
      console.error(error);
      hideLoading();
    }
  }
  
  return (
    <>
      <ConfirmModal 
        show={showModal}
        message = "Bạn có chắc chắn muốn xoá bài đăng này không? <br/> Bài đăng sẽ không thể khôi phục lại."
        confirmBtnText="Xóa"
        onCancel={() => setShowModal(false)}
        onConfirm={handleAsyncRemovePost}
      />
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
          <button onClick={() => setShowModal(true)} className={styles.deleteButton}>Xóa</button>
        </td>
      </tr>
    </>
  );
};

export default UserPostItem;
