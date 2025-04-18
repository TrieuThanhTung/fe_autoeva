import React from "react";
import styles from "./ConfirmModal.module.scss";

type ConfirmModalProps = {
  show: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn đăng xuất?",
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onCancel}>Hủy</button>
          <button onClick={onConfirm}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
