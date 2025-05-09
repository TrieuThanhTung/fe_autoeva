import React, { useEffect, useState } from "react";
import styles from "./CommentSection.module.scss";
import { CommentPayload, CommentType } from "../../../util/type";
import PostApi from "../../../api/PostApi";
import { toast } from "react-toastify";
import { badWords } from '@vnphu/vn-badwords';

type CommentSectionProps = {
  id: string | number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
  const [comment, setComment] = useState<string>("");
  const [uid] = useState<string | null>(localStorage.getItem('uid') || null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const [comments, setComments] = useState<CommentType[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const handleSubmit = async () => {
    if (comment.trim() === "") return;
    if (badWords(comment, { validate: true }) as boolean) {
      toast.warn("Vui lòng bình luận những từ ngữ chuẩn thuần phong, mỹ tục.")
      return
    }
    const remove_badwords = badWords(comment, '*') as string;
    try {
      const payload: CommentPayload = {
        comment: {
          content: remove_badwords
        }
      } 
      const res = await PostApi.createComment(id, payload)
      if (res.status === 401) {
        toast.error("Vui lòng đăng nhập để bình luận!")
      } else if (res.status !== 201) {
        toast.error("Bình luận lỗi, vui lòng thử lại!")
      } else if (res.status === 201) {
        const newComment: CommentType = res.data;
        setComments((prevComments) => [newComment, ...(prevComments || [])]);
        setComment("");
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchComment = async (page?: string | number) => {
    try {
      const res = await PostApi.getComments(id, page)
      if (res.status === 200) {
        setComments((prevComments) => ([
          ...(prevComments || []),
          ...res.data.comments
        ]))
        setCurrentPage(res.data.current_page)
        setTotalPages(res.data.total_pages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setComments([])
    if (id) {
      fetchComment()
    }
  }, [id])

  const handleLoadMoreComments = async () => {
    await fetchComment(currentPage + 1)
  }

  return (
    <div className={styles.commentSection}>
      <h3 className={styles.title}>Bình luận</h3>

      <textarea
        className={styles.input}
        placeholder="Viết bình luận của bạn..."
        value={comment}
        onChange={handleInputChange}
      />

      <button className={styles.button} onClick={handleSubmit}>
        Gửi bình luận
      </button>

      <div className={styles.commentList}>
        {comments && comments.length > 0 ? comments.map((c) => (
          <div key={c.id} className={styles.commentItem}>
            <div className={styles.header}>
              <div className={styles.avatar} style={{ backgroundColor: "grey" }}>
                {c.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.nameTime}>
                  <span className={styles.name}>{uid && uid === c.user.email ? `${c.user.name} (Bạn)` : c.user.name }</span>
                  <span className={styles.time}>
                    <i className="fa fa-clock-o" /> {new Date(c.created_at).toLocaleString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.content}>{c.content}</div>
          </div>
        )) : <p>Chưa có bình luận.</p>}
      </div>
      {currentPage < totalPages &&
        <div className={styles.loadMoreWrapper}>
          <button onClick={handleLoadMoreComments} className={styles.loadMoreButton}>Xem thêm bình luận</button>
        </div>
      }
    </div>
  );
};

export default CommentSection;
