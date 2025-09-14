import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GalleryPage } from './GalleryPage';
import { Gallery } from '../models/gallery';
/**
 * This component holds all app level state 
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <GalleryPage />
  </StrictMode>,
)
