import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

const publicRoutes = [
  {path: "/signup", page:  Signup},
  {path: "/login", page: Login}
]

const privateRoutes = []

export {publicRoutes, privateRoutes}