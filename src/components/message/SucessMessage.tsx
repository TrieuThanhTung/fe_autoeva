// SuccessMessage.tsx
import React from 'react';
import styles from './SuccessMessage.module.scss';
import { Link } from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface SuccessMessageProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ title, description, buttonText, buttonHref }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <CheckCircleOutlineOutlinedIcon className={styles.icon} sx={{ fontSize: 64 }} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <Link to={buttonHref} className={styles.button}>
        {buttonText}
      </Link>
    </div>
  );
};

export default SuccessMessage;
