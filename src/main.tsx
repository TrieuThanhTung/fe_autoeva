import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeContextProvider } from './context/darkModeContext'
import ScrollToTop from './util/ScrollToTop.tsx'
import { GlobalLoadingProvider } from './context/components/globalLoading/GlobalLoadingProvider.tsx'
import { AuthContextProvider } from './context/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <GlobalLoadingProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </GlobalLoadingProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>,
)
