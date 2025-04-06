import { Link } from "react-router-dom";
import "./AuthHeader.scss";
import logo from "../../../assets/logo_autoeva.svg";

const AuthHeader = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Đăng nhập</Link>
          <Link to="/signup" className="signup-btn">Đăng ký</Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
