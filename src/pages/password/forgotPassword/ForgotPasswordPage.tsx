// ForgotPasswordPage.tsx
import React, { useState } from 'react';
import styles from './ForgotPasswordPage.module.scss';
import SuccessMessage from '../../../components/message/SucessMessage';
import { delay } from '../../../util/delay';
import { toast } from 'react-toastify';
import AuthApi from '../../../api/AuthApi';
import { useGlobalLoading } from '../../../context/components/globalLoading/GlobalLoadingProvider';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const {showLoading, hideLoading} = useGlobalLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Vui lòng nhập email của bạn!');
      return;
    }
    showLoading();
    try {
      const res = await AuthApi.forgotPassword(email);
      if (res.status === 200) {
        delay(() => setIsSuccess(true));
        return;
      }
      if (res.status === 404) {
        delay(() => {toast.error('Email không tồn tại!')});
        return;
      }
      delay(() => {toast.error('Có lỗi xảy ra trong quá trình gửi yêu cầu!')});
    } catch (error) {
      console.error(error);
      delay(() => {toast.error('Có lỗi xảy ra trong quá trình gửi yêu cầu!')});
    } finally {
      delay(() => {hideLoading()});
    }
  };

  return (
    <>
      {isSuccess ?
        <SuccessMessage
          title='Gửi yêu cầu reset mật khẩu thành công'
          description='Chúng tôi đã gửi email hướng dẫn đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.'
          buttonText='Về trang chủ'
          buttonHref='/' />
        :
        <div className={styles.wrapper}>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>Quên mật khẩu</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitButton}>
                Gửi yêu cầu
              </button>
            </form>
            <div className={styles.footer}>
              <a href="/login" className={styles.backToLogin}>Quay lại đăng nhập</a>
            </div>
          </div>
        </div>}
    </>
  );
};

export default ForgotPasswordPage;
