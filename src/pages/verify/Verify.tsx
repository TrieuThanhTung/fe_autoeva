/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VerifySuccess from './success/VerifySuccess';
import styles from './Verify.module.scss';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useGlobalLoading } from '../../context/components/globalLoading/GlobalLoadingProvider';
import AuthApi from '../../api/AuthApi';


const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'expired' | 'confirmed' | 'error'>('loading');
  const [resent, setResent] = useState(false);
  const {showLoading, hideLoading} = useGlobalLoading();

  const token = searchParams.get('confirmation_token');
  const email = searchParams.get('email');

  useEffect(() => {
    const verify = async () => {
      showLoading();
      try {
        const res = await AuthApi.verifyEmail(token as string);
        if (res.status === 200) {
          setStatus('success');
        } else {
          if (res.data.errors.includes("Email was already confirmed, please try signing in")) {
            setStatus('confirmed');
          } else {
            setStatus('expired');
          }
        }
      } catch {
        setStatus('error');
      } finally {
        hideLoading();
      }
    };

    if (token) verify();
    else setStatus('error');
  }, [token]);

  const resendEmail = async () => {
    showLoading();
      try {
        const res = await AuthApi.resendVerifyEmail(email as string);
        if (res.status === 200) {
          setResent(true);
          setStatus('expired');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      } finally {
        hideLoading();
      }
  };

  if (status === 'success' || status === 'confirmed') return <VerifySuccess />;

  return (
    <div className={styles.container}>
      {status === 'loading' && 
        <div className={styles.loadingWrapper}>
        <p>Đang xác minh tài khoản...</p>
      </div>
      }

      {status === 'expired' && (
        <>
          <ErrorOutlineOutlinedIcon className={styles.icon} sx={{ fontSize: 64 }} />
          <h1 className={styles.title}>Liên kết đã hết hạn</h1>
          <p className={styles.message}>Liên kết xác minh đã hết hạn. Bạn có thể yêu cầu gửi lại email xác thực.</p>
          {!resent ? (
            <button className={styles.button} onClick={resendEmail}>Gửi lại email</button>
          ) : (
            <p>Email xác thực mới đã được gửi đến <strong>{email}</strong></p>
          )}
        </>
      )}

      {status === 'error' && (
        <>
          <CancelOutlinedIcon className={styles.icon} sx={{ fontSize: 64 }} />
          <h1 className={styles.title}>Xác thực thất bại</h1>
          <p className={styles.message}>Đã xảy ra lỗi khi xác minh tài khoản. Vui lòng kiểm tra lại liên kết.</p>
        </>
      )}
    </div>
  );
};

export default VerifyPage;
