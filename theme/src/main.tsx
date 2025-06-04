/**
 *
 * Root layout
 */

// Modules
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Components
import App from './App.tsx'

// Global scss
import './scss/styles.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
