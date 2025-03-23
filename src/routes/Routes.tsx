import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PostDetailPage from "../pages/post/postDetail/PostDetailPage";
import Predict from "../pages/predict/Predict";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import Favorite from "../pages/favListing/FavoriteList";
import CreatePost from "../pages/post/createPost/CreatePost";


const authLayoutRoutes = [
  {path: "/signup", page:  Signup},
  {path: "/login", page: Login},
]

const mainLayoutRoutes = [
  {path: "/", page: Home},
  {path: "/predict", page: Predict},
  {path: "/profile", page: Profile},
  {path: "/post", page: PostDetailPage},
  {path: "/favorites", page: Favorite},
  {path: "/create-post", page: CreatePost},
]

export {authLayoutRoutes, mainLayoutRoutes}
