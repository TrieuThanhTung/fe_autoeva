import "./SideBar.scss"
import React, { useEffect } from "react";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link, useLocation, useParams } from "react-router-dom";
import logo from "../../assets/logo_autoeva.svg";
import Search from "../Header/components/search/Search";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: (status: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    toggleSidebar(false)
  }, [id, location.pathname]);

  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`}>
      <div className="top">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" onClick={() => toggleSidebar(false)}/>
        </Link>
        <button onClick={() => toggleSidebar(false)} className="close-btn">
          <CancelOutlinedIcon className="icon"/>
        </button>
      </div>

      <Search toggleSidebar={toggleSidebar}/>
      
      <ul className="menu">
        <li>
          <Link to="/" onClick={() => toggleSidebar(false)}>Trang chủ</Link>
        </li>
        <li>
          <Link to="/predict" onClick={() => toggleSidebar(false)}>Định giá xe</Link>
        </li>
        <li>
          <Link to="/posts" onClick={() => toggleSidebar(false)}>Bài đăng</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
