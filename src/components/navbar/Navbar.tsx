import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggle } = useContext(DarkModeContext);
  // const { currentUser } = useContext(AuthContext);
  const navigateTo = (_e: React.MouseEvent, path: string) => {
    navigate(path);
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>AutoEva</span>
        </Link>
        <HomeOutlinedIcon className="btn" onClick = { event => navigateTo(event, "/")}/>
        {darkMode ? (
          <WbSunnyOutlinedIcon className="btn" onClick = {toggle} />
        ) : (
          <DarkModeOutlinedIcon className="btn" onClick = {toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon className="btn"/>
        <EmailOutlinedIcon className="btn"/>
        <NotificationsOutlinedIcon className="btn"/>
        <div onClick = { event => navigateTo(event, "/profile")} className="btn user">
          <img
            src={"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            alt=""
          />
          <span>{"teg"}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
