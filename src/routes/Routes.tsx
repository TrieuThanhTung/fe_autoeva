import Login from "../pages/login/Login";
import Predict from "../pages/predict/predict";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";

const publicRoutes = [
  {path: "/signup", page:  Signup},
  {path: "/login", page: Login},
  {path: "/predict", page: Predict},
  {path: "/profile", page: Profile}

]

const privateRoutes = []

export {publicRoutes, privateRoutes}