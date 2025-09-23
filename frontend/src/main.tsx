import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GalleryPage } from './GalleryPage';
import { Navbar } from './components/Navbar'

/*
 * This component holds all app level state 
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />

    <GalleryPage galleryId='b692b01c-8f3f-4c8d-94d6-557d6b75031e' username = "The dragon warrior" />

  </StrictMode>,
)
