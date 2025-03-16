import "./MainLayout.scss"
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className={ `theme-light` }>
      <Header />
      <main className='main-layout-container'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
