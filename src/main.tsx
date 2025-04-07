import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeContextProvider } from './context/darkModeContext'
import ScrollToTop from './util/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </DarkModeContextProvider>
  </StrictMode>,
)
