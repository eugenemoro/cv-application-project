import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CV from './components/CV.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CV />
  </StrictMode>,
)
