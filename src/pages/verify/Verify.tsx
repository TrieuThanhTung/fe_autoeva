import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VerifySuccess from './success/VerifySuccess';
import styles from './Verify.module.scss';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';


const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'expired' | 'error'>('loading');
  const [resent, setResent] = useState(false);

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    // const verify = async () => {
    //   try {
    //     const res = await fetch('/api/verify', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email, token }),
    //     });

    //     if (res.ok) {
    //       setStatus('success');
    //     } else if (res.status === 410) {
    //       setStatus('expired');
    //     } else {
    //       setStatus('error');
    //     }
    //   } catch {
    //     setStatus('error');
    //   }
    // };

    // if (email && token) verify();
    // else setStatus('error');
    // setStatus('loading'); // Simulate success for testing
  }, [email, token]);

  const resendEmail = async () => {
    await fetch('/api/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setResent(true);
  };

  if (status === 'success') return <VerifySuccess />;

  return (
    <div className={styles.container}>
      {status === 'loading' && 
        <div className={styles.loadingWrapper}>
        {/* <CircularProgress className={styles.spinner} /> */}
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
