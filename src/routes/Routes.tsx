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
import ListPostPage from "../pages/ListPost/ListPostPage";
import SignupSuccess from "../pages/signup/sucess/SignupSuccess";
import VerifySuccess from "../pages/verify/success/VerifySuccess";


const commonRoutes = [
  {path: "/signup", page:  Signup},
  {path: "/login", page: Login},
  {path: "/signup-success", page: SignupSuccess},
  {path: "/verify-account-success", page: VerifySuccess},
  {path: "/", page: Home},
  {path: "/post/:id", page: PostDetailPage},
  {path: "/predict", page: Predict},
  {path: "/posts", page: ListPostPage},
]

const userRoutes = [
  {path: "/profile", page: Profile},
  {path: "/favorites", page: Favorite},
  {path: "/my-posts/create", page: CreatePostPage},
  {path: "/my-posts/:id/edit", page: EditPostPage},
  {path: "/my-posts", page: UserPostPage},
]

export {commonRoutes, userRoutes}
