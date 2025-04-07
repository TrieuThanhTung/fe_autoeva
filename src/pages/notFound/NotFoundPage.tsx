import React from 'react';
import styles from './NotFoundPage.module.scss';
import useHandleNagivate from '../../hooks/useHandleNagivate';

const NotFoundPage: React.FC = () => {
  const handleNagivate = useHandleNagivate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <p className={styles.subMessage}>
          We are sorry, but the page you requested was not found
        </p>
        <button className={styles.homeButton} onClick={() => handleNagivate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
