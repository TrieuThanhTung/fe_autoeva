import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/Routes'
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/home/Home';

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
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
