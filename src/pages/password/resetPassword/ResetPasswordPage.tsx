// ResetPasswordPage.tsx
import React, { useState } from 'react';
import styles from './ResetPasswordPage.module.scss';
import SuccessMessage from '../../../components/message/SucessMessage';
import { toast } from 'react-toastify';
import AuthApi from '../../../api/AuthApi';
import { delay } from '../../../util/delay';
import { useGlobalLoading } from '../../../context/components/globalLoading/GlobalLoadingProvider';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const { showLoading, hideLoading } = useGlobalLoading();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token') || '';

  const validatePassword = () => {
    setErrors({
      password: "",
      confirmPassword: "",
    });
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số",
      }));
      toast.error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số");
      return false;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không khớp",
      }));
      toast.error("Mật khẩu không khớp");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    showLoading();

    try {
      const res = await AuthApi.resetPassword(password, confirmPassword, token);
      if (res.status === 200) {
        delay(() => setIsSuccess(true));
        return;
      }
      delay(() => {
        if (res.status === 422) {
          toast.error('Mật khẩu không hợp lệ!');
        } else if (res.status === 404) {
          toast.error('Token không hợp lệ hoặc đã hết hạn!');
        } else {
          toast.error('Có lỗi xảy ra trong quá trình đặt lại mật khẩu!');
        }
      }
      );
    } catch (error) {
      console.error(error);
      delay(() => { toast.error('Có lỗi xảy ra trong quá trình đặt lại mật khẩu!'); });
    } finally {
      delay(() => { hideLoading(); });
    }
  };

  return (
    isSuccess ?
      <SuccessMessage
        title='Đặt lại mật khẩu thành công'
        description='Mật khẩu của bạn đã được thay đổi thành công. Bạn có thể đăng nhập bằng mật khẩu mới.'
        buttonText='Về  trang đăng nhập'
        buttonHref='/login' />
      :
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Đặt lại mật khẩu</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label className={styles.label} htmlFor="password">Mật khẩu mới</label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${errors.password ? styles.error : ''}`}
                  placeholder="Nhập mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>

              <label className={styles.label} htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <div className={styles.inputWrapper}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Đặt lại mật khẩu
            </button>
          </form>

          <div className={styles.footer}>
            <a href="/login" className={styles.backToLogin}>Quay lại đăng nhập</a>
          </div>
        </div>
      </div>
  );
};

export default ResetPasswordPage;
