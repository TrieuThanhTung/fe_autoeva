import React from "react";
import styles from "./ConfirmModal.module.scss";

type ConfirmModalProps = {
  show: boolean;
  title?: string;
  message?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn đăng xuất?",
  cancelBtnText = "Hủy",
  confirmBtnText = "Đăng xuất",
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
          <button onClick={onCancel}>{cancelBtnText}</button>
          <button onClick={onConfirm}>{confirmBtnText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
