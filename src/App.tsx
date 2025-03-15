import './style.scss'
import "./assets/styles/output.css";
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/Routes'
import Home from './pages/home/Home';
import Home_v1 from './pages/home_v1/Home';
import MainLayout from './layouts/MainLayout';

function App() {

  return (
    <Routes>
      {publicRoutes.map((router, index) => {
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
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
