import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ÚJ: A BrowserRouter importálása
import { BrowserRouter } from 'react-router-dom' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ÚJ: AZ APP KOMPONENST BE KELL ÁGYAZNI A ROUTERBE! */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)