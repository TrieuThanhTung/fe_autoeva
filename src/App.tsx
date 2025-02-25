import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/Routes'

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
    </Routes>
  )
}

export default App
