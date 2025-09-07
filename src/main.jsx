import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='urbanist-font'>
    <RouterProvider  router={router}></RouterProvider>
   </div>
  </StrictMode>,
)
