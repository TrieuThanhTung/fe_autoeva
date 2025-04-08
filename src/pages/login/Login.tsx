/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import AuthApi from "../../api/AuthApi";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";
import { useNavigate } from "react-router-dom";
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import { delay } from "../../util/delay";
import { useAuthContext } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useGlobalLoading();
  const { login } = useAuthContext();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    showLoading();
    const payload = {
      email,
      password,
    };
    try {
      const res = await AuthApi.login(payload);
      if (res.status === 200) {
        delay(() => { navigate("/"); login()}, 1000);
      } else {
        delay(() => { setError(true); }, 1000);
      }
    } catch (error) {
      delay(() => { setError(true); }, 1000);
    } finally {
      delay(() => { hideLoading(); }, 1000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Đăng nhập</h1>
        <p className={`login-description-error ${error ? 'show' : ''}`}>
          <PriorityHighOutlinedIcon className="error-icon" />
          Đăng nhập không thành công.
          <br />
          Vui lòng kiểm tra lại thông tin đăng nhập.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className={`input-group ${error ? 'error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email hoặc số điện thoại"
              required
            />
          </div>
          <div className={`input-group ${error ? 'error' : ''}`}>
            <label>Mật khẩu</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="toggle-password"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
          <button type="submit" className="login-btn">Đăng nhập</button>
          <p className="signup-link">
            Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
