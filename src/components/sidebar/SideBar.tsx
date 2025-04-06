import "./SideBar.scss"
import React from "react";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import logo from "../../assets/logo_autoeva.svg";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`}>
      <div className="top">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" onClick={toggleSidebar}/>
        </Link>
        <button onClick={toggleSidebar} className="close-btn">
          <CancelOutlinedIcon className="icon"/>
        </button>
      </div>

      <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
      </div>
      
      <ul className="menu">
        <li>
          <Link to="#" onClick={toggleSidebar}>Trang chủ</Link>
        </li>
        <li>
          <Link to="#" onClick={toggleSidebar}>Định giá xe</Link>
        </li>
        <li>
          <Link to="#" onClick={toggleSidebar}>Bài đăng</Link>
        </li>
        <li>
          <Link to="#" onClick={toggleSidebar}>Liên hệ</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
