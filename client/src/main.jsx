import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './Context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <StrictMode>
        <App />
    </StrictMode>
  </AppProvider>
,
)
