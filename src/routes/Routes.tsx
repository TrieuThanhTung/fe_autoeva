import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PostDetailPage from "../pages/post/PostDetailPage";
import Predict from "../pages/predict/Predict";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";

const authLayoutRoutes = [
  {path: "/signup", page:  Signup},
  {path: "/login", page: Login},
]

const mainLayoutRoutes = [
  {path: "/", page: Home},
  {path: "/predict", page: Predict},
  {path: "/profile", page: Profile},
  {path: "/post", page: PostDetailPage}
]

export {authLayoutRoutes, mainLayoutRoutes}
