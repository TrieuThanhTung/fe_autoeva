import styles from './SignupSuccess.module.scss';
import { Link } from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const SignupSuccess = () => {
  return (
    <div className={styles.container}>
      <CheckCircleOutlineOutlinedIcon className={styles.icon} sx={{ fontSize: 64 }}/>
      <h1 className={styles.title}>Đăng ký thành công!</h1>
      <p className={styles.message}>
        Chúng tôi đã gửi một email xác thực đến hộp thư của bạn. Vui lòng kiểm tra và xác nhận tài khoản để bắt đầu sử dụng dịch vụ.
      </p>
      <Link to="/" className={styles.homeButton}>
        Về trang chủ
      </Link>
    </div>
  );
};

export default SignupSuccess;
