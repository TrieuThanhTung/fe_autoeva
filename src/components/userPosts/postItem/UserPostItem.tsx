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
  handleUpdateStatus: (postId: number, status: string) => void
}

const UserPostItem: React.FC<PostItemProps> = ({ post, handleRemovePost, handleUpdateStatus }) => {
  const {showLoading, hideLoading} = useGlobalLoading();
  const handleNavigate = useHandleNagivate();

  const [showModal, setShowModal] = React.useState({
    show: false,
    action: "remove"
  });

  const handleAsyncRemovePost = async () => {
    setShowModal((prev) => ({ ...prev, show: false }));
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

  const handleSoldPost = async () => {
    setShowModal((prev) => ({ ...prev, show: false }));
    showLoading();
    try {
      const res = await PostApi.updateStatusPost(post.id, "sold");
      if (res.status === 200) {
        setTimeout(() => {
          toast.success("Đánh dấu bài đăng đã bán thành công");
          handleUpdateStatus(post.id, "sold");
          hideLoading();
        }, 500);
      } else {
        toast.error("Đánh dấu bài đăng đã bán thất bại");
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
        show={showModal.show}
        message = {
          showModal.action === "remove" ? 
          "Bạn có chắc chắn muốn xoá bài đăng này không?" : 
          "Bạn có chắc chắn muốn đánh dấu bài đăng này đã bán không?"
        } 
        confirmBtnText={showModal.action === "remove" ? "Xóa" : "Đánh dấu đã bán"}
        onCancel={() => setShowModal((prev) => ({ ...prev, show: false }))}
        onConfirm={showModal.action === "remove" ? handleAsyncRemovePost : handleSoldPost}
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
          {post.status === "active" && <button onClick={() => setShowModal({ show: true, action: 'update' })} className={styles.soldButton}>Đánh dấu đã bán</button>}
          <button onClick={() => setShowModal({ show: true, action: 'remove' })} className={styles.deleteButton}>Xóa</button>
        </td>
      </tr>
    </>
  );
};

export default UserPostItem;
