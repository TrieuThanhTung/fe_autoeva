import React, { useState } from "react";
import styles from "./CommentSection.module.scss";

interface Comment {
  id: number;
  text: string;
}

const CommentSection: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() === "") return;

    const newComment: Comment = {
      id: Date.now(),
      text: comment,
    };

    setComments([...comments, newComment]);
    setComment("");
  };

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
        {comments.map((c) => (
          <div key={c.id} className={styles.commentItem}>
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
