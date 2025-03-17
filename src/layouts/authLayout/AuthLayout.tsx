import "./MainLayout.scss"
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import AuthHeader from "../../components/Header/AuthHeader/AuthHeader"

const AuthLayout = () => {
  return (
    <div className={ `theme-light` }>
      <AuthHeader />
      <main className='main-layout-container'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout
