import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import { AppProvider } from './app/providers/AppProvider.tsx'

createRoot(document.getElementById('root')!).render(<AppProvider />)
