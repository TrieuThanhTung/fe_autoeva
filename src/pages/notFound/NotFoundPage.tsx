import React from 'react';
import styles from './NotFoundPage.module.scss';
import useHandleNagivate from '../../hooks/useHandleNagivate';

const NotFoundPage: React.FC = () => {
  const handleNagivate = useHandleNagivate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Oops! Không tìm thấy trang</p>
        <p className={styles.subMessage}>
        Chúng tôi xin lỗi, nhưng trang bạn yêu cầu không được tìm thấy
        </p>
        <button className={styles.homeButton} onClick={() => handleNagivate("/")}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
