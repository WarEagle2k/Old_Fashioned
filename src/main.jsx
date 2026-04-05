import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function TestApp() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ color: '#E2713A', fontSize: '32px', marginBottom: '16px' }}>
        The Old Fashioned
      </h1>
      <p style={{ color: '#EDEDEF', fontSize: '16px' }}>
        If you can see this, React is working.
      </p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestApp />
  </StrictMode>,
)
