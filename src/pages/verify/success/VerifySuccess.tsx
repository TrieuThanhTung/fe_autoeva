import styles from './VerifySuccess.module.scss';
import { Link } from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const VerifySuccess = () => {
  return (
    <div className={styles.container}>
      <CheckCircleOutlineOutlinedIcon className={styles.icon} sx={{ fontSize: 64 }}/>
      <h1 className={styles.title}>Tài khoản đã được xác thực</h1>
      <p className={styles.message}>
        Cảm ơn bạn đã xác nhận tài khoản. Bây giờ bạn có thể đăng nhập và bắt đầu sử dụng dịch vụ của chúng tôi.
      </p>
      <Link to="/login" className={styles.loginButton}>
        Đăng nhập ngay
      </Link>
    </div>
  );
};

export default VerifySuccess;
