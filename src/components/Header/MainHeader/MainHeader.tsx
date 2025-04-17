import { Link } from "react-router-dom";
import "./MainHeader.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import logo from "../../../assets/logo_autoeva.svg";

type HeaderProps = {
  toggleSidebar: () => void
}

const Header:React.FC<HeaderProps> = ({toggleSidebar}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="left-block">
          <button onClick={toggleSidebar} className="open-btn-sidebar-mobile">
            ☰
          </button>
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="menu-items">
            <Link to="/profile" className="item">
              <PersonOutlineOutlinedIcon />
            </Link>
            <Link to="/favorites" className="item">
              <FavoriteBorderOutlinedIcon />
            </Link>
            <Link to="/my-posts" className="item">
              <FormatListBulletedIcon />
            </Link>
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
