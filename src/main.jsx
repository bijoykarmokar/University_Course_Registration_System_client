import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'
import AuthProvider from './context/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='urbanist-font'>
    <AuthProvider>
       <RouterProvider  router={router}></RouterProvider>
    </AuthProvider>
   </div>
  </StrictMode>,
)
