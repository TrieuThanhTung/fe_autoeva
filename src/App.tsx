import './style.scss'
import { Routes, Route } from 'react-router-dom'
import { authLayoutRoutes, mainLayoutRoutes } from './routes/Routes'
import MainLayout from './layouts/MainLayout/MainLayout';
import NotFoundPage from './pages/notFound/NotFoundPage';

function App() {

  return (
    <Routes>
      {authLayoutRoutes.map((router, index) => {
          const Page = router.page;
          return (
            <Route 
              key={index}
              path = {router.path}
              element = {<Page />}
            />
          )
        })}
      <Route path="/" element={<MainLayout />}>
        { mainLayoutRoutes.map((router, index) => {
          const Page = router.page;
          return (
            <Route 
              key={index}
              path = {router.path}
              element = {<Page />}
            />
          )
        })}
      </Route>
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App
