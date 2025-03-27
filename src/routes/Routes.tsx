import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PostDetailPage from "../pages/post/postDetail/PostDetailPage";
import Predict from "../pages/predict/Predict";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import Favorite from "../pages/favListing/FavoriteList";
import CreatePostPage from "../pages/post/createPost/CreatePostPage";
import EditPostPage from "../pages/post/editPost/EditPostPage";
import UserPostPage from "../pages/post/postList/UserPostPage";


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
  {path: "/my-posts/create", page: CreatePostPage},
  {path: "/my-posts/:id/edit", page: EditPostPage},
  {path: "/my-posts", page: UserPostPage},
]

export {authLayoutRoutes, mainLayoutRoutes}
