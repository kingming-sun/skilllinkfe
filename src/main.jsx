import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StackProvider } from "@stackframe/stack"
import { stackApp } from './stackAuthConfig'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StackProvider app={stackApp}>
      <App />
    </StackProvider>
  </StrictMode>,
)
