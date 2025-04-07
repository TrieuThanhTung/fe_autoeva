import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <p className={styles.subMessage}>
          We are sorry, but the page you requested was not found
        </p>
        <button className={styles.homeButton} onClick={handleGoHome}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
