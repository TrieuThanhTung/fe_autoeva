import { Link } from "react-router-dom";
import "./header.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="logo_autoeva.svg" alt="Logo" />
        </Link>

        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Đăng nhập</Link>
          <Link to="/signup" className="signup-btn">Đăng ký</Link>
        </div>
      </div>
      <div>
      <nav className="nav">
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/predict">Định giá xe</Link></li>
            <li><Link to="/posts">Bài đăng</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
