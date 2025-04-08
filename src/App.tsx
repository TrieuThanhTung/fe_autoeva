/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { commonRoutes, userRoutes } from './routes/Routes'
import MainLayout from './layouts/MainLayout/MainLayout';
import NotFoundPage from './pages/notFound/NotFoundPage';
import AuthLayout from './layouts/authLayout/AuthLayout';
import { useAuthContext } from './context/authContext';

const RootLayout = () => {
  const {isLoggedIn} = useAuthContext()
  return isLoggedIn ? <MainLayout /> : <AuthLayout />;
}

function App() {
  const {isLoggedIn} = useAuthContext()

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {userRoutes.map((router, index) => (
          <Route
            key={index}
            path={router.path}
            element={
              isLoggedIn ?
              <router.page />
              : 
              <Navigate to="/login" />
            }
          />
        ))}
        {commonRoutes.map((router, index) => (
          <Route
            key={index}
            path={router.path}
            element={
              <router.page />
            }
          />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App
