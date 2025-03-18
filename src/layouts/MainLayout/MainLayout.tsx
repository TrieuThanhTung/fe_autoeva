import "./MainLayout.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/SideBar";
import { useState } from "react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`theme-light`}>
      <Header toggleSidebar={toggleSidebar}/>
      <div className="layout-container">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <main className="main-layout-container">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
