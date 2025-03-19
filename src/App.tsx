import './style.scss'
// import "./assets/styles/output.css";
import { Routes, Route } from 'react-router-dom'
import { authLayoutRoutes, mainLayoutRoutes } from './routes/Routes'
import MainLayout from './layouts/MainLayout/MainLayout';

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
    </Routes>
  )
}

export default App
