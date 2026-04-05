import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clear any stale theme overrides from previous versions
try {
  localStorage.removeItem('of-theme');
  document.documentElement.style.cssText = '';
} catch {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
