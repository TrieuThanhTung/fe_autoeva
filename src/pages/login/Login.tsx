import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Thêm logic xử lý đăng nhập ở đây
  };

  return (<>
    <Header />
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email / Số điện thoại</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email hoặc số điện thoại"
              required
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
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
    <Footer/>
  </>
  );
};

export default Login;
