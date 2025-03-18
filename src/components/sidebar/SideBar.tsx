import "./SideBar.scss"
import React from "react";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {

  return (
    <div className={`sidebar ${isOpen ? "show" : ""}`}>
      <button onClick={toggleSidebar} className="close-btn">✖</button>
      
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
