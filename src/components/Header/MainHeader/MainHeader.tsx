import { Link, useNavigate } from "react-router-dom";
import "./MainHeader.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from "../../../assets/logo_autoeva.svg";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import { useState } from "react";
import { useGlobalLoading } from "../../../context/components/globalLoading/GlobalLoadingProvider";
import AuthApi from "../../../api/AuthApi";
import { useAuthContext } from "../../../context/authContext";

type HeaderProps = {
  toggleSidebar: () => void
}

const Header:React.FC<HeaderProps> = ({toggleSidebar}) => {
  const {showLoading, hideLoading} = useGlobalLoading();
  const {logout} = useAuthContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    showLoading()
    try {
      await AuthApi.logout();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        hideLoading();
        logout();
        navigate("/");
      }
      , 1000);
    }
    setShowModal(false);
  };

  return (
    <>
      <ConfirmModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleLogout}
      />
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
              <button onClick={handleLogoutClick} className="item logout-btn">
                <LogoutOutlinedIcon />
              </button>
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
    </>
  );
};

export default Header;
