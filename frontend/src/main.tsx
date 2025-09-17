import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GalleryPage } from './GalleryPage';
import { Navbar } from './components/Navbar'
/**
 * This component holds all app level state 
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <GalleryPage />
  </StrictMode>,
)
